
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const SmartVisitPrep = () => {
  // Sample data - in a real app, this would come from an API
  const briefing = {
    newSymptoms: ['Persistent headache', 'Mild fever'],
    vitalChanges: [
      { metric: 'Blood Pressure', value: '140/90', change: '+10/5', status: 'warning' },
      { metric: 'Heart Rate', value: '75 bpm', change: '-5', status: 'normal' },
    ],
    missedMeds: ['Lisinopril - 2 doses this week'],
    upcomingScreenings: ['Annual physical', 'Cholesterol test']
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Smart Visit Preparation</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              New Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {briefing.newSymptoms.map((symptom, index) => (
                <li key={index} className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  {symptom}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vital Changes</CardTitle>
          </CardHeader>
          <CardContent>
            {briefing.vitalChanges.map((vital, index) => (
              <div key={index} className="flex items-center justify-between mb-4">
                <span>{vital.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{vital.value}</span>
                  <span className={`text-sm ${vital.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}`}>
                    {vital.change}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Missed Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {briefing.missedMeds.map((med, index) => (
                <li key={index} className="flex items-center gap-2 text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  {med}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Screenings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {briefing.upcomingScreenings.map((screening, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {screening}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartVisitPrep;
