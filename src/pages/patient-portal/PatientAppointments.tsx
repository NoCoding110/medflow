
import React from "react";
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

const PatientAppointments = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your scheduled appointments and book new ones
          </p>
        </div>
        <Button className="gap-1.5">
          <Plus className="h-4 w-4" /> New Appointment
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2 bg-blue-500">Annual Check-up</Badge>
                  <CardTitle>Dr. Sarah Johnson</CardTitle>
                  <CardDescription>General Practitioner</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                    <Calendar className="h-4 w-4" />
                    <span>May 5, 2025</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>10:00 AM - 10:30 AM</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Main Clinic, Room 305</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">123-456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">reception@medflow.com</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <Button size="sm" variant="outline">
                  Reschedule
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500">
                  <X className="mr-1 h-4 w-4" /> Cancel
                </Button>
                <Button size="sm" className="ml-auto gap-1.5">
                  <Video className="h-4 w-4" /> Start Telehealth
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2 bg-green-500">Follow-up</Badge>
                  <CardTitle>Dr. Michael Chen</CardTitle>
                  <CardDescription>Cardiologist</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                    <Calendar className="h-4 w-4" />
                    <span>June 15, 2025</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>2:00 PM - 2:30 PM</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Cardiology Dept, Room 210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">123-456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">cardio@medflow.com</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <Button size="sm" variant="outline">
                  Reschedule
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500">
                  <X className="mr-1 h-4 w-4" /> Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2 bg-gray-500">Annual Check-up</Badge>
                  <CardTitle>Dr. Sarah Johnson</CardTitle>
                  <CardDescription>General Practitioner</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    <span>February 15, 2025</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>9:00 AM - 9:30 AM</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="my-2 border-t pt-4">
                <div className="font-medium">Doctor's Notes:</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Patient came in for annual physical. Vitals are stable.
                  Blood pressure: 120/80, Heart rate: 72 bpm, Weight: 165 lbs.
                  Recommended to maintain current medication and follow up in 3 months.
                </p>
              </div>
              <div className="mt-4">
                <Button size="sm" variant="outline">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientAppointments;
