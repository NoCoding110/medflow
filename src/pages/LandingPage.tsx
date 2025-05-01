import React from "react";
import Navigation from "@/components/landing/Navigation";
import CallToAction from "@/components/landing/CallToAction";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  FileText,
  Activity,
  Bell,
  Brain,
  Shield,
  MessageSquare,
  BarChart,
  Clock,
  Stethoscope,
  Heart,
  UserPlus,
  Settings,
  Zap,
  LineChart,
  Lock,
  Laptop
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-50">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="container py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-navy-800 sm:text-6xl">
            <span className="bg-gradient-to-r from-navy-600 to-lightblue-500 bg-clip-text text-transparent">
              MedFlow Connect
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[42rem] text-lg text-navy-600">
            The Next Generation of AI-Powered Healthcare Technology. Experience clinical excellence with cutting-edge AI integration across clinical, imaging, molecular, and real-world data.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="inline-flex items-center gap-2 rounded-full bg-lightblue-50 px-4 py-2 text-sm text-lightblue-600">
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-lightblue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lightblue-500"></span>
              </span>
              AI-Powered Healthcare
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm text-purple-600">
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
              </span>
              HIPAA & GDPR Compliant
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm text-green-600">
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Advanced Analytics
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section id="features" className="container py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
            Comprehensive Healthcare Management
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-lightblue-500"></div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users className="h-6 w-6 text-lightblue-600" />,
                title: "Patient Management",
                description: "Complete patient lifecycle management with detailed profiles, medical history, and appointment tracking."
              },
              {
                icon: <Calendar className="h-6 w-6 text-lightblue-600" />,
                title: "Smart Scheduling",
                description: "AI-driven appointment scheduling with conflict detection and automated reminders."
              },
              {
                icon: <FileText className="h-6 w-6 text-lightblue-600" />,
                title: "Digital Records",
                description: "Secure electronic health records with easy access to patient history, lab results, and prescriptions."
              },
              {
                icon: <Brain className="h-6 w-6 text-purple-600" />,
                title: "AI Diagnostics",
                description: "Advanced AI-powered diagnostic assistance and treatment recommendations."
              },
              {
                icon: <Activity className="h-6 w-6 text-purple-600" />,
                title: "Real-time Monitoring",
                description: "Live patient vitals monitoring and automated health alerts."
              },
              {
                icon: <Bell className="h-6 w-6 text-purple-600" />,
                title: "Smart Alerts",
                description: "Intelligent notifications for critical updates, lab results, and patient status changes."
              }
            ].map((feature, index) => (
              <div key={index} className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Role-based Features */}
        <section className="bg-navy-50/30 py-20">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
              Tailored for Every Role
            </h2>
            <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-orange-400"></div>
            
            {/* Doctor Features */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-navy-800 mb-8">For Doctors</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: <Stethoscope className="h-5 w-5" />,
                    title: "Clinical Dashboard",
                    description: "Comprehensive view of patient care and practice metrics"
                  },
                  {
                    icon: <Brain className="h-5 w-5" />,
                    title: "AI Assistant",
                    description: "Smart clinical decision support and documentation"
                  },
                  {
                    icon: <Activity className="h-5 w-5" />,
                    title: "Patient Monitoring",
                    description: "Real-time health metrics and alerts"
                  },
                  {
                    icon: <MessageSquare className="h-5 w-5" />,
                    title: "Secure Messaging",
                    description: "HIPAA-compliant communication"
                  }
                ].map((feature, index) => (
                  <div key={index} className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-lightblue-100 p-2 text-lightblue-600">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Features */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-navy-800 mb-8">For Patients</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: <Calendar className="h-5 w-5" />,
                    title: "Easy Scheduling",
                    description: "Book and manage appointments online"
                  },
                  {
                    icon: <Heart className="h-5 w-5" />,
                    title: "Health Tracking",
                    description: "Monitor your health metrics and progress"
                  },
                  {
                    icon: <MessageSquare className="h-5 w-5" />,
                    title: "Doctor Chat",
                    description: "Direct communication with your healthcare team"
                  },
                  {
                    icon: <FileText className="h-5 w-5" />,
                    title: "Medical Records",
                    description: "Access your complete health history"
                  }
                ].map((feature, index) => (
                  <div key={index} className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Features */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-navy-800 mb-8">For Administrators</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: <BarChart className="h-5 w-5" />,
                    title: "Practice Analytics",
                    description: "Comprehensive practice performance metrics"
                  },
                  {
                    icon: <UserPlus className="h-5 w-5" />,
                    title: "Staff Management",
                    description: "Manage healthcare providers and staff"
                  },
                  {
                    icon: <Settings className="h-5 w-5" />,
                    title: "System Settings",
                    description: "Configure and customize the platform"
                  },
                  {
                    icon: <Shield className="h-5 w-5" />,
                    title: "Compliance Tools",
                    description: "Ensure regulatory compliance"
                  }
                ].map((feature, index) => (
                  <div key={index} className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="container py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
            Advanced Technology Stack
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-purple-400"></div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Brain className="h-8 w-8 text-purple-600" />,
                title: "AI & Machine Learning",
                description: "Advanced algorithms for diagnosis assistance, predictive analytics, and personalized care recommendations."
              },
              {
                icon: <Shield className="h-8 w-8 text-purple-600" />,
                title: "Enterprise Security",
                description: "Military-grade encryption, role-based access control, and comprehensive audit trails."
              },
              {
                icon: <Zap className="h-8 w-8 text-purple-600" />,
                title: "Real-time Processing",
                description: "Instant data processing and updates across all connected devices and systems."
              },
              {
                icon: <LineChart className="h-8 w-8 text-purple-600" />,
                title: "Advanced Analytics",
                description: "Comprehensive reporting and insights for better decision-making."
              },
              {
                icon: <Lock className="h-8 w-8 text-purple-600" />,
                title: "Compliance & Privacy",
                description: "Built-in HIPAA and GDPR compliance with regular security updates."
              },
              {
                icon: <Laptop className="h-8 w-8 text-purple-600" />,
                title: "Cross-platform Access",
                description: "Seamless access across desktop, tablet, and mobile devices."
              }
            ].map((feature, index) => (
              <div key={index} className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-navy-50/30 py-20">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
              Key Benefits
            </h2>
            <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-orange-400"></div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Improved Patient Care",
                  description: "Enhanced decision-making and personalized treatment plans powered by AI."
                },
                {
                  title: "Increased Efficiency",
                  description: "Streamlined workflows and automated administrative tasks save valuable time."
                },
                {
                  title: "Better Outcomes",
                  description: "Data-driven insights leading to improved patient outcomes and satisfaction."
                },
                {
                  title: "Cost Reduction",
                  description: "Reduced operational costs through automation and optimized resource allocation."
                },
                {
                  title: "Enhanced Communication",
                  description: "Seamless collaboration between healthcare providers, staff, and patients."
                },
                {
                  title: "Scalable Solution",
                  description: "Flexible platform that grows with your practice and adapts to your needs."
                }
              ].map((benefit, index) => (
                <div key={index} className="rounded-lg border bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section id="compliance" className="container py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
            Security & Compliance
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-purple-400"></div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold">HIPAA Compliant</h3>
                  <p className="text-sm text-muted-foreground">
                    Fully compliant with healthcare privacy and security regulations
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• End-to-end encryption for all data</li>
                <li>• Regular security audits and updates</li>
                <li>• Secure data backup and recovery</li>
                <li>• Role-based access control</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Lock className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold">GDPR Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Built with data protection and privacy by design
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Data minimization principles</li>
                <li>• User consent management</li>
                <li>• Data portability support</li>
                <li>• Privacy impact assessments</li>
              </ul>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
    </div>
  );
};

export default LandingPage; 