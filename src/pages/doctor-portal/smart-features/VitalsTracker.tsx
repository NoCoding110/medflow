import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Thermometer, Heart, Activity, Search, AlertCircle, TrendingUp, TrendingDown, 
  Minus, Brain, Calendar, Droplet, User, ChevronRight, Target, Clock, 
  Sparkles, AlertTriangle, LineChart as LineChartIcon, BarChart2
} from "lucide-react";
import { toast } from "react-hot-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AIInsightsBox from '@/components/AIInsightsBox';

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastActive: string;
}

interface VitalsEntry {
  id: string;
  patientId: string;
  type: string;
  value: number;
  recordedAt: string;
  status: 'normal' | 'warning' | 'critical';
  deviceType?: string;
  notes?: string;
}

interface AnalyticsData {
  totalEntries: number;
  avgValue: number;
  minValue: number;
  maxValue: number;
  normalCount: number;
  warningCount: number;
  criticalCount: number;
  trends: {
    day: string;
    value: number;
  }[];
  comparison: {
    previous: number;
    current: number;
    change: number;
    trend: 'improved' | 'declined' | 'stable';
  };
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

const VitalsTracker = () => {
  // State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [vitalsData, setVitalsData] = useState<VitalsEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [sortBy, setSortBy] = useState<'date' | 'value' | 'status'>('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [patientsRes, vitalsRes, analyticsRes, aiRes, alertsRes] = await Promise.all([
          fetch('/api/patients'),
          fetch(`/api/vitals?type=${typeFilter}&timeRange=${timeRange}`),
          fetch(`/api/vitals/analytics?type=${typeFilter}&timeRange=${timeRange}`),
          fetch(`/api/vitals/insights/ai?type=${typeFilter}&timeRange=${timeRange}`),
          fetch(`/api/vitals/alerts?type=${typeFilter}&timeRange=${timeRange}`)
        ]);

        if (!patientsRes.ok || !vitalsRes.ok || !analyticsRes.ok || !aiRes.ok || !alertsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [patientsData, vitalsData, analyticsData, aiData, alertsData] = await Promise.all([
          patientsRes.json(),
          vitalsRes.json(),
          analyticsRes.json(),
          aiRes.json(),
          alertsRes.json()
        ]);

        setPatients(patientsData);
        setSelectedPatient(patientsData[0] || null);
        setVitalsData(vitalsData);
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
  }, [typeFilter, timeRange]);

  // Filtered and sorted vitals
  const filteredVitals = useMemo(() => {
    let filtered = vitalsData;
    
    if (selectedPatient) {
      filtered = filtered.filter(vital => vital.patientId === selectedPatient.id);
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(vital => vital.type === typeFilter);
    }
    
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());
        break;
      case 'value':
        filtered.sort((a, b) => b.value - a.value);
        break;
      case 'status':
        const statusOrder = { critical: 0, warning: 1, normal: 2 };
        filtered.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
    }
    
    return filtered;
  }, [vitalsData, selectedPatient, typeFilter, sortBy]);

  // Helpers
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

  const getTrendIcon = (trend: 'improved' | 'declined' | 'stable') => {
    switch (trend) {
      case 'improved':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declined':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const vitalTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'temperature', label: 'Temperature' },
    { value: 'heartRate', label: 'Heart Rate' },
    { value: 'bloodPressure', label: 'Blood Pressure' },
    { value: 'spO2', label: 'Oxygen Level' },
    { value: 'bloodGlucose', label: 'Blood Glucose' },
  ];

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ];

  if (loading) {
    return <div className="container py-8 text-center text-lg">Loading vitals data...</div>;
  }

  if (error) {
    return <div className="container py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Vitals Tracker</h1>
      <AIInsightsBox />
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view their vitals</CardDescription>
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
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {patient.lastActive}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Vitals Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedPatient.name}'s Vitals</h2>
                  <p className="text-muted-foreground">Age: {selectedPatient.age}</p>
                </div>
                <div className="flex gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vitalTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRanges.map(range => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
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
                      <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                      <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalEntries}</div>
                      <p className="text-xs text-muted-foreground">vitals recorded</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Value</CardTitle>
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.avgValue.toFixed(1)}</div>
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
                          <span>Normal</span>
                          <span>{analytics.normalCount}</span>
                        </div>
                        <Progress value={(analytics.normalCount / analytics.totalEntries) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span>Warning</span>
                          <span>{analytics.warningCount}</span>
                        </div>
                        <Progress value={(analytics.warningCount / analytics.totalEntries) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span>Critical</span>
                          <span>{analytics.criticalCount}</span>
                        </div>
                        <Progress value={(analytics.criticalCount / analytics.totalEntries) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Trend Analysis</CardTitle>
                      <LineChartIcon className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {analytics.comparison.current}
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

              {/* Vitals Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Vitals Trends</CardTitle>
                  <CardDescription>Track selected vital over time</CardDescription>
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
                        formatter={(value: number) => [value, 'Value']}
                        labelFormatter={d => new Date(d).toLocaleString()}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        name="Value" 
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Vitals */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Vitals</CardTitle>
                  <CardDescription>Latest recorded measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredVitals.map((vital) => (
                      <div key={vital.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            {vital.type === 'temperature' && <Thermometer className="h-4 w-4 text-primary" />}
                            {vital.type === 'heartRate' && <Heart className="h-4 w-4 text-primary" />}
                            {vital.type === 'bloodPressure' && <Activity className="h-4 w-4 text-primary" />}
                            {vital.type === 'spO2' && <Droplet className="h-4 w-4 text-primary" />}
                            {vital.type === 'bloodGlucose' && <Activity className="h-4 w-4 text-primary" />}
                          </div>
                          <div>
                            <p className="font-medium capitalize">{vital.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(vital.recordedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{vital.value}</p>
                            <Badge className={getStatusColor(vital.status)}>
                              {vital.status}
                            </Badge>
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

export default VitalsTracker;
