import React, { useEffect, useState } from "react";
import { Calendar, FileText, Pill } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HealthChallenges from "@/components/patient-portal/HealthChallenges";
import FuturisticFeatures from "@/components/patient-portal/FuturisticFeatures";
import {
  getPatientAppointments,
  getPatientPrescriptions,
  getPatientVisits,
  getPatientHealthScore,
  getPatientAIInsights,
  PatientAppointment,
  PatientPrescription,
  PatientVisit,
  PatientHealthScore,
  PatientAIInsight,
  subscribeToPatientUpdates
} from "@/lib/services/patient-service";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<PatientPrescription[]>([]);
  const [visits, setVisits] = useState<PatientVisit[]>([]);
  const [healthScore, setHealthScore] = useState<PatientHealthScore | null>(null);
  const [aiInsights, setAiInsights] = useState<PatientAIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      
      try {
        const [appointmentsData, prescriptionsData, visitsData, healthScoreData, aiInsightsData] = await Promise.all([
          getPatientAppointments(user.id),
          getPatientPrescriptions(user.id),
          getPatientVisits(user.id),
          getPatientHealthScore(user.id),
          getPatientAIInsights(user.id)
        ]);

        setAppointments(appointmentsData);
        setPrescriptions(prescriptionsData);
        setVisits(visitsData);
        setHealthScore(healthScoreData);
        setAiInsights(aiInsightsData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Subscribe to real-time updates
    if (user?.id) {
      const unsubscribe = subscribeToPatientUpdates(user.id, (payload) => {
        // Handle real-time updates
        console.log("Real-time update:", payload);
        fetchData(); // Refresh data when updates occur
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user?.id]);

  // Get time of day for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const nextAppointment = appointments.find(app => new Date(app.date) > new Date());
  const recentVisit = visits[0];
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');

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
                {nextAppointment ? (
                  <>
                    <div className="text-lg font-medium">{nextAppointment.type}</div>
                    <div className="text-sm text-gray-500">
                      Dr. {nextAppointment.doctor?.firstName} {nextAppointment.doctor?.lastName} • {new Date(nextAppointment.date).toLocaleDateString()} • {nextAppointment.time}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">No upcoming appointments</div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3">
                <Button size="sm" variant="outline" asChild>
                  <Link to="/patient/appointments">Schedule</Link>
                </Button>
                {nextAppointment && (
                  <Button size="sm" variant="ghost" className="text-red-500">
                    Cancel
                  </Button>
                )}
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
                {activePrescriptions.length > 0 ? (
                  <div className="space-y-2">
                    {activePrescriptions.map(prescription => (
                      <div key={prescription.id}>
                        <div className="font-medium">{prescription.medication}</div>
                        <div className="text-sm text-gray-500">
                          {prescription.dosage} • {prescription.frequency} • {prescription.refills} refills remaining
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No active prescriptions</div>
                )}
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
                {recentVisit ? (
                  <div>
                    <div className="font-medium">{recentVisit.type}</div>
                    <div className="text-sm text-gray-500">
                      Dr. {recentVisit.doctor?.firstName} {recentVisit.doctor?.lastName} • {new Date(recentVisit.date).toLocaleDateString()}
                    </div>
                    <div className="mt-2 text-sm">
                      Blood pressure: {recentVisit.vitals.bloodPressure}, Heart rate: {recentVisit.vitals.heartRate} bpm, Weight: {recentVisit.vitals.weight} lbs
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No recent visits</div>
                )}
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
                {healthScore ? (
                  <>
                    <div className="flex items-center justify-center p-4">
                      <div className={`relative flex h-32 w-32 items-center justify-center rounded-full border-8 ${
                        healthScore.score >= 80 ? 'border-green-500' :
                        healthScore.score >= 60 ? 'border-yellow-500' :
                        'border-red-500'
                      }`}>
                        <span className="text-3xl font-bold">{healthScore.score}</span>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-center">
                      {healthScore.trend === 'up' ? 'Your health score is improving!' :
                       healthScore.trend === 'down' ? 'Your health score needs attention.' :
                       'Your health score is stable.'}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500 text-center">No health score available</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Wellness Tip</CardTitle>
              </CardHeader>
              <CardContent>
                {aiInsights.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Based on your recent health data, our AI suggests:
                    </p>
                    <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
                      <p>{aiInsights[0].message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No AI insights available</div>
                )}
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
