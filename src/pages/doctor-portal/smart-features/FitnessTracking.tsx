
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Heart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fitnessData = [
  {
    patientName: "Emma Wilson",
    age: 28,
    weeklyStats: {
      averageSteps: "8,500",
      activeDays: 5,
      totalDistance: "42.5km",
      caloriesBurned: "2,800"
    },
    activityTrend: [
      { day: "Mon", steps: 9000, calories: 400 },
      { day: "Tue", steps: 7500, calories: 350 },
      { day: "Wed", steps: 10000, calories: 450 },
      { day: "Thu", steps: 8500, calories: 380 },
      { day: "Fri", steps: 12000, calories: 520 },
      { day: "Sat", steps: 6000, calories: 280 },
      { day: "Sun", steps: 7000, calories: 320 }
    ]
  }
];

const FitnessTracking = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Fitness Tracking</h1>

      {fitnessData.map((patient, index) => (
        <div key={index} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Overview - {patient.patientName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Steps</CardTitle>
                    <Activity className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patient.weeklyStats.averageSteps}</div>
                    <p className="text-xs text-muted-foreground">per day</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Days</CardTitle>
                    <Heart className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patient.weeklyStats.activeDays}/7</div>
                    <p className="text-xs text-muted-foreground">days this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Distance</CardTitle>
                    <Activity className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patient.weeklyStats.totalDistance}</div>
                    <p className="text-xs text-muted-foreground">total distance</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Calories</CardTitle>
                    <Activity className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patient.weeklyStats.caloriesBurned}</div>
                    <p className="text-xs text-muted-foreground">kcal burned</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.activityTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#3b82f6" name="Steps" />
                    <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#f97316" name="Calories" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FitnessTracking;
