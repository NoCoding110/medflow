
import React from "react";
import { Brain, Clock, Heart, Shield, Star, TrendingUp, Zap, Database, FileSearch, Microscope, Stethoscope, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Benefits = () => {
  const benefits = [
    {
      icon: <Brain className="h-12 w-12 text-primary" />,
      title: "AI-Powered Intelligence",
      description: "Cutting-edge AI integration across clinical, imaging, molecular, and real-world data, enhancing clinical efficiency by up to 40%.",
      stats: "40% efficiency boost",
      className: "border-t-4 border-primary"
    },
    {
      icon: <Heart className="h-12 w-12 text-rose-500" />,
      title: "Enhanced Patient Care",
      description: "Personalized health tracking, AI health assistants, and AI-driven pathology and medical imaging analysis for improved outcomes.",
      stats: "93% patient satisfaction",
      className: "border-t-4 border-rose-500"
    },
    {
      icon: <Clock className="h-12 w-12 text-purple-500" />,
      title: "Time-Saving Automation",
      description: "Automated documentation, clinical trial matching, and seamless EHR/EMR integrations save 15+ hours per week per provider.",
      stats: "15+ hours saved weekly",
      className: "border-t-4 border-purple-500"
    },
    {
      icon: <Shield className="h-12 w-12 text-emerald-500" />,
      title: "Enterprise Security",
      description: "HIPAA and GDPR compliant infrastructure with end-to-end encryption and advanced access controls for global compliance.",
      stats: "99.9% uptime",
      className: "border-t-4 border-emerald-500"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-500" />,
      title: "Practice Growth",
      description: "Advanced data analytics and cohort builder tools help practices identify opportunities and grow revenue by 25%.",
      stats: "25% revenue growth",
      className: "border-t-4 border-blue-500"
    },
    {
      icon: <Star className="h-12 w-12 text-amber-500" />,
      title: "Modern Experience",
      description: "World-class UI/UX with intuitive interfaces and mobile-first design deliver a seamless experience across all devices.",
      stats: "4.9/5 user rating",
      className: "border-t-4 border-amber-500"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-500" />,
      title: "Specialized Modules",
      description: "Purpose-built tools for Oncology, Neurology, Cardiology, and Psychiatry with AI-driven clinical decision support.",
      stats: "4 specialty modules",
      className: "border-t-4 border-yellow-500"
    },
    {
      icon: <Database className="h-12 w-12 text-indigo-500" />,
      title: "Real-World Data Platform",
      description: "De-identified massive dataset for researchers with advanced cohort search tools and analytics capabilities.",
      stats: "10M+ patient records",
      className: "border-t-4 border-indigo-500"
    },
    {
      icon: <FileSearch className="h-12 w-12 text-teal-500" />,
      title: "Clinical Trial Matching",
      description: "Intelligent matching of eligible patients to clinical trials using structured and unstructured EMR data.",
      stats: "3x faster enrollment",
      className: "border-t-4 border-teal-500"
    },
    {
      icon: <Microscope className="h-12 w-12 text-pink-500" />,
      title: "AI Diagnostics",
      description: "Advanced pathology analysis, biomarker prediction, and high-resolution digital pathology with annotation tools.",
      stats: "95% diagnostic accuracy",
      className: "border-t-4 border-pink-500"
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-cyan-500" />,
      title: "Care Pathway Monitor",
      description: "AI tools to monitor patient care paths against clinical guidelines and automatically notify of care gaps.",
      stats: "30% fewer missed steps",
      className: "border-t-4 border-cyan-500"
    },
    {
      icon: <Globe className="h-12 w-12 text-fuchsia-500" />,
      title: "Open Integration",
      description: "Seamless connectivity via HL7, FHIR, and SMART on FHIR APIs to all major EHR systems including Epic and Cerner.",
      stats: "25+ integrations",
      className: "border-t-4 border-fuchsia-500"
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-background via-muted/50 to-background">
      <div className="container">
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Transform Your Practice with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-[50rem] mx-auto">
            Experience the benefits of a cutting-edge, AI-powered EHR system designed for today's most complex healthcare challenges, 
            from clinical decision support to advanced analytics.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">HIPAA Compliant</span>
            <span className="px-4 py-2 bg-purple-500/10 text-purple-500 rounded-full text-sm font-medium">GDPR Ready</span>
            <span className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium">HL7/FHIR Compatible</span>
            <span className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-medium">WCAG 2.1 Accessible</span>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className={cn(
                "relative overflow-hidden transition-all hover:scale-105 animate-fade-in hover:shadow-lg",
                benefit.className
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-background to-transparent opacity-50"></div>
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-lg bg-muted w-fit">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
                <div className="pt-4 border-t">
                  <p className="text-lg font-semibold text-primary">{benefit.stats}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
