import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Filter, BarChart2, Brain, AlertCircle, TrendingUp, TrendingDown, Download, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import AIInsightsBox from '@/components/AIInsightsBox';

interface Record {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  type: string;
  summary: string;
  status: 'active' | 'archived' | 'incomplete';
  alerts?: string[];
}

interface Analytics {
  total: number;
  recent: number;
  incomplete: number;
  archived: number;
  trends: {
    total: 'up' | 'down';
    incomplete: 'up' | 'down';
    archived: 'up' | 'down';
  };
}

interface AIInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  patientName?: string;
}

interface Alert {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  patientName?: string;
}

const DoctorRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState({
    records: false,
    analytics: false,
    insights: false,
    alerts: false
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Fetch records
  const fetchRecords = useCallback(async () => {
    setLoading(l => ({ ...l, records: true }));
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      const res = await fetch(`/api/records?${params.toString()}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch records');
      setRecords(await res.json());
    } catch (error) {
      toast.error('Failed to load records');
    } finally {
      setLoading(l => ({ ...l, records: false }));
    }
  }, [statusFilter, searchTerm]);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    setLoading(l => ({ ...l, analytics: true }));
    try {
      const res = await fetch('/api/records/analytics', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch analytics');
      setAnalytics(await res.json());
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(l => ({ ...l, analytics: false }));
    }
  }, []);

  // Fetch AI insights
  const fetchAiInsights = useCallback(async () => {
    setLoading(l => ({ ...l, insights: true }));
    try {
      const res = await fetch('/api/records/insights/ai', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch AI insights');
      setAiInsights(await res.json());
    } catch (error) {
      toast.error('Failed to load AI insights');
    } finally {
      setLoading(l => ({ ...l, insights: false }));
    }
  }, []);

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    setLoading(l => ({ ...l, alerts: true }));
    try {
      const res = await fetch('/api/records/alerts', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch alerts');
      setAlerts(await res.json());
    } catch (error) {
      toast.error('Failed to load alerts');
    } finally {
      setLoading(l => ({ ...l, alerts: false }));
    }
  }, []);

  useEffect(() => {
    fetchRecords();
    fetchAnalytics();
    fetchAiInsights();
    fetchAlerts();
  }, [fetchRecords, fetchAnalytics, fetchAiInsights, fetchAlerts]);

  // Filter and sort records
  const filteredAndSortedRecords = useMemo(() => {
    let filtered = [...records];
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [records, searchTerm, statusFilter, sortConfig]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Records</h1>
      <AIInsightsBox />
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-purple-600" />
              Total Records
            </CardTitle>
            <CardDescription>Total medical records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.total || 0}</div>
              <Badge variant="outline" className="text-purple-600">
                {analytics?.trends.total === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-purple-600" />
              Recent
            </CardTitle>
            <CardDescription>Records added in last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.recent || 0}</div>
              <Badge variant="outline">Recent</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-purple-600" />
              Incomplete
            </CardTitle>
            <CardDescription>Records missing data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.incomplete || 0}</div>
              <Badge variant={analytics?.trends.incomplete === 'up' ? 'destructive' : 'default'}>
                {analytics?.trends.incomplete === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-purple-600" />
              Archived
            </CardTitle>
            <CardDescription>Archived records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.archived || 0}</div>
              <Badge variant={analytics?.trends.archived === 'up' ? 'default' : 'destructive'}>
                {analytics?.trends.archived === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-600" />
              AI Insights
            </CardTitle>
            <CardDescription>Smart record recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-purple-600" />
              Critical Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    } flex items-center justify-center`}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      {alert.patientName && (
                        <Badge variant="outline" className="mt-2">
                          {alert.patientName}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtering and Management */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Search and manage patient records</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => {}}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button onClick={() => {}}>
                <Plus className="mr-2 h-4 w-4" /> New Record
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-navy-400" />
                  <Input
                    type="search"
                    placeholder="Search by patient, summary, or type..."
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
                <option value="archived">Archived</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            <div>
              <select 
                className="w-full h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'dateAsc') setSortConfig({ key: 'date', direction: 'asc' });
                  else if (value === 'dateDesc') setSortConfig({ key: 'date', direction: 'desc' });
                  else if (value === 'nameAsc') setSortConfig({ key: 'patientName', direction: 'asc' });
                  else if (value === 'nameDesc') setSortConfig({ key: 'patientName', direction: 'desc' });
                }}
                defaultValue="dateDesc"
              >
                <option value="dateDesc">Date (Latest)</option>
                <option value="dateAsc">Date (Earliest)</option>
                <option value="nameAsc">Patient (A-Z)</option>
                <option value="nameDesc">Patient (Z-A)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <div className="rounded-md border border-navy-100 overflow-hidden shadow-sm">
        <div className="bg-navy-50/80 p-3 grid grid-cols-12 gap-3 font-medium text-navy-700">
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Summary</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Actions</div>
        </div>
        {filteredAndSortedRecords.map((record) => (
          <div 
            key={record.id} 
            className="p-3 grid grid-cols-12 gap-3 items-center border-t border-navy-100 hover:bg-navy-50/30 transition-colors cursor-pointer"
            onClick={() => {}}
          >
            <div className="col-span-3">
              <div className="font-medium text-navy-800 hover:text-lightblue-600 transition-colors">
                {record.patientName}
              </div>
              <div className="text-sm text-navy-500">ID: {record.patientId}</div>
            </div>
            <div className="col-span-2">{new Date(record.date).toLocaleDateString()}</div>
            <div className="col-span-2">{record.type}</div>
            <div className="col-span-3">{record.summary}</div>
            <div className="col-span-1 flex items-center space-x-2">
              <Badge variant={record.status === 'active' ? 'default' : record.status === 'archived' ? 'secondary' : 'destructive'}>
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </Badge>
              {record.alerts && record.alerts.length > 0 && (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
            </div>
            <div className="col-span-1 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300"
                onClick={e => e.stopPropagation()}
                title="View Record"
              >
                <FileText className="h-4 w-4 text-navy-700" />
              </Button>
            </div>
          </div>
        ))}
        {filteredAndSortedRecords.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-navy-500">No records found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorRecords; 