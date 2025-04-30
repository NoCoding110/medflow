
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Brain, AlertTriangle } from 'lucide-react';

const SmartDifferential = () => {
  // Sample data - in a real app this would come from an AI service
  const suggestions = [
    {
      diagnosis: "Hypertension",
      confidence: 85,
      symptoms: ["elevated blood pressure", "headache", "dizziness"],
      risk: "moderate"
    },
    {
      diagnosis: "Anxiety Disorder",
      confidence: 70,
      symptoms: ["palpitations", "restlessness", "sleep disturbance"],
      risk: "low"
    }
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Smart Differential Diagnosis</h1>
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Generate New Analysis
        </Button>
      </div>

      <div className="grid gap-6">
        {suggestions.map((suggestion, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {suggestion.diagnosis}
                </div>
                <span className="text-sm font-normal">
                  Confidence: {suggestion.confidence}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Supporting Symptoms:</h3>
                  <ul className="list-disc pl-5">
                    {suggestion.symptoms.map((symptom, idx) => (
                      <li key={idx}>{symptom}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Risk Level: <span className="font-semibold">{suggestion.risk}</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartDifferential;
