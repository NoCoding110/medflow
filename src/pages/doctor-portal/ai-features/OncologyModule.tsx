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
  ChevronRight
} from "lucide-react";
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

const OncologyModule = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");

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

            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
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
            </Card>

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
          <Card>
            <CardHeader>
              <CardTitle>Patient Monitoring Dashboard</CardTitle>
              <CardDescription>
                Real-time monitoring and predictive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add patient monitoring content here */}
                <p>Patient monitoring dashboard content will go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Research Hub</CardTitle>
              <CardDescription>
                Access research tools and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add research content here */}
                <p>Clinical research hub content will go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OncologyModule; 