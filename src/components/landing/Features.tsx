
import React from "react";
import {
  Users, Calendar, FileText, Heart, Brain, 
  LineChart, Shield, User, Star, Bell, Activity,
  Database, MessageSquare, Thermometer,
  ChartBar, Award, Search, TrendingUp, 
  Settings, MapPin, AlarmClock
} from "lucide-react";
import { cn } from "@/lib/utils";

const Features = () => {
  return (
    <section id="features" className="border-t bg-gradient-to-b from-white to-blue-50/50 py-20">
      <div className="container">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Comprehensive EHR Features
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in">
            A complete healthcare ecosystem designed for patients, doctors, and administrators
          </p>
        </div>

        <div className="mx-auto mt-16 space-y-20">
          {/* Patient Portal Features */}
          <div className="feature-section">
            <h3 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Patient Portal Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Activity className="h-6 w-6 text-blue-500" />}
                title="Wellness & Lifestyle"
                description="Personalized coaching, diet plans, and health tips tailored to your needs."
                delay={0}
              />
              <FeatureCard
                icon={<Heart className="h-6 w-6 text-rose-500" />}
                title="Vital Signs Monitoring"
                description="Sync with wearables to track steps, sleep, heart rate, and more in real-time."
                delay={100}
              />
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-purple-500" />}
                title="AI Health Assistant"
                description="24/7 virtual support for health queries, lab results, and appointment scheduling."
                delay={200}
              />
              <FeatureCard
                icon={<Bell className="h-6 w-6 text-amber-500" />}
                title="Smart Notifications"
                description="Timely reminders for medications, appointments, and health goals."
                delay={300}
              />
              <FeatureCard
                icon={<ChartBar className="h-6 w-6 text-emerald-500" />}
                title="Health Analytics"
                description="Detailed insights and trends about your health journey."
                delay={400}
              />
              <FeatureCard
                icon={<MessageSquare className="h-6 w-6 text-cyan-500" />}
                title="Secure Messaging"
                description="Direct communication with your healthcare providers."
                delay={500}
              />
            </div>
          </div>

          {/* Doctor Portal Features */}
          <div className="feature-section">
            <h3 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              Doctor Portal Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<User className="h-6 w-6 text-blue-500" />}
                title="Patient Management"
                description="Complete patient profiles with medical history and smart documentation."
                delay={0}
              />
              <FeatureCard
                icon={<FileText className="h-6 w-6 text-emerald-500" />}
                title="Clinical Documentation"
                description="SOAP notes, customizable templates, and quick documentation tools."
                delay={100}
              />
              <FeatureCard
                icon={<Calendar className="h-6 w-6 text-purple-500" />}
                title="Smart Scheduling"
                description="AI-powered calendar management with telehealth integration."
                delay={200}
              />
              <FeatureCard
                icon={<LineChart className="h-6 w-6 text-rose-500" />}
                title="Analytics Dashboard"
                description="Visual insights into patient health trends and outcomes."
                delay={300}
              />
              <FeatureCard
                icon={<Database className="h-6 w-6 text-amber-500" />}
                title="Lab Integration"
                description="Digital lab ordering with real-time result tracking."
                delay={400}
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-cyan-500" />}
                title="E-Prescriptions"
                description="Secure electronic prescribing with drug interaction checks."
                delay={500}
              />
            </div>
          </div>

          {/* Admin Portal Features */}
          <div className="feature-section">
            <h3 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Admin Portal Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-6 w-6 text-indigo-500" />}
                title="User Management"
                description="Advanced role-based access control and staff management."
                delay={0}
              />
              <FeatureCard
                icon={<TrendingUp className="h-6 w-6 text-emerald-500" />}
                title="Smart Analytics"
                description="Real-time KPIs, revenue tracking, and performance metrics."
                delay={100}
              />
              <FeatureCard
                icon={<Search className="h-6 w-6 text-blue-500" />}
                title="AI Billing Assistant"
                description="Automated coding suggestions and revenue optimization."
                delay={200}
              />
              <FeatureCard
                icon={<MapPin className="h-6 w-6 text-rose-500" />}
                title="Clinic Load Map"
                description="Visual heatmaps and smart staff rotation planning."
                delay={300}
              />
              <FeatureCard
                icon={<Star className="h-6 w-6 text-amber-500" />}
                title="Staff Recognition"
                description="Gamified leaderboards and performance recognition."
                delay={400}
              />
              <FeatureCard
                icon={<Settings className="h-6 w-6 text-slate-500" />}
                title="Clinic Settings"
                description="Comprehensive clinic configuration and automation tools."
                delay={500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) => (
  <div 
    className={cn(
      "rounded-lg border bg-white/50 backdrop-blur-sm p-6 shadow-sm",
      "hover:shadow-md hover:scale-105 transition-all duration-300",
      "animate-fade-in",
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      {icon}
    </div>
    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-muted-foreground">{description}</p>
  </div>
);

export default Features;
