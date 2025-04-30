
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, AlertTriangle, ThumbsUp } from "lucide-react";

const symptomsData = [
  { day: "Mon", headache: 3, nausea: 1, fatigue: 4 },
  { day: "Tue", headache: 2, nausea: 2, fatigue: 3 },
  { day: "Wed", headache: 4, nausea: 1, fatigue: 5 },
  { day: "Thu", headache: 3, nausea: 0, fatigue: 3 },
  { day: "Fri", headache: 1, nausea: 1, fatigue: 2 },
  { day: "Sat", headache: 2, nausea: 0, fatigue: 2 },
  { day: "Sun", headache: 1, nausea: 1, fatigue: 1 },
];

const SymptomTracker = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Symptom History</h1>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Reported</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Headache</div>
            <p className="text-xs text-muted-foreground">43% of reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Symptom Severity</CardTitle>
            <Activity className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Moderate</div>
            <p className="text-xs text-muted-foreground">Average intensity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improving Symptoms</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Symptoms</div>
            <p className="text-xs text-muted-foreground">Showing improvement</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Symptom Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={symptomsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="headache" 
                  stroke="#8884d8" 
                  name="Headache"
                />
                <Line 
                  type="monotone" 
                  dataKey="nausea" 
                  stroke="#82ca9d" 
                  name="Nausea"
                />
                <Line 
                  type="monotone" 
                  dataKey="fatigue" 
                  stroke="#ffc658" 
                  name="Fatigue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomTracker;
