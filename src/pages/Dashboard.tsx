
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth"; // Path stays the same, TypeScript will resolve it
import { 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { 
  mockAppointments,
  mockPatients,
  mockNotes,
  formatPatientName,
  getPatientById
} from "@/lib/data";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get today's appointments (in a real app, this would come from an API)
  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = mockAppointments.filter(
    appointment => appointment.date === today && appointment.doctorId === user?.id
  );
  
  // Get upcoming appointments (future appointments)
  const upcomingAppointments = mockAppointments.filter(
    appointment => appointment.date > today && appointment.doctorId === user?.id
  ).slice(0, 3); // Take only 3 for display
  
  // Get recent notes
  const recentNotes = mockNotes
    .filter(note => note.doctorId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate("/patients/new")}>
              Add New Patient
            </Button>
            <Button variant="outline" onClick={() => navigate("/appointments/new")}>
              Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Welcome message */}
        <Card className="border-clinical/20 bg-clinical/5">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="h-12 w-12 rounded-full bg-clinical flex items-center justify-center text-white">
              {user?.name.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm font-medium">Welcome back,</p>
              <h3 className="text-xl font-bold">{user?.name || "Doctor"}</h3>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPatients.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 new this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                {todaysAppointments.length} scheduled for today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Notes Created</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockNotes.length}</div>
              <p className="text-xs text-muted-foreground">
                {recentNotes.length} in the last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Action Items</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 require immediate attention
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Today's Appointments */}
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Appointments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/appointments" className="flex items-center gap-1">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {todaysAppointments.length === 0 ? (
                <div className="flex h-[150px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-3 text-lg font-medium">No Appointments Today</h3>
                  <p className="text-sm text-muted-foreground">
                    You have no scheduled appointments for today.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => {
                    const patient = getPatientById(appointment.patientId);
                    return (
                      <div 
                        key={appointment.id} 
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-semibold text-primary">
                              {patient?.firstName.charAt(0)}{patient?.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">
                              <Link to={`/patients/${patient?.id}`} className="hover:underline">
                                {formatPatientName(patient!)}
                              </Link>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.reason}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right text-sm">
                            <div>{appointment.startTime} - {appointment.endTime}</div>
                            <div className="text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/patients/${patient?.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {todaysAppointments.length > 0 && (
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/appointments">View All Appointments</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Notes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Notes</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/documents" className="flex items-center gap-1">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotes.length === 0 ? (
                  <div className="flex h-[150px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No Recent Notes</h3>
                    <p className="text-sm text-muted-foreground">
                      You haven't created any notes recently.
                    </p>
                  </div>
                ) : (
                  recentNotes.map((note) => {
                    const patient = getPatientById(note.patientId);
                    return (
                      <div 
                        key={note.id} 
                        className="rounded-lg border p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{note.title}</div>
                          <div className="rounded bg-secondary px-1.5 py-0.5 text-xs">
                            {note.type}
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          <Link to={`/patients/${patient?.id}`} className="hover:underline">
                            {formatPatientName(patient!)}
                          </Link>
                        </div>
                        <div className="mt-2 line-clamp-2 text-sm">
                          {note.content}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {new Date(note.createdAt).toLocaleDateString()} at {
                            new Date(note.createdAt).toLocaleTimeString(undefined, { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })
                          }
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Appointments */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {upcomingAppointments.map((appointment) => {
                  const patient = getPatientById(appointment.patientId);
                  return (
                    <div
                      key={appointment.id}
                      className="rounded-lg border bg-card p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">
                          <Link to={`/patients/${patient?.id}`} className="hover:underline">
                            {formatPatientName(patient!)}
                          </Link>
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="mt-2 text-sm font-medium">{appointment.reason}</div>
                      <div className="mt-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{appointment.startTime} - {appointment.endTime}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Button size="sm" variant="outline" className="w-full" asChild>
                          <Link to={`/patients/${patient?.id}`}>Patient Details</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
