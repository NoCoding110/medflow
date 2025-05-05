import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Video,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import {
  getAppointments,
  cancelAppointment,
  updateAppointment,
} from "@/lib/services/appointment-service";
import { Appointment } from "@/lib/types/appointment";

const PatientAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // appointment id

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getAppointments(user.id, "patient")
      .then((data) => {
        setAppointments(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Failed to load appointments");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const now = new Date();
  const upcoming = appointments.filter(
    (a) => new Date(`${a.date}T${a.time}`) >= now && a.status === "scheduled"
  );
  const past = appointments.filter(
    (a) => new Date(`${a.date}T${a.time}`) < now || a.status !== "scheduled"
  );

  const handleCancel = async (id: string) => {
    setActionLoading(id);
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
      );
    } catch (err: any) {
      alert(err.message || "Failed to cancel appointment");
    } finally {
      setActionLoading(null);
    }
  };

  // Placeholder for reschedule and telehealth
  const handleReschedule = (appointment: Appointment) => {
    alert("Reschedule functionality coming soon!");
  };
  const handleTelehealth = (appointment: Appointment) => {
    alert("Telehealth functionality coming soon!");
  };
  const handleViewReport = (appointment: Appointment) => {
    alert("View full report functionality coming soon!");
  };
  const handleNewAppointment = () => {
    alert("New appointment booking coming soon!");
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your scheduled appointments and book new ones
          </p>
        </div>
        <Button className="gap-1.5" onClick={handleNewAppointment}>
          <Plus className="h-4 w-4" /> New Appointment
        </Button>
      </div>
      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Loading appointments...</div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">{error}</div>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcoming.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No upcoming appointments.
              </div>
            ) : (
              upcoming.map((a) => (
                <Card key={a.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="mb-2 bg-blue-500 capitalize">{a.type}</Badge>
                        <CardTitle>{a.doctorId}</CardTitle>
                        <CardDescription>Doctor</CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                          <Calendar className="h-4 w-4" />
                          <span>{a.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{a.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2 flex flex-wrap gap-6">
                      {/* Add location, phone, email here if available in the future */}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
                      <Button size="sm" variant="outline" onClick={() => handleReschedule(a)} disabled={actionLoading === a.id}>
                        Reschedule
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleCancel(a.id)} disabled={actionLoading === a.id}>
                        <X className="mr-1 h-4 w-4" />
                        {actionLoading === a.id ? "Cancelling..." : "Cancel"}
                      </Button>
                      <Button size="sm" className="ml-auto gap-1.5" onClick={() => handleTelehealth(a)}>
                        <Video className="h-4 w-4" /> Start Telehealth
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {past.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No past appointments.
              </div>
            ) : (
              past.map((a) => (
                <Card key={a.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="mb-2 bg-gray-500 capitalize">{a.type}</Badge>
                        <CardTitle>{a.doctorId}</CardTitle>
                        <CardDescription>Doctor</CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Calendar className="h-4 w-4" />
                          <span>{a.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{a.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="my-2 border-t pt-4">
                      <div className="font-medium">Doctor's Notes:</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {a.notes || "No notes available."}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewReport(a)}>
                        View Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PatientAppointments;
