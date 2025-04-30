
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, Star, BarChart } from "lucide-react";
import PatientFilter from "@/components/doctor-portal/smart-features/PatientFilter";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const goalProgressData = [
  { goal: "Weight Loss", progress: 75 },
  { goal: "Exercise", progress: 60 },
  { goal: "Blood Pressure", progress: 90 },
  { goal: "Blood Sugar", progress: 85 },
  { goal: "Sleep", progress: 70 },
];

const PatientGoals = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("all");

  const handlePatientChange = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Goals Tracking</h1>
      
      <PatientFilter onPatientChange={handlePatientChange} />
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Across all patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <BarChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">All active goals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Goal Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={goalProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="goal" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#4f46e5" name="Progress %" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Goal Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { patient: "John Doe", goal: "Reduce Blood Pressure", progress: "On Track" },
                { patient: "Jane Smith", goal: "Weight Management", progress: "Needs Attention" },
                { patient: "Mike Johnson", goal: "Exercise Routine", progress: "Exceeding" },
                { patient: "Lisa Brown", goal: "Diabetes Management", progress: "On Track" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.patient}</p>
                    <p className="text-sm text-muted-foreground">{item.goal}</p>
                  </div>
                  <div className={`text-sm font-medium ${
                    item.progress === "On Track" ? "text-green-500" :
                    item.progress === "Needs Attention" ? "text-red-500" :
                    "text-blue-500"
                  }`}>
                    {item.progress}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientGoals;
