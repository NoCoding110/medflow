
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, AlertTriangle, CheckCircle, Users, Clipboard, CalendarDays, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CarePathwayMonitor = () => {
  const [activeTab, setActiveTab] = useState('pathways');
  
  const pathways = [
    {
      id: 1,
      name: "Type 2 Diabetes Management",
      status: "At Risk",
      progress: 65,
      careGaps: 2,
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "Hypertension Care Protocol",
      status: "On Track",
      progress: 90,
      careGaps: 0,
      lastUpdated: "Yesterday"
    },
    {
      id: 3,
      name: "Post-MI Care Protocol",
      status: "At Risk",
      progress: 50,
      careGaps: 3,
      lastUpdated: "5 days ago"
    }
  ];

  const careGaps = [
    {
      pathway: "Type 2 Diabetes Management",
      gap: "Annual Eye Exam",
      severity: "Moderate",
      status: "Overdue",
      dueDate: "45 days ago"
    },
    {
      pathway: "Type 2 Diabetes Management",
      gap: "HbA1c Test",
      severity: "High",
      status: "Overdue",
      dueDate: "30 days ago"
    },
    {
      pathway: "Post-MI Care Protocol",
      gap: "Cardiac Rehabilitation",
      severity: "High",
      status: "Not Scheduled",
      dueDate: "Immediately"
    },
    {
      pathway: "Post-MI Care Protocol",
      gap: "Lipid Panel",
      severity: "Moderate",
      status: "Overdue",
      dueDate: "10 days ago"
    },
    {
      pathway: "Post-MI Care Protocol",
      gap: "Follow-up Cardiology Visit",
      severity: "High",
      status: "Overdue",
      dueDate: "15 days ago"
    }
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Care Pathway Monitor</h1>
          <p className="text-muted-foreground">AI-powered monitoring of clinical guidelines and care protocols</p>
        </div>
        <Button className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Generate New Pathway
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="pathways">Active Pathways</TabsTrigger>
          <TabsTrigger value="gaps">Care Gaps</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Real-time Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="pathways" className="space-y-4 animate-fade-in">
          <div className="grid gap-6 md:grid-cols-1">
            {pathways.map((pathway) => (
              <Card key={pathway.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{pathway.name}</CardTitle>
                    <Badge
                      variant={pathway.status === "At Risk" ? "destructive" : "default"}
                    >
                      {pathway.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span>Pathway Progress</span>
                        <span>{pathway.progress}%</span>
                      </div>
                      <Progress 
                        value={pathway.progress} 
                        className={`h-2 ${
                          pathway.progress < 60 ? 'bg-red-100' : 
                          pathway.progress < 80 ? 'bg-yellow-100' : 
                          'bg-green-100'
                        }`}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Care Gaps</p>
                        <p className={`font-semibold ${pathway.careGaps > 0 ? 'text-red-500' : ''}`}>
                          {pathway.careGaps}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Last Updated</p>
                        <p className="font-medium">{pathway.lastUpdated}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Actions</p>
                        <p className="font-medium">{pathway.careGaps > 0 ? 'Required' : 'None'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">View Details</Button>
                  {pathway.careGaps > 0 && (
                    <Button size="sm">Address Care Gaps</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground">Add New Care Pathway</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Clipboard className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                Select a clinical guideline or create a custom care protocol<br />for this patient
              </p>
              <Button variant="outline" className="mt-4">Browse Protocols</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Active Care Gaps
                </CardTitle>
                <Button variant="outline" size="sm">
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careGaps.map((gap, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{gap.gap}</h3>
                        <p className="text-sm text-muted-foreground">{gap.pathway}</p>
                      </div>
                      <Badge
                        variant={
                          gap.severity === "High" ? "destructive" :
                          gap.severity === "Moderate" ? "secondary" :
                          "outline"
                        }
                      >
                        {gap.severity}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="font-medium text-red-500">{gap.status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="font-medium">{gap.dueDate}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">Dismiss</Button>
                      <Button size="sm">Schedule</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center text-muted-foreground text-sm">
                Total: 5 care gaps requiring attention
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 animate-fade-in">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Pathway Adherence</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center justify-center">
                  <div className="h-40 w-40 rounded-full border-8 border-primary flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold">82%</p>
                      <p className="text-xs text-muted-foreground">Overall</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Diabetes Protocol</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-1.5" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Hypertension Protocol</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-1.5" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Post-MI Protocol</span>
                    <span>50%</span>
                  </div>
                  <Progress value={50} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Common Care Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 bg-red-200 rounded-full flex items-center justify-center">
                        <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Cardiac Rehab Referrals</p>
                      <p className="text-sm text-muted-foreground">32% of eligible patients</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 bg-yellow-200 rounded-full flex items-center justify-center">
                        <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">HbA1c Testing</p>
                      <p className="text-sm text-muted-foreground">24% of diabetic patients</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 bg-blue-200 rounded-full flex items-center justify-center">
                        <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Annual Eye Exams</p>
                      <p className="text-sm text-muted-foreground">28% of diabetic patients</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Improvement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full">
                  <Activity className="h-20 w-20 text-green-500 mb-4" />
                  <h3 className="font-semibold text-xl">+15%</h3>
                  <p className="text-muted-foreground text-sm">Pathway adherence last 30 days</p>
                  <div className="w-full mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Reduced care gaps by 23%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Improved follow-up scheduling by 18%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Pathway Efficacy Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Diabetes Management Protocol</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3">
                      <p className="text-xs text-muted-foreground">Patient Outcomes</p>
                      <p className="text-lg font-semibold">82%</p>
                      <p className="text-sm">HbA1c reduction goals met</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <p className="text-xs text-muted-foreground">Medication Adherence</p>
                      <p className="text-lg font-semibold">76%</p>
                      <p className="text-sm">Filled prescriptions on time</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <p className="text-xs text-muted-foreground">Acute Complications</p>
                      <p className="text-lg font-semibold text-green-500">-32%</p>
                      <p className="text-sm">Reduction in emergency visits</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Post-MI Protocol</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3">
                      <p className="text-xs text-muted-foreground">30-Day Readmission</p>
                      <p className="text-lg font-semibold text-green-500">-24%</p>
                      <p className="text-sm">Below national average</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <p className="text-xs text-muted-foreground">Cardiac Rehab</p>
                      <p className="text-lg font-semibold text-red-500">48%</p>
                      <p className="text-sm">Attendance rate (below target)</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <p className="text-xs text-muted-foreground">Medication Adherence</p>
                      <p className="text-lg font-semibold">93%</p>
                      <p className="text-sm">For dual antiplatelet therapy</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  High Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Missed Cardiac Follow-up</h3>
                      <Badge variant="destructive">Urgent</Badge>
                    </div>
                    <p className="text-sm">Patient #12458 - Post-MI protocol</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                      <Clock className="h-3 w-3" /> 2 hours ago
                    </div>
                    <div className="mt-2">
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Critical Lab Result</h3>
                      <Badge variant="destructive">Urgent</Badge>
                    </div>
                    <p className="text-sm">Patient #10921 - K+ 6.2 mEq/L</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                      <Clock className="h-3 w-3" /> 30 min ago
                    </div>
                    <div className="mt-2">
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Medium Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-3 py-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Medication Non-adherence</h3>
                      <Badge variant="secondary">Action Needed</Badge>
                    </div>
                    <p className="text-sm">Patient #23145 - Missed statin refills</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                      <Clock className="h-3 w-3" /> 1 day ago
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-3 py-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Diabetes Care Gap</h3>
                      <Badge variant="secondary">Action Needed</Badge>
                    </div>
                    <p className="text-sm">Patient #35792 - Overdue HbA1c</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                      <Clock className="h-3 w-3" /> 3 days ago
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-3 py-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Screening Due</h3>
                      <Badge variant="secondary">Action Needed</Badge>
                    </div>
                    <p className="text-sm">Patient #40231 - Colon cancer screening</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                      <Clock className="h-3 w-3" /> 1 week ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Population Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <h3 className="font-medium">Flu Vaccine Campaign</h3>
                    <p className="text-sm">15% of eligible patients not vaccinated</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">View Report</Button>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <h3 className="font-medium">Diabetes Control</h3>
                    <p className="text-sm">Population HbA1c average improved by 0.3%</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">View Report</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-muted/10">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <h3 className="font-medium">Alerts Summary</h3>
                    </div>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>High Priority</span>
                        <span>2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium Priority</span>
                        <span>7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Active</span>
                        <span>15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button>
              Configure Alert Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarePathwayMonitor;
