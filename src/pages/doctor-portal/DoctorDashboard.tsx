import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Calendar, Clock, Users, MessageSquare, Bell, Activity, FileText, TrendingUp, TrendingDown, AlertCircle, Brain, BarChart2, LineChart } from "lucide-react";
import { mockAppointments, mockPatients } from "@/lib/data/mock-data";
import MessageDialog, { Message } from "@/components/MessageDialog";
import { toast } from "sonner";
import PatientDialog from "@/components/PatientDialog";
import { Patient } from "@/lib/types/patient";
import AlertDialog, { Alert } from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Line } from "recharts";
import AIInsightsBox from '@/components/AIInsightsBox';
import { supabase } from "@/lib/supabaseClient";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Analytics {
  totalPatients: number;
  activePatients: number;
  appointmentsToday: number;
  revenue: {
    current: number;
    previous: number;
    trend: 'up' | 'down';
  };
  patientEngagement: {
    score: number;
    trend: 'up' | 'down';
  };
  healthOutcomes: {
    improvement: number;
    decline: number;
    stable: number;
  };
}

interface AIInsight {
  id: string;
  type: 'health' | 'engagement' | 'revenue' | 'efficiency';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  details: {
    patientName?: string;
    patientId?: string;
    data: any;
  };
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Nurse Wilson",
    content: "Room 4 is ready for the next patient",
    timestamp: "2024-01-30T10:32:00",
    type: "nurse",
    additionalInfo: {
      roomNumber: "4"
    }
  },
  {
    id: "2",
    sender: "System",
    content: "3 new lab results are ready for review",
    timestamp: "2024-01-30T09:45:00",
    type: "system",
    additionalInfo: {
      labResults: [
        {
          id: "lab1",
          name: "Complete Blood Count",
          status: "Abnormal",
          date: "2024-01-29"
        },
        {
          id: "lab2",
          name: "Metabolic Panel",
          status: "Normal",
          date: "2024-01-29"
        },
        {
          id: "lab3",
          name: "Lipid Panel",
          status: "Pending Review",
          date: "2024-01-29"
        }
      ]
    }
  },
  {
    id: "3",
    sender: "Patient Portal",
    content: "Jessica Lee has requested a prescription refill",
    timestamp: "2024-01-29T14:20:00",
    type: "patient",
    additionalInfo: {
      patientName: "Jessica Lee",
      prescriptionDetails: {
        medication: "Lisinopril 10mg",
        lastFilled: "2023-12-29",
        quantity: "30 tablets"
      }
    }
  }
];

// Mock alerts data
const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "lab",
    title: "Lab Result: Maria Garcia",
    description: "Abnormal blood count results",
    severity: "high",
    timestamp: new Date().toISOString(),
    details: {
      patientName: "Maria Garcia",
      patientId: "P006",
      data: {
        labResults: [
          {
            test: "Complete Blood Count (CBC)",
            value: "3.2 x 10^9/L",
            normalRange: "4.0-11.0 x 10^9/L",
            status: "Abnormal",
            date: "2024-01-30"
          },
          {
            test: "Hemoglobin",
            value: "11.2 g/dL",
            normalRange: "12.0-15.5 g/dL",
            status: "Low",
            date: "2024-01-30"
          }
        ]
      }
    }
  },
  {
    id: "2",
    type: "medication",
    title: "Medication Alert: David Brown",
    description: "Possible drug interaction detected",
    severity: "high",
    timestamp: new Date().toISOString(),
    details: {
      patientName: "David Brown",
      patientId: "P007",
      data: {
        medications: {
          current: "Warfarin 5mg daily",
          interacting: "New prescription: Aspirin 81mg daily",
          severity: "High Risk",
          recommendation: "Consider alternative antiplatelet therapy or adjust Warfarin dosage"
        }
      }
    }
  },
  {
    id: "3",
    type: "message",
    title: "Patient Message: Lisa Wilson",
    description: "Reports severe symptoms",
    severity: "medium",
    timestamp: new Date().toISOString(),
    details: {
      patientName: "Lisa Wilson",
      patientId: "P008",
      data: {
        symptoms: {
          reported: ["Severe Headache", "Nausea", "Vision Changes"],
          severity: "Severe",
          duration: "24 hours",
          notes: "Symptoms worsen with movement and light exposure"
        }
      }
    }
  }
];

// Mock insights data
const mockInsights: Alert[] = [
  {
    id: "4",
    type: "insight",
    title: "Thomas Moore's blood pressure trending upward",
    description: "+15% in last 3 readings",
    severity: "medium",
    timestamp: new Date().toISOString(),
    details: {
      patientName: "Thomas Moore",
      patientId: "P009",
      data: {
        trends: {
          metric: "Blood Pressure",
          current: "142/90 mmHg",
          previous: "128/82 mmHg",
          change: "+15% increase",
          dates: ["2024-01-15", "2024-01-22", "2024-01-29"],
          values: [128, 135, 142]
        }
      }
    }
  },
  {
    id: "5",
    type: "insight",
    title: "Sarah Lee meeting fitness goals",
    description: "Consistent improvement for 2 weeks",
    severity: "low",
    timestamp: new Date().toISOString(),
    details: {
      patientName: "Sarah Lee",
      patientId: "P010",
      data: {
        trends: {
          metric: "Daily Steps",
          current: "8,500 steps",
          previous: "6,200 steps",
          change: "+37% increase",
          dates: ["2024-01-15", "2024-01-22", "2024-01-29"],
          values: [6200, 7300, 8500]
        }
      }
    }
  }
];

const DoctorDashboard = () => {
  const { user } = useAuth();
  
  // State for data fetching
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [revenue, setRevenue] = useState<{ current: number; previous: number; trend: 'up' | 'down' }>({ current: 0, previous: 0, trend: 'up' });
  const [engagement, setEngagement] = useState<{ score: number; trend: 'up' | 'down' }>({ score: 0, trend: 'up' });
  const [healthOutcomes, setHealthOutcomes] = useState<{ improvement: number; stable: number; decline: number }>({ improvement: 0, stable: 0, decline: 0 });
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState({
    analytics: false,
    insights: false,
    alerts: false
  });

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    setLoading(prev => ({ ...prev, analytics: true }));
    try {
      const res = await fetch('/api/analytics/summary', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch analytics');
      setAnalytics(await res.json());
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(prev => ({ ...prev, analytics: false }));
    }
  }, []);

  // Fetch AI insights
  const fetchAiInsights = useCallback(async () => {
    setLoading(prev => ({ ...prev, insights: true }));
    try {
      const res = await fetch('/api/insights/ai', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch AI insights');
      setAiInsights(await res.json());
    } catch (error) {
      toast.error('Failed to load AI insights');
    } finally {
      setLoading(prev => ({ ...prev, insights: false }));
    }
  }, []);

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    setLoading(prev => ({ ...prev, alerts: true }));
    try {
      const res = await fetch('/api/alerts', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch alerts');
      setAlerts(await res.json());
    } catch (error) {
      toast.error('Failed to load alerts');
    } finally {
      setLoading(prev => ({ ...prev, alerts: false }));
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchAnalytics();
    fetchAiInsights();
    fetchAlerts();
  }, [fetchAnalytics, fetchAiInsights, fetchAlerts]);

  // Add tasks state
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Review lab results for Thomas Moore', completed: false },
    { id: '2', text: 'Update treatment plan for Jessica Brown', completed: false },
    { id: '3', text: 'Submit insurance claim for William Davis', completed: false },
    { id: '4', text: 'Call pharmacy about prescription error', completed: false },
    { id: '5', text: 'Complete CME course (due Friday)', completed: false },
  ]);

  // Add selected date state
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Add task toggle handler
  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Get current date info
  const today = new Date();
  const currentWeek = [...Array(7)].map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i); // Start from current week's Monday
    return date;
  });

  // Filter appointments for the current doctor
  const doctorAppointments = useMemo(() => 
    mockAppointments.filter(apt => apt.doctorId === user?.id),
    [user?.id]
  );

  // Get appointments for selected date
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const selectedDateAppointments = doctorAppointments.filter(apt => apt.date === selectedDateStr);

  // Get appointments count for each day of the week
  const weeklyAppointmentCounts = currentWeek.map(date => {
    const dateStr = date.toISOString().split('T')[0];
    return {
      date: date,
      count: doctorAppointments.filter(apt => apt.date === dateStr).length
    };
  });

  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return new Date(0, 0, 0, parseInt(hours), parseInt(minutes))
      .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Add message dialog state
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  // Handle message click
  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setIsMessageDialogOpen(true);
  };

  // Handle message actions
  const handleMessageAction = (action: string, message: Message) => {
    switch (action) {
      case 'acknowledge':
        toast.success(`Acknowledged message from ${message.sender}`);
        break;
      case 'review':
        toast.success('Opening lab results for review');
        break;
      case 'approve':
        toast.success('Prescription refill approved');
        break;
      case 'deny':
        toast.error('Prescription refill denied');
        break;
    }
    setIsMessageDialogOpen(false);
  };

  // Add patient dialog state
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isPatientDialogOpen, setIsPatientDialogOpen] = useState(false);

  // Handle patient click
  const handlePatientClick = (patientName: string) => {
    const [lastName, firstName] = patientName.split(", ");
    const patient = mockPatients.find(
      p => p.firstName === firstName && p.lastName === lastName
    );
    if (patient) {
      setSelectedPatient(patient);
      setIsPatientDialogOpen(true);
    }
  };

  // Add alert dialog state
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  // Handle alert click
  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsAlertDialogOpen(true);
  };

  // Handle alert actions
  const handleAlertAction = (action: string, alert: Alert) => {
    switch (action) {
      case 'review':
        toast.success(`Opening ${alert.type === 'lab' ? 'lab results' : 'trend data'} for ${alert.details.patientName}`);
        break;
      case 'order':
        toast.success(`Ordering follow-up tests for ${alert.details.patientName}`);
        break;
      case 'adjust':
        toast.success(`Opening medication adjustment form for ${alert.details.patientName}`);
        break;
      case 'consult':
        toast.success(`Initiating pharmacy consultation for ${alert.details.patientName}`);
        break;
      case 'contact':
        toast.success(`Opening communication channel with ${alert.details.patientName}`);
        break;
      case 'schedule':
        toast.success(`Opening scheduler for ${alert.details.patientName}`);
        break;
    }
    setIsAlertDialogOpen(false);
  };

  useEffect(() => {
    fetchAnalyticsFromSupabase();
    fetchRevenue();
    fetchEngagement();
    fetchHealthOutcomes();
    fetchAIInsights();
    fetchAlerts();
  }, []);

  const fetchAnalyticsFromSupabase = async () => {
    setLoading(prev => ({ ...prev, analytics: true }));
    try {
      // Fetch patients
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('id, status');
      if (patientsError) throw patientsError;
      const totalPatients = patientsData?.length || 0;
      const activePatients = patientsData?.filter(p => p.status === 'active').length || 0;

      // Fetch today's appointments
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const { data: todayAppointments, error: todayAppointmentsError } = await supabase
        .from('patient_appointments')
        .select('id')
        .gte('appointment_date', today.toISOString())
        .lt('appointment_date', tomorrow.toISOString());
      if (todayAppointmentsError) throw todayAppointmentsError;

      // Fetch this week's appointments
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const { data: weekAppointments, error: weekAppointmentsError } = await supabase
        .from('patient_appointments')
        .select('id')
        .gte('appointment_date', today.toISOString())
        .lt('appointment_date', nextWeek.toISOString());
      if (weekAppointmentsError) throw weekAppointmentsError;

      setAnalytics({
        totalPatients,
        activePatients,
        appointmentsToday: todayAppointments?.length || 0,
        revenue: { current: 0, previous: 0, trend: 'up' }, // Placeholder
        patientEngagement: { score: 0, trend: 'up' }, // Placeholder
        healthOutcomes: { improvement: 0, decline: 0, stable: 0 }, // Placeholder
      });
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(prev => ({ ...prev, analytics: false }));
    }
  };

  const fetchRevenue = async () => {
    const { data, error } = await supabase
      .from('revenue')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2);
    if (!error && data && data.length > 0) {
      const current = Number(data[0].amount);
      const previous = data[1] ? Number(data[1].amount) : current;
      const trend = current >= previous ? 'up' : 'down';
      setRevenue({ current, previous, trend });
    }
  };

  const fetchEngagement = async () => {
    const { data, error } = await supabase
      .from('patient_engagement')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    if (!error && data && data.length > 0) {
      setEngagement({ score: data[0].score, trend: data[0].trend });
    }
  };

  const fetchHealthOutcomes = async () => {
    const { data, error } = await supabase
      .from('health_outcomes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    if (!error && data && data.length > 0) {
      setHealthOutcomes({
        improvement: data[0].improvement,
        stable: data[0].stable,
        decline: data[0].decline
      });
    }
  };

  const fetchAIInsights = async () => {
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setAiInsights(data.map((insight: any) => ({
        id: insight.id,
        type: insight.type,
        title: insight.title,
        description: insight.description,
        severity: insight.severity,
        timestamp: insight.created_at,
        details: { patientName: insight.patient_name, data: {} }
      })));
    }
  };

  const fetchAlerts = async () => {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setAlerts(data.map((alert: any) => ({
        id: alert.id,
        type: alert.type,
        title: alert.title,
        description: alert.description,
        severity: alert.severity,
        timestamp: alert.created_at,
        details: { patientName: alert.patient_name, data: {} }
      })));
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Here's your medical practice overview</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full text-sm flex items-center">
            <Clock className="mr-1 h-4 w-4" /> {today.toLocaleDateString()}
          </div>
        </div>
      </div>

      <AIInsightsBox />

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              Patients
            </CardTitle>
            <CardDescription>Total active patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.activePatients || 0}</div>
              <Badge variant="outline" className="text-green-600">
                {analytics?.totalPatients || 0} total
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-purple-600" />
              Appointments
            </CardTitle>
            <CardDescription>Today's schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.appointmentsToday || 0}</div>
              <Badge variant="outline">View Schedule</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-purple-600" />
              Revenue
            </CardTitle>
            <CardDescription>This month's performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                ${revenue.current.toLocaleString()}
              </div>
              <Badge variant={revenue.trend === 'up' ? 'default' : 'destructive'}>
                {revenue.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="mr-2 h-5 w-5 text-purple-600" />
              Engagement
            </CardTitle>
            <CardDescription>Patient interaction score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{engagement.score || 0}%</div>
                <Badge variant={engagement.trend === 'up' ? 'default' : 'destructive'}>
                  {engagement.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </Badge>
              </div>
              <Progress value={engagement.score || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-600" />
              AI Insights
            </CardTitle>
            <CardDescription>Smart recommendations and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full ${
                      insight.severity === 'high' ? 'bg-red-100 text-red-700' :
                      insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    } flex items-center justify-center`}>
                      <Brain className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      {insight.details.patientName && (
                        <Badge variant="outline" className="mt-2">
                          {insight.details.patientName}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-purple-600" />
              Critical Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    } flex items-center justify-center`}>
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      {alert.details.patientName && (
                        <Badge variant="outline" className="mt-2">
                          {alert.details.patientName}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Outcomes and Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-purple-600" />
              Health Outcomes
            </CardTitle>
            <CardDescription>Patient health progress tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{healthOutcomes.improvement || 0}%</div>
                  <p className="text-sm text-muted-foreground">Improving</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{healthOutcomes.stable || 0}%</div>
                  <p className="text-sm text-muted-foreground">Stable</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{healthOutcomes.decline || 0}%</div>
                  <p className="text-sm text-muted-foreground">Declining</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-purple-600" />
              Tasks
            </CardTitle>
            <CardDescription>Your to-do list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <MessageDialog
        message={selectedMessage}
        open={isMessageDialogOpen}
        onClose={() => setIsMessageDialogOpen(false)}
        onAction={handleMessageAction}
      />

      <PatientDialog
        patient={selectedPatient}
        open={isPatientDialogOpen}
        onClose={() => setIsPatientDialogOpen(false)}
      />

      <AlertDialog
        alert={selectedAlert}
        open={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
        onAction={handleAlertAction}
      />
    </div>
  );
};

export default DoctorDashboard;
