import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, User, Calendar, FileText, Filter, Download, MoreVertical, Brain, BarChart2, LineChart, Activity, TrendingUp, TrendingDown, Users, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import NewPatientDialog from "./NewPatientDialog";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  email: string;
  phone_number: string;
  status: 'active' | 'inactive';
  last_visit?: string;
  next_appointment?: string;
  created_at: string;
}

interface DisplayPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: string;
  riskLevel: string;
  dob: string;
  phone: string;
  email: string;
  next_appointment?: string;
}

interface Analytics {
  totalPatients: number;
  activePatients: number;
  averageEngagement: number;
  averageHealthScore: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  trends: {
    newPatients: number;
    engagement: 'up' | 'down';
    healthScores: 'up' | 'down';
  };
}

const DoctorPatients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<DisplayPatient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [errorPatients, setErrorPatients] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [loadingAlerts, setLoadingAlerts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'lastVisit', direction: 'desc' });
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // Fetch patients from Supabase
  const fetchPatients = useCallback(async () => {
    setLoadingPatients(true);
    setErrorPatients(null);
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our display interface
      const transformedPatients: DisplayPatient[] = data.map(patient => ({
        id: patient.id,
        name: `${patient.first_name} ${patient.last_name}`,
        age: calculateAge(patient.date_of_birth),
        gender: patient.gender,
        lastVisit: patient.last_visit || new Date().toISOString(),
        status: patient.status === 'active' ? 'Active' : 'Inactive',
        riskLevel: 'low', // Default value
        dob: patient.date_of_birth,
        phone: patient.phone_number,
        email: patient.email,
        next_appointment: patient.next_appointment
      }));

      setPatients(transformedPatients);
    } catch (e: any) {
      setErrorPatients(e.message || 'Failed to load patients');
      setPatients([]);
      toast.error('Failed to load patients');
    } finally {
      setLoadingPatients(false);
    }
  }, []);

  // Helper function to calculate age
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    setLoadingAnalytics(true);
    try {
      // Calculate analytics from our patient data
      const totalPatients = patients.length;
      const activePatients = patients.filter(p => p.status === 'Active').length;
      
      // Calculate engagement (for now, we'll use a simple metric based on active patients)
      const averageEngagement = Math.round((activePatients / totalPatients) * 100) || 0;
      
      // Calculate health scores (for now, we'll use a placeholder value)
      const averageHealthScore = 75;
      
      // Calculate risk distribution (for now, we'll use placeholder values)
      const riskDistribution = {
        low: Math.round(totalPatients * 0.6),
        medium: Math.round(totalPatients * 0.3),
        high: Math.round(totalPatients * 0.1)
      };
      
      // Calculate trends (for now, we'll use placeholder values)
      const trends = {
        newPatients: Math.round(totalPatients * 0.1),
        engagement: 'up' as const,
        healthScores: 'up' as const
      };

      setAnalytics({
        totalPatients,
        activePatients,
        averageEngagement,
        averageHealthScore,
        riskDistribution,
        trends
      });
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoadingAnalytics(false);
    }
  }, [patients]);

  // Fetch AI insights
  const fetchAiInsights = useCallback(async () => {
    setLoadingInsights(true);
    try {
      const res = await fetch('/api/patients/insights/ai', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch AI insights');
      setAiInsights(await res.json());
    } catch (error) {
      toast.error('Failed to load AI insights');
    } finally {
      setLoadingInsights(false);
    }
  }, []);

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    setLoadingAlerts(true);
    try {
      const res = await fetch('/api/patients/alerts', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch alerts');
      setAlerts(await res.json());
    } catch (error) {
      toast.error('Failed to load alerts');
    } finally {
      setLoadingAlerts(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
    fetchAnalytics();
    fetchAiInsights();
    fetchAlerts();
  }, [fetchPatients, fetchAnalytics, fetchAiInsights, fetchAlerts]);

  // Filter and sort patients
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = [...patients];
    
    // Apply search filter based on selected field
    if (searchTerm) {
      filtered = filtered.filter(patient => {
        switch (searchField) {
          case 'name':
            return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
          case 'mrn':
            return patient.id.includes(searchTerm);
          case 'dob':
            return patient.dob.includes(searchTerm);
          case 'phone':
            return patient.phone.includes(searchTerm);
          case 'email':
            return patient.email.toLowerCase().includes(searchTerm.toLowerCase());
          default:
            return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
      });
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(patient => 
        patient.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply risk filter
    if (riskFilter !== 'all') {
      filtered = filtered.filter(patient => 
        patient.riskLevel.toLowerCase() === riskFilter.toLowerCase()
      );
    }
    
    // Apply tab filters
    switch (activeTab) {
      case 'active':
        filtered = filtered.filter(patient => patient.status === 'Active');
        break;
      case 'recent':
        filtered = filtered.filter(patient => {
          const lastVisitDate = new Date(patient.lastVisit);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return lastVisitDate >= thirtyDaysAgo;
        });
        break;
      case 'upcoming':
        filtered = filtered.filter(patient => patient.next_appointment !== undefined);
        break;
    }
    
    // Sort patients
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof DisplayPatient];
      const bValue = b[sortConfig.key as keyof DisplayPatient];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [patients, searchTerm, searchField, statusFilter, riskFilter, sortConfig, activeTab]);

  return (
    <div className="container py-8">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              Patients
            </CardTitle>
            <CardDescription>Total active patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.activePatients || 0}</div>
              <Badge variant="outline" className="text-green-600">
                {analytics?.totalPatients || 0} total
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="mr-2 h-5 w-5 text-purple-600" />
              Engagement
            </CardTitle>
            <CardDescription>Average patient engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{analytics?.averageEngagement || 0}%</div>
                <Badge variant={analytics?.trends.engagement === 'up' ? 'default' : 'destructive'}>
                  {analytics?.trends.engagement === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </Badge>
              </div>
              <Progress value={analytics?.averageEngagement || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-purple-600" />
              Health Scores
            </CardTitle>
            <CardDescription>Average patient health score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.averageHealthScore || 0}</div>
              <Badge variant={analytics?.trends.healthScores === 'up' ? 'default' : 'destructive'}>
                {analytics?.trends.healthScores === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-purple-600" />
              Risk Distribution
            </CardTitle>
            <CardDescription>Patient risk levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Low: {analytics?.riskDistribution.low || 0}</span>
                <span className="text-yellow-600">Medium: {analytics?.riskDistribution.medium || 0}</span>
                <span className="text-red-600">High: {analytics?.riskDistribution.high || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-600" />
                AI Insights
              </CardTitle>
              <CardDescription>Smart recommendations and patterns</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-full ${
                    insight.severity === 'high' ? 'bg-red-100 text-red-700' :
                    insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  } flex items-center justify-center`}>
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    {insight.patientName && (
                      <Badge variant="outline" className="mt-2">
                        {insight.patientName}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patient Management */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>Search and manage your patients</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => {}}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button onClick={() => setIsNewPatientDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> New Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex gap-2">
                <select 
                  className="h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="mrn">MRN</option>
                  <option value="dob">Date of Birth</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-navy-400" />
                  <Input
                    type="search"
                    placeholder={`Search by ${searchField}...`}
                    className="pl-8 py-6 border-navy-100 focus:border-lightblue-300 focus:ring-lightblue-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <select 
                className="w-full h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <select 
                className="w-full h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-navy-50 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
              All Patients
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
              Active
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
              Recently Seen
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
              Upcoming
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <select 
              className="h-10 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'name') {
                  setSortConfig({ key: 'name', direction: 'asc' });
                } else if (value === 'nameDesc') {
                  setSortConfig({ key: 'name', direction: 'desc' });
                } else if (value === 'recent') {
                  setSortConfig({ key: 'lastVisit', direction: 'desc' });
                } else if (value === 'oldest') {
                  setSortConfig({ key: 'lastVisit', direction: 'asc' });
                }
              }}
              defaultValue="recent"
            >
              <option value="name">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="recent">Recent visit</option>
              <option value="oldest">Oldest visit</option>
            </select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value={activeTab} className="space-y-4">
          {viewMode === 'list' ? (
            <div className="rounded-md border border-navy-100 overflow-hidden shadow-sm">
              <div className="bg-navy-50/80 p-3 grid grid-cols-12 gap-3 font-medium text-navy-700">
                <div className="col-span-4">Patient</div>
                <div className="col-span-1">Age</div>
                <div className="col-span-2">Gender</div>
                <div className="col-span-2">Last Visit</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Actions</div>
              </div>
              
              {filteredAndSortedPatients.map((patient) => (
                <div 
                  key={patient.id} 
                  className="p-3 grid grid-cols-12 gap-3 items-center border-t border-navy-100 hover:bg-navy-50/30 transition-colors cursor-pointer"
                  onClick={() => navigate(`/doctor/patients/${patient.id}/profile`)}
                >
                  <div className="col-span-4 flex items-center space-x-3">
                    <div className="flex h-10 w-10 rounded-full bg-lightblue-100 items-center justify-center">
                      <User className="h-5 w-5 text-lightblue-700" />
                    </div>
                    <div>
                      <div className="font-medium text-navy-800 hover:text-lightblue-600 transition-colors">
                        {patient.name}
                      </div>
                      <div className="text-sm text-navy-500">ID: {patient.id}</div>
                    </div>
                  </div>
                  <div className="col-span-1">{patient.age}</div>
                  <div className="col-span-2">{patient.gender}</div>
                  <div className="col-span-2">{new Date(patient.lastVisit).toLocaleDateString()}</div>
                  <div className="col-span-2">
                    <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="col-span-1 flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctor/patients/${patient.id}/notes`);
                      }}
                      title="View Patient Notes"
                    >
                      <FileText className="h-4 w-4 text-navy-700" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctor/appointments/new?patientId=${patient.id}`);
                      }}
                      title="Schedule Appointment"
                    >
                      <Calendar className="h-4 w-4 text-navy-700" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300"
                        >
                          <MoreVertical className="h-4 w-4 text-navy-700" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                        <DropdownMenuItem>View Medical History</DropdownMenuItem>
                        <DropdownMenuItem>View Lab Results</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredAndSortedPatients.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-navy-500">No patients found matching your search criteria.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedPatients.map((patient) => (
                <Card
                  key={patient.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/doctor/patients/${patient.id}/profile`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 rounded-full bg-lightblue-100 items-center justify-center">
                          <User className="h-5 w-5 text-lightblue-700" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{patient.name}</CardTitle>
                          <CardDescription>ID: {patient.id}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                        {patient.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-navy-600">Age</span>
                        <span className="font-medium">{patient.age}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-navy-600">Gender</span>
                        <span className="font-medium">{patient.gender}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-navy-600">Last Visit</span>
                        <span className="font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <NewPatientDialog
        open={isNewPatientDialogOpen}
        onClose={() => setIsNewPatientDialogOpen(false)}
      />
    </div>
  );
};

export default DoctorPatients;
