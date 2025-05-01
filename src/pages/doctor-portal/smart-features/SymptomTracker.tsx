import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  AlertCircle,
  Search,
  User,
  Activity,
  ThumbsUp,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: number;
  frequency: string;
  trend: 'increasing' | 'stable' | 'decreasing';
  lastReported: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastUpdate: string;
  status: 'stable' | 'monitoring' | 'urgent';
  mostReportedSymptom: string;
  percentageOfReports: number;
  averageSeverity: string;
  improvingSymptoms: number;
  weeklyData: Array<{
    day: string;
    headache: number;
    nausea: number;
    fatigue: number;
  }>;
  symptoms: Symptom[];
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 32,
    lastUpdate: '2 hours ago',
    status: 'stable',
    mostReportedSymptom: 'Headache',
    percentageOfReports: 43,
    averageSeverity: 'Moderate',
    improvingSymptoms: 2,
    weeklyData: [
      { day: 'Mon', headache: 4, nausea: 3, fatigue: 1 },
      { day: 'Tue', headache: 3, nausea: 2, fatigue: 2 },
      { day: 'Wed', headache: 5, nausea: 4, fatigue: 1 },
      { day: 'Thu', headache: 3, nausea: 3, fatigue: 0 },
      { day: 'Fri', headache: 2, nausea: 1, fatigue: 1 },
      { day: 'Sat', headache: 2, nausea: 2, fatigue: 0 },
      { day: 'Sun', headache: 1, nausea: 1, fatigue: 1 },
    ],
    symptoms: [
      {
        id: 's1',
        name: 'Headache',
        severity: 3,
        frequency: 'Daily',
        trend: 'decreasing',
        lastReported: '6 hours ago'
      },
      {
        id: 's2',
        name: 'Nausea',
        severity: 2,
        frequency: 'Intermittent',
        trend: 'stable',
        lastReported: '1 day ago'
      }
    ]
  },
  {
    id: '2',
    name: 'James Anderson',
    age: 45,
    lastUpdate: '1 day ago',
    status: 'monitoring',
    mostReportedSymptom: 'Chest Pain',
    percentageOfReports: 65,
    averageSeverity: 'High',
    improvingSymptoms: 1,
    weeklyData: [
      { day: 'Mon', headache: 2, nausea: 4, fatigue: 3 },
      { day: 'Tue', headache: 3, nausea: 3, fatigue: 4 },
      { day: 'Wed', headache: 4, nausea: 5, fatigue: 4 },
      { day: 'Thu', headache: 2, nausea: 3, fatigue: 3 },
      { day: 'Fri', headache: 1, nausea: 2, fatigue: 2 },
      { day: 'Sat', headache: 2, nausea: 2, fatigue: 2 },
      { day: 'Sun', headache: 1, nausea: 1, fatigue: 2 },
    ],
    symptoms: [
      {
        id: 's3',
        name: 'Chest Pain',
        severity: 4,
        frequency: 'Daily',
        trend: 'increasing',
        lastReported: '3 hours ago'
      }
    ]
  },
  // Add more mock patients as needed
];

const STATUS_COLORS = {
  stable: 'bg-green-100 text-green-800',
  monitoring: 'bg-yellow-100 text-yellow-800',
  urgent: 'bg-red-100 text-red-800'
};

const TREND_ICONS = {
  increasing: <TrendingUp className="h-4 w-4 text-red-500" />,
  stable: <Minus className="h-4 w-4 text-yellow-500" />,
  decreasing: <TrendingDown className="h-4 w-4 text-green-500" />
};

const SymptomTracker = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(mockPatients[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view symptoms</CardDescription>
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
            <ScrollArea className="h-[calc(100vh-220px)]">
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
                        <Badge className={STATUS_COLORS[patient.status]}>
                          {patient.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last update: {patient.lastUpdate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Symptom Dashboard */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Symptom History - {selectedPatient.name}</h2>
          
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Most Reported</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPatient.mostReportedSymptom}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPatient.percentageOfReports}% of reports
                    </p>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Symptom Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPatient.averageSeverity}</h3>
                    <p className="text-sm text-muted-foreground">Average intensity</p>
                  </div>
                  <Activity className="h-5 w-5 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Improving Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPatient.improvingSymptoms} Symptoms</h3>
                    <p className="text-sm text-muted-foreground">Showing improvement</p>
                  </div>
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Symptom Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Symptom Trends</CardTitle>
              <CardDescription>Symptom intensity over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedPatient.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="headache" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="nausea" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="fatigue" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Current Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle>Active Symptoms</CardTitle>
              <CardDescription>Currently reported symptoms and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPatient.symptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <h4 className="font-medium">{symptom.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Frequency: {symptom.frequency} • Last reported: {symptom.lastReported}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Severity: {symptom.severity}/5</span>
                          {TREND_ICONS[symptom.trend]}
                        </div>
                      </div>
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

export default SymptomTracker;
