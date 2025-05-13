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
  Sparkles, AlertTriangle, LineChart as LineChartIcon, BarChart2, Plus
} from "lucide-react";
import { toast } from "react-hot-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PatientSelector from '@/components/PatientSelector';
import AIInsightsPanel from '@/components/AIInsightsPanel';
import { getVitals, VitalsRecord } from '@/lib/mock/healthMockData';

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastActive: string;
  status: 'stable' | 'warning' | 'critical';
}

interface AIInsight {
  type: 'trend' | 'recommendation' | 'risk';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
}

interface Alert {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  patientId: string;
}

interface VitalsData extends VitalsRecord {
  status: 'normal' | 'warning' | 'critical';
  trend: 'improved' | 'declined' | 'stable';
  type: string;
}

interface AnalyticsData {
  totalReadings: number;
  avgHeartRate: number;
  avgBloodPressure: {
    systolic: number;
    diastolic: number;
  };
  avgTemperature: number;
  avgOxygenSaturation: number;
  trends: {
    day: string;
    heartRate: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    temperature: number;
    oxygenSaturation: number;
  }[];
  comparison: {
    previous: number;
    current: number;
    change: number;
    trend: 'improved' | 'declined' | 'stable';
  };
}

const VitalsTracker = () => {
  // State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [vitalsData, setVitalsData] = useState<VitalsData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [sortBy, setSortBy] = useState<'date' | 'value' | 'status'>('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [trendFilter, setTrendFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Initialize mock data
  const mockPatients: Patient[] = [
    {
      id: 'patient1',
      name: 'John Doe',
      age: 45,
      lastActive: new Date().toISOString(),
      status: 'stable'
    }
  ];

  const mockVitals: VitalsData[] = [
    {
      id: 'vital1',
      patient_id: 'patient1',
      recorded_at: new Date().toISOString(),
      heart_rate: 75,
      blood_pressure_systolic: 120,
      blood_pressure_diastolic: 80,
      temperature: 37.0,
      oxygen_saturation: 98,
      status: 'normal',
      trend: 'stable',
      type: 'vitals'
    }
  ];

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call with mock data
        setPatients(mockPatients);
        setVitalsData(mockVitals);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to determine vital status
  const getVitalStatus = (vital: VitalsRecord): 'normal' | 'warning' | 'critical' => {
    if (vital.heart_rate > 100 || vital.heart_rate < 60) return 'warning';
    if (vital.blood_pressure_systolic > 140 || vital.blood_pressure_diastolic > 90) return 'warning';
    if (vital.temperature > 100.4) return 'warning';
    if (vital.oxygen_saturation < 95) return 'warning';
    return 'normal';
  };

  // Helper function to determine vital trend
  const getVitalTrend = (vital: VitalsRecord): 'improved' | 'declined' | 'stable' => {
    // Mock trend calculation
    return 'stable';
  };

  // Helper function to calculate analytics
  const calculateAnalytics = (data: VitalsData[]): AnalyticsData => {
    const totalReadings = data.length;
    const avgHeartRate = data.reduce((acc, curr) => acc + curr.heart_rate, 0) / totalReadings;
    const avgBloodPressure = {
      systolic: data.reduce((acc, curr) => acc + curr.blood_pressure_systolic, 0) / totalReadings,
      diastolic: data.reduce((acc, curr) => acc + curr.blood_pressure_diastolic, 0) / totalReadings
    };
    const avgTemperature = data.reduce((acc, curr) => acc + curr.temperature, 0) / totalReadings;
    const avgOxygenSaturation = data.reduce((acc, curr) => acc + curr.oxygen_saturation, 0) / totalReadings;

    // Calculate trends
    const trends = data.map(v => ({
      day: new Date(v.recorded_at).toISOString().split('T')[0],
      heartRate: v.heart_rate,
      bloodPressureSystolic: v.blood_pressure_systolic,
      bloodPressureDiastolic: v.blood_pressure_diastolic,
      temperature: v.temperature,
      oxygenSaturation: v.oxygen_saturation
    }));

    // Calculate comparison with previous period
    const currentPeriod = data.slice(0, Math.floor(data.length / 2));
    const previousPeriod = data.slice(Math.floor(data.length / 2));
    const currentAvg = currentPeriod.reduce((acc, curr) => acc + curr.heart_rate, 0) / currentPeriod.length;
    const previousAvg = previousPeriod.reduce((acc, curr) => acc + curr.heart_rate, 0) / previousPeriod.length;
    const change = ((currentAvg - previousAvg) / previousAvg) * 100;

    const trend: 'improved' | 'declined' | 'stable' = 
      change > 5 ? 'improved' : 
      change < -5 ? 'declined' : 
      'stable';

    return {
      totalReadings,
      avgHeartRate,
      avgBloodPressure,
      avgTemperature,
      avgOxygenSaturation,
      trends,
      comparison: {
        previous: previousAvg,
        current: currentAvg,
        change,
        trend
      }
    };
  };

  // Filtered and sorted vitals
  const filteredVitals = useMemo(() => {
    let filtered = vitalsData;
    
    if (selectedPatient) {
      filtered = filtered.filter(vital => vital.patient_id === selectedPatient.id);
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(vital => vital.type === typeFilter);
    }
    
    if (statusFilter) {
      filtered = filtered.filter(vital => vital.status === statusFilter);
    }
    
    if (trendFilter) {
      filtered = filtered.filter(vital => vital.trend === trendFilter);
    }
    
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => {
          const dateA = new Date(a.recorded_at).getTime();
          const dateB = new Date(b.recorded_at).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        break;
      case 'value':
        filtered.sort((a, b) => b.heart_rate - a.heart_rate);
        break;
      case 'status':
        const statusOrder = { critical: 0, warning: 1, normal: 2 };
        filtered.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
    }
    
    return filtered;
  }, [vitalsData, selectedPatient, typeFilter, sortBy, statusFilter, trendFilter, sortOrder]);

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
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient Selector */}
        <PatientSelector
          patients={patients.map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            lastActivity: p.lastActive,
            image: p.image,
          }))}
          selectedPatientId={selectedPatient?.id || null}
          onSelect={id => setSelectedPatient(patients.find(p => p.id === id) || null)}
        />

        {/* Vitals Dashboard */}
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search vitals..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-[200px]"
              />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {vitalTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Reading
            </Button>
          </div>

          {/* Analytics Overview */}
          {analytics && (
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Readings</CardTitle>
                  <Activity className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalReadings}</div>
                  <p className="text-xs text-muted-foreground">vitals recorded</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Heart Rate</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.avgHeartRate.toFixed(0)}</div>
                  <p className="text-xs text-muted-foreground">
                    {analytics.comparison.change > 0 ? '+' : ''}{analytics.comparison.change}% from previous
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Blood Pressure</CardTitle>
                  <Activity className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics.avgBloodPressure.systolic}/{analytics.avgBloodPressure.diastolic}
                  </div>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
                  <Thermometer className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.avgTemperature.toFixed(1)}°F</div>
                  <p className="text-xs text-muted-foreground">body temperature</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Vitals Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Vitals Trends</CardTitle>
              <CardDescription>Track vital signs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.trends || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="Heart Rate" dot={false} />
                  <Line type="monotone" dataKey="bloodPressureSystolic" stroke="#3b82f6" name="Systolic" dot={false} />
                  <Line type="monotone" dataKey="bloodPressureDiastolic" stroke="#3b82f6" name="Diastolic" dot={false} />
                  <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temperature" dot={false} />
                  <Line type="monotone" dataKey="oxygenSaturation" stroke="#22c55e" name="O2 Saturation" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Readings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Readings</CardTitle>
              <CardDescription>Latest vital sign measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredVitals.map(vital => (
                    <div key={vital.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <Heart className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <div className="font-medium">Heart Rate</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(vital.recorded_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{vital.heart_rate} BPM</div>
                          <div className="text-sm text-muted-foreground">
                            BP: {vital.blood_pressure_systolic}/{vital.blood_pressure_diastolic}
                          </div>
                        </div>
                        <Badge className={getStatusColor(vital.status)}>
                          {vital.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <AIInsightsPanel
            patient={{ id: selectedPatient?.id || '', name: selectedPatient?.name || '' }}
            module="vitals"
            data={{
              vitals: selectedPatient,
              analytics,
              aiInsights,
              alerts
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VitalsTracker;
