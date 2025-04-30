
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAppointments, getPatientById } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import AppointmentForm from "@/components/AppointmentForm";
import {
  PlusCircle,
  Calendar as CalendarIcon,
  Clock,
  User,
} from "lucide-react";

const Appointments = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<"day" | "week" | "month">("day");

  // Filter appointments by doctor (in a real app, this would be API-based)
  const doctorAppointments = mockAppointments.filter(
    (appointment) => appointment.doctorId === user?.id
  );

  // Filter appointments for the selected date
  const selectedDateStr = date ? date.toISOString().split("T")[0] : "";
  const appointmentsForSelectedDate = doctorAppointments.filter(
    (appointment) => appointment.date === selectedDateStr
  );

  // Helper to group appointments by status
  const getAppointmentsByStatus = (status: string) => {
    return appointmentsForSelectedDate.filter((a) => a.status === status);
  };

  // Get counts
  const scheduledCount = getAppointmentsByStatus("Scheduled").length;
  const completedCount = getAppointmentsByStatus("Completed").length;
  const cancelledCount = getAppointmentsByStatus("Cancelled").length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Manage your patient appointments
            </p>
          </div>
          <div>
            <Button onClick={() => setShowForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Calendar and Appointments */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Calendar */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="pb-6 pt-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Appointments for selected date */}
          <div className="space-y-6 lg:col-span-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {date
                    ? date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Select a date"}
                </h2>
                <p className="text-muted-foreground">
                  {appointmentsForSelectedDate.length} appointments
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={view} onValueChange={(v) => setView(v as any)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" asChild>
                  <Link to="/appointments/new">
                    <PlusCircle className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">All ({appointmentsForSelectedDate.length})</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled ({scheduledCount})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({cancelledCount})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="pt-4">
                <AppointmentList appointments={appointmentsForSelectedDate} />
              </TabsContent>
              
              <TabsContent value="scheduled" className="pt-4">
                <AppointmentList appointments={getAppointmentsByStatus("Scheduled")} />
              </TabsContent>
              
              <TabsContent value="completed" className="pt-4">
                <AppointmentList appointments={getAppointmentsByStatus("Completed")} />
              </TabsContent>
              
              <TabsContent value="cancelled" className="pt-4">
                <AppointmentList appointments={getAppointmentsByStatus("Cancelled")} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Appointment Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">Schedule New Appointment</h2>
            <AppointmentForm
              onSubmit={() => setShowForm(false)}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

// Helper component to display appointment list
const AppointmentList = ({ appointments }: { appointments: any[] }) => {
  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <CalendarIcon className="h-8 w-8 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No appointments found</h3>
        <p className="mt-2 text-muted-foreground">
          There are no appointments scheduled for the selected filters.
        </p>
        <Button asChild className="mt-4">
          <Link to="/appointments/new">Schedule Appointment</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const patient = getPatientById(appointment.patientId);
        
        const statusColor = {
          "Scheduled": "bg-blue-50 text-blue-700",
          "Completed": "bg-green-50 text-green-700",
          "Cancelled": "bg-red-50 text-red-700",
          "No-show": "bg-amber-50 text-amber-700"
        }[appointment.status] || "bg-gray-50 text-gray-700";
        
        return (
          <Card key={appointment.id} className="overflow-hidden">
            <CardContent className="flex items-start gap-4 p-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link 
                    to={`/patients/${appointment.patientId}`} 
                    className="font-medium hover:underline"
                  >
                    {appointment.patientName}
                  </Link>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {appointment.reason}
                  </div>
                </div>
                
                <div className="mt-2 flex flex-col gap-1 sm:mt-0 sm:items-end">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{appointment.startTime} - {appointment.endTime}</span>
                  </div>
                  <div className={`mt-1 rounded px-2 py-1 text-xs font-medium ${statusColor}`}>
                    {appointment.status}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/patients/${appointment.patientId}`}>
                    View Patient
                  </Link>
                </Button>
                {appointment.status === "Scheduled" && (
                  <Button variant="outline" size="sm">
                    Start Visit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Appointments;
