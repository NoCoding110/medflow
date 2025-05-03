import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import {
  Activity, AlertCircle, Calendar, ChevronRight, Clock, FileText, Search, ThermometerIcon, User, HeartPulse, Stethoscope, PlusCircle, History, Brain, TrendingUp, TrendingDown, Minus, AlertTriangle, BarChart2, Sparkles
} from 'lucide-react';
import { toast } from "react-hot-toast";

// Types
interface Symptom {
  id: string;
  patientId: string;
  name: string;
  severity: number;
  duration: string;
  frequency: string;
  lastOccurrence: string;
  status: 'active' | 'improving' | 'resolved';
  notes: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastCheckup: string;
  status: 'stable' | 'monitoring' | 'urgent';
}

interface AnalyticsData {
  totalSymptoms: number;
  avgSeverity: number;
  activeCount: number;
  resolvedCount: number;
  trends: { day: string; value: number; }[];
  comparison: { previous: number; current: number; change: number; trend: 'improved' | 'declined' | 'stable'; };
}

interface AIInsight {
  id: string;
  message: string;
  type: 'trend' | 'recommendation' | 'risk';
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
}

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  type: string;
  timestamp: string;
  patientId: string;
}

const STATUS_COLORS = {
  stable: 'bg-green-100 text-green-800',
  monitoring: 'bg-yellow-100 text-yellow-800',
  urgent: 'bg-red-100 text-red-800'
};

const SEVERITY_COLORS = ['#4ade80', '#fbbf24', '#f87171', '#ef4444', '#dc2626'];

const SymptomsTracker = () => {
  // State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [sortBy, setSortBy] = useState<'date' | 'severity' | 'status'>('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [patientsRes, symptomsRes, analyticsRes, aiRes, alertsRes] = await Promise.all([
          fetch('/api/patients'),
          fetch(`/api/symptoms?timeRange=${timeRange}`),
          fetch(`/api/symptoms/analytics?timeRange=${timeRange}`),
          fetch(`/api/symptoms/insights/ai?timeRange=${timeRange}`),
          fetch(`/api/symptoms/alerts?timeRange=${timeRange}`)
        ]);
        if (!patientsRes.ok || !symptomsRes.ok || !analyticsRes.ok || !aiRes.ok || !alertsRes.ok) {
          throw new Error('Failed to fetch data');
        }
        const [patientsData, symptomsData, analyticsData, aiData, alertsData] = await Promise.all([
          patientsRes.json(),
          symptomsRes.json(),
          analyticsRes.json(),
          aiRes.json(),
          alertsRes.json()
        ]);
        setPatients(patientsData);
        setSelectedPatient(patientsData[0] || null);
        setSymptoms(symptomsData);
        setAnalytics(analyticsData);
        setAiInsights(aiData);
        setAlerts(alertsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  // Filtered and sorted symptoms
  const filteredSymptoms = useMemo(() => {
    let filtered = symptoms;
    if (severityFilter !== 'all') {
      filtered = filtered.filter(s => String(s.severity) === severityFilter);
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.lastOccurrence).getTime() - new Date(a.lastOccurrence).getTime());
        break;
      case 'severity':
        filtered.sort((a, b) => b.severity - a.severity);
        break;
      case 'status':
        const statusOrder = { active: 0, improving: 1, resolved: 2 };
        filtered.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
    }
    return filtered;
  }, [symptoms, severityFilter, statusFilter, sortBy]);

  // Helpers
  const getSeverityColor = (severity: number) => SEVERITY_COLORS[severity - 1] || SEVERITY_COLORS[0];
  const getTrendIcon = (trend: 'increasing' | 'stable' | 'decreasing') => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: '1', label: '1 (Mild)' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5 (Severe)' },
  ];
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'improving', label: 'Improving' },
    { value: 'resolved', label: 'Resolved' },
  ];
  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ];

  if (loading) {
    return <div className="container py-8 text-center text-lg">Loading symptoms data...</div>;
  }
  if (error) {
    return <div className="container py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Symptoms Tracker</h1>
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view symptoms</CardDescription>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent ${
                        selectedPatient?.id === patient.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Avatar>
                        {patient.image ? (
                          <AvatarImage src={patient.image} />
                        ) : (
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{patient.name}</p>
                          <Badge className={STATUS_COLORS[patient.status]}>{patient.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Last checkup: {patient.lastCheckup}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Symptoms Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Symptoms Overview - {selectedPatient.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Age: {selectedPatient.age}</span>
                    <span>•</span>
                    <span>Last checkup: {selectedPatient.lastCheckup}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {severityOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRanges.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Analytics Overview */}
              {analytics && (
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Symptoms</CardTitle>
                      <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalSymptoms}</div>
                      <p className="text-xs text-muted-foreground">symptoms tracked</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Severity</CardTitle>
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.avgSeverity.toFixed(1)}</div>
                      <p className="text-xs text-muted-foreground">
                        {analytics.comparison.change > 0 ? '+' : ''}{analytics.comparison.change}% from previous
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Status Distribution</CardTitle>
                      <BarChart2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Active</span>
                          <span>{analytics.activeCount}</span>
                        </div>
                        <Progress value={(analytics.activeCount / analytics.totalSymptoms) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span>Resolved</span>
                          <span>{analytics.resolvedCount}</span>
                        </div>
                        <Progress value={(analytics.resolvedCount / analytics.totalSymptoms) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Trend Analysis</CardTitle>
                      <LineChart className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {analytics.comparison.current}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getTrendIcon(
                          (analytics.comparison.trend === 'improved'
                            ? 'decreasing'
                            : analytics.comparison.trend === 'declined'
                            ? 'increasing'
                            : 'stable') as 'increasing' | 'stable' | 'decreasing'
                        )}
                        <span>
                          {analytics.comparison.trend === 'improved' ? 'Improved' : 
                            analytics.comparison.trend === 'declined' ? 'Declined' : 'Stable'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* AI Insights and Alerts */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-indigo-500" />
                      AI Insights
                    </CardTitle>
                    <CardDescription>Smart analysis and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {aiInsights.length > 0 ? aiInsights.map((insight) => (
                          <div key={insight.id} className="p-4 border rounded-lg bg-muted">
                            <div className="flex items-start gap-3">
                              {insight.type === 'trend' && <TrendingUp className="h-4 w-4 text-blue-500" />}
                              {insight.type === 'recommendation' && <Sparkles className="h-4 w-4 text-indigo-500" />}
                              {insight.type === 'risk' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                              <div className="flex-1">
                                <p className="text-sm">{insight.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(insight.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="text-muted-foreground text-sm">No AI insights available.</div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Alerts
                    </CardTitle>
                    <CardDescription>Critical and warning items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {alerts.length > 0 ? alerts.map((alert) => (
                          <div key={alert.id} className={`p-4 border rounded-lg ${getStatusColor(alert.severity)}`}>
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-4 w-4" />
                              <div className="flex-1">
                                <h4 className="font-medium">{alert.title}</h4>
                                <p className="text-sm text-muted-foreground">{alert.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(alert.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="text-muted-foreground text-sm">No alerts.</div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Symptoms Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Symptoms Trends</CardTitle>
                  <CardDescription>Track symptom trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics?.trends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="day" 
                        tickFormatter={d => new Date(d).toLocaleDateString()} 
                      />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value: number) => [value, 'Severity']}
                        labelFormatter={d => new Date(d).toLocaleString()}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        name="Severity" 
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Symptoms */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Symptoms</CardTitle>
                  <CardDescription>Latest recorded symptoms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSymptoms.map((symptom) => (
                      <div key={symptom.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Stethoscope className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{symptom.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Duration: {symptom.duration} • Frequency: {symptom.frequency}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge
                              className={`$ {
                                symptom.status === 'active'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : symptom.status === 'improving'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {symptom.status}
                            </Badge>
                            <div className="flex items-center gap-1 mt-1 justify-end">
                              <span className="text-sm text-muted-foreground">Severity: </span>
                              <span className="font-medium" style={{ color: getSeverityColor(symptom.severity) }}>
                                {symptom.severity}/5
                              </span>
                              {getTrendIcon(symptom.trend)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomsTracker; 