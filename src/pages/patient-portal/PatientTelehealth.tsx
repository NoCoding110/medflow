import React, { useState } from "react";
import { Video, Calendar, Clock, Users, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PatientTelehealth = () => {
  const [systemCheck, setSystemCheck] = useState({
    camera: true,
    microphone: true,
    network: true,
    browser: true
  });

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Telehealth Services</h1>
          <p className="text-muted-foreground mt-1">Connect with your healthcare provider from anywhere</p>
        </div>
        <Button size="lg" className="gap-2">
          <Video className="h-5 w-5" />
          Start New Session
        </Button>
      </div>

      {/* System Status Check */}
      <div className="mb-6">
        <Alert className="bg-blue-50 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <AlertTitle className="text-blue-800">System Check</AlertTitle>
              <AlertDescription className="text-blue-700">
                Ensuring your system is ready for telehealth
              </AlertDescription>
            </div>
            <div className="flex gap-2">
              {systemCheck.camera && <Badge variant="outline" className="bg-green-50">Camera ✓</Badge>}
              {systemCheck.microphone && <Badge variant="outline" className="bg-green-50">Microphone ✓</Badge>}
              {systemCheck.network && <Badge variant="outline" className="bg-green-50">Network ✓</Badge>}
              {systemCheck.browser && <Badge variant="outline" className="bg-green-50">Browser ✓</Badge>}
            </div>
          </div>
        </Alert>
      </div>
      
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="new">Schedule New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-blue-100">
              <CardHeader className="bg-blue-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-600" />
                    <span>Follow-up Consultation</span>
                  </CardTitle>
                  <Badge className="bg-blue-100 text-blue-700">30 min</Badge>
                </div>
                <CardDescription>
                  Dr. Sarah Johnson • May 10, 2025 • 2:00 PM
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span>May 10, 2025</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span>2:00 PM - 2:30 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Dr. Sarah Johnson (Cardiology)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Video className="mr-2 h-4 w-4" />
                  Join Session
                </Button>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1">Reschedule</Button>
                  <Button variant="outline" className="flex-1 text-red-500">Cancel</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-600">
                  <Video className="h-5 w-5" />
                  <span>Monthly Check-up</span>
                </CardTitle>
                <CardDescription>
                  Dr. Michael Chen • April 15, 2025 • 10:00 AM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Session Summary</p>
                  <p className="text-sm text-gray-500">
                    Patient reports feeling better. Blood pressure has normalized. Continue current 
                    medication regimen and follow up in 30 days.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1">View Recording</Button>
                  <Button variant="outline" className="flex-1">View Summary</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Telehealth Session</CardTitle>
              <CardDescription>
                Connect with your healthcare provider from the comfort of your home
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  Select a reason for your visit and choose an available time slot. 
                  All telehealth sessions are conducted through our secure, HIPAA-compliant video platform.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                  <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center hover:bg-blue-50 hover:border-blue-200">
                    <div className="p-2 bg-blue-50 rounded-full mb-2">
                      <Video className="h-6 w-6 text-blue-600" />
                    </div>
                    <span>Regular Check-up</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center hover:bg-blue-50 hover:border-blue-200">
                    <div className="p-2 bg-blue-50 rounded-full mb-2">
                      <Video className="h-6 w-6 text-blue-600" />
                    </div>
                    <span>Medication Refill</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center hover:bg-blue-50 hover:border-blue-200">
                    <div className="p-2 bg-blue-50 rounded-full mb-2">
                      <Video className="h-6 w-6 text-blue-600" />
                    </div>
                    <span>New Symptoms</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Continue to Scheduling</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientTelehealth;
