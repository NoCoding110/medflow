import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Heart,
  Activity as LucideActivity,
  Thermometer,
  Search,
  Calendar,
  Clock,
  Smartphone,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  User,
  ChevronRight,
  Brain
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import AIInsightsBox from '@/components/AIInsightsBox';

interface WellnessEntry {
  id: string;
  patientId: string;
  recordedAt: string;
  sleepDuration: number;
  stressLevel: number;
  activityMinutes: number;
  waterIntake: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
}

const WellnessDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [wellnessData, setWellnessData] = useState<WellnessEntry[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch patients (simulate or fetch from backend)
  useEffect(() => {
    // For demo, fetch from wellness data
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/patients', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch patients');
        const data = await res.json();
        setPatients(data);
        setSelectedPatient(data[0] || null);
      } catch (err: any) {
        setError(err.message);
        toast.error('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // Fetch wellness data for selected patient
  useEffect(() => {
    if (!selectedPatient) return;
    const fetchWellness = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/wellness?patientId=${selectedPatient.id}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch wellness data');
        const data = await res.json();
        setWellnessData(data);
      } catch (err: any) {
        setError(err.message);
        toast.error('Failed to load wellness data');
      } finally {
        setLoading(false);
      }
    };
    fetchWellness();
  }, [selectedPatient]);

  // Fetch analytics
  useEffect(() => {
    if (!selectedPatient) return;
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/wellness/analytics?patientId=${selectedPatient.id}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        toast.error('Failed to load analytics');
      }
    };
    fetchAnalytics();
  }, [selectedPatient]);

  // Fetch AI insights
  useEffect(() => {
    if (!selectedPatient) return;
    const fetchAI = async () => {
      try {
        const res = await fetch(`/api/wellness/ai-insights?patientId=${selectedPatient.id}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch AI insights');
        const data = await res.json();
        setAiInsights(data);
      } catch (err) {
        toast.error('Failed to load AI insights');
      }
    };
    fetchAI();
  }, [selectedPatient]);

  // Fetch alerts
  useEffect(() => {
    if (!selectedPatient) return;
    const fetchAlerts = async () => {
      try {
        const res = await fetch(`/api/wellness/alerts?patientId=${selectedPatient.id}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch alerts');
        const data = await res.json();
        setAlerts(data);
      } catch (err) {
        toast.error('Failed to load alerts');
      }
    };
    fetchAlerts();
  }, [selectedPatient]);

  const filteredPatients = useMemo(() => patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  ), [patients, searchQuery]);

  const getStatusColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view their wellness data</CardDescription>
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
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent ${
                      selectedPatient?.id === patient.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{patient.name}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Wellness Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedPatient.name}'s Wellness Dashboard</h2>
                  <p className="text-muted-foreground">
                    Age: {selectedPatient.age}
                  </p>
                </div>
              </div>

              <AIInsightsBox />

              {/* Analytics Overview */}
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Entries</p>
                        <h3 className="text-2xl font-bold">{wellnessData.length}</h3>
                      </div>
                      <LucideActivity className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg Sleep (hrs)</p>
                        <h3 className="text-2xl font-bold">{analytics?.avgSleep?.toFixed(1) ?? '-'}</h3>
                      </div>
                      <Clock className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg Stress</p>
                        <h3 className="text-2xl font-bold">{analytics?.avgStress?.toFixed(1) ?? '-'}</h3>
                      </div>
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Recent Entry</p>
                        <h3 className="text-2xl font-bold">{wellnessData[0]?.recordedAt ? new Date(wellnessData[0].recordedAt).toLocaleDateString() : '-'}</h3>
                      </div>
                      <Calendar className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights and Alerts */}
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-500" />
                      AI Insights
                    </CardTitle>
                    <CardDescription>Smart analysis and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {aiInsights?.tips?.length ? aiInsights.tips.map((tip: string, idx: number) => (
                          <div key={idx} className="p-4 border rounded-lg bg-muted">
                            <div className="flex items-start gap-3">
                              <Brain className="h-4 w-4 text-purple-500" />
                              <div className="flex-1">
                                <h4 className="font-medium">{tip}</h4>
                              </div>
                            </div>
                          </div>
                        )) : <div className="text-muted-foreground">No AI insights available.</div>}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Alerts
                    </CardTitle>
                    <CardDescription>Critical and warning items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {alerts.length ? alerts.map((alert, idx) => (
                          <div key={idx} className={`p-4 border rounded-lg ${getStatusColor(alert.severity)}`}>
                            <div className="flex items-start gap-3">
                              <AlertCircle className="h-4 w-4" />
                              <div className="flex-1">
                                <h4 className="font-medium">{alert.title}</h4>
                                <p className="text-sm text-muted-foreground">{alert.description}</p>
                              </div>
                            </div>
                          </div>
                        )) : <div className="text-muted-foreground">No alerts.</div>}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Wellness Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Wellness Trends</CardTitle>
                  <CardDescription>Sleep, stress, activity, and hydration over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={wellnessData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="recordedAt" tickFormatter={d => new Date(d).toLocaleDateString()} />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="sleepDuration" stroke="#8884d8" name="Sleep (hrs)" />
                      <Line type="monotone" dataKey="stressLevel" stroke="#ff4d4f" name="Stress" />
                      <Line type="monotone" dataKey="activityMinutes" stroke="#4caf50" name="Activity (min)" />
                      <Line type="monotone" dataKey="waterIntake" stroke="#2196f3" name="Water (ml)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;
