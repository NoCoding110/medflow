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
import { PatientSelector } from '@/components/PatientSelector';
import AIInsightsPanel from '@/components/AIInsightsPanel';

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
        {/* Patient Selector */}
        <PatientSelector
          patients={patients.map(p => ({
            id: p.id,
            name: p.name,
            status: 'active', // or use a real status if available
            lastActivity: '', // add last activity if available
            image: p.image,
          }))}
          selectedPatientId={selectedPatient?.id || null}
          onSelect={id => setSelectedPatient(patients.find(p => p.id === id) || null)}
        />

        {/* Wellness Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <AIInsightsPanel
                patient={{ id: selectedPatient.id, name: selectedPatient.name }}
                module="wellness"
                data={{
                  wellnessData,
                  analytics,
                  aiInsights,
                  alerts
                }}
              />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedPatient.name}'s Wellness Dashboard</h2>
                  <p className="text-muted-foreground">
                    Age: {selectedPatient.age}
                  </p>
                </div>
              </div>

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
