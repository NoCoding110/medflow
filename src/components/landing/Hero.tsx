
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Shield, Sparkles, Database, Zap, CircleEqual } from "lucide-react";

const Hero = () => {
  // Function to handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a[href^="#"]');
      
      if (anchorLink) {
        e.preventDefault();
        const targetId = anchorLink.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Advanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute left-[25%] top-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '7s'}} />
        <div className="absolute right-[20%] bottom-1/3 w-40 h-40 bg-emerald-500/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '10s'}} />
        
        {/* Neural network visualization */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="neural-net" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1" fill="currentColor" />
              </pattern>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="var(--purple-500)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--blue-500)" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#neural-net)" />
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-gradient)" fillOpacity="0.1" />
          </svg>
        </div>
      </div>

      <div className="container relative flex flex-col items-center justify-center min-h-screen gap-8 py-20 text-center">
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary animate-pulse flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span>AI-Powered Healthcare</span>
            </span>
            <span className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>HIPAA & GDPR Compliant</span>
            </span>
            <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>Advanced Analytics</span>
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent animate-fade-in">
            Welcome to MedFlow Connect
          </h1>
          
          <p className="max-w-[50rem] mx-auto text-xl text-muted-foreground animate-fade-in">
            The Next Generation of AI-Powered Healthcare Technology. Experience clinical excellence with 
            cutting-edge AI integration across clinical, imaging, molecular, and real-world data.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[50rem] mx-auto pt-4">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-3 rounded-lg flex flex-col items-center">
              <Zap className="w-6 h-6 text-primary mb-2" />
              <span className="text-sm font-medium">Intelligent Clinical Decisions</span>
            </div>
            <div className="bg-gradient-to-r from-purple-500/5 to-purple-500/10 p-3 rounded-lg flex flex-col items-center">
              <CircleEqual className="w-6 h-6 text-purple-500 mb-2" />
              <span className="text-sm font-medium">Seamless EHR Integration</span>
            </div>
            <div className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 p-3 rounded-lg flex flex-col items-center">
              <Database className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-sm font-medium">Real-World Data Platform</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row animate-fade-in">
          <Button size="lg" className="gap-2 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" asChild>
            <Link to="/login">
              <Brain className="w-5 h-5" />
              <span>Experience the Future</span>
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 text-lg border-primary/20 hover:bg-primary/5" asChild>
            <Link to="/patients/new">
              <Shield className="w-5 h-5" />
              <span>Join as Patient</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 max-w-[50rem] animate-fade-in">
          <div className="flex items-center gap-4 p-5 rounded-lg bg-card border border-border/50 transition-all hover:shadow-md hover:scale-105">
            <div className="p-3 rounded-full bg-primary/10">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Cutting-edge medical AI</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-lg bg-card border border-border/50 transition-all hover:shadow-md hover:scale-105">
            <div className="p-3 rounded-full bg-purple-500/10">
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">Enterprise Secure</h3>
              <p className="text-sm text-muted-foreground">HIPAA & GDPR compliant</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-lg bg-card border border-border/50 transition-all hover:shadow-md hover:scale-105">
            <div className="p-3 rounded-full bg-blue-500/10">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">World-Class UX</h3>
              <p className="text-sm text-muted-foreground">Intuitive, responsive design</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#benefits" className="text-muted-foreground hover:text-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
