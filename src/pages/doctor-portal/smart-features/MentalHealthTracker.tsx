
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Brain, ThumbsUp } from "lucide-react";
import PatientFilter from "@/components/doctor-portal/smart-features/PatientFilter";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mentalHealthData = [
  { day: "Mon", anxiety: 3, mood: 4, sleep: 7 },
  { day: "Tue", anxiety: 4, mood: 3, sleep: 6 },
  { day: "Wed", anxiety: 2, mood: 5, sleep: 8 },
  { day: "Thu", anxiety: 3, mood: 4, sleep: 7 },
  { day: "Fri", anxiety: 2, mood: 6, sleep: 8 },
  { day: "Sat", anxiety: 1, mood: 7, sleep: 8 },
  { day: "Sun", anxiety: 2, mood: 6, sleep: 7 },
];

const MentalHealthTracker = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("all");

  // In a real app, you would filter data based on the selectedPatientId
  // For now, we'll just use the same data for demonstration
  const handlePatientChange = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Mental Health Tracking</h1>
      
      <PatientFilter onPatientChange={handlePatientChange} />
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood Score</CardTitle>
            <Brain className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.0/7.0</div>
            <p className="text-xs text-muted-foreground">Past 7 days average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.3/10</div>
            <p className="text-xs text-muted-foreground">Weekly average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
            <ThumbsUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Overall wellness index</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mental Health Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mentalHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="anxiety" 
                  stroke="#ff6b6b" 
                  name="Anxiety Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#4ecdc4" 
                  name="Mood Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#45b7d1" 
                  name="Sleep Quality"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthTracker;
