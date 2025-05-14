import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Heart, Microscope, FileBarChart, Search, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const SpecializedModules = () => {
  const specializedModules = [
    {
      id: "oncology",
      title: "Oncology",
      icon: <Microscope className="h-8 w-8 text-purple-500" />,
      description: "Specialized tools for cancer management, biomarker analysis, treatment planning, and clinical trial matching.",
      features: [
        "Pathology AI Analysis",
        "Cancer Treatment Protocols",
        "Biomarker Prediction",
        "Molecular Tumor Board Integration"
      ],
      color: "bg-purple-50 text-purple-700",
      link: "/doctor/oncology"
    },
    {
      id: "neurology",
      title: "Neurology",
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      description: "Complete neurological care support with imaging analysis, cognitive assessment tools, and treatment tracking.",
      features: [
        "Brain MRI Analysis AI",
        "Cognitive Assessment Tools",
        "Neurodegenerative Disease Tracking",
        "EEG Pattern Recognition"
      ],
      color: "bg-blue-50 text-blue-700",
      link: "/doctor/neurology-module"
    },
    {
      id: "cardiology",
      title: "Cardiology",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      description: "Comprehensive cardiac care tools with ECG analysis, risk prediction, and guideline-based care pathways.",
      features: [
        "ECG AI Analysis",
        "Cardiovascular Risk Prediction",
        "Heart Failure Management",
        "Cardiac Imaging Interpretation"
      ],
      color: "bg-red-50 text-red-700",
      link: "/doctor/cardiology-module"
    },
    {
      id: "psychiatry",
      title: "Psychiatry",
      icon: <Activity className="h-8 w-8 text-emerald-500" />,
      description: "Mental health care support with standardized assessments, treatment tracking, and outcome measurement.",
      features: [
        "Standardized Assessment Tools",
        "Therapy Outcome Tracking",
        "Medication Effect Monitoring",
        "Crisis Prevention Algorithms"
      ],
      color: "bg-emerald-50 text-emerald-700",
      link: "/doctor/psychiatry-module"
    }
  ];

  const aiTools = [
    {
      title: "Clinical Trial Matching",
      icon: <Search className="h-6 w-6 text-blue-500" />,
      description: "Match patients to appropriate clinical trials using structured and unstructured EMR data.",
      link: "/doctor/ai-assistant" // This would link to the Clinical Trials tab
    },
    {
      title: "Care Pathway Monitor",
      icon: <Activity className="h-6 w-6 text-emerald-500" />,
      description: "Monitor patient care pathways against clinical guidelines and detect care gaps.",
      link: "/doctor/care-pathway-monitor"
    },
    {
      title: "Real-World Data Platform",
      icon: <FileBarChart className="h-6 w-6 text-purple-500" />,
      description: "Access de-identified patient datasets with advanced cohort search tools.",
      link: "/doctor/real-world-data"
    },
    {
      title: "ECG AI Analysis",
      icon: <Zap className="h-6 w-6 text-red-500" />,
      description: "Predict cardiovascular risks from ECG data with advanced AI algorithms.",
      link: "/doctor/ecg-analysis"
    }
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Specialized Medical Modules</h1>
          <p className="text-muted-foreground">AI-powered specialized tools for different medical disciplines</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Medical Specialties</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {specializedModules.map((module) => (
            <Card 
              key={module.id} 
              className="overflow-hidden border-t-4 hover:shadow-md transition-shadow animate-fade-in"
              style={{ borderTopColor: module.color.split(' ')[1].replace('text-', 'border-') }}
            >
              <CardHeader className={`${module.color.split(' ')[0]} pb-2`}>
                <div className="flex items-center gap-2">
                  {module.icon}
                  <CardTitle>{module.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                <ul className="space-y-1 text-sm mb-4">
                  {module.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to={module.link} className="w-full">
                  <Button 
                    variant="default"
                    className="w-full"
                  >
                    Open Module
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">AI-Powered Clinical Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {aiTools.map((tool, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-start gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-muted/50">
                    {tool.icon}
                  </div>
                  <span className="mt-2">{tool.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={tool.link} className="w-full">
                  <Button 
                    variant="default"
                    className="w-full"
                  >
                    Access Tool
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 p-6 border rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Seamless EHR/EMR Integration</h3>
            <p className="text-muted-foreground">
              Our platform connects with all major EHR systems via HL7, FHIR, and SMART on FHIR APIs,
              enabling seamless data flow and unified patient records.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                </div>
              </div>
              <span className="text-xs mt-1 font-medium">Epic</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                </div>
              </div>
              <span className="text-xs mt-1 font-medium">Cerner</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                </div>
              </div>
              <span className="text-xs mt-1 font-medium">Athena</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                </div>
              </div>
              <span className="text-xs mt-1 font-medium">AllScripts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializedModules;
