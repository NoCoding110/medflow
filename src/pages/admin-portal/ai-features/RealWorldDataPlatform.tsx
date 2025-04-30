
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Database, Search, FileBarChart, Users, Filter, Download, Shield, Eye, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const RealWorldDataPlatform = () => {
  const [activeTab, setActiveTab] = useState('cohort');
  
  const cohortGroups = [
    { 
      name: "Diabetes Type 2",
      count: 1245,
      description: "Patients with diagnosed T2DM and at least 1 year of follow-up data",
      lastUpdated: "Today"
    },
    { 
      name: "Breast Cancer, HER2+",
      count: 432,
      description: "Female patients with HER2+ breast cancer diagnosis since 2020",
      lastUpdated: "Yesterday"
    },
    { 
      name: "Heart Failure with Preserved EF",
      count: 876,
      description: "Patients with HFpEF and documented NYHA classifications",
      lastUpdated: "3 days ago"
    },
    { 
      name: "COPD with Exacerbations",
      count: 654,
      description: "COPD patients with ≥2 exacerbations in the past 12 months",
      lastUpdated: "1 week ago"
    },
  ];

  const recentQueries = [
    "Patients with diabetes AND hypertension AND age > 65",
    "Lung cancer patients with PDL1 > 50% AND no prior immunotherapy",
    "Atrial fibrillation with CHA2DS2-VASc ≥ 2 NOT on anticoagulation"
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Real-World Data Platform</h1>
          <p className="text-muted-foreground">De-identified patient dataset with advanced cohort search tools</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" /> 
            HIPAA Compliant
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> 
            De-identified
          </Badge>
          <Button>
            <Database className="mr-2 h-4 w-4" />
            New Cohort
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cohort">Cohort Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Tools</TabsTrigger>
          <TabsTrigger value="compliance">Data Governance</TabsTrigger>
          <TabsTrigger value="export">Export & Sharing</TabsTrigger>
        </TabsList>

        <TabsContent value="cohort" className="space-y-4 animate-fade-in">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Build Patient Cohort
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cohort-name">Cohort Name</Label>
                      <Input id="cohort-name" placeholder="Enter a descriptive name for your cohort" />
                    </div>
                    
                    <div className="grid gap-4">
                      <div>
                        <Label>Demographics</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <Label htmlFor="age-range" className="text-xs">Age Range</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select age range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Ages</SelectItem>
                                <SelectItem value="18-40">18-40 years</SelectItem>
                                <SelectItem value="41-65">41-65 years</SelectItem>
                                <SelectItem value="65plus">65+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="gender" className="text-xs">Gender</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Clinical Criteria</Label>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                          <div>
                            <Label htmlFor="diagnoses" className="text-xs">Diagnoses (ICD-10)</Label>
                            <Input id="diagnoses" placeholder="E.g., E11 (Type 2 diabetes)" />
                          </div>
                          <div>
                            <Label htmlFor="medications" className="text-xs">Medications</Label>
                            <Input id="medications" placeholder="E.g., metformin, atorvastatin" />
                          </div>
                          <div>
                            <Label htmlFor="lab-values" className="text-xs">Lab Values</Label>
                            <Input id="lab-values" placeholder="E.g., HbA1c > 7.0" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Advanced Filters</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <Label htmlFor="visit-count" className="text-xs">Minimum Visit Count</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select minimum" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="1">At least 1</SelectItem>
                                <SelectItem value="2">At least 2</SelectItem>
                                <SelectItem value="3">At least 3</SelectItem>
                                <SelectItem value="5">At least 5</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="follow-up" className="text-xs">Follow-up Period</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select period" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="6m">At least 6 months</SelectItem>
                                <SelectItem value="1y">At least 1 year</SelectItem>
                                <SelectItem value="2y">At least 2 years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-imaging" />
                      <label
                        htmlFor="include-imaging"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include patients with imaging data
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-molecular" />
                      <label
                        htmlFor="include-molecular"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include patients with molecular testing
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Query
                  </Button>
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Run Cohort Query
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Saved Cohorts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cohortGroups.map((group, index) => (
                      <div 
                        key={index} 
                        className="border rounded-md p-3 hover:bg-muted/20 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{group.name}</h3>
                          <Badge variant="outline">{group.count}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Updated {group.lastUpdated}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Cohorts
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentQueries.map((query, index) => (
                      <div key={index} className="text-sm border-l-2 border-primary/30 pl-3 py-1 hover:bg-muted/20 cursor-pointer">
                        {query}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileBarChart className="h-5 w-5" />
                  Available Analytics Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                    <h3 className="font-semibold">Treatment Pattern Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Analyze sequence of treatments, line of therapy distributions, and switching patterns
                    </p>
                    <div className="mt-3">
                      <Badge variant="secondary">Machine Learning</Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                    <h3 className="font-semibold">Outcomes Research</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Compare effectiveness across different treatments, patient subgroups, and settings
                    </p>
                    <div className="mt-3">
                      <Badge variant="secondary">Statistical Tools</Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                    <h3 className="font-semibold">Predictive Modeling</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Build predictive models for disease progression, treatment response, or adverse events
                    </p>
                    <div className="mt-3">
                      <Badge variant="secondary">AI-Assisted</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Launch Analytics Workspace
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Types Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Clinical Data</h3>
                      <p className="text-sm text-muted-foreground">10M+ patient records with diagnoses, procedures, medications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FileBarChart className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Laboratory Results</h3>
                      <p className="text-sm text-muted-foreground">150M+ lab values with reference ranges and trends</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Imaging Data</h3>
                      <p className="text-sm text-muted-foreground">2M+ imaging studies with structured reports</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Database className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Molecular Data</h3>
                      <p className="text-sm text-muted-foreground">500K+ genetic profiles, biomarkers, and sequencing</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-3 border rounded-md bg-muted/20">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <p className="text-sm font-medium">Data Refreshed Daily</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    All data is de-identified according to HIPAA Safe Harbor method
                    and undergoes quality control before being added to the platform.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="compliance" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Data Governance & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <h3 className="font-semibold">HIPAA Compliant</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All data is de-identified according to HIPAA Safe Harbor method and
                      the platform maintains strict access controls and audit logs.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Database className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold">GDPR Ready</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Platform is designed with privacy by design principles and supports
                      data sovereignty requirements for European data.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Eye className="h-4 w-4 text-purple-600" />
                      </div>
                      <h3 className="font-semibold">IRB Oversight</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Research activities using this platform are reviewed by an independent
                      ethics board to ensure patient protection.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-4">Access Control & Audit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium">Role-Based Access</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Data access is strictly limited based on user roles and permissions,
                        with granular controls for different data types.
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium">Comprehensive Audit Logs</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        All data access and queries are logged with user identification,
                        timestamp, and purpose of use.
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium">De-identification Techniques</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Multiple layers of de-identification including removal of identifiers,
                        date shifting, and generalization of rare values.
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <h4 className="font-medium">Re-identification Risk Assessment</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Regular statistical analysis to ensure extremely low risk of
                        re-identification in all datasets.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="p-4 border rounded-lg bg-muted/10">
                  <h3 className="font-semibold mb-2">Data Use Agreement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    All users must agree to our Data Use Agreement which prohibits attempts to re-identify
                    patients or use data for marketing purposes. Violations result in immediate access termination
                    and potential legal action.
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline">View Data Use Agreement</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold">De-identified Dataset</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Export the complete de-identified dataset for selected cohort in various formats
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">CSV</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">Excel</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">JSON</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">SAS</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">SPSS</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">R</Badge>
                    </div>
                    <Button className="mt-4">
                      <Download className="mr-2 h-4 w-4" />
                      Export Dataset
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold">Summary Statistics</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Export aggregated statistics and visualizations of cohort characteristics
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="demographics" />
                        <label
                          htmlFor="demographics"
                          className="text-sm font-medium leading-none"
                        >
                          Demographics
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="diagnoses" />
                        <label
                          htmlFor="diagnoses"
                          className="text-sm font-medium leading-none"
                        >
                          Diagnoses
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="labs" />
                        <label
                          htmlFor="labs"
                          className="text-sm font-medium leading-none"
                        >
                          Lab Values
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="meds" />
                        <label
                          htmlFor="meds"
                          className="text-sm font-medium leading-none"
                        >
                          Medications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="procedures" />
                        <label
                          htmlFor="procedures"
                          className="text-sm font-medium leading-none"
                        >
                          Procedures
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="outcomes" />
                        <label
                          htmlFor="outcomes"
                          className="text-sm font-medium leading-none"
                        >
                          Outcomes
                        </label>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                      <FileBarChart className="mr-2 h-4 w-4" />
                      Export Summary
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sharing & Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold">Share Cohort Definition</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Share your cohort criteria with colleagues without exposing patient data
                    </p>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="share-email" className="text-xs">Email Address</Label>
                        <Input id="share-email" placeholder="Enter colleague's email" />
                      </div>
                      <div>
                        <Label className="text-xs">Permission Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select permission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="view">View Only</SelectItem>
                            <SelectItem value="edit">Edit</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Send Invitation</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold">Research Collaboration</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Create a collaborative workspace for multi-center research projects
                    </p>
                    <div className="border p-3 rounded-md mb-3 bg-muted/10">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Diabetes Outcomes Study</h4>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">3 collaborators • Last active 2 hours ago</p>
                    </div>
                    <div className="border p-3 rounded-md mb-3 border-dashed">
                      <h4 className="text-muted-foreground font-medium">Create New Collaboration</h4>
                      <p className="text-xs text-muted-foreground mt-1">Set up data sharing permissions and collaboration tools</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Manage Collaborations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealWorldDataPlatform;
