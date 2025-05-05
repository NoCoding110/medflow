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
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import {
  Apple, Utensils, Clock, Search, User, ChevronRight, AlertTriangle, CheckCircle2, Scale, Leaf, Fish, Milk, Beef, Cookie, TrendingUp, TrendingDown, Minus, BarChart2, Sparkles
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
  lastMeal: string;
  nutritionStatus: 'optimal' | 'needs-improvement' | 'attention-required';
  dietaryRestrictions: string[];
}

interface NutritionEntry {
  id: string;
  patientId: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  mealType: string;
  items: string[];
}

interface AnalyticsData {
  totalMeals: number;
  avgCalories: number;
  avgProtein: number;
  avgCarbs: number;
  avgFats: number;
  avgFiber: number;
  trends: { day: string; calories: number; protein: number; carbs: number; fats: number; }[];
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
  'optimal': 'bg-green-100 text-green-800',
  'needs-improvement': 'bg-yellow-100 text-yellow-800',
  'attention-required': 'bg-red-100 text-red-800'
};

const NutritionTracker = () => {
  // State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mealTypeFilter, setMealTypeFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [sortBy, setSortBy] = useState<'date' | 'calories' | 'protein'>('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [patientsRes, nutritionRes, analyticsRes, aiRes, alertsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/patients`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            }
          }),
          fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/nutrition?timeRange=${timeRange}`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            }
          }),
          fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/nutrition/analytics?timeRange=${timeRange}`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            }
          }),
          fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/nutrition/insights/ai?timeRange=${timeRange}`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            }
          }),
          fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/nutrition/alerts?timeRange=${timeRange}`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            }
          })
        ]);
        if (!patientsRes.ok || !nutritionRes.ok || !analyticsRes.ok || !aiRes.ok || !alertsRes.ok) {
          throw new Error('Failed to fetch data');
        }
        const [patientsData, nutritionData, analyticsData, aiData, alertsData] = await Promise.all([
          patientsRes.json(),
          nutritionRes.json(),
          analyticsRes.json(),
          aiRes.json(),
          alertsRes.json()
        ]);
        setPatients(patientsData);
        setSelectedPatient(patientsData[0] || null);
        setNutritionData(nutritionData);
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

  // Filtered and sorted nutrition entries
  const filteredEntries = useMemo(() => {
    let filtered = nutritionData;
    if (selectedPatient) {
      filtered = filtered.filter(e => e.patientId === selectedPatient.id);
    }
    if (mealTypeFilter !== 'all') {
      filtered = filtered.filter(e => e.mealType === mealTypeFilter);
    }
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'calories':
        filtered.sort((a, b) => b.calories - a.calories);
        break;
      case 'protein':
        filtered.sort((a, b) => b.protein - a.protein);
        break;
    }
    return filtered;
  }, [nutritionData, selectedPatient, mealTypeFilter, sortBy]);

  // Helpers
  const getStatusColor = (status: 'optimal' | 'needs-improvement' | 'attention-required') => STATUS_COLORS[status];
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
  const mealTypes = [
    { value: 'all', label: 'All Meals' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snacks', label: 'Snacks' },
  ];
  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ];

  if (loading) {
    return <div className="container py-8 text-center text-lg">Loading nutrition data...</div>;
  }
  if (error) {
    return <div className="container py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Nutrition Tracker</h1>
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient Selector */}
        <PatientSelector
          patients={patients.map(p => ({
            id: p.id,
            name: p.name,
            status: p.nutritionStatus || 'stable',
            lastActivity: p.lastMeal || '',
            image: p.image,
          }))}
          selectedPatientId={selectedPatient?.id || null}
          onSelect={id => setSelectedPatient(patients.find(p => p.id === id) || null)}
        />

        {/* Nutrition Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <AIInsightsPanel
                patient={{ id: selectedPatient.id, name: selectedPatient.name }}
                module="nutrition"
                data={{
                  nutritionEntries: filteredEntries,
                  analytics,
                  aiInsights,
                  alerts
                }}
              />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Nutrition Overview - {selectedPatient.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Age: {selectedPatient.age}</span>
                    <span>•</span>
                    <span>Last meal: {selectedPatient.lastMeal}</span>
                    {selectedPatient.dietaryRestrictions.length > 0 && (
                      <>
                        <span>•</span>
                        <span>Restrictions: {selectedPatient.dietaryRestrictions.join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={mealTypeFilter} onValueChange={setMealTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Meal Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealTypes.map(opt => (
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
                      <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
                      <Utensils className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalMeals}</div>
                      <p className="text-xs text-muted-foreground">meals tracked</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Calories</CardTitle>
                      <Apple className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.avgCalories.toFixed(0)}</div>
                      <p className="text-xs text-muted-foreground">
                        {analytics.comparison.change > 0 ? '+' : ''}{analytics.comparison.change}% from previous
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Protein</CardTitle>
                      <Fish className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.avgProtein.toFixed(1)}g</div>
                      <p className="text-xs text-muted-foreground">per meal</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Trend Analysis</CardTitle>
                      <BarChart2 className="h-4 w-4 text-orange-500" />
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

              {/* Nutrition Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Trends</CardTitle>
                  <CardDescription>Track nutrition metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics?.trends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="calories" stroke="#8884d8" name="Calories" dot={false} />
                      <Line type="monotone" dataKey="protein" stroke="#4ade80" name="Protein" dot={false} />
                      <Line type="monotone" dataKey="carbs" stroke="#fbbf24" name="Carbs" dot={false} />
                      <Line type="monotone" dataKey="fats" stroke="#ef4444" name="Fats" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Meals */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Meals</CardTitle>
                  <CardDescription>Latest recorded meals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Utensils className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium capitalize">{entry.mealType}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(entry.date).toLocaleString()} • {entry.items.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{entry.calories} kcal</p>
                            <p className="text-xs text-muted-foreground">{entry.protein}g protein</p>
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

export default NutritionTracker;
