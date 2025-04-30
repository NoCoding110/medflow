
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const DoctorTelehealth = () => {
  const upcomingAppointments = [
    {
      patientName: "Alice Johnson",
      time: "10:00 AM",
      date: "2025-04-29",
      type: "Follow-up",
      duration: "30 min",
    },
    {
      patientName: "Bob Smith",
      time: "11:30 AM",
      date: "2025-04-29",
      type: "Initial Consultation",
      duration: "45 min",
    },
    {
      patientName: "Carol White",
      time: "2:00 PM",
      date: "2025-04-29",
      type: "Review",
      duration: "30 min",
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Telehealth Platform</h1>
        <Button className="bg-clinical">
          <Video className="h-4 w-4 mr-2" />
          Start New Session
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Sessions
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">3 completed, 5 upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Patients
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Connection Status
            </CardTitle>
            <Settings className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Excellent</div>
            <p className="text-xs text-muted-foreground mt-1">5G Network</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.type} - {appointment.duration}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-medium">{appointment.time}</div>
                    <div className="text-sm text-muted-foreground">{appointment.date}</div>
                  </div>
                  <Button variant="outline" className="ml-4">
                    <Video className="h-4 w-4 mr-2" />
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Send Group Invitation
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Camera</span>
                  <span className="text-green-600">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Microphone</span>
                  <span className="text-green-600">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Network Speed</span>
                  <span className="text-green-600">150 Mbps</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Server Status</span>
                  <span className="text-green-600">Online</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorTelehealth;
