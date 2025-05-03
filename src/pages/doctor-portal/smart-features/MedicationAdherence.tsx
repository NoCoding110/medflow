import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Search, User, Pill, Calendar, Clock, AlertTriangle, CheckCircle2, XCircle, Bell, TrendingUp, TrendingDown, Minus, BarChart2, Sparkles
} from 'lucide-react';
import { toast } from "react-hot-toast";

// Types
interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastUpdate: string;
  status: 'compliant' | 'partial' | 'non-compliant';
}

interface MedicationEntry {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string;
  adherenceRate: number;
  lastTaken: string;
  status: 'taken' | 'missed' | 'upcoming';
}

interface AnalyticsData {
  totalMedications: number;
  avgAdherence: number;
  compliantCount: number;
  partialCount: number;
  nonCompliantCount: number;
  trends: { day: string; adherence: number; }[];
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
  compliant: 'bg-green-100 text-green-800',
  partial: 'bg-yellow-100 text-yellow-800',
  'non-compliant': 'bg-red-100 text-red-800'
};

const MEDICATION_STATUS_COLORS = {
  taken: 'text-green-500',
  missed: 'text-red-500',
  upcoming: 'text-blue-500'
};

const CHART_COLORS = ['#22c55e', '#ef4444', '#f59e0b'];

const MedicationAdherence = () => {
  // State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [sortBy, setSortBy] = useState<'date' | 'adherence' | 'status'>('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [patientsRes, medsRes, analyticsRes, aiRes, alertsRes] = await Promise.all([
          fetch('/api/patients'),
          fetch(`/api/medications?timeRange=${timeRange}`),
          fetch(`/api/medications/analytics?timeRange=${timeRange}`),
          fetch(`/api/medications/insights/ai?timeRange=${timeRange}`),
          fetch(`/api/medications/alerts?timeRange=${timeRange}`)
        ]);
        if (!patientsRes.ok || !medsRes.ok || !analyticsRes.ok || !aiRes.ok || !alertsRes.ok) {
          throw new Error('Failed to fetch data');
        }
        const [patientsData, medsData, analyticsData, aiData, alertsData] = await Promise.all([
          patientsRes.json(),
          medsRes.json(),
          analyticsRes.json(),
          aiRes.json(),
          alertsRes.json()
        ]);
        setPatients(patientsData);
        setSelectedPatient(patientsData[0] || null);
        setMedications(medsData);
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

  // Filtered and sorted medications
  const filteredMeds = useMemo(() => {
    let filtered = medications;
    if (selectedPatient) {
      filtered = filtered.filter(med => med.patientId === selectedPatient.id);
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(med => med.status === statusFilter);
    }
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.lastTaken).getTime() - new Date(a.lastTaken).getTime());
        break;
      case 'adherence':
        filtered.sort((a, b) => b.adherenceRate - a.adherenceRate);
        break;
      case 'status':
        const statusOrder = { taken: 0, upcoming: 1, missed: 2 };
        filtered.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
    }
    return filtered;
  }, [medications, selectedPatient, statusFilter, sortBy]);

  // Helpers
  const getMedicationStatusIcon = (status: 'taken' | 'missed' | 'upcoming') => {
    switch (status) {
      case 'taken':
        return <CheckCircle2 className={`h-5 w-5 ${MEDICATION_STATUS_COLORS[status]}`} />;
      case 'missed':
        return <XCircle className={`h-5 w-5 ${MEDICATION_STATUS_COLORS[status]}`} />;
      case 'upcoming':
        return <Bell className={`h-5 w-5 ${MEDICATION_STATUS_COLORS[status]}`} />;
    }
  };
  const getStatusColor = (status: 'compliant' | 'partial' | 'non-compliant') => STATUS_COLORS[status];
  const getAlertStatusColor = (severity: 'info' | 'warning' | 'critical') => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };
  const getTrendIcon = (trend: 'improved' | 'declined' | 'stable') => {
    switch (trend) {
      case 'improved':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'declined':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'taken', label: 'Taken' },
    { value: 'missed', label: 'Missed' },
    { value: 'upcoming', label: 'Upcoming' },
  ];
  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ];

  if (loading) {
    return <div className="container py-8 text-center text-lg">Loading medication adherence data...</div>;
  }
  if (error) {
    return <div className="container py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Medication Adherence Tracker</h1>
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view medication adherence</CardDescription>
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
                          <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Last update: {patient.lastUpdate}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Medication Adherence Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Adherence Overview - {selectedPatient.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Age: {selectedPatient.age}</span>
                    <span>•</span>
                    <span>Last update: {selectedPatient.lastUpdate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
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
                      <CardTitle className="text-sm font-medium">Total Medications</CardTitle>
                      <Pill className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalMedications}</div>
                      <p className="text-xs text-muted-foreground">medications tracked</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Adherence</CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.avgAdherence.toFixed(1)}%</div>
                      <p className="text-xs text-muted-foreground">
                        {analytics.comparison.change > 0 ? '+' : ''}{analytics.comparison.change}% from previous
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Status Distribution</CardTitle>
                      <BarChart2 className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Compliant</span>
                          <span>{analytics.compliantCount}</span>
                        </div>
                        <Progress value={(analytics.compliantCount / analytics.totalMedications) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span>Partial</span>
                          <span>{analytics.partialCount}</span>
                        </div>
                        <Progress value={(analytics.partialCount / analytics.totalMedications) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span>Non-compliant</span>
                          <span>{analytics.nonCompliantCount}</span>
                        </div>
                        <Progress value={(analytics.nonCompliantCount / analytics.totalMedications) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Trend Analysis</CardTitle>
                      <LineChart className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {analytics.comparison.current}%
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getTrendIcon(analytics.comparison.trend)}
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
                          <div key={alert.id} className={`p-4 border rounded-lg ${getAlertStatusColor(alert.severity)}`}>
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

              {/* Adherence Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Adherence Trends</CardTitle>
                  <CardDescription>Track adherence over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics?.trends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="adherence" stroke="#8884d8" name="Adherence" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Medications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Medications</CardTitle>
                  <CardDescription>Latest medication events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMeds.map((med) => (
                      <div key={med.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            {getMedicationStatusIcon(med.status)}
                          </div>
                          <div>
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {med.dosage} • {med.frequency} • {med.timeOfDay}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{med.adherenceRate}%</p>
                            <p className="text-xs text-muted-foreground">Last taken: {med.lastTaken}</p>
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

export default MedicationAdherence;
