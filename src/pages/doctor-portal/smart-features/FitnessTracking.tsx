import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import {
  Activity,
  Heart,
  Footprints,
  Timer,
  Calendar,
  Clock,
  Flame,
  Search,
  User,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Dumbbell,
  Timer as TimerIcon,
  Target,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { PatientSelector } from '@/components/PatientSelector';
import AIInsightsPanel from '@/components/AIInsightsPanel';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastActivity: string;
  weeklyOverview: {
    averageSteps: number;
    activeDays: string;
    totalDistance: number;
    caloriesBurned: number;
    stepsGoal: number;
    distanceGoal: number;
    caloriesGoal: number;
  };
  activityTrend: Array<{
    day: string;
    steps: number;
    calories: number;
    distance: number;
    activeMinutes: number;
  }>;
  workouts: Array<{
    type: string;
    duration: number;
    calories: number;
    date: string;
  }>;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'active' | 'inactive' | 'needs-attention';
}

interface FitnessEntry {
  id: string;
  patientId: string;
  recordedAt: string;
  type: string;
  value: number;
  status: 'normal' | 'warning' | 'critical';
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
  type: string;
  severity: 'warning' | 'critical' | 'info';
  timestamp: string;
}

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'warning' | 'critical' | 'info';
  type: string;
  timestamp: string;
  patientId: string;
}

const FitnessTracking = () => {
  // State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [fitnessData, setFitnessData] = useState<FitnessEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'steps' | 'calories'>('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch patients
        const { data: patientsData, error: patientsError } = await supabase
          .from('patients')
          .select('*');

        if (patientsError) throw patientsError;

        // Transform patients data to match the interface
        const transformedPatients = patientsData.map(patient => ({
          ...patient,
          lastActivity: patient.lastActive
        }));

        // Fetch fitness data
        const { data: fitnessData, error: fitnessError } = await supabase
          .from('fitness')
          .select('*')
          .eq('type', typeFilter)
          .gte('recordedAt', new Date(Date.now() - getTimeRangeInMs(timeRange)).toISOString());

        if (fitnessError) throw fitnessError;

        // Calculate analytics
        const analyticsData = calculateAnalytics(fitnessData);

        // Generate AI insights
        const aiData = generateAIInsights(fitnessData);

        // Generate alerts
        const alertsData = generateAlerts(fitnessData);

        setPatients(transformedPatients);
        setSelectedPatient(transformedPatients[0] || null);
        setFitnessData(fitnessData);
        setAnalytics(analyticsData);
        setAIInsights(aiData);
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

  // Helper function to convert timeRange to milliseconds
  const getTimeRangeInMs = (range: string) => {
    switch (range) {
      case '24h':
        return 24 * 60 * 60 * 1000;
      case '7d':
        return 7 * 24 * 60 * 60 * 1000;
      case '30d':
        return 30 * 24 * 60 * 60 * 1000;
      case '90d':
        return 90 * 24 * 60 * 60 * 1000;
      default:
        return 7 * 24 * 60 * 60 * 1000;
    }
  };

  // Helper function to calculate analytics
  const calculateAnalytics = (data: FitnessEntry[]): AnalyticsData => {
    const totalEntries = data.length;
    const avgValue = data.reduce((acc, curr) => acc + curr.value, 0) / totalEntries;
    const minValue = Math.min(...data.map(v => v.value));
    const maxValue = Math.max(...data.map(v => v.value));
    const normalCount = data.filter(v => v.status === 'normal').length;
    const warningCount = data.filter(v => v.status === 'warning').length;
    const criticalCount = data.filter(v => v.status === 'critical').length;

    // Calculate trends
    const trends = data.map(v => ({
      day: new Date(v.recordedAt).toISOString().split('T')[0],
      value: v.value
    }));

    // Calculate comparison with previous period
    const currentPeriod = data.slice(0, Math.floor(data.length / 2));
    const previousPeriod = data.slice(Math.floor(data.length / 2));
    const currentAvg = currentPeriod.reduce((acc, curr) => acc + curr.value, 0) / currentPeriod.length;
    const previousAvg = previousPeriod.reduce((acc, curr) => acc + curr.value, 0) / previousPeriod.length;
    const change = ((currentAvg - previousAvg) / previousAvg) * 100;

    const trend: 'improved' | 'declined' | 'stable' = 
      change > 5 ? 'improved' : 
      change < -5 ? 'declined' : 
      'stable';

    return {
      totalEntries,
      avgValue,
      minValue,
      maxValue,
      normalCount,
      warningCount,
      criticalCount,
      trends,
      comparison: {
        previous: previousAvg,
        current: currentAvg,
        change,
        trend
      }
    };
  };

  // Helper function to generate AI insights
  const generateAIInsights = (data: FitnessEntry[]): AIInsight[] => {
    const insights: AIInsight[] = [];
    const recent = data.slice(0, 10);

    recent.forEach(fitness => {
      if (fitness.type === 'steps' && fitness.value < 5000) {
        insights.push({
          id: `steps-${fitness.id}`,
          message: 'Low step count detected. Consider increasing daily activity.',
          type: 'risk',
          severity: 'warning',
          timestamp: fitness.recordedAt
        });
      }
      if (fitness.type === 'heartRate' && (fitness.value < 50 || fitness.value > 110)) {
        insights.push({
          id: `hr-${fitness.id}`,
          message: 'Abnormal heart rate during exercise. Monitor intensity.',
          type: 'risk',
          severity: 'warning',
          timestamp: fitness.recordedAt
        });
      }
      if (fitness.type === 'caloriesBurned' && fitness.value < 200) {
        insights.push({
          id: `cal-${fitness.id}`,
          message: 'Low calorie burn. Consider increasing workout intensity.',
          type: 'risk',
          severity: 'warning',
          timestamp: fitness.recordedAt
        });
      }
    });

    return insights;
  };

  // Helper function to generate alerts
  const generateAlerts = (data: FitnessEntry[]): Alert[] => {
    return data
      .filter(fitness => fitness.status === 'warning' || fitness.status === 'critical')
      .map(fitness => ({
        id: fitness.id,
        title: `${fitness.type} Alert`,
        description: `${fitness.type} is ${fitness.status}. Current value: ${fitness.value}`,
        severity: fitness.status === 'normal' ? 'info' : fitness.status as 'warning' | 'critical',
        type: fitness.type,
        timestamp: fitness.recordedAt,
        patientId: fitness.patientId
      }));
  };

  // Filtered and sorted fitness entries
  const filteredFitness = useMemo(() => {
    if (!fitnessData) return [];
    return fitnessData
      .filter(entry => {
        const matchesPatient = !selectedPatient || entry.patientId === selectedPatient.id;
        const matchesType = !typeFilter || entry.type === typeFilter;
        return matchesPatient && matchesType;
      })
      .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());
  }, [fitnessData, selectedPatient, typeFilter]);

  // Helpers
  const getStatusColor = (status: 'active' | 'inactive' | 'needs-attention') => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'needs-attention':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getFitnessLevelColor = (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'Advanced':
        return 'bg-indigo-100 text-indigo-800';
    }
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  // Loading/Error states
  if (loading) {
    return <div className="container py-8 text-center text-lg">Loading fitness data...</div>;
  }
  if (error) {
    return <div className="container py-8 text-center text-red-500">{error}</div>;
  }
  if (!selectedPatient) {
    return <div className="container py-8 text-center text-muted-foreground">No patient data available.</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient Selector */}
        <PatientSelector
          patients={patients}
          selectedPatientId={selectedPatient?.id || null}
          onSelect={id => setSelectedPatient(patients.find(p => p.id === id) || null)}
        />

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select
            value={typeFilter}
            onValueChange={setTypeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="steps">Steps</SelectItem>
              <SelectItem value="heartRate">Heart Rate</SelectItem>
              <SelectItem value="caloriesBurned">Calories Burned</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Patient Selector */}
          <PatientSelector
            patients={patients}
            selectedPatientId={selectedPatient?.id || null}
            onSelect={id => setSelectedPatient(patients.find(p => p.id === id) || null)}
          />

          {/* Filters */}
          <div className="flex items-center gap-4">
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="steps">Steps</SelectItem>
                <SelectItem value="heartRate">Heart Rate</SelectItem>
                <SelectItem value="caloriesBurned">Calories Burned</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fitness Dashboard */}
          <div className="space-y-6">
            {selectedPatient && (
              <>
                <AIInsightsPanel
                  patient={{ id: selectedPatient.id, name: selectedPatient.name }}
                  module="fitness"
                  data={{
                    fitness: selectedPatient,
                    analytics,
                    aiInsights,
                    alerts
                  }}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Weekly Overview - {selectedPatient.name}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>Age: {selectedPatient.age}</span>
                      <span>•</span>
                      <span>Last active: {selectedPatient.lastActivity}</span>
                      <span>•</span>
                      <Badge className={getFitnessLevelColor(selectedPatient.fitnessLevel)}>
                        {selectedPatient.fitnessLevel}
                      </Badge>
                    </div>
                  </div>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Training
                  </Button>
                </div>

                {/* Key Metrics */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Steps</CardTitle>
                      <Footprints className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">{selectedPatient.weeklyOverview.averageSteps}</div>
                        <p className="text-xs text-muted-foreground">per day</p>
                        <Progress 
                          value={calculateProgress(
                            selectedPatient.weeklyOverview.averageSteps,
                            selectedPatient.weeklyOverview.stepsGoal
                          )} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Goal: {selectedPatient.weeklyOverview.stepsGoal} steps
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Days</CardTitle>
                      <Activity className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">{selectedPatient.weeklyOverview.activeDays}</div>
                        <p className="text-xs text-muted-foreground">days this week</p>
                        <Progress 
                          value={(parseInt(selectedPatient.weeklyOverview.activeDays.split('/')[0]) / 7) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">Goal: 7 days</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Distance</CardTitle>
                      <Target className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">{selectedPatient.weeklyOverview.totalDistance}km</div>
                        <p className="text-xs text-muted-foreground">total distance</p>
                        <Progress 
                          value={calculateProgress(
                            selectedPatient.weeklyOverview.totalDistance,
                            selectedPatient.weeklyOverview.distanceGoal
                          )} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Goal: {selectedPatient.weeklyOverview.distanceGoal}km
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Calories</CardTitle>
                      <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">{selectedPatient.weeklyOverview.caloriesBurned}</div>
                        <p className="text-xs text-muted-foreground">kcal burned</p>
                        <Progress 
                          value={calculateProgress(
                            selectedPatient.weeklyOverview.caloriesBurned,
                            selectedPatient.weeklyOverview.caloriesGoal
                          )} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Goal: {selectedPatient.weeklyOverview.caloriesGoal} kcal
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity Trend</CardTitle>
                    <CardDescription>Daily activity metrics for the past week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="steps">
                      <TabsList>
                        <TabsTrigger value="steps">Steps</TabsTrigger>
                        <TabsTrigger value="calories">Calories</TabsTrigger>
                        <TabsTrigger value="distance">Distance</TabsTrigger>
                        <TabsTrigger value="active">Active Minutes</TabsTrigger>
                      </TabsList>
                      <TabsContent value="steps" className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedPatient.activityTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="steps" stroke="#3b82f6" />
                          </LineChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      <TabsContent value="calories" className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedPatient.activityTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="calories" stroke="#f97316" />
                          </LineChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      <TabsContent value="distance" className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedPatient.activityTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="distance" stroke="#8b5cf6" />
                          </LineChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      <TabsContent value="active" className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedPatient.activityTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="activeMinutes" stroke="#10b981" />
                          </LineChart>
                        </ResponsiveContainer>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Recent Workouts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Workouts</CardTitle>
                    <CardDescription>Latest exercise sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.workouts.map((workout, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <Dumbbell className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{workout.type}</p>
                              <p className="text-sm text-muted-foreground">{workout.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium">{workout.duration} min</p>
                              <p className="text-sm text-muted-foreground">Duration</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{workout.calories}</p>
                              <p className="text-sm text-muted-foreground">Calories</p>
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
    </div>
  );
};

export default FitnessTracking;
