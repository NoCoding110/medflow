
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, FileBarChart, AlertTriangle, MessageSquare, File } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useToast } from "@/components/ui/use-toast";

const PsychiatryModule = () => {
  const { toast } = useToast();
  
  // Mock patient data
  const patients = [
    { id: "p1", name: "Jennifer Adams", age: 34, diagnosis: "Major Depressive Disorder", lastAssessment: "2024-04-10" },
    { id: "p2", name: "David Wilson", age: 42, diagnosis: "Generalized Anxiety Disorder", lastAssessment: "2024-04-05" },
    { id: "p3", name: "Thomas Garcia", age: 27, diagnosis: "PTSD", lastAssessment: "2024-03-30" },
    { id: "p4", name: "Susan Miller", age: 55, diagnosis: "Bipolar Disorder", lastAssessment: "2024-04-15" }
  ];
  
  const { mutate: runAssessment } = useApiMutation(
    async () => {
      // Simulate API call to run assessment
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    }
  );

  const handleRunAssessment = async (patientId: string) => {
    try {
      await runAssessment(undefined, {
        successMessage: "Assessment completed successfully",
        errorMessage: "Failed to run assessment"
      });
    } catch (error) {
      console.error("Error running assessment:", error);
    }
  };

  const handleMonitorOutcome = (patientId: string) => {
    toast({
      title: "Outcome Tracking Updated",
      description: "Therapy outcome tracking has been updated for the patient.",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Psychiatry AI Module</h1>
        <p className="text-muted-foreground">Mental health assessment tools, therapy outcome tracking, and crisis prevention</p>
      </div>

      <Tabs defaultValue="assessment">
        <TabsList className="mb-6">
          <TabsTrigger value="assessment">Assessment Tools</TabsTrigger>
          <TabsTrigger value="outcome">Therapy Outcomes</TabsTrigger>
          <TabsTrigger value="crisis">Crisis Prevention</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <File className="h-5 w-5 text-emerald-500" />
                Standardized Assessment Tools
              </CardTitle>
              <CardDescription>
                Administer and score standardized mental health assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{patient.name}, {patient.age}</h3>
                      <p className="text-sm text-muted-foreground">Diagnosis: {patient.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">Last Assessment: {patient.lastAssessment}</p>
                    </div>
                    <Button onClick={() => handleRunAssessment(patient.id)}>Run Assessment</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Assessment Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span>PHQ-9 (Depression)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span>GAD-7 (Anxiety)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span>PCL-5 (PTSD)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span>YMRS (Bipolar Disorder)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span>ASRS (ADHD)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessment Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border-l-4 border-red-500 bg-red-50 p-3">
                    <div className="font-medium">Jennifer Adams</div>
                    <div className="text-sm text-muted-foreground">3 days ago</div>
                    <div className="mt-2 text-sm text-red-800">
                      <AlertTriangle className="inline-block h-4 w-4 mr-1" />
                      PHQ-9 Score: 18 (Severe)
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="font-medium">David Wilson</div>
                    <div className="text-sm text-muted-foreground">1 week ago</div>
                    <div className="mt-2 text-sm">
                      GAD-7 Score: 12 (Moderate)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="outcome">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                Therapy Outcome Tracking
              </CardTitle>
              <CardDescription>
                Monitor patient progress over time with longitudinal assessment data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{patient.name}, {patient.age}</h3>
                      <p className="text-sm text-muted-foreground">Diagnosis: {patient.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">Last Update: {patient.lastAssessment}</p>
                    </div>
                    <Button onClick={() => handleMonitorOutcome(patient.id)}>Update Outcomes</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crisis">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-emerald-500" />
                Crisis Prevention Algorithms
              </CardTitle>
              <CardDescription>
                AI-powered risk detection and intervention recommendation system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
                <div className="text-center">
                  <Activity className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium">Crisis Risk Dashboard</p>
                  <p className="text-xs text-muted-foreground">
                    Displays patient risk levels and recommended interventions
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button>Run Risk Analysis</Button>
                <Button variant="outline">Emergency Protocols</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PsychiatryModule;
