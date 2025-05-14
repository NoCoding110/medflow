import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import {
  Search, User, Target, Trophy, Clock, TrendingUp, CheckCircle2, Timer, Calendar, Activity, TrendingDown, Minus, BarChart2, Sparkles, AlertTriangle
} from 'lucide-react';
import { toast } from "react-hot-toast";
import { PatientSelector } from '@/components/PatientSelector';
import AIInsightsPanel from '@/components/AIInsightsPanel';

// Types
interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastUpdate: string;
  status: 'active' | 'review-needed' | 'completed';
}

interface GoalEntry {
  id: string;
  patientId: string;
  title: string;
  category: 'health' | 'fitness' | 'nutrition' | 'mental';
  progress: number;
  target: string;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'completed';
  lastUpdate: string;
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
  }>;
}

interface AnalyticsData {
  totalGoals: number;
  avgProgress: number;
  activeCount: number;
  completedCount: number;
  atRiskCount: number;
  trends: { week: string; progress: number; }[];
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
  'active': 'bg-green-100 text-green-800',
  'review-needed': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-blue-100 text-blue-800'
};

const GOAL_STATUS_COLORS = {
  'on-track': 'bg-green-100 text-green-800',
  'at-risk': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-blue-100 text-blue-800'
};

const PatientGoals = () => {
  // State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [goals, setGoals] = useState<GoalEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');
  const [sortBy, setSortBy] = useState<'deadline' | 'progress' | 'status'>('deadline');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [patientsRes, goalsRes, analyticsRes, aiRes, alertsRes] = await Promise.all([
          fetch('/api/patients'),
          fetch(`/api/goals?timeRange=${timeRange}`),
          fetch(`/api/goals/analytics?timeRange=${timeRange}`),
          fetch(`/api/goals/insights/ai?timeRange=${timeRange}`),
          fetch(`/api/goals/alerts?timeRange=${timeRange}`)
        ]);
        if (!patientsRes.ok || !goalsRes.ok || !analyticsRes.ok || !aiRes.ok || !alertsRes.ok) {
          throw new Error('Failed to fetch data');
        }
        const [patientsData, goalsData, analyticsData, aiData, alertsData] = await Promise.all([
          patientsRes.json(),
          goalsRes.json(),
          analyticsRes.json(),
          aiRes.json(),
          alertsRes.json()
        ]);
        setPatients(patientsData);
        setSelectedPatient(patientsData[0] || null);
        setGoals(goalsData);
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

  // Filtered and sorted goals
  const filteredGoals = useMemo(() => {
    let filtered = goals;
    if (selectedPatient) {
      filtered = filtered.filter(goal => goal.patientId === selectedPatient.id);
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(goal => goal.status === statusFilter);
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(goal => goal.category === categoryFilter);
    }
    switch (sortBy) {
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'status':
        const statusOrder = { 'on-track': 0, 'at-risk': 1, 'completed': 2 };
        filtered.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
    }
    return filtered;
  }, [goals, selectedPatient, statusFilter, categoryFilter, sortBy]);

  // Helpers
  const getStatusColor = (status: 'active' | 'review-needed' | 'completed') => STATUS_COLORS[status];
  const getGoalStatusColor = (status: 'on-track' | 'at-risk' | 'completed') => GOAL_STATUS_COLORS[status];
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
    { value: 'on-track', label: 'On Track' },
    { value: 'at-risk', label: 'At Risk' },
    { value: 'completed', label: 'Completed' },
  ];
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'health', label: 'Health' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'mental', label: 'Mental' },
  ];
  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ];

  if (loading) {
    return <div className="container py-8 text-center text-lg">Loading goals data...</div>;
  }
  if (error) {
    return <div className="container py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Goals</h1>
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient Selector */}
        <PatientSelector
          patients={patients.map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            lastActivity: p.lastUpdate,
            image: p.image,
          }))}
          selectedPatientId={selectedPatient?.id || null}
          onSelect={id => setSelectedPatient(patients.find(p => p.id === id) || null)}
        />

        {/* Goals Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <AIInsightsPanel
                patient={{ id: selectedPatient.id, name: selectedPatient.name }}
                module="goals"
                data={{
                  goals: filteredGoals,
                  analytics,
                  aiInsights,
                  alerts
                }}
              />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Goals Overview - {selectedPatient.name}</h2>
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
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map(opt => (
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
                      <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
                      <Target className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalGoals}</div>
                      <p className="text-xs text-muted-foreground">goals tracked</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.avgProgress.toFixed(1)}%</div>
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
                          <span>Active</span>
                          <span>{analytics.activeCount}</span>
                        </div>
                        <Progress value={(analytics.activeCount / analytics.totalGoals) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span>Completed</span>
                          <span>{analytics.completedCount}</span>
                        </div>
                        <Progress value={(analytics.completedCount / analytics.totalGoals) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span>At Risk</span>
                          <span>{analytics.atRiskCount}</span>
                        </div>
                        <Progress value={(analytics.atRiskCount / analytics.totalGoals) * 100} className="h-2" />
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

              {/* Goals Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Goals Trends</CardTitle>
                  <CardDescription>Track progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics?.trends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="progress" stroke="#8884d8" name="Progress" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Goals</CardTitle>
                  <CardDescription>Latest goals and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredGoals.map((goal) => (
                      <div key={goal.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Target className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{goal.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)} • Target: {goal.target}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge className={getGoalStatusColor(goal.status)}>{goal.status}</Badge>
                            <div className="flex items-center gap-1 mt-1 justify-end">
                              <span className="text-sm text-muted-foreground">Progress: </span>
                              <span className="font-medium">{goal.progress}%</span>
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

export default PatientGoals;
