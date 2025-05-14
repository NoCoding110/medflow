import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Calendar, FileText, Shield, Wrench, MessageSquare, CreditCard, ChevronRight, ArrowRight, Settings, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function PatientPortalWelcome() {
  const navigate = useNavigate();
  const [profileProgress, setProfileProgress] = useState(40);

  interface FeatureCard {
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
  }

  const featureCards: FeatureCard[] = [
    {
      title: "Health Dashboard",
      description: "View your health vitals, metrics, and AI-powered insights",
      icon: <Heart className="h-10 w-10" />,
      path: "/patient",
      color: "text-red-500",
    },
    {
      title: "Appointments",
      description: "Schedule, view, and manage your appointments",
      icon: <Calendar className="h-10 w-10" />,
      path: "/patient/appointments",
      color: "text-blue-500",
    },
    {
      title: "Medical Records",
      description: "Access and download your health documents",
      icon: <FileText className="h-10 w-10" />,
      path: "/patient/records",
      color: "text-amber-500",
    },
    {
      title: "Family Access",
      description: "Manage family accounts and caregivers",
      icon: <Users className="h-10 w-10" />,
      path: "/patient/family",
      color: "text-indigo-500",
    },
    {
      title: "Secure Messaging",
      description: "Communicate with your healthcare providers",
      icon: <MessageSquare className="h-10 w-10" />,
      path: "/patient/messages",
      color: "text-green-500",
    },
    {
      title: "Billing & Insurance",
      description: "View statements and manage payment options",
      icon: <CreditCard className="h-10 w-10" />,
      path: "/patient/billing",
      color: "text-purple-500",
    },
    {
      title: "Health Tracking",
      description: "Monitor your progress and health goals",
      icon: <Activity className="h-10 w-10" />,
      path: "/patient/vitals",
      color: "text-teal-500",
    },
    {
      title: "Account Settings",
      description: "Update your profile and preferences",
      icon: <Settings className="h-10 w-10" />,
      path: "/patient/settings",
      color: "text-gray-500",
    },
  ];

  return (
    <div className="container px-4 py-8 mx-auto max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to Your Health Journey</h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          The MedFlow Patient Portal puts you in control of your healthcare with everything you need in one secure place.
        </p>
      </div>

      {/* Profile Completion Card */}
      <Card className="mb-10 shadow-sm">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>Finish setting up your account to get the most from your patient portal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm font-medium">{profileProgress}%</span>
            </div>
            <Progress value={profileProgress} className="h-2" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Security Setup</h4>
                <p className="text-sm text-muted-foreground">Add recovery methods and 2-factor authentication</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Wrench className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Preferences</h4>
                <p className="text-sm text-muted-foreground">Set your communication and notification preferences</p>
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full sm:w-auto" onClick={() => navigate("/patient/settings")}>
            Continue Setup <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Explore Your Portal Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featureCards.map((card, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer h-full" onClick={() => navigate(card.path)}>
              <CardContent className="p-6 flex flex-col h-full">
                <div className={`rounded-full w-16 h-16 flex items-center justify-center ${card.color.replace('text-', 'bg-')}10 mb-4`}>
                  <div className={card.color}>{card.icon}</div>
                </div>
                <CardTitle className="mb-2">{card.title}</CardTitle>
                <CardDescription className="mb-4 flex-grow">{card.description}</CardDescription>
                <Button variant="ghost" className="mt-auto justify-start p-0 hover:bg-transparent" onClick={() => navigate(card.path)}>
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Get Started Section */}
      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Your patient portal is designed to make managing your health easier and more convenient. We're here to support your healthcare journey every step of the way.
        </p>
        <Button size="lg" onClick={() => navigate("/patient")}>
          Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
} 