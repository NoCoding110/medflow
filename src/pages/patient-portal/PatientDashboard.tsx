import React, { useEffect, useState } from "react";
import { Calendar as CalendarIcon, FileText, Pill, Activity, Heart, Bell, CreditCard, 
  TrendingUp, ChevronRight, Plus, Users, MessageSquare, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

// Type definitions
interface PatientAppointment {
  id: string;
  date: string;
  time: string;
  type: string;
  doctor: {
    firstName: string;
    lastName: string;
    specialty: string;
    avatar?: string;
  };
  status: 'upcoming' | 'completed' | 'cancelled';
  virtual: boolean;
}

interface PatientPrescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  refills: number;
  status: 'active' | 'expired' | 'pending';
  prescribed: string;
  expires: string;
}

interface PatientVisit {
  id: string;
  date: string;
  type: string;
  doctor: {
    firstName: string;
    lastName: string;
    specialty: string;
  };
  vitals: {
    bloodPressure: string;
    heartRate: number;
    weight: number;
  };
  notes?: string;
}

interface PatientHealthScore {
  score: number;
  trend: 'up' | 'down' | 'stable';
  details: {
    activity: number;
    nutrition: number;
    sleep: number;
    mentalHealth: number;
  };
  recommendations: string[];
}

interface PatientAIInsight {
  id: string;
  type: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

// Health Metrics Chart Component
const HealthMetricsChart = ({ healthScore }: { healthScore: PatientHealthScore | null }) => {
  if (!healthScore) return <div className="p-6 text-center text-muted-foreground">No health data available</div>;
  
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">Overall Health</span>
          </div>
          <span className="text-sm font-medium">{healthScore.score}%</span>
        </div>
        <Progress value={healthScore.score} className="h-2" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium">Activity</span>
          </div>
          <span className="text-sm font-medium">{healthScore.details.activity}%</span>
        </div>
        <Progress value={healthScore.details.activity} className="h-2" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Nutrition</span>
          </div>
          <span className="text-sm font-medium">{healthScore.details.nutrition}%</span>
        </div>
        <Progress value={healthScore.details.nutrition} className="h-2" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Sleep</span>
          </div>
          <span className="text-sm font-medium">{healthScore.details.sleep}%</span>
        </div>
        <Progress value={healthScore.details.sleep} className="h-2" />
      </div>
    </div>
  );
};

// Main Dashboard Component
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
      const unsubscribe = subscribeToPatientUpdates(user.id, () => {
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
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your health data...</p>
        </div>
      </div>
    );
  }

  const nextAppointment = appointments.find(app => new Date(app.date) > new Date());
  const recentVisit = visits[0];
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Good {getTimeOfDay()}, {user?.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground">
            Welcome to your MedFlow patient portal - your health, simplified.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/patient/appointments">
              <Plus className="mr-2 h-4 w-4" /> New Appointment
            </Link>
          </Button>
          <Button asChild variant="default" size="sm">
            <Link to="/patient/messages">
              <MessageSquare className="mr-2 h-4 w-4" /> Message Provider
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health Tracking</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Upcoming Appointment Card */}
          {nextAppointment && (
            <Card className="shadow-sm hover-card">
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {nextAppointment.virtual ? 
                      <Video className="h-5 w-5 text-primary" /> : 
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    }
                    <span>Your Next Appointment</span>
                  </div>
                  <Badge variant="outline">{new Date(nextAppointment.date).toLocaleDateString()}</Badge>
                </CardTitle>
                <CardDescription>
                  {nextAppointment.virtual ? "Telehealth Visit" : "In-Office Visit"} • {nextAppointment.time}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={nextAppointment.doctor.avatar} alt={`Dr. ${nextAppointment.doctor.lastName}`} />
                    <AvatarFallback>{nextAppointment.doctor.firstName[0]}{nextAppointment.doctor.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Dr. {nextAppointment.doctor.firstName} {nextAppointment.doctor.lastName}</div>
                    <div className="text-sm text-muted-foreground">{nextAppointment.doctor.specialty}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                {nextAppointment.virtual && (
                  <Button size="sm" variant="default" asChild>
                    <Link to="/patient/telehealth">Join Session</Link>
                  </Button>
                )}
                <Button size="sm" variant={nextAppointment.virtual ? "outline" : "default"} asChild>
                  <Link to="/patient/appointments">View Details</Link>
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive">
                  Reschedule
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Quick Access Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Prescriptions Card */}
            <Card className="shadow-sm hover-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Pill className="h-5 w-5 text-green-600" />
                  <span>Prescriptions</span>
                </CardTitle>
                <CardDescription>Manage your medications</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                {activePrescriptions.length > 0 ? (
                  <div className="space-y-2">
                    {activePrescriptions.slice(0, 2).map(prescription => (
                      <div key={prescription.id} className="border-b pb-2 last:border-0">
                        <div className="font-medium">{prescription.medication}</div>
                        <div className="text-xs text-muted-foreground">
                          {prescription.dosage} • {prescription.frequency}
                        </div>
                      </div>
                    ))}
                    {activePrescriptions.length > 2 && (
                      <div className="text-xs text-primary font-medium pt-1">
                        +{activePrescriptions.length - 2} more medications
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground py-2">No active prescriptions</div>
                )}
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link to="/patient/prescriptions">
                    <span>Manage Medications</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Medical Records Card */}
            <Card className="shadow-sm hover-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Medical Records</span>
                </CardTitle>
                <CardDescription>Access your health documents</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                {recentVisit ? (
                  <div className="space-y-2">
                    <div className="border-b pb-2">
                      <div className="font-medium">Last Visit: {recentVisit.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(recentVisit.date).toLocaleDateString()} with Dr. {recentVisit.doctor.lastName}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="outline" className="bg-blue-50">Lab Results</Badge>
                      <Badge variant="outline" className="bg-green-50">Visit Notes</Badge>
                      <Badge variant="outline" className="bg-amber-50">Treatment Plan</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground py-2">No recent visits</div>
                )}
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link to="/patient/records">
                    <span>View Medical Records</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Billing Card */}
            <Card className="shadow-sm hover-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <span>Billing</span>
                </CardTitle>
                <CardDescription>Manage payments and insurance</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-2">
                  <div className="flex justify-between pb-2">
                    <div className="text-sm">Current Balance:</div>
                    <div className="font-medium">$45.00</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm">Insurance:</div>
                    <div className="text-sm">MedCare Plus</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link to="/patient/billing">
                    <span>View Billing Details</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Family Access Section */}
          <Card className="shadow-sm hover-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <span>Family Access</span>
              </CardTitle>
              <CardDescription>Manage family members and caregivers</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 rounded-lg border p-3">
                  <div className="font-medium mb-1">Connected Family</div>
                  <div className="text-sm text-muted-foreground mb-2">Share and manage health information</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">John Doe (Spouse)</div>
                  </div>
                </div>
                <div className="flex-1 rounded-lg border p-3">
                  <div className="font-medium mb-1">Child Accounts</div>
                  <div className="text-sm text-muted-foreground mb-2">Manage your children's health</div>
                  <Button size="sm" variant="outline" className="w-full mt-1">
                    <Plus className="mr-1 h-4 w-4" /> Add Child Account
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link to="/patient/family">
                  <span>Manage Family Access</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Health Tracking Tab */}
        <TabsContent value="health" className="space-y-6">
          {/* Health Score Card */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Your Health Score</span>
                </CardTitle>
                <CardDescription>An overview of your current health status</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                {healthScore ? (
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative flex h-40 w-40 flex-shrink-0 items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-muted stroke-current"
                          strokeWidth="8"
                          strokeLinecap="round"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={`${
                            healthScore.score >= 80 ? 'text-green-500' :
                            healthScore.score >= 60 ? 'text-amber-500' :
                            'text-red-500'
                          } stroke-current`}
                          strokeWidth="8"
                          strokeLinecap="round"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                          strokeDasharray={`${healthScore.score * 2.64}, 1000`}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold">{healthScore.score}</span>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Health Score</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <HealthMetricsChart healthScore={healthScore} />
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">No health score available</div>
                )}
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/patient/vitals">View Detailed Health Data</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Health Recommendations Card */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Personalized Recommendations</span>
                </CardTitle>
                <CardDescription>Based on your health data and goals</CardDescription>
              </CardHeader>
              <CardContent>
                {healthScore?.recommendations ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {healthScore.recommendations.map((recommendation, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex flex-col items-center justify-center p-6">
                                <span className="text-3xl font-semibold mb-4">Tip #{index + 1}</span>
                                <p className="text-center text-muted-foreground">{recommendation}</p>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center py-2">
                      <CarouselPrevious className="relative left-0 -translate-y-0 translate-x-0" />
                      <CarouselNext className="relative right-0 -translate-y-0 translate-x-0" />
                    </div>
                  </Carousel>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">No recommendations available</div>
                )}
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/patient/nutrition">Nutrition Plan</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/patient/exercise">Exercise Tracker</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* AI Insights Tab */}
        <TabsContent value="insights">
          {aiInsights.length > 0 ? (
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <Card key={insight.id} className={`shadow-sm border-l-4 ${
                  insight.priority === 'high' ? 'border-l-red-500' :
                  insight.priority === 'medium' ? 'border-l-amber-500' :
                  'border-l-green-500'
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{insight.type}</CardTitle>
                      <Badge variant={
                        insight.priority === 'high' ? 'destructive' :
                        insight.priority === 'medium' ? 'default' :
                        'outline'
                      }>{insight.priority} priority</Badge>
                    </div>
                    <CardDescription>{new Date(insight.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{insight.message}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button variant="outline" size="sm">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No AI Insights Yet</h3>
                <p className="text-center text-muted-foreground max-w-md mb-6">
                  AI insights will appear here as you continue to use the platform and add more health data.
                </p>
                <Button variant="default" asChild>
                  <Link to="/patient/health-assistant">Try Health Assistant</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
