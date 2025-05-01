import React from "react";
import Navigation from "@/components/landing/Navigation";
import CallToAction from "@/components/landing/CallToAction";

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
          <div className="mt-8 flex justify-center gap-4">
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

        {/* Features Section */}
        <section id="features" className="container py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
            Intelligent Clinical Decisions
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-lightblue-500"></div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI-Powered Diagnostics",
                description: "Leverage advanced machine learning for accurate diagnoses and treatment recommendations."
              },
              {
                title: "Real-time Analytics",
                description: "Monitor patient vitals and health metrics in real-time with predictive insights."
              },
              {
                title: "Smart Scheduling",
                description: "Optimize your practice with AI-driven appointment scheduling and resource allocation."
              }
            ].map((feature, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="container py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
            Benefits
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-orange-400"></div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Improved Patient Care",
                description: "Enhanced decision-making and personalized treatment plans."
              },
              {
                title: "Increased Efficiency",
                description: "Streamlined workflows and automated administrative tasks."
              },
              {
                title: "Better Outcomes",
                description: "Data-driven insights leading to improved patient outcomes."
              }
            ].map((benefit, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance Section */}
        <section id="compliance" className="container py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
            Compliance & Security
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-purple-400"></div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold">HIPAA Compliant</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fully compliant with healthcare privacy and security regulations.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold">GDPR Ready</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Built with data protection and privacy by design.
              </p>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
    </div>
  );
};

export default LandingPage; 