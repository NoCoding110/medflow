import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, User, Calendar, FileText, Filter, Download, MoreVertical, Bell, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import NewPatientDialog from "./NewPatientDialog";

const DoctorPatients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<any[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [errorPatients, setErrorPatients] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<any>(null);
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
  
  // Fetch patients from backend
  const fetchPatients = useCallback(async () => {
    setLoadingPatients(true);
    setErrorPatients(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      // Add more filters as needed
      const res = await fetch(`/api/patients?${params.toString()}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch patients');
      const data = await res.json();
      setPatients(data.patients || data);
    } catch (e: any) {
      setErrorPatients(e.message || 'Failed to load patients');
      setPatients([]);
    } finally {
      setLoadingPatients(false);
    }
  }, [statusFilter, searchTerm]);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch('/api/patients/analytics', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch analytics');
      setAnalytics(await res.json());
    } catch {
      setAnalytics(null);
    } finally {
      setLoadingAnalytics(false);
    }
  }, []);

  // Fetch AI insights (for selected patient or general)
  const fetchAiInsights = useCallback(async (patientId?: string) => {
    setLoadingInsights(true);
    try {
      const url = patientId ? `/api/patients/ai-insights?patientId=${patientId}` : '/api/patients/ai-insights';
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch AI insights');
      setAiInsights(await res.json());
    } catch {
      setAiInsights(null);
    } finally {
      setLoadingInsights(false);
    }
  }, []);

  // Fetch alerts (for selected patient or general)
  const fetchAlerts = useCallback(async (patientId?: string) => {
    setLoadingAlerts(true);
    try {
      const url = patientId ? `/api/patients/alerts?patientId=${patientId}` : '/api/patients/alerts';
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch alerts');
      const data = await res.json();
      setAlerts(data.alerts || []);
    } catch {
      setAlerts([]);
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
            return patient.dob?.includes(searchTerm);
          case 'phone':
            return patient.phone?.includes(searchTerm);
          case 'email':
            return patient.email?.toLowerCase().includes(searchTerm.toLowerCase());
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
        filtered = filtered.filter(patient => patient.upcomingAppointment !== null);
        break;
      case 'alerts':
        filtered = filtered.filter(patient => patient.alerts && patient.alerts.length > 0);
        break;
    }
    
    // Sort patients
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [patients, searchTerm, searchField, statusFilter, riskFilter, sortConfig, activeTab]);

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'name') {
      setSortConfig({ key: 'name', direction: 'asc' });
    } else if (value === 'nameDesc') {
      setSortConfig({ key: 'name', direction: 'desc' });
    } else if (value === 'recent') {
      setSortConfig({ key: 'lastVisit', direction: 'desc' });
    } else if (value === 'oldest') {
      setSortConfig({ key: 'lastVisit', direction: 'asc' });
    }
  };

  // Navigate to patient profile
  const handlePatientClick = (patientId: string) => {
    navigate(`/doctor/patients/${patientId}/profile`);
  };

  // Handle view patient notes
  const handleViewNotes = (event: React.MouseEvent, patientId: string) => {
    event.stopPropagation();
    navigate(`/doctor/patients/${patientId}/notes`);
  };

  // Handle schedule appointment
  const handleScheduleAppointment = (event: React.MouseEvent, patientId: string) => {
    event.stopPropagation();
    navigate(`/doctor/appointments/new?patientId=${patientId}`);
  };

  // Handle export patient list
  const handleExportList = () => {
    // Implement export functionality
    console.log('Exporting patient list...');
  };

  return (
    <div className="container py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>Search and manage your patients</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExportList}>
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
            <TabsTrigger value="alerts" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
              Alerts
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <select 
              className="h-10 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
              onChange={handleSortChange}
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
                  onClick={() => handlePatientClick(patient.id)}
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
                  <div className="col-span-2 flex items-center space-x-2">
                    <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                      {patient.status}
                    </Badge>
                    {patient.alerts && patient.alerts.length > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{patient.alerts.join(', ')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="col-span-1 flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300"
                      onClick={(e) => handleViewNotes(e, patient.id)}
                      title="View Patient Notes"
                    >
                      <FileText className="h-4 w-4 text-navy-700" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300"
                      onClick={(e) => handleScheduleAppointment(e, patient.id)}
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
                  onClick={() => handlePatientClick(patient.id)}
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
                      {patient.alerts && patient.alerts.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-navy-100">
                          <div className="flex items-center space-x-2 text-yellow-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">{patient.alerts[0]}</span>
                          </div>
                        </div>
                      )}
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
