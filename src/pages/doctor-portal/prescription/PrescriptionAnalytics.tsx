import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Sample data for prescription analytics
const prescriptionData = {
  trends: [
    { month: 'Jan', prescriptions: 145, newPrescriptions: 65, refills: 80 },
    { month: 'Feb', prescriptions: 162, newPrescriptions: 72, refills: 90 },
    { month: 'Mar', prescriptions: 158, newPrescriptions: 68, refills: 90 },
    { month: 'Apr', prescriptions: 180, newPrescriptions: 85, refills: 95 },
    { month: 'May', prescriptions: 174, newPrescriptions: 78, refills: 96 },
    { month: 'Jun', prescriptions: 185, newPrescriptions: 82, refills: 103 },
  ],
  medicationDistribution: [
    { name: 'Antibiotics', value: 30, color: '#0088FE' },
    { name: 'Pain Medication', value: 25, color: '#00C49F' },
    { name: 'Cardiovascular', value: 20, color: '#FFBB28' },
    { name: 'Antidiabetic', value: 15, color: '#FF8042' },
    { name: 'Others', value: 10, color: '#8884d8' },
  ],
  adherenceRates: [
    { medication: 'Antibiotics', adherent: 85, nonAdherent: 15 },
    { medication: 'Pain Medication', adherent: 78, nonAdherent: 22 },
    { medication: 'Cardiovascular', adherent: 92, nonAdherent: 8 },
    { medication: 'Antidiabetic', adherent: 88, nonAdherent: 12 },
    { medication: 'Others', adherent: 75, nonAdherent: 25 },
  ],
  refillPatterns: [
    { day: 'Mon', onTime: 45, delayed: 12, missed: 3 },
    { day: 'Tue', onTime: 52, delayed: 8, missed: 2 },
    { day: 'Wed', onTime: 48, delayed: 10, missed: 4 },
    { day: 'Thu', onTime: 50, delayed: 9, missed: 3 },
    { day: 'Fri', onTime: 55, delayed: 7, missed: 2 },
  ],
};

const PrescriptionAnalytics = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prescription Analytics</h1>
          <p className="text-muted-foreground">View prescription statistics and trends</p>
        </div>
        <div className="flex items-center gap-4">
          <DatePickerWithRange />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by medication" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Medications</SelectItem>
              <SelectItem value="antibiotics">Antibiotics</SelectItem>
              <SelectItem value="pain">Pain Medication</SelectItem>
              <SelectItem value="cardio">Cardiovascular</SelectItem>
              <SelectItem value="diabetes">Antidiabetic</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Prescription Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Prescription Trends</CardTitle>
            <CardDescription>Monthly prescription volumes and types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prescriptionData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="prescriptions"
                    stroke="#0088FE"
                    name="Total Prescriptions"
                  />
                  <Line
                    type="monotone"
                    dataKey="newPrescriptions"
                    stroke="#00C49F"
                    name="New Prescriptions"
                  />
                  <Line
                    type="monotone"
                    dataKey="refills"
                    stroke="#FFBB28"
                    name="Refills"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Medication Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Medication Distribution</CardTitle>
            <CardDescription>Distribution by medication category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prescriptionData.medicationDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {prescriptionData.medicationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Adherence Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Adherence Rates</CardTitle>
            <CardDescription>Medication adherence by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prescriptionData.adherenceRates}
                  layout="vertical"
                  stackOffset="expand"
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit="%" />
                  <YAxis type="category" dataKey="medication" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="adherent" stackId="a" fill="#4CAF50" name="Adherent" />
                  <Bar dataKey="nonAdherent" stackId="a" fill="#FF5252" name="Non-Adherent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Refill Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Refill Patterns</CardTitle>
            <CardDescription>Weekly refill timing analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prescriptionData.refillPatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="onTime" stackId="a" fill="#4CAF50" name="On Time" />
                  <Bar dataKey="delayed" stackId="a" fill="#FFC107" name="Delayed" />
                  <Bar dataKey="missed" stackId="a" fill="#FF5252" name="Missed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrescriptionAnalytics; 