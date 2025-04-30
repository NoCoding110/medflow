
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Check, X, Video, MessageSquare, RefreshCw } from "lucide-react";
import { handleActionWithToast, formatDateTime } from "@/lib/portal-utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patientName: "John Smith",
      patientId: "P1001",
      date: new Date(new Date().setHours(10, 0, 0)),
      reason: "Annual Check-up",
      status: "scheduled",
      isVirtual: false,
      notes: ""
    },
    {
      id: "2",
      patientName: "Emily Johnson",
      patientId: "P1002",
      date: new Date(new Date().setHours(11, 30, 0)),
      reason: "Follow-up Consultation",
      status: "scheduled",
      isVirtual: true,
      notes: ""
    },
    {
      id: "3",
      patientName: "Michael Brown",
      patientId: "P1003",
      date: new Date(new Date().setHours(14, 0, 0)),
      reason: "Blood Pressure Check",
      status: "scheduled",
      isVirtual: false,
      notes: ""
    },
    {
      id: "4",
      patientName: "Sarah Wilson",
      patientId: "P1004",
      date: new Date(new Date().setHours(15, 30, 0)),
      reason: "Medication Review",
      status: "scheduled",
      isVirtual: true,
      notes: ""
    }
  ]);
  
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-person");

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
                  date: newDate,
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

  const upcomingAppointments = appointments.filter(a => a.status === "scheduled");
  const completedAppointments = appointments.filter(a => a.status === "completed");
  const cancelledAppointments = appointments.filter(a => a.status === "cancelled");

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Appointments</h1>
      
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
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
