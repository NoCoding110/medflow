
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Activity, FileBarChart, AlertCircle, Users } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useToast } from "@/components/ui/use-toast";

const CardiologyModule = () => {
  const { toast } = useToast();
  
  // Mock patient data
  const patients = [
    { id: "p1", name: "Richard Thompson", age: 68, diagnosis: "Heart Failure", lastECG: "2024-04-12" },
    { id: "p2", name: "Linda Martinez", age: 59, diagnosis: "Arrhythmia", lastECG: "2024-04-05" },
    { id: "p3", name: "Robert Harris", age: 72, diagnosis: "Coronary Artery Disease", lastECG: "2024-03-28" },
    { id: "p4", name: "Patricia Lee", age: 64, diagnosis: "Hypertension", lastECG: "2024-04-15" }
  ];
  
  const { mutate: analyzeECG } = useApiMutation(
    async () => {
      // Simulate API call to analyze ECG
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    }
  );

  const handleAnalyzeECG = async (patientId: string) => {
    try {
      await analyzeECG(undefined, {
        successMessage: "ECG analysis completed successfully",
        errorMessage: "Failed to analyze ECG"
      });
    } catch (error) {
      console.error("Error analyzing ECG:", error);
    }
  };

  const handleRiskPrediction = (patientId: string) => {
    toast({
      title: "Risk Prediction Complete",
      description: "Cardiovascular risk assessment completed for the patient.",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Cardiology AI Module</h1>
        <p className="text-muted-foreground">ECG analysis, risk prediction, and cardiac care management tools</p>
      </div>

      <Tabs defaultValue="ecg">
        <TabsList className="mb-6">
          <TabsTrigger value="ecg">ECG Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Prediction</TabsTrigger>
          <TabsTrigger value="failure">Heart Failure Management</TabsTrigger>
        </TabsList>

        <TabsContent value="ecg">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                ECG AI Analysis
              </CardTitle>
              <CardDescription>
                Analyze ECG readings using AI to detect arrhythmias and other cardiac abnormalities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{patient.name}, {patient.age}</h3>
                      <p className="text-sm text-muted-foreground">Diagnosis: {patient.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">Last ECG: {patient.lastECG}</p>
                    </div>
                    <Button onClick={() => handleAnalyzeECG(patient.id)}>Analyze ECG</Button>
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
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>Automated arrhythmia detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>QT interval measurement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>ST segment elevation analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>Comparative analysis with previous ECGs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>Predictive cardiac event risk scoring</span>
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
                  <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-3">
                    <div className="font-medium">Richard Thompson</div>
                    <div className="text-sm text-muted-foreground">2 days ago</div>
                    <div className="mt-2 text-sm text-amber-800">
                      <AlertCircle className="inline-block h-4 w-4 mr-1" />
                      Potential atrial fibrillation detected.
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="font-medium">Linda Martinez</div>
                    <div className="text-sm text-muted-foreground">1 week ago</div>
                    <div className="mt-2 text-sm">
                      No significant abnormalities detected.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-500" />
                Cardiovascular Risk Prediction
              </CardTitle>
              <CardDescription>
                Predict 10-year cardiovascular risk using clinical data and machine learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{patient.name}, {patient.age}</h3>
                      <p className="text-sm text-muted-foreground">Diagnosis: {patient.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">Last Assessment: {patient.lastECG}</p>
                    </div>
                    <Button onClick={() => handleRiskPrediction(patient.id)}>Calculate Risk</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="failure">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5 text-red-500" />
                Heart Failure Management
              </CardTitle>
              <CardDescription>
                Monitor heart failure progression and optimize treatment plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
                <div className="text-center">
                  <Activity className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium">Heart Failure Dashboard</p>
                  <p className="text-xs text-muted-foreground">
                    Displays patient metrics, medication effectiveness, and treatment recommendations
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button>Generate Treatment Plan</Button>
                <Button variant="outline">Export Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CardiologyModule;
