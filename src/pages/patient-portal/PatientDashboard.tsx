
import React from "react";
import { Calendar, FileText, Pill } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthChallenges } from "@/components/patient-portal/HealthChallenges";
import { FuturisticFeatures } from "@/components/patient-portal/FuturisticFeatures";

const PatientDashboard = () => {
  const { user } = useAuth();

  // Get time of day for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Good {getTimeOfDay()}, {user?.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Welcome to your MedFlow Connect patient portal
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gamification">Health Challenges</TabsTrigger>
          <TabsTrigger value="ai-features">Advanced Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="bg-blue-50 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Upcoming Appointment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-lg font-medium">Annual Check-up</div>
                <div className="text-sm text-gray-500">
                  Dr. Sarah Johnson • May 5, 2025 • 10:00 AM
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3">
                <Button size="sm" variant="outline" asChild>
                  <Link to="/patient/appointments">Reschedule</Link>
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500">
                  Cancel
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-green-50 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Pill className="h-5 w-5 text-green-600" />
                  <span>Current Prescriptions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div>
                    <div className="font-medium">Lisinopril 10mg</div>
                    <div className="text-sm text-gray-500">
                      1 tablet daily • 3 refills remaining
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Atorvastatin 20mg</div>
                    <div className="text-sm text-gray-500">
                      1 tablet at bedtime • 2 refills remaining
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link to="/patient/prescriptions">Manage Prescriptions</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-amber-50 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-amber-600" />
                  <span>Recent Visit Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div>
                  <div className="font-medium">Annual Physical Exam</div>
                  <div className="text-sm text-gray-500">
                    Dr. Sarah Johnson • February 15, 2025
                  </div>
                  <div className="mt-2 text-sm">
                    Blood pressure: 120/80, Heart rate: 72 bpm, Weight: 165 lbs
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link to="/patient/records">View Medical Records</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-4">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-green-500">
                    <span className="text-3xl font-bold">85</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-center">
                  Your health score is above average for your age group!
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Wellness Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Based on your recent health data, our AI suggests:
                  </p>
                  <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
                    <p>
                      <span className="font-medium">Stay Hydrated:</span> Drinking adequate water can
                      help manage your blood pressure. Aim for 8 glasses daily, especially before and
                      after exercise.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gamification">
          <HealthChallenges />
        </TabsContent>

        <TabsContent value="ai-features">
          <FuturisticFeatures />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
