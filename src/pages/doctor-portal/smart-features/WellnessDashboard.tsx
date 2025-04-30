
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Heart, Thermometer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '2025-04-22', heartRate: 72, steps: 8000, temperature: 36.6 },
  { date: '2025-04-23', heartRate: 75, steps: 10000, temperature: 36.5 },
  { date: '2025-04-24', heartRate: 71, steps: 7500, temperature: 36.7 },
  { date: '2025-04-25', heartRate: 73, steps: 9000, temperature: 36.6 },
  { date: '2025-04-26', heartRate: 74, steps: 11000, temperature: 36.5 },
  { date: '2025-04-27', heartRate: 70, steps: 8500, temperature: 36.6 },
  { date: '2025-04-28', heartRate: 72, steps: 9500, temperature: 36.7 },
];

const WellnessDashboard = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Wellness Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 BPM</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,500</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Body Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36.6°C</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Wellness Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="Heart Rate (BPM)" />
                <Line type="monotone" dataKey="steps" stroke="#3b82f6" name="Steps (k)" />
                <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temperature (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessDashboard;
