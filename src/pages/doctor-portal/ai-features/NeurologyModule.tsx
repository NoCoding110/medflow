
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Activity, FileBarChart, Search, Users, Calendar } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useToast } from "@/components/ui/use-toast";

const NeurologyModule = () => {
  const { toast } = useToast();
  
  // Mock patient data
  const patients = [
    { id: "p1", name: "James Wilson", age: 62, diagnosis: "Alzheimer's Disease", lastScan: "2024-03-15" },
    { id: "p2", name: "Sarah Johnson", age: 45, diagnosis: "Multiple Sclerosis", lastScan: "2024-04-02" },
    { id: "p3", name: "Michael Chen", age: 57, diagnosis: "Parkinson's Disease", lastScan: "2024-04-10" },
    { id: "p4", name: "Emily Davis", age: 38, diagnosis: "Epilepsy", lastScan: "2024-03-28" }
  ];
  
  const { mutate: analyzeScan } = useApiMutation(
    async () => {
      // Simulate API call to analyze brain scan
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    }
  );

  const handleAnalyzeScan = async (patientId: string) => {
    try {
      await analyzeScan(undefined, {
        successMessage: "Brain MRI analysis completed successfully",
        errorMessage: "Failed to analyze brain MRI"
      });
    } catch (error) {
      console.error("Error analyzing scan:", error);
    }
  };

  const handleRunAssessment = (patientId: string) => {
    toast({
      title: "Cognitive Assessment Scheduled",
      description: "The assessment has been scheduled for the patient.",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Neurology AI Module</h1>
        <p className="text-muted-foreground">Advanced neurological imaging analysis and cognitive assessment tools</p>
      </div>

      <Tabs defaultValue="analysis">
        <TabsList className="mb-6">
          <TabsTrigger value="analysis">Brain MRI Analysis</TabsTrigger>
          <TabsTrigger value="cognitive">Cognitive Assessment</TabsTrigger>
          <TabsTrigger value="tracking">Disease Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                Brain MRI Analysis
              </CardTitle>
              <CardDescription>
                Analyze brain MRIs using deep learning to detect abnormalities and assist with diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{patient.name}, {patient.age}</h3>
                      <p className="text-sm text-muted-foreground">Diagnosis: {patient.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">Last Scan: {patient.lastScan}</p>
                    </div>
                    <Button onClick={() => handleAnalyzeScan(patient.id)}>Analyze Scan</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>Automated lesion detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>Volumetric brain structure analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>White matter integrity assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>Comparative analysis with previous scans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>3D visualization and reporting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <div className="font-medium">James Wilson</div>
                    <div className="text-sm text-muted-foreground">4 days ago</div>
                    <div className="mt-2 text-sm">
                      AI detected 3 new lesions compared to previous scan.
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">1 week ago</div>
                    <div className="mt-2 text-sm">
                      No significant changes detected from previous scan.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="cognitive">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Cognitive Assessment Tools
              </CardTitle>
              <CardDescription>
                Standardized cognitive assessment tools to evaluate patient cognitive function
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{patient.name}, {patient.age}</h3>
                      <p className="text-sm text-muted-foreground">Diagnosis: {patient.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">Last Assessment: {patient.lastScan}</p>
                    </div>
                    <Button onClick={() => handleRunAssessment(patient.id)}>Run Assessment</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5 text-blue-500" />
                Neurodegenerative Disease Tracking
              </CardTitle>
              <CardDescription>
                Track disease progression over time using longitudinal data analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
                <div className="text-center">
                  <Activity className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium">Longitudinal Analysis Visualization</p>
                  <p className="text-xs text-muted-foreground">
                    Displays disease progression over time based on multiple data points
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button>Generate Report</Button>
                <Button variant="outline">Export Data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeurologyModule;
