import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Check, X, Video, MessageSquare, RefreshCw, BarChart2, AlertCircle, Brain, TrendingUp, TrendingDown, Users } from "lucide-react";
import { handleActionWithToast, formatDateTime } from "@/lib/portal-utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress' | 'overdue';
  isVirtual: boolean;
  notes?: string;
}

interface Analytics {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
  overdue: number;
  trends: {
    scheduled: 'up' | 'down';
    completed: 'up' | 'down';
    cancelled: 'up' | 'down';
  };
}

interface AIInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  patientName?: string;
}

interface Alert {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  patientName?: string;
}

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState({
    appointments: false,
    analytics: false,
    insights: false,
    alerts: false
  });
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [openDialog, setOpenDialog] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

  // Fetch appointments
  const fetchAppointments = useCallback(async () => {
    setLoading(l => ({ ...l, appointments: true }));
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      const res = await fetch(`/api/appointments?${params.toString()}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch appointments');
      setAppointments(await res.json());
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(l => ({ ...l, appointments: false }));
    }
  }, [statusFilter, searchTerm]);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    setLoading(l => ({ ...l, analytics: true }));
    try {
      const res = await fetch('/api/appointments/analytics', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch analytics');
      setAnalytics(await res.json());
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(l => ({ ...l, analytics: false }));
    }
  }, []);

  // Fetch AI insights
  const fetchAiInsights = useCallback(async () => {
    setLoading(l => ({ ...l, insights: true }));
    try {
      const res = await fetch('/api/appointments/insights/ai', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch AI insights');
      setAiInsights(await res.json());
    } catch (error) {
      toast.error('Failed to load AI insights');
    } finally {
      setLoading(l => ({ ...l, insights: false }));
    }
  }, []);

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    setLoading(l => ({ ...l, alerts: true }));
    try {
      const res = await fetch('/api/appointments/alerts', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch alerts');
      setAlerts(await res.json());
    } catch (error) {
      toast.error('Failed to load alerts');
    } finally {
      setLoading(l => ({ ...l, alerts: false }));
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
    fetchAnalytics();
    fetchAiInsights();
    fetchAlerts();
  }, [fetchAppointments, fetchAnalytics, fetchAiInsights, fetchAlerts]);

  // Filter and sort appointments
  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = [...appointments];
    if (searchTerm) {
      filtered = filtered.filter(a =>
        a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(a => a.status === statusFilter);
    }
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [appointments, searchTerm, statusFilter, sortConfig]);

  const upcomingAppointments = filteredAndSortedAppointments.filter(a => a.status === "scheduled");
  const completedAppointments = filteredAndSortedAppointments.filter(a => a.status === "completed");
  const cancelledAppointments = filteredAndSortedAppointments.filter(a => a.status === "cancelled");
  const overdueAppointments = filteredAndSortedAppointments.filter(a => a.status === "overdue");

  const handleCompleteAppointment = async (appointmentId: string) => {
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAppointments(prev => 
          prev.map(appointment => 
            appointment.id === appointmentId 
              ? { ...appointment, status: "completed" } 
              : appointment
          )
        );
      },
      "Appointment marked as completed",
      "Failed to update appointment status"
    );
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAppointments(prev => 
          prev.map(appointment => 
            appointment.id === appointmentId 
              ? { ...appointment, status: "cancelled" } 
              : appointment
          )
        );
      },
      "Appointment cancelled successfully",
      "Failed to cancel appointment"
    );
  };
  
  const handleStartVirtualAppointment = async (appointmentId: string) => {
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAppointments(prev => 
          prev.map(appointment => 
            appointment.id === appointmentId 
              ? { ...appointment, status: "in-progress" } 
              : appointment
          )
        );
      },
      "Virtual appointment started",
      "Failed to start virtual appointment"
    );
  };
  
  const handleAddNote = async () => {
    if (!selectedAppointment || !noteContent) return;
    
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAppointments(prev => 
          prev.map(appointment => 
            appointment.id === selectedAppointment.id 
              ? { ...appointment, notes: noteContent } 
              : appointment
          )
        );
        setOpenDialog("");
        setNoteContent("");
      },
      "Note added successfully",
      "Failed to add note"
    );
  };
  
  const handleReschedule = async () => {
    if (!selectedAppointment || !rescheduleDate || !rescheduleTime) return;
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const newDate = new Date(`${rescheduleDate}T${rescheduleTime}`);
        setAppointments(prev =>
          prev.map(appointment =>
            appointment.id === selectedAppointment.id
              ? {
                  ...appointment,
                  date: newDate.toISOString(),
                  isVirtual: appointmentType === "virtual"
                }
              : appointment
          )
        );
        setOpenDialog("");
        setRescheduleDate("");
        setRescheduleTime("");
      },
      "Appointment rescheduled successfully",
      "Failed to reschedule appointment"
    );
  };

  // Map appointments to FullCalendar events
  const calendarEvents = appointments.map(a => ({
    id: a.id,
    title: a.patientName + (a.reason ? `: ${a.reason}` : ""),
    start: a.date,
    end: a.date, // For now, assume 30 min, can extend
    extendedProps: a,
    color:
      a.status === 'completed' ? '#22c55e' :
      a.status === 'cancelled' ? '#ef4444' :
      a.status === 'overdue' ? '#f59e42' :
      a.status === 'in-progress' ? '#3b82f6' :
      undefined
  }));

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Appointments</h1>
      
      {/* Calendar Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-purple-600" />
            Calendar View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            height="auto"
            events={calendarEvents}
            eventClick={info => {
              // Placeholder for edit modal
              alert(`Edit appointment: ${info.event.title}`);
            }}
            dateClick={info => {
              // Placeholder for create modal
              alert(`Create new appointment on ${info.dateStr}`);
            }}
            selectable={true}
            editable={false}
            eventColor="#2563eb"
            dayMaxEvents={3}
            nowIndicator={true}
            aspectRatio={2}
          />
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-purple-600" />
              Total
            </CardTitle>
            <CardDescription>Total appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.total || 0}</div>
              <Badge variant="outline" className="text-purple-600">
                {analytics?.trends.scheduled === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-purple-600" />
              Upcoming
            </CardTitle>
            <CardDescription>Upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.upcoming || 0}</div>
              <Badge variant="outline">Scheduled</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-600" />
              Completed
            </CardTitle>
            <CardDescription>Completed appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.completed || 0}</div>
              <Badge variant={analytics?.trends.completed === 'up' ? 'default' : 'destructive'}>
                {analytics?.trends.completed === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <X className="mr-2 h-5 w-5 text-red-600" />
              Cancelled
            </CardTitle>
            <CardDescription>Cancelled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.cancelled || 0}</div>
              <Badge variant={analytics?.trends.cancelled === 'up' ? 'destructive' : 'default'}>
                {analytics?.trends.cancelled === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
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
                      {insight.patientName && (
                        <Badge variant="outline" className="mt-2">
                          {insight.patientName}
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
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      {alert.patientName && (
                        <Badge variant="outline" className="mt-2">
                          {alert.patientName}
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

      {/* Filtering and Tabs */}
      <div className="flex items-center gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search by patient or reason..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <select
          className="h-10 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="overdue">Overdue</option>
        </select>
        <select
          className="h-10 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
          onChange={e => {
            const value = e.target.value;
            if (value === 'dateAsc') setSortConfig({ key: 'date', direction: 'asc' });
            else if (value === 'dateDesc') setSortConfig({ key: 'date', direction: 'desc' });
            else if (value === 'nameAsc') setSortConfig({ key: 'patientName', direction: 'asc' });
            else if (value === 'nameDesc') setSortConfig({ key: 'patientName', direction: 'desc' });
          }}
          defaultValue="dateAsc"
        >
          <option value="dateAsc">Date (Earliest)</option>
          <option value="dateDesc">Date (Latest)</option>
          <option value="nameAsc">Patient (A-Z)</option>
          <option value="nameDesc">Patient (Z-A)</option>
        </select>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({overdueAppointments.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardHeader className="bg-lightblue-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                  <Badge variant={appointment.isVirtual ? "outline" : "secondary"}>
                    {appointment.isVirtual ? "Virtual" : "In-Person"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-lightblue-500" />
                      <span>{formatDateTime(appointment.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-lightblue-500" />
                      <span>30 minutes</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Reason:</span>
                    <span className="text-sm ml-2">{appointment.reason}</span>
                  </div>
                  
                  {appointment.notes && (
                    <div>
                      <span className="text-sm font-medium">Notes:</span>
                      <p className="text-sm ml-2">{appointment.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
                    {appointment.isVirtual && (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleStartVirtualAppointment(appointment.id)}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Start Virtual Visit
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setOpenDialog("note");
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Add Note
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setOpenDialog("reschedule");
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Reschedule
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleCompleteAppointment(appointment.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {upcomingAppointments.length === 0 && (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-medium text-gray-500">No upcoming appointments</p>
              <p className="text-gray-400 mb-4">You have no scheduled appointments.</p>
              <Button>Schedule New Appointment</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completedAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardHeader className="bg-green-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                  <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-500" />
                      <span>{formatDateTime(appointment.date)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Reason:</span>
                    <span className="text-sm ml-2">{appointment.reason}</span>
                  </div>
                  
                  {appointment.notes && (
                    <div>
                      <span className="text-sm font-medium">Notes:</span>
                      <p className="text-sm ml-2">{appointment.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {completedAppointments.length === 0 && (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <Check className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-medium text-gray-500">No completed appointments</p>
              <p className="text-gray-400">Completed appointments will appear here.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-4">
          {cancelledAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardHeader className="bg-red-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                  <Badge variant="outline" className="border-red-300 bg-red-50 text-red-700">
                    Cancelled
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-red-500" />
                      <span>{formatDateTime(appointment.date)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Reason:</span>
                    <span className="text-sm ml-2">{appointment.reason}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {cancelledAppointments.length === 0 && (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <X className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-medium text-gray-500">No cancelled appointments</p>
              <p className="text-gray-400">Cancelled appointments will appear here.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="overdue" className="space-y-4">
          {overdueAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardHeader className="bg-yellow-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                  <Badge variant="outline" className="border-yellow-300 bg-yellow-50 text-yellow-700">
                    Overdue
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-yellow-500" />
                      <span>{formatDateTime(appointment.date)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Reason:</span>
                    <span className="text-sm ml-2">{appointment.reason}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {overdueAppointments.length === 0 && (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <X className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-medium text-gray-500">No overdue appointments</p>
              <p className="text-gray-400">Overdue appointments will appear here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Note Dialog */}
      <Dialog open={openDialog === "note"} onOpenChange={() => setOpenDialog("")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Add notes for the appointment with {selectedAppointment?.patientName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Enter your notes here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog("")}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reschedule Dialog */}
      <Dialog open={openDialog === "reschedule"} onOpenChange={() => setOpenDialog("")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Reschedule the appointment with {selectedAppointment?.patientName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">New Date</Label>
              <Input
                id="date"
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">New Time</Label>
              <Input
                id="time"
                type="time"
                value={rescheduleTime}
                onChange={(e) => setRescheduleTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-person</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog("")}>
              Cancel
            </Button>
            <Button onClick={handleReschedule}>
              Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorAppointments;
