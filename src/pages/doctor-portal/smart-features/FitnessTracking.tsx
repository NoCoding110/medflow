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

interface FitnessData {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastActive: string;
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

interface AnalyticsData {
  totalPatients: number;
  avgSteps: number;
  avgCalories: number;
  mostActiveDay: string;
  leastActiveDay: string;
}

interface AIInsight {
  message: string;
  type: 'trend' | 'recommendation' | 'risk';
}

interface Alert {
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

const FitnessTracking = () => {
  // State
  const [fitnessData, setFitnessData] = useState<FitnessData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<FitnessData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'steps' | 'calories'>('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch('/api/fitness').then(r => r.json()),
      fetch('/api/fitness/analytics').then(r => r.json()),
      fetch('/api/fitness/insights/ai').then(r => r.json()),
      fetch('/api/fitness/alerts').then(r => r.json()),
    ])
      .then(([fitness, analytics, ai, alerts]) => {
        setFitnessData(fitness);
        setAnalytics(analytics);
        setAIInsights(ai);
        setAlerts(alerts);
        setSelectedPatient(fitness[0] || null);
      })
      .catch(() => setError('Failed to load fitness data.'))
      .finally(() => setLoading(false));
  }, []);

  // Filtering and sorting
  const filteredPatients = useMemo(() => {
    let filtered = fitnessData.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'steps') {
      filtered = filtered.sort((a, b) => b.weeklyOverview.averageSteps - a.weeklyOverview.averageSteps);
    } else if (sortBy === 'calories') {
      filtered = filtered.sort((a, b) => b.weeklyOverview.caloriesBurned - a.weeklyOverview.caloriesBurned);
    }
    return filtered;
  }, [fitnessData, searchQuery, sortBy]);

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
          patients={fitnessData.map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            lastActivity: p.lastActive,
            image: p.image,
          }))}
          selectedPatientId={selectedPatient?.id || null}
          onSelect={id => setSelectedPatient(fitnessData.find(p => p.id === id) || null)}
        />

        {/* Fitness Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <AIInsightsPanel
                patient={{ id: selectedPatient.id, name: selectedPatient.name }}
                module="fitness"
                data={selectedPatient}
              />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Weekly Overview - {selectedPatient.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Age: {selectedPatient.age}</span>
                    <span>•</span>
                    <span>Last active: {selectedPatient.lastActive}</span>
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
  );
};

export default FitnessTracking;
