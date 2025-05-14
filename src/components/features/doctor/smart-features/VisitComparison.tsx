import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowDown, ArrowUp, Minus } from 'lucide-react';
import AIInsightsBox from '@/components/AIInsightsBox';

const VisitComparison = () => {
  const compareData = {
    vitals: [
      {
        metric: "Blood Pressure",
        current: "130/85",
        previous: "140/90",
        trend: "improved"
      },
      {
        metric: "Heart Rate",
        current: "72",
        previous: "75",
        trend: "stable"
      },
      {
        metric: "Weight (kg)",
        current: "82",
        previous: "80",
        trend: "declined"
      }
    ],
    medications: [
      {
        name: "Lisinopril",
        current: "20mg daily",
        previous: "10mg daily",
        change: "increased"
      },
      {
        name: "Metformin",
        current: "1000mg twice daily",
        previous: "1000mg twice daily",
        change: "unchanged"
      }
    ],
    symptoms: [
      {
        type: "Headache",
        current: "Mild",
        previous: "Severe",
        status: "improved"
      },
      {
        type: "Fatigue",
        current: "None",
        previous: "Moderate",
        status: "resolved"
      }
    ]
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Visit Comparison</h1>
      <AIInsightsBox />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Vitals Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {compareData.vitals.map((vital, index) => (
                <div key={index} className="py-3 flex items-center justify-between">
                  <span className="font-medium">{vital.metric}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-muted-foreground">{vital.previous}</span>
                    <span className="w-20 text-right">{vital.current}</span>
                    <span className="w-6">
                      {vital.trend === 'improved' && (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      )}
                      {vital.trend === 'declined' && (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                      {vital.trend === 'stable' && (
                        <Minus className="h-4 w-4 text-yellow-500" />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {compareData.medications.map((med, index) => (
                  <div key={index}>
                    <div className="font-medium">{med.name}</div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Previous: {med.previous}</span>
                      <span>Current: {med.current}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {compareData.symptoms.map((symptom, index) => (
                  <div key={index}>
                    <div className="font-medium">{symptom.type}</div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Previous: {symptom.previous}</span>
                      <span>Current: {symptom.current}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VisitComparison;
