import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Microscope, 
  FileBarChart, 
  Brain,
  Activity,
  Calendar,
  Users,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  LineChart,
  BarChart,
  PieChart
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

// Mock data for active cases
const activeCases = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    diagnosis: "Breast Cancer - Stage II",
    lastUpdate: "2024-03-15",
    status: "Treatment Ongoing",
    nextAction: "Follow-up Scan Due",
    priority: "high"
  },
  {
    id: "2",
    patientName: "Michael Brown",
    diagnosis: "Lung Cancer - Stage III",
    lastUpdate: "2024-03-14",
    status: "Monitoring",
    nextAction: "Treatment Response Assessment",
    priority: "medium"
  },
  {
    id: "3",
    patientName: "Emily Davis",
    diagnosis: "Colorectal Cancer - Stage I",
    lastUpdate: "2024-03-13",
    status: "Post-Surgery",
    nextAction: "Chemotherapy Planning",
    priority: "high"
  }
];

// Mock data for upcoming tasks
const upcomingTasks = [
  {
    id: "1",
    type: "Tumor Board Review",
    patient: "Sarah Johnson",
    date: "2024-03-20",
    details: "Review treatment response and adjust plan"
  },
  {
    id: "2",
    type: "Pathology Analysis",
    patient: "Robert Wilson",
    date: "2024-03-21",
    details: "Review biopsy results with AI assistance"
  },
  {
    id: "3",
    type: "Treatment Planning",
    patient: "Emily Davis",
    date: "2024-03-22",
    details: "Finalize chemotherapy protocol"
  }
];

// Mock data for analytics
const analyticsData = {
  totalPatients: 127,
  activeMonitoring: 45,
  pendingAnalysis: 12,
  treatmentSuccess: "78%",
  recentPredictions: [
    {
      id: "1",
      type: "Treatment Response",
      accuracy: "92%",
      details: "Positive response to immunotherapy predicted"
    },
    {
      id: "2",
      type: "Survival Analysis",
      accuracy: "88%",
      details: "5-year survival probability assessment"
    }
  ]
};

// Add new mock data for patient monitoring
const monitoringData = {
  patients: [
    {
      id: "1",
      name: "Sarah Johnson",
      status: "Stable",
      lastAssessment: "2024-03-15",
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "98.6",
        oxygenSaturation: "98%"
      },
      labResults: {
        wbc: "7.5",
        rbc: "4.2",
        platelets: "250",
        lastUpdate: "2024-03-14"
      },
      symptoms: ["Fatigue", "Mild Pain"],
      treatmentPhase: "Maintenance"
    },
    {
      id: "2",
      name: "Michael Brown",
      status: "Needs Attention",
      lastAssessment: "2024-03-14",
      vitalSigns: {
        bloodPressure: "135/85",
        heartRate: "88",
        temperature: "99.1",
        oxygenSaturation: "96%"
      },
      labResults: {
        wbc: "11.2",
        rbc: "3.8",
        platelets: "180",
        lastUpdate: "2024-03-13"
      },
      symptoms: ["Severe Pain", "Nausea"],
      treatmentPhase: "Active Treatment"
    }
  ],
  alerts: [
    {
      id: "1",
      patientId: "2",
      type: "Lab Alert",
      message: "WBC count elevated",
      severity: "high",
      timestamp: "2024-03-14T10:30:00"
    },
    {
      id: "2",
      patientId: "1",
      type: "Medication Alert",
      message: "Due for next treatment cycle",
      severity: "medium",
      timestamp: "2024-03-15T09:00:00"
    }
  ]
};

// Add new mock data for research
const researchData = {
  clinicalTrials: [
    {
      id: "CT001",
      title: "Novel Immunotherapy Combination Trial",
      phase: "Phase II",
      status: "Recruiting",
      eligiblePatients: ["Sarah Johnson", "Robert Wilson"],
      startDate: "2024-04-01"
    },
    {
      id: "CT002",
      title: "Targeted Therapy Resistance Study",
      phase: "Phase III",
      status: "Active",
      eligiblePatients: ["Michael Brown"],
      startDate: "2024-03-01"
    }
  ],
  publications: [
    {
      id: "PUB001",
      title: "Treatment Response Patterns in Advanced Cancer",
      authors: "Smith et al.",
      journal: "Journal of Clinical Oncology",
      date: "2024-02"
    },
    {
      id: "PUB002",
      title: "AI-Driven Biomarker Discovery in Oncology",
      authors: "Johnson et al.",
      journal: "Nature Medicine",
      date: "2024-03"
    }
  ]
};

// Add mock data for treatment response
const treatmentResponseData = {
  responseMetrics: [
    {
      patientId: "1",
      patientName: "Sarah Johnson",
      treatmentType: "Immunotherapy",
      responseStatus: "Positive",
      tumorReduction: "35%",
      biomarkers: [
        { name: "PD-L1", value: "High", trend: "stable" },
        { name: "TMB", value: "12 mut/Mb", trend: "increasing" }
      ],
      sideEffects: ["Mild fatigue", "Skin rash"],
      nextAssessment: "2024-04-01"
    },
    {
      patientId: "2",
      patientName: "Michael Brown",
      treatmentType: "Chemotherapy",
      responseStatus: "Partial",
      tumorReduction: "20%",
      biomarkers: [
        { name: "CA-125", value: "Elevated", trend: "decreasing" },
        { name: "CEA", value: "Normal", trend: "stable" }
      ],
      sideEffects: ["Nausea", "Neutropenia"],
      nextAssessment: "2024-03-25"
    }
  ],
  predictiveModels: [
    {
      id: "PM001",
      name: "Survival Analysis",
      description: "6-month progression-free survival probability",
      accuracy: "85%"
    },
    {
      id: "PM002",
      name: "Treatment Outcome",
      description: "Response prediction for current protocol",
      accuracy: "78%"
    }
  ]
};

const OncologyModule = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showResponseDialog, setShowResponseDialog] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const filteredCases = activeCases.filter(caseItem => 
    caseItem.patientName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (statusFilter === "all" || caseItem.status.toLowerCase().includes(statusFilter.toLowerCase()))
  );

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Oncology AI Module</h1>
          <p className="text-muted-foreground">
            Comprehensive cancer care with AI-powered analysis and decision support
          </p>
        </div>
        <Button onClick={() => handleNavigate("/doctor/pathology-analysis")}>
          New Analysis
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Tools</TabsTrigger>
          <TabsTrigger value="monitoring">Patient Monitoring</TabsTrigger>
          <TabsTrigger value="research">Clinical Research</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" 
                  onClick={() => handleNavigate("/doctor/pathology-analysis")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pathology Analysis</CardTitle>
                <Microscope className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.pendingAnalysis}</div>
                <p className="text-xs text-muted-foreground">Pending analyses</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Monitoring</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.activeMonitoring}</div>
                <p className="text-xs text-muted-foreground">Patients being monitored</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Treatment Success</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.treatmentSuccess}</div>
                <p className="text-xs text-muted-foreground">Overall success rate</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalPatients}</div>
                <p className="text-xs text-muted-foreground">Under active care</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
              <CardDescription>
                Monitor and manage ongoing cancer cases
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
                    <SelectItem value="treatment">Treatment Ongoing</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                    <SelectItem value="post-surgery">Post-Surgery</SelectItem>
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

          {/* Upcoming Tasks and Analytics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Scheduled reviews and analyses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{task.type}</p>
                        <p className="text-sm text-muted-foreground">Patient: {task.patient}</p>
                        <p className="text-sm text-muted-foreground">{task.details}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent AI Predictions</CardTitle>
                <CardDescription>Latest insights from our AI models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.recentPredictions.map((prediction) => (
                    <div key={prediction.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{prediction.type}</h4>
                          <p className="text-sm text-muted-foreground">{prediction.details}</p>
                        </div>
                        <Badge variant="outline">{prediction.accuracy}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleNavigate("/doctor/pathology-analysis")}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pathology Analysis</CardTitle>
                  <Microscope className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>
                  AI-powered analysis of pathology slides with biomarker prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                  <li>Automated cancer detection and grading</li>
                  <li>Biomarker prediction from H&E slides</li>
                  <li>Tumor microenvironment analysis</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Launch Analysis
                </Button>
              </CardFooter>
            </Card>

            <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
              <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                <DialogTrigger asChild>
                  <div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Treatment Response</CardTitle>
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <CardDescription>
                        Monitor and predict treatment effectiveness
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                        <li>Response prediction models</li>
                        <li>Survival analysis</li>
                        <li>Treatment optimization</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        Analyze Response
                      </Button>
                    </CardFooter>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Treatment Response Analysis</DialogTitle>
                    <DialogDescription>
                      Comprehensive analysis of patient responses to treatment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Current Patient Responses</h4>
                      {treatmentResponseData.responseMetrics.map((patient) => (
                        <div key={patient.patientId} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h5 className="font-medium">{patient.patientName}</h5>
                              <p className="text-sm text-muted-foreground">
                                {patient.treatmentType}
                              </p>
                            </div>
                            <Badge variant={
                              patient.responseStatus === "Positive" ? "secondary" : "destructive"
                            }>
                              {patient.responseStatus}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Response Metrics</p>
                              <p className="text-sm text-muted-foreground">
                                Tumor Reduction: {patient.tumorReduction}
                              </p>
                              <div className="mt-2">
                                <p className="text-sm font-medium">Biomarkers</p>
                                {patient.biomarkers.map((biomarker, index) => (
                                  <p key={index} className="text-sm text-muted-foreground">
                                    {biomarker.name}: {biomarker.value} ({biomarker.trend})
                                  </p>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Side Effects</p>
                              <div className="flex gap-2 flex-wrap">
                                {patient.sideEffects.map((effect, index) => (
                                  <Badge key={index} variant="outline">
                                    {effect}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">
                                Next Assessment: {patient.nextAssessment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Predictive Models</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {treatmentResponseData.predictiveModels.map((model) => (
                          <div key={model.id} className="p-4 border rounded-lg">
                            <h5 className="font-medium">{model.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              {model.description}
                            </p>
                            <Badge className="mt-2" variant="secondary">
                              Accuracy: {model.accuracy}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Card>
            </Dialog>

            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Clinical Trial Matching</CardTitle>
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>
                  AI-powered trial matching and eligibility assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                  <li>Automated eligibility screening</li>
                  <li>Real-time trial matching</li>
                  <li>Outcome prediction</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Find Trials
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Patient Monitoring</CardTitle>
                <CardDescription>Real-time patient status and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monitoringData.patients.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                      onClick={() => handleNavigate(`/doctor/patients/${patient.id}/profile`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{patient.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Phase: {patient.treatmentPhase}
                          </p>
                        </div>
                        <Badge variant={patient.status === "Stable" ? "secondary" : "destructive"}>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm">
                          <p className="font-medium">Vital Signs</p>
                          <p className="text-muted-foreground">BP: {patient.vitalSigns.bloodPressure}</p>
                          <p className="text-muted-foreground">HR: {patient.vitalSigns.heartRate}</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Latest Labs</p>
                          <p className="text-muted-foreground">WBC: {patient.labResults.wbc}</p>
                          <p className="text-muted-foreground">RBC: {patient.labResults.rbc}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Current Symptoms</p>
                        <div className="flex gap-2 mt-1">
                          {patient.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="outline">{symptom}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monitoring Alerts</CardTitle>
                <CardDescription>Critical updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monitoringData.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                      onClick={() => handleNavigate(`/doctor/patients/${alert.patientId}/profile`)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={
                          alert.severity === "high" ? "text-red-500" : "text-yellow-500"
                        } />
                        <span className="font-medium">{alert.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Clinical Trials</CardTitle>
                <CardDescription>Available trials and patient matching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {researchData.clinicalTrials.map((trial) => (
                    <div
                      key={trial.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                      onClick={() => {
                        // Handle trial details view
                      }}
                    >
                      <h4 className="font-medium">{trial.title}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge>{trial.phase}</Badge>
                        <Badge variant="outline">{trial.status}</Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Eligible Patients</p>
                        <div className="flex gap-2 mt-1">
                          {trial.eligiblePatients.map((patient, index) => (
                            <Badge key={index} variant="secondary">{patient}</Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Start Date: {trial.startDate}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Publications</CardTitle>
                <CardDescription>Latest research and findings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {researchData.publications.map((pub) => (
                    <div
                      key={pub.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                      onClick={() => {
                        // Handle publication details view
                      }}
                    >
                      <h4 className="font-medium">{pub.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pub.authors}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{pub.journal}</Badge>
                        <span className="text-sm text-muted-foreground">{pub.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OncologyModule; 