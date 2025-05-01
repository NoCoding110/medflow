import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Heart,
  Activity,
  Thermometer,
  Search,
  Calendar,
  Clock,
  Smartphone,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  User,
  ChevronRight
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastChecked: string;
  metrics: {
    heartRate: number;
    heartRateTrend: 'up' | 'down' | 'stable';
    steps: number;
    stepsTrend: 'up' | 'down' | 'stable';
    temperature: number;
    temperatureTrend: 'up' | 'down' | 'stable';
    bloodPressure: string;
    bloodPressureTrend: 'up' | 'down' | 'stable';
    sleep: number;
    sleepTrend: 'up' | 'down' | 'stable';
    stress: number;
    stressTrend: 'up' | 'down' | 'stable';
  };
  weeklyData: Array<{
    date: string;
    heartRate: number;
    steps: number;
    temperature: number;
  }>;
  status: 'normal' | 'warning' | 'critical';
}

// Sample patient data
const patients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 45,
    lastChecked: '2 hours ago',
    metrics: {
      heartRate: 72,
      heartRateTrend: 'up',
      steps: 9500,
      stepsTrend: 'up',
      temperature: 36.6,
      temperatureTrend: 'stable',
      bloodPressure: '120/80',
      bloodPressureTrend: 'stable',
      sleep: 7.5,
      sleepTrend: 'down',
      stress: 42,
      stressTrend: 'up'
    },
    weeklyData: [
      { date: '2025-04-22', heartRate: 75, steps: 8000, temperature: 36.5 },
      { date: '2025-04-23', heartRate: 72, steps: 9500, temperature: 36.6 },
      { date: '2025-04-24', heartRate: 70, steps: 7500, temperature: 36.6 },
      { date: '2025-04-25', heartRate: 73, steps: 9000, temperature: 36.7 },
      { date: '2025-04-26', heartRate: 71, steps: 11000, temperature: 36.5 },
      { date: '2025-04-27', heartRate: 74, steps: 8500, temperature: 36.6 },
      { date: '2025-04-28', heartRate: 72, steps: 9500, temperature: 36.6 }
    ],
    status: 'normal'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 52,
    lastChecked: '1 hour ago',
    metrics: {
      heartRate: 82,
      heartRateTrend: 'up',
      steps: 6500,
      stepsTrend: 'down',
      temperature: 37.2,
      temperatureTrend: 'up',
      bloodPressure: '135/85',
      bloodPressureTrend: 'up',
      sleep: 6.2,
      sleepTrend: 'down',
      stress: 65,
      stressTrend: 'up'
    },
    weeklyData: [
      { date: '2025-04-22', heartRate: 78, steps: 7000, temperature: 36.8 },
      { date: '2025-04-23', heartRate: 80, steps: 6800, temperature: 36.9 },
      { date: '2025-04-24', heartRate: 79, steps: 6500, temperature: 37.0 },
      { date: '2025-04-25', heartRate: 81, steps: 6200, temperature: 37.1 },
      { date: '2025-04-26', heartRate: 80, steps: 6400, temperature: 37.1 },
      { date: '2025-04-27', heartRate: 81, steps: 6300, temperature: 37.2 },
      { date: '2025-04-28', heartRate: 82, steps: 6500, temperature: 37.2 }
    ],
    status: 'warning'
  },
  {
    id: '3',
    name: 'Emily Davis',
    age: 38,
    lastChecked: '30 minutes ago',
    metrics: {
      heartRate: 95,
      heartRateTrend: 'up',
      steps: 3200,
      stepsTrend: 'down',
      temperature: 38.1,
      temperatureTrend: 'up',
      bloodPressure: '145/95',
      bloodPressureTrend: 'up',
      sleep: 5.5,
      sleepTrend: 'down',
      stress: 85,
      stressTrend: 'up'
    },
    weeklyData: [
      { date: '2025-04-22', heartRate: 82, steps: 7500, temperature: 36.9 },
      { date: '2025-04-23', heartRate: 85, steps: 6500, temperature: 37.2 },
      { date: '2025-04-24', heartRate: 88, steps: 5000, temperature: 37.5 },
      { date: '2025-04-25', heartRate: 90, steps: 4200, temperature: 37.8 },
      { date: '2025-04-26', heartRate: 92, steps: 3800, temperature: 37.9 },
      { date: '2025-04-27', heartRate: 94, steps: 3500, temperature: 38.0 },
      { date: '2025-04-28', heartRate: 95, steps: 3200, temperature: 38.1 }
    ],
    status: 'critical'
  }
];

const WellnessDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(patients[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: 'normal' | 'warning' | 'critical') => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view their wellness data</CardDescription>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent ${
                      selectedPatient.id === patient.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{patient.name}</p>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {patient.lastChecked}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Wellness Dashboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{selectedPatient.name}'s Wellness Dashboard</h2>
              <p className="text-muted-foreground">
                Age: {selectedPatient.age} • Last updated: {selectedPatient.lastChecked}
              </p>
            </div>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Check-up
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{selectedPatient.metrics.heartRate} BPM</div>
                    <p className="text-xs text-muted-foreground">Normal range</p>
                  </div>
                  {getTrendIcon(selectedPatient.metrics.heartRateTrend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{selectedPatient.metrics.steps}</div>
                    <p className="text-xs text-muted-foreground">Goal: 10,000</p>
                  </div>
                  {getTrendIcon(selectedPatient.metrics.stepsTrend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{selectedPatient.metrics.temperature}°C</div>
                    <p className="text-xs text-muted-foreground">Normal range</p>
                  </div>
                  {getTrendIcon(selectedPatient.metrics.temperatureTrend)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>Track patient's wellness metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="heartRate">
                <TabsList>
                  <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
                  <TabsTrigger value="steps">Steps</TabsTrigger>
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                </TabsList>
                <TabsContent value="heartRate" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="heartRate" stroke="#ef4444" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="steps" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="steps" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="temperature" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="temperature" stroke="#f97316" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Additional Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{selectedPatient.metrics.bloodPressure}</div>
                    <p className="text-xs text-muted-foreground">mmHg</p>
                  </div>
                  {getTrendIcon(selectedPatient.metrics.bloodPressureTrend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                <Clock className="h-4 w-4 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{selectedPatient.metrics.sleep}h</div>
                    <p className="text-xs text-muted-foreground">Average</p>
                  </div>
                  {getTrendIcon(selectedPatient.metrics.sleepTrend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{selectedPatient.metrics.stress}%</div>
                    <p className="text-xs text-muted-foreground">Based on HRV</p>
                  </div>
                  {getTrendIcon(selectedPatient.metrics.stressTrend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Device Status</CardTitle>
                <Smartphone className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">Active</div>
                    <p className="text-xs text-muted-foreground">Last sync: 5m ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;
