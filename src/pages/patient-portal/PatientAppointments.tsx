import React, { useEffect, useState, useMemo } from "react";
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
  Search,
  Check,
  RefreshCw,
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
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getDoctorById } from "@/lib/services/doctor-service";

const statusOptions = [
  { value: "all", label: "All" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no-show", label: "No Show" },
];

const tabs = [
  { key: "scheduled", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "no-show", label: "No Show" },
];

const PatientAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<"date" | "time">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [tab, setTab] = useState("scheduled");
  const [doctorMap, setDoctorMap] = useState<Record<string, { name: string; specialization: string }>>({});
  // Dialog/modal state
  const [rescheduleDialog, setRescheduleDialog] = useState<{ open: boolean; appointment: Appointment | null }>({ open: false, appointment: null });
  const [telehealthDialog, setTelehealthDialog] = useState<{ open: boolean; appointment: Appointment | null }>({ open: false, appointment: null });
  const [reportDialog, setReportDialog] = useState<{ open: boolean; appointment: Appointment | null }>({ open: false, appointment: null });

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getAppointments(user.id, "patient")
      .then((data) => {
        setAppointments(data);
        setError(null);
        // Fetch doctor info for all unique doctorIds
        const uniqueDoctorIds = Array.from(new Set(data.map((a) => a.doctorId)));
        Promise.all(uniqueDoctorIds.map((id) => getDoctorById(id)))
          .then((doctors) => {
            const map: Record<string, { name: string; specialization: string }> = {};
            doctors.forEach((doc) => {
              if (doc) map[doc.id] = { name: `${doc.firstName} ${doc.lastName}`, specialization: doc.specialization };
            });
            setDoctorMap(map);
          });
      })
      .catch((err) => {
        setError(err.message || "Failed to load appointments");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const filtered = useMemo(() => {
    let data = [...appointments];
    if (statusFilter !== "all") data = data.filter((a) => a.status === statusFilter);
    if (search)
      data = data.filter(
        (a) =>
          (doctorMap[a.doctorId]?.name.toLowerCase().includes(search.toLowerCase())) ||
          (a.notes && a.notes.toLowerCase().includes(search.toLowerCase()))
      );
    data.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") {
        cmp = a.date.localeCompare(b.date);
      } else {
        cmp = a.time.localeCompare(b.time);
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [appointments, statusFilter, search, sortKey, sortDir, doctorMap]);

  const tabAppointments = filtered.filter((a) => a.status === tab);

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
  const handleReschedule = (appointment: Appointment) => {
    setRescheduleDialog({ open: true, appointment });
  };
  const handleTelehealth = (appointment: Appointment) => {
    setTelehealthDialog({ open: true, appointment });
  };
  const handleViewReport = (appointment: Appointment) => {
    setReportDialog({ open: true, appointment });
  };
  const handleNewAppointment = () => {
    alert("New appointment booking coming soon!");
  };
  const handleSort = (key: "date" | "time") => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else setSortKey(key);
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage your scheduled appointments and book new ones</p>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search by doctor or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
          />
          <Button className="gap-1.5" onClick={handleNewAppointment}>
            <Plus className="h-4 w-4" /> New Appointment
          </Button>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <label className="text-sm font-medium">Status:</label>
        {statusOptions.map((opt) => (
          <Button
            key={opt.value}
            size="sm"
            variant={statusFilter === opt.value ? "default" : "outline"}
            onClick={() => setStatusFilter(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
        <label className="ml-4 text-sm font-medium">Sort by:</label>
        <Button
          size="sm"
          variant={sortKey === "date" ? "default" : "outline"}
          onClick={() => handleSort("date")}
        >
          Date {sortKey === "date" && (sortDir === "asc" ? "↑" : "↓")}
        </Button>
        <Button
          size="sm"
          variant={sortKey === "time" ? "default" : "outline"}
          onClick={() => handleSort("time")}
        >
          Time {sortKey === "time" && (sortDir === "asc" ? "↑" : "↓")}
        </Button>
      </div>
      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Loading appointments...</div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">{error}</div>
      ) : (
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4 md:w-auto">
            {tabs.map((t) => (
              <TabsTrigger key={t.key} value={t.key}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.key} value={t.key} className="space-y-4">
              {tabAppointments.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No {t.label.toLowerCase()} appointments.
                </div>
              ) : (
                tabAppointments.map((a) => (
                  <Card key={a.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className={`mb-2 capitalize ${a.status === "scheduled" ? "bg-blue-500" : a.status === "completed" ? "bg-green-500" : a.status === "cancelled" ? "bg-red-500" : "bg-gray-500"}`}>{a.type}</Badge>
                          <CardTitle>{doctorMap[a.doctorId]?.name || a.doctorId}</CardTitle>
                          <CardDescription>{doctorMap[a.doctorId]?.specialization || "Doctor"}</CardDescription>
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
                      <div className="my-2 border-t pt-4">
                        <div className="font-medium">Notes:</div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {a.notes || "No notes available."}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4">
                        <Button size="sm" variant="outline" onClick={() => handleReschedule(a)} disabled={actionLoading === a.id}>
                          Reschedule
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleCancel(a.id)} disabled={actionLoading === a.id}>
                          <X className="mr-1 h-4 w-4" />
                          {actionLoading === a.id ? "Cancelling..." : "Cancel"}
                        </Button>
                        <Button size="sm" className="gap-1.5" onClick={() => handleTelehealth(a)}>
                          <Video className="h-4 w-4" /> Start Telehealth
                        </Button>
                        <Button size="sm" className="gap-1.5" onClick={() => handleViewReport(a)}>
                          View Full Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialog.open} onOpenChange={(open) => setRescheduleDialog({ open, appointment: open ? rescheduleDialog.appointment : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
          </DialogHeader>
          <div>
            {rescheduleDialog.appointment && (
              <>
                <div className="mb-2">Doctor: {doctorMap[rescheduleDialog.appointment.doctorId]?.name || rescheduleDialog.appointment.doctorId}</div>
                <div className="mb-2">Current Date: {rescheduleDialog.appointment.date}</div>
                <div className="mb-2">Current Time: {rescheduleDialog.appointment.time}</div>
                {/* Add form fields for new date/time here */}
                <Input placeholder="New date (YYYY-MM-DD)" className="mb-2" />
                <Input placeholder="New time (HH:MM)" className="mb-2" />
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setRescheduleDialog({ open: false, appointment: null })} variant="outline">Cancel</Button>
            <Button disabled>Reschedule (Coming Soon)</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Telehealth Dialog */}
      <Dialog open={telehealthDialog.open} onOpenChange={(open) => setTelehealthDialog({ open, appointment: open ? telehealthDialog.appointment : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Telehealth</DialogTitle>
          </DialogHeader>
          <div>
            {telehealthDialog.appointment && (
              <>
                <div className="mb-2">Doctor: {doctorMap[telehealthDialog.appointment.doctorId]?.name || telehealthDialog.appointment.doctorId}</div>
                <div className="mb-2">Date: {telehealthDialog.appointment.date}</div>
                <div className="mb-2">Time: {telehealthDialog.appointment.time}</div>
                <div className="mb-2">(Telehealth link coming soon)</div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setTelehealthDialog({ open: false, appointment: null })} variant="outline">Close</Button>
            <Button disabled>Join Call (Coming Soon)</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* View Report Dialog */}
      <Dialog open={reportDialog.open} onOpenChange={(open) => setReportDialog({ open, appointment: open ? reportDialog.appointment : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Report</DialogTitle>
          </DialogHeader>
          <div>
            {reportDialog.appointment && (
              <>
                <div className="mb-2">Doctor: {doctorMap[reportDialog.appointment.doctorId]?.name || reportDialog.appointment.doctorId}</div>
                <div className="mb-2">Date: {reportDialog.appointment.date}</div>
                <div className="mb-2">Time: {reportDialog.appointment.time}</div>
                <div className="mb-2">Notes: {reportDialog.appointment.notes || "No notes available."}</div>
                <div className="mb-2">(Full report details coming soon)</div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setReportDialog({ open: false, appointment: null })} variant="outline">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientAppointments;
