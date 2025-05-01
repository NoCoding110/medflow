import React from "react";
import {
  Users, Calendar, FileText, Heart, Brain, 
  LineChart, Shield, User, Star, Bell, Activity,
  Database, MessageSquare, Thermometer,
  ChartBar, Award, Search, TrendingUp, 
  Settings, MapPin, AlarmClock, Stethoscope,
  Microscope, Zap, Bot, Cpu, Lock, PieChart,
  Fingerprint, BookOpen, Lightbulb, Sparkles,
  Syringe, Pill, Clipboard, HeartPulse
} from "lucide-react";
import { cn } from "@/lib/utils";

const Features = () => {
  return (
    <section id="features" className="border-t bg-gradient-to-b from-white to-blue-50/50 py-20">
      <div className="container">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Advanced Healthcare Technology
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Powered by cutting-edge AI and machine learning for superior healthcare delivery
          </p>
        </div>

        <div className="mx-auto mt-16 space-y-20">
          {/* AI & Technology Features */}
          <div className="feature-section">
            <h3 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              AI & Advanced Technology
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Bot className="h-6 w-6 text-violet-500" />}
                title="Clinical AI Assistant"
                description="Advanced natural language processing for medical documentation and decision support."
                delay={0}
              />
              <FeatureCard
                icon={<Cpu className="h-6 w-6 text-indigo-500" />}
                title="Predictive Analytics"
                description="ML-powered health outcome predictions and early warning systems."
                delay={100}
              />
              <FeatureCard
                icon={<HeartPulse className="h-6 w-6 text-rose-500" />}
                title="Smart ECG Analysis"
                description="Real-time ECG interpretation with AI-powered anomaly detection."
                delay={200}
              />
              <FeatureCard
                icon={<Microscope className="h-6 w-6 text-emerald-500" />}
                title="Imaging AI"
                description="Advanced medical imaging analysis with deep learning algorithms."
                delay={300}
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-amber-500" />}
                title="Generative AI Reports"
                description="Automated medical report generation with natural language processing."
                delay={400}
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-blue-500" />}
                title="Smart Automation"
                description="Intelligent workflow automation and task prioritization."
                delay={500}
              />
            </div>
          </div>

          {/* Patient Portal Features */}
          <div className="feature-section">
            <h3 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Patient Portal Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Activity className="h-6 w-6 text-blue-500" />}
                title="Wellness & Lifestyle"
                description="Personalized AI coaching, diet plans, and health tips tailored to your needs."
                delay={0}
              />
              <FeatureCard
                icon={<Heart className="h-6 w-6 text-rose-500" />}
                title="Smart Health Monitoring"
                description="AI-powered vital signs tracking with predictive alerts and trends."
                delay={100}
              />
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-purple-500" />}
                title="AI Health Assistant"
                description="24/7 intelligent virtual support with natural language understanding."
                delay={200}
              />
              <FeatureCard
                icon={<Pill className="h-6 w-6 text-emerald-500" />}
                title="Medication Management"
                description="Smart medication tracking with AI-powered interaction checks."
                delay={300}
              />
              <FeatureCard
                icon={<ChartBar className="h-6 w-6 text-amber-500" />}
                title="Predictive Analytics"
                description="Personal health forecasting and risk assessment."
                delay={400}
              />
              <FeatureCard
                icon={<Clipboard className="h-6 w-6 text-cyan-500" />}
                title="Digital Health Records"
                description="Comprehensive health history with AI-powered insights."
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
                icon={<Stethoscope className="h-6 w-6 text-blue-500" />}
                title="Smart Diagnostics"
                description="AI-assisted diagnosis with evidence-based recommendations."
                delay={0}
              />
              <FeatureCard
                icon={<BookOpen className="h-6 w-6 text-emerald-500" />}
                title="Clinical Knowledge Base"
                description="AI-powered medical research assistant and literature analysis."
                delay={100}
              />
              <FeatureCard
                icon={<Calendar className="h-6 w-6 text-purple-500" />}
                title="Intelligent Scheduling"
                description="ML-optimized appointment management with smart prioritization."
                delay={200}
              />
              <FeatureCard
                icon={<Lightbulb className="h-6 w-6 text-amber-500" />}
                title="Treatment Suggestions"
                description="AI-powered treatment planning and protocol recommendations."
                delay={300}
              />
              <FeatureCard
                icon={<Database className="h-6 w-6 text-rose-500" />}
                title="Smart Lab Integration"
                description="Automated lab result analysis with trend detection."
                delay={400}
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-cyan-500" />}
                title="Clinical Decision Support"
                description="AI-enhanced decision support with risk stratification."
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
                icon={<PieChart className="h-6 w-6 text-indigo-500" />}
                title="Intelligent Analytics"
                description="AI-driven insights for operational efficiency and resource allocation."
                delay={0}
              />
              <FeatureCard
                icon={<Fingerprint className="h-6 w-6 text-emerald-500" />}
                title="Smart Access Control"
                description="AI-powered security and role-based access management."
                delay={100}
              />
              <FeatureCard
                icon={<Search className="h-6 w-6 text-blue-500" />}
                title="Revenue Optimization"
                description="ML-powered billing optimization and fraud detection."
                delay={200}
              />
              <FeatureCard
                icon={<MapPin className="h-6 w-6 text-rose-500" />}
                title="Resource Management"
                description="AI-optimized resource allocation and capacity planning."
                delay={300}
              />
              <FeatureCard
                icon={<Lock className="h-6 w-6 text-amber-500" />}
                title="Compliance AI"
                description="Automated compliance monitoring and risk assessment."
                delay={400}
              />
              <FeatureCard
                icon={<Settings className="h-6 w-6 text-slate-500" />}
                title="Smart Automation"
                description="AI-powered workflow optimization and process automation."
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
