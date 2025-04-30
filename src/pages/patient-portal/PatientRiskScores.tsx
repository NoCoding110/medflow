
import React from "react";
import { Thermometer, AlertTriangle, Info } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PatientRiskScores = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Health Risk Assessment</h1>
      <p className="text-muted-foreground mb-6">
        AI-powered analysis of your health data to identify potential risks
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">About Health Risk Assessment</p>
            <p className="text-sm text-muted-foreground">
              These risk scores are calculated based on your medical history, lifestyle data, 
              family history, and current health metrics. They are meant to be informative and 
              preventive, not diagnostic. Always consult with your healthcare provider for 
              professional medical advice.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <span>Cardiovascular Risk</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Calculated using the Framingham Risk Score, which includes factors like age, 
                      gender, cholesterol levels, blood pressure, and smoking status.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Risk Level</span>
              <span className="text-sm text-amber-600 font-medium">Moderate (12%)</span>
            </div>
            <Progress value={42} className="h-2 mb-4" />
            
            <div className="space-y-2 text-sm">
              <p className="font-medium">Contributing Factors:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Slightly elevated LDL cholesterol (130 mg/dL)</li>
                <li>Family history of heart disease</li>
                <li>Occasional high blood pressure readings</li>
              </ul>
              
              <p className="font-medium mt-4">Recommendations:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Consider discussing statin therapy with your doctor</li>
                <li>Increase physical activity to 30 minutes daily</li>
                <li>Reduce sodium intake to help control blood pressure</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Detailed Report</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-green-500" />
                <span>Diabetes Risk</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Based on the American Diabetes Association risk assessment model, including 
                      factors like BMI, age, activity level, and family history.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Risk Level</span>
              <span className="text-sm text-green-600 font-medium">Low (5%)</span>
            </div>
            <Progress value={18} className="h-2 mb-4" />
            
            <div className="space-y-2 text-sm">
              <p className="font-medium">Protective Factors:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Healthy body weight (BMI: 23.5)</li>
                <li>Regular physical activity</li>
                <li>Normal fasting glucose levels</li>
              </ul>
              
              <p className="font-medium mt-4">Recommendations:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Continue current diet and exercise habits</li>
                <li>Annual blood glucose screening</li>
                <li>Limit intake of refined sugars and processed foods</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Detailed Report</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Other Health Risk Assessments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Stroke Risk</span>
                  <span className="text-sm text-amber-600">Moderate</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">COPD Risk</span>
                  <span className="text-sm text-green-600">Low</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Osteoporosis Risk</span>
                  <span className="text-sm text-amber-600">Moderate</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Generate Comprehensive Risk Report</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PatientRiskScores;
