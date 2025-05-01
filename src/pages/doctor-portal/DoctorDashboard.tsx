import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Calendar, Clock, Users, MessageSquare, Bell, Activity, FileText } from "lucide-react";
import { mockAppointments, mockPatients } from "@/lib/data/mock-data";
import MessageDialog, { Message } from "@/components/MessageDialog";
import { toast } from "sonner";
import PatientDialog from "@/components/PatientDialog";
import { Patient } from "@/lib/types/patient";
import AlertDialog, { Alert } from "@/components/AlertDialog";

interface Task {
  id: string;
  text: string;
  completed: boolean;
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-purple-600" /> 
              Today's Appointments
            </CardTitle>
            <CardDescription>{selectedDateAppointments.length} scheduled for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDateAppointments.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No appointments scheduled for today
                </div>
              ) : (
                selectedDateAppointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.startTime} - {appointment.reason}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      formatTime(appointment.startTime) === 'Past'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {formatTime(appointment.startTime)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="mr-2 h-5 w-5 text-purple-600" /> 
              Critical Alerts
            </CardTitle>
            <CardDescription>3 items need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => handleAlertClick(alert)}
                  className="w-full flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition-colors text-left"
                >
                  <div className={`h-2 w-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="mr-2 h-5 w-5 text-purple-600" /> 
              Patient Insights
            </CardTitle>
            <CardDescription>AI-powered summaries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockInsights.map((insight) => (
                <button
                  key={insight.id}
                  onClick={() => handleAlertClick(insight)}
                  className="w-full flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition-colors text-left"
                >
                  <div className={`h-8 w-8 rounded-full ${
                    insight.severity === 'high' ? 'bg-red-100 text-red-700' :
                    insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  } flex items-center justify-center`}>
                    AI
                  </div>
                  <div>
                    <p className="font-medium">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-600" /> 
              Recent Patients
            </CardTitle>
            <CardDescription>Last 5 patient interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Emma Johnson", date: "Today, 9:15 AM", reason: "Annual checkup", status: "Completed" },
                { name: "Michael Brown", date: "Today, 8:30 AM", reason: "Prescription refill", status: "Completed" },
                { name: "Sophia Martinez", date: "Yesterday", reason: "Follow-up", status: "Completed" },
                { name: "William Taylor", date: "Yesterday", reason: "Lab results", status: "Completed" },
                { name: "Olivia Davis", date: "Apr 25, 2025", reason: "New patient", status: "Completed" }
              ].map((patient, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <button
                        onClick={() => handlePatientClick(patient.name)}
                        className="font-medium hover:text-purple-600 transition-colors text-left"
                      >
                        {patient.name}
                      </button>
                      <p className="text-sm text-muted-foreground">{patient.reason}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{patient.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-purple-600" /> 
              Message Center
            </CardTitle>
            <CardDescription>Recent messages and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <button
                  key={message.id}
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                    {message.type === 'nurse' && <MessageSquare className="h-5 w-5" />}
                    {message.type === 'system' && <FileText className="h-5 w-5" />}
                    {message.type === 'patient' && <Users className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{message.sender}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: 'numeric', 
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Schedule This Week</CardTitle>
            <CardDescription>Upcoming appointments and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center font-medium">{day}</div>
                ))}
                {weeklyAppointmentCounts.map(({ date, count }, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square border rounded-md flex flex-col items-center justify-center p-1 hover:bg-gray-50 transition-colors ${
                      date.toDateString() === selectedDate.toDateString()
                        ? 'bg-blue-100 border-blue-300'
                        : date.toDateString() === today.toDateString()
                        ? 'bg-blue-50 border-blue-200'
                        : ''
                    }`}
                  >
                    <p className="text-sm font-semibold">{date.getDate()}</p>
                    <p className="text-xs text-muted-foreground">{count}</p>
                  </button>
                ))}
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">
                  Appointments for {selectedDate.toLocaleDateString()}
                </h3>
                {selectedDateAppointments.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No appointments scheduled</p>
                ) : (
                  <div className="space-y-3">
                    {selectedDateAppointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{apt.patientName}</p>
                          <p className="text-sm text-muted-foreground">{apt.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {formatTime(apt.startTime)} - {formatTime(apt.endTime)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {apt.isVirtual ? 'Telehealth' : 'In-person'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <p className="text-sm">Regular Appointments ({
                    doctorAppointments.filter(apt => !apt.isVirtual).length
                  })</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <p className="text-sm">Telehealth Sessions ({
                    doctorAppointments.filter(apt => apt.isVirtual).length
                  })</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <p className="text-sm">Staff Meetings</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks & Reminders</CardTitle>
            <CardDescription>Pending items for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <p className={task.completed ? 'line-through text-gray-500' : ''}>
                    {task.text}
                  </p>
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
