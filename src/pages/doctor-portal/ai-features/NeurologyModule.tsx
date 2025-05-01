import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Brain,
  Activity,
  Calendar,
  Users,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  FileBarChart,
  Wand2,
  Zap,
  LineChart
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for active cases
const activeCases = [
  {
    id: "1",
    patientName: "John Smith",
    diagnosis: "Multiple Sclerosis - Relapsing-Remitting",
    lastUpdate: "2024-03-15",
    status: "Stable",
    nextAction: "MRI Follow-up",
    priority: "medium",
    metrics: {
      edssScore: 3.5,
      lastRelapse: "2023-12-10",
      cognitiveScore: 28,
      mobilityStatus: "Independent"
    }
  },
  {
    id: "2",
    patientName: "Emma Wilson",
    diagnosis: "Epilepsy - Focal Seizures",
    lastUpdate: "2024-03-14",
    status: "Needs Review",
    nextAction: "EEG Analysis",
    priority: "high",
    metrics: {
      seizureFrequency: "3/month",
      lastSeizure: "2024-03-10",
      medicationAdherence: "85%",
      sideEffects: ["Drowsiness", "Dizziness"]
    }
  },
  {
    id: "3",
    patientName: "David Chen",
    diagnosis: "Parkinson's Disease - Stage 2",
    lastUpdate: "2024-03-13",
    status: "Monitoring",
    nextAction: "Movement Assessment",
    priority: "medium",
    metrics: {
      updrsScore: 25,
      tremorSeverity: "Moderate",
      balanceStatus: "Mild Impairment",
      cognitiveStatus: "Intact"
    }
  }
];

// Mock data for imaging analysis
const imagingData = {
  recentScans: [
    {
      id: "MRI001",
      patientId: "1",
      type: "Brain MRI",
      date: "2024-03-10",
      findings: ["New T2 lesions", "Stable ventricular size"],
      aiAnalysis: {
        lesionCount: 12,
        volumeChange: "-5%",
        atrophyStatus: "Mild",
        confidence: "92%"
      }
    },
    {
      id: "CT001",
      patientId: "2",
      type: "CT Scan",
      date: "2024-03-12",
      findings: ["No acute abnormalities", "Previous infarct stable"],
      aiAnalysis: {
        hemorrhageDetection: "Negative",
        massEffect: "None",
        confidence: "95%"
      }
    }
  ],
  aiModels: [
    {
      id: "AI001",
      name: "MS Lesion Detector",
      accuracy: "94%",
      specialization: "Multiple Sclerosis",
      lastUpdate: "2024-02-28"
    },
    {
      id: "AI002",
      name: "Stroke Analyzer",
      accuracy: "91%",
      specialization: "Acute Stroke",
      lastUpdate: "2024-03-01"
    }
  ]
};

// Mock data for cognitive assessments
const cognitiveData = {
  assessments: [
    {
      id: "COG001",
      patientId: "1",
      type: "MMSE",
      score: 28,
      date: "2024-03-08",
      details: {
        orientation: 10,
        registration: 3,
        attention: 5,
        recall: 2,
        language: 8
      },
      trend: "Stable"
    },
    {
      id: "COG002",
      patientId: "3",
      type: "MoCA",
      score: 25,
      date: "2024-03-09",
      details: {
        visuospatial: 4,
        naming: 3,
        attention: 5,
        language: 2,
        abstraction: 2,
        recall: 3,
        orientation: 6
      },
      trend: "Declining"
    }
  ],
  trends: [
    {
      patientId: "1",
      assessmentType: "MMSE",
      history: [
        { date: "2023-12-01", score: 29 },
        { date: "2024-01-15", score: 28 },
        { date: "2024-03-08", score: 28 }
      ]
    }
  ]
};

// Mock data for treatment monitoring
const treatmentData = {
  activeTreatments: [
    {
      id: "TRT001",
      patientId: "1",
      medication: "Ocrelizumab",
      status: "Active",
      startDate: "2023-09-15",
      nextDose: "2024-03-20",
      effectiveness: "Good",
      sideEffects: ["Mild infusion reaction"],
      adherence: "98%"
    },
    {
      id: "TRT002",
      patientId: "2",
      medication: "Levetiracetam",
      status: "Active",
      startDate: "2023-11-01",
      nextDose: "Daily",
      effectiveness: "Moderate",
      sideEffects: ["Drowsiness", "Irritability"],
      adherence: "85%"
    }
  ],
  recommendations: [
    {
      id: "REC001",
      patientId: "1",
      type: "Dose Adjustment",
      description: "Consider dose reduction based on recent lab results",
      urgency: "Medium",
      aiConfidence: "88%"
    }
  ]
};

// Add mock data for medications
const medicationDatabase = {
  neurologicalMeds: [
    {
      id: "MED001",
      name: "Levetiracetam",
      category: "Anti-Epileptic",
      commonDoses: ["500mg BID", "1000mg BID"],
      interactions: ["Moderate interaction with CNS depressants"],
      monitoring: ["Liver function", "CBC"]
    },
    {
      id: "MED002",
      name: "Ocrelizumab",
      category: "Multiple Sclerosis",
      commonDoses: ["300mg IV initial", "600mg IV q6months"],
      interactions: ["Live vaccines contraindicated"],
      monitoring: ["Hepatitis B screening", "Immunoglobulins"]
    },
    {
      id: "MED003",
      name: "Carbidopa/Levodopa",
      category: "Parkinson's Disease",
      commonDoses: ["25/100mg TID", "50/200mg TID"],
      interactions: ["MAO inhibitors", "Iron supplements"],
      monitoring: ["Blood pressure", "Motor function"]
    }
  ],
  recentPrescriptions: [
    {
      id: "PRE001",
      patientId: "1",
      medication: "Ocrelizumab",
      dose: "600mg IV",
      frequency: "Every 6 months",
      startDate: "2024-03-01",
      duration: "Ongoing",
      status: "Active"
    },
    {
      id: "PRE002",
      patientId: "2",
      medication: "Levetiracetam",
      dose: "1000mg",
      frequency: "Twice daily",
      startDate: "2024-02-15",
      duration: "3 months",
      status: "Active"
    }
  ]
};

// Add EMR integration mock data
const emrData = {
  patients: [
    {
      id: "1",
      name: "John Smith",
      dob: "1975-06-15",
      mrn: "MRN123456",
      allergies: ["Penicillin"],
      activeMedications: ["Ocrelizumab"],
      recentLabs: {
        date: "2024-03-01",
        results: ["CBC: Normal", "CMP: Normal"]
      }
    },
    {
      id: "2",
      name: "Emma Wilson",
      dob: "1982-09-23",
      mrn: "MRN789012",
      allergies: ["None"],
      activeMedications: ["Levetiracetam"],
      recentLabs: {
        date: "2024-03-05",
        results: ["CBC: Normal", "AED levels: Therapeutic"]
      }
    }
  ]
};

const NeurologyModule = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showImagingDialog, setShowImagingDialog] = useState(false);
  const [showCognitiveDialog, setShowCognitiveDialog] = useState(false);
  const [showTreatmentDialog, setShowTreatmentDialog] = useState(false);
  const [showPatientSearchDialog, setShowPatientSearchDialog] = useState(false);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [selectedPatientForRx, setSelectedPatientForRx] = useState(null);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const filteredCases = activeCases.filter(caseItem =>
    caseItem.patientName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (statusFilter === "all" || caseItem.status.toLowerCase().includes(statusFilter.toLowerCase()))
  );

  // Add new function to handle prescription
  const handlePrescribe = (patientId) => {
    const patient = emrData.patients.find(p => p.id === patientId);
    setSelectedPatientForRx(patient);
    setShowPrescriptionDialog(true);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
        <h1 className="text-3xl font-bold tracking-tight">Neurology AI Module</h1>
          <p className="text-muted-foreground">
            Advanced neurological care with AI-powered diagnostics and monitoring
          </p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => setShowPatientSearchDialog(true)}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Find Patient
          </Button>
          <Button onClick={() => setShowImagingDialog(true)}>
            New Analysis
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="imaging">Imaging Analysis</TabsTrigger>
          <TabsTrigger value="cognitive">Cognitive Assessment</TabsTrigger>
          <TabsTrigger value="treatment">Treatment Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" 
                  onClick={() => setShowImagingDialog(true)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Analysis</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{imagingData.recentScans.length}</div>
                <p className="text-xs text-muted-foreground">Recent scans</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setShowCognitiveDialog(true)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cognitive Assessments</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{cognitiveData.assessments.length}</div>
                <p className="text-xs text-muted-foreground">Recent assessments</p>
            </CardContent>
          </Card>
          
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setShowTreatmentDialog(true)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
                <Wand2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{treatmentData.activeTreatments.length}</div>
                <p className="text-xs text-muted-foreground">Current treatments</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCases.length}</div>
                <p className="text-xs text-muted-foreground">Under active care</p>
              </CardContent>
            </Card>
          </div>
        
          {/* Active Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
              <CardDescription>
                Monitor and manage neurological cases
              </CardDescription>
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="needs review">Needs Review</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                    onClick={() => handleNavigate(`/doctor/patients/${caseItem.id}/profile`)}
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{caseItem.patientName}</p>
                      <p className="text-sm text-muted-foreground">{caseItem.diagnosis}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={caseItem.priority === "high" ? "destructive" : "secondary"}
                        >
                          {caseItem.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Last updated: {caseItem.lastUpdate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">Next Action</p>
                        <p className="text-sm text-muted-foreground">{caseItem.nextAction}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="imaging" className="space-y-4">
          <Dialog open={showImagingDialog} onOpenChange={setShowImagingDialog}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Neurological Imaging Analysis</DialogTitle>
                <DialogDescription>
                  AI-powered analysis of neurological imaging studies
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Scans</h4>
                  {imagingData.recentScans.map((scan) => (
                    <div key={scan.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h5 className="font-medium">{scan.type}</h5>
                          <p className="text-sm text-muted-foreground">
                            Date: {scan.date}
                          </p>
                        </div>
                        <Badge variant="outline">
                          AI Confidence: {scan.aiAnalysis.confidence}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Key Findings</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {scan.findings.map((finding, index) => (
                              <li key={index}>{finding}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium">AI Analysis</p>
                          {Object.entries(scan.aiAnalysis).map(([key, value]) => (
                            key !== "confidence" && (
                              <p key={key} className="text-sm text-muted-foreground">
                                {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                              </p>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Available AI Models</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {imagingData.aiModels.map((model) => (
                      <div key={model.id} className="p-4 border rounded-lg">
                        <h5 className="font-medium">{model.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          Specialization: {model.specialization}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">
                            Accuracy: {model.accuracy}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Updated: {model.lastUpdate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="cognitive" className="space-y-4">
          <Dialog open={showCognitiveDialog} onOpenChange={setShowCognitiveDialog}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Cognitive Assessment Analysis</DialogTitle>
                <DialogDescription>
                  Comprehensive cognitive function monitoring and trends
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Assessments</h4>
                  {cognitiveData.assessments.map((assessment) => (
                    <div key={assessment.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h5 className="font-medium">{assessment.type} Assessment</h5>
                          <p className="text-sm text-muted-foreground">
                            Date: {assessment.date}
                          </p>
                        </div>
                        <Badge variant={assessment.trend === "Stable" ? "secondary" : "destructive"}>
                          {assessment.trend}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Score Breakdown</p>
                          {Object.entries(assessment.details).map(([key, value]) => (
                            <p key={key} className="text-sm text-muted-foreground">
                              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                            </p>
                          ))}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Total Score</p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">{assessment.score}</span>
                            <span className="text-sm text-muted-foreground">/ 30</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Score Trends</h4>
                  <div className="grid gap-4">
                    {cognitiveData.trends.map((trend) => (
                      <div key={trend.patientId} className="p-4 border rounded-lg">
                        <h5 className="font-medium">{trend.assessmentType} Score History</h5>
                        <div className="mt-2">
                          {trend.history.map((point, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground">{point.date}:</span>
                              <span className="font-medium">{point.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="treatment" className="space-y-4">
          <Dialog open={showTreatmentDialog} onOpenChange={setShowTreatmentDialog}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Treatment Monitoring</DialogTitle>
                <DialogDescription>
                  Active treatments and effectiveness tracking
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Active Treatments</h4>
                  {treatmentData.activeTreatments.map((treatment) => (
                    <div key={treatment.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h5 className="font-medium">{treatment.medication}</h5>
                          <p className="text-sm text-muted-foreground">
                            Started: {treatment.startDate}
                          </p>
                        </div>
                        <Badge variant={
                          treatment.effectiveness === "Good" ? "secondary" : "outline"
                        }>
                          {treatment.effectiveness}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Treatment Details</p>
                          <p className="text-sm text-muted-foreground">
                            Next Dose: {treatment.nextDose}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Adherence: {treatment.adherence}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Side Effects</p>
                          <div className="flex gap-2 flex-wrap">
                            {treatment.sideEffects.map((effect, index) => (
                              <Badge key={index} variant="outline">
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">AI Recommendations</h4>
                  <div className="grid gap-4">
                    {treatmentData.recommendations.map((rec) => (
                      <div key={rec.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{rec.type}</h5>
                            <p className="text-sm text-muted-foreground">
                              {rec.description}
                            </p>
                          </div>
                          <Badge variant="outline">
                            AI Confidence: {rec.aiConfidence}
                          </Badge>
                        </div>
                        <Badge variant={
                          rec.urgency === "High" ? "destructive" : "secondary"
                        } className="mt-2">
                          {rec.urgency} Priority
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>

      {/* Patient Search Dialog */}
      <Dialog open={showPatientSearchDialog} onOpenChange={setShowPatientSearchDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Patient Search</DialogTitle>
            <DialogDescription>
              Search for patients in the EMR system
            </DialogDescription>
          </DialogHeader>
          <Command>
            <CommandInput placeholder="Search patients by name or MRN..." />
            <CommandList>
              <CommandEmpty>No patients found.</CommandEmpty>
              <CommandGroup heading="Patients">
                {emrData.patients.map((patient) => (
                  <CommandItem
                    key={patient.id}
                    className="cursor-pointer p-4 hover:bg-accent"
                    onSelect={() => {
                      setShowPatientSearchDialog(false);
                      handlePrescribe(patient.id);
                    }}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          DOB: {patient.dob} | MRN: {patient.mrn}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Select
                      </Button>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      {/* Prescription Dialog */}
      <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>EMR Prescription</DialogTitle>
            <DialogDescription>
              {selectedPatientForRx ? `Prescribing for ${selectedPatientForRx.name}` : 'Select a patient'}
            </DialogDescription>
          </DialogHeader>
          {selectedPatientForRx && (
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">MRN:</span> {selectedPatientForRx.mrn}
                      </div>
                      <div>
                        <span className="font-medium">DOB:</span> {selectedPatientForRx.dob}
                      </div>
                      <div>
                        <span className="font-medium">Allergies:</span>
                        <div className="flex gap-2 mt-1">
                          {selectedPatientForRx.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Active Medications:</span>
                        <div className="flex gap-2 mt-1">
                          {selectedPatientForRx.activeMedications.map((med, index) => (
                            <Badge key={index} variant="outline">
                              {med}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Labs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Date: {selectedPatientForRx.recentLabs.date}
                      </p>
                      {selectedPatientForRx.recentLabs.results.map((result, index) => (
                        <p key={index} className="text-sm">
                          {result}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Select Medication</h4>
                <div className="grid grid-cols-2 gap-4">
                  {medicationDatabase.neurologicalMeds.map((med) => (
                    <div
                      key={med.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedMedication?.id === med.id ? 'bg-accent' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedMedication(med)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{med.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            Category: {med.category}
                          </p>
                        </div>
                        <Badge variant="outline">{med.commonDoses[0]}</Badge>
                      </div>
                      {selectedMedication?.id === med.id && (
                        <div className="mt-4 space-y-2">
                          <div>
                            <p className="text-sm font-medium">Common Doses:</p>
                            <div className="flex gap-2 mt-1">
                              {med.commonDoses.map((dose, index) => (
                                <Badge key={index} variant="secondary">
                                  {dose}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Interactions:</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {med.interactions.map((interaction, index) => (
                                <li key={index}>{interaction}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Monitoring Required:</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {med.monitoring.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedMedication && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel>Dose</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dose" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedMedication.commonDoses.map((dose, index) => (
                            <SelectItem key={index} value={dose}>
                              {dose}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Duration</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Special Instructions</FormLabel>
                    <Textarea placeholder="Enter any special instructions or notes..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowPrescriptionDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      // Handle prescription submission
                      setShowPrescriptionDialog(false);
                    }}>
                      Submit Prescription
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NeurologyModule;
