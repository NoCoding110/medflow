import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Search,
  User,
  Pill,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Bell
} from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string;
  adherenceRate: number;
  lastTaken: string;
  status: 'taken' | 'missed' | 'upcoming';
}

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastUpdate: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  overallAdherence: number;
  medications: Medication[];
  adherenceHistory: Array<{
    date: string;
    adherence: number;
  }>;
  medicationStats: Array<{
    name: string;
    value: number;
  }>;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 32,
    lastUpdate: '2 hours ago',
    status: 'compliant',
    overallAdherence: 92,
    medications: [
      {
        id: 'm1',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        timeOfDay: 'Morning',
        adherenceRate: 95,
        lastTaken: '2 hours ago',
        status: 'taken'
      },
      {
        id: 'm2',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        timeOfDay: 'Morning/Evening',
        adherenceRate: 88,
        lastTaken: '14 hours ago',
        status: 'upcoming'
      }
    ],
    adherenceHistory: [
      { date: 'Mon', adherence: 100 },
      { date: 'Tue', adherence: 100 },
      { date: 'Wed', adherence: 75 },
      { date: 'Thu', adherence: 100 },
      { date: 'Fri', adherence: 100 },
      { date: 'Sat', adherence: 88 },
      { date: 'Sun', adherence: 92 }
    ],
    medicationStats: [
      { name: 'Taken', value: 92 },
      { name: 'Missed', value: 5 },
      { name: 'Late', value: 3 }
    ]
  },
  {
    id: '2',
    name: 'James Anderson',
    age: 45,
    lastUpdate: '1 day ago',
    status: 'partial',
    overallAdherence: 78,
    medications: [
      {
        id: 'm3',
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily',
        timeOfDay: 'Evening',
        adherenceRate: 82,
        lastTaken: '1 day ago',
        status: 'missed'
      },
      {
        id: 'm4',
        name: 'Aspirin',
        dosage: '81mg',
        frequency: 'Once daily',
        timeOfDay: 'Morning',
        adherenceRate: 75,
        lastTaken: '3 hours ago',
        status: 'taken'
      }
    ],
    adherenceHistory: [
      { date: 'Mon', adherence: 75 },
      { date: 'Tue', adherence: 100 },
      { date: 'Wed', adherence: 50 },
      { date: 'Thu', adherence: 75 },
      { date: 'Fri', adherence: 100 },
      { date: 'Sat', adherence: 75 },
      { date: 'Sun', adherence: 75 }
    ],
    medicationStats: [
      { name: 'Taken', value: 78 },
      { name: 'Missed', value: 15 },
      { name: 'Late', value: 7 }
    ]
  }
];

const STATUS_COLORS = {
  compliant: 'bg-green-100 text-green-800',
  partial: 'bg-yellow-100 text-yellow-800',
  'non-compliant': 'bg-red-100 text-red-800'
};

const MEDICATION_STATUS_COLORS = {
  taken: 'text-green-500',
  missed: 'text-red-500',
  upcoming: 'text-blue-500'
};

const CHART_COLORS = ['#22c55e', '#ef4444', '#f59e0b'];

const MedicationAdherence = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(mockPatients[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMedicationStatusIcon = (status: 'taken' | 'missed' | 'upcoming') => {
    switch (status) {
      case 'taken':
        return <CheckCircle2 className={`h-5 w-5 ${MEDICATION_STATUS_COLORS[status]}`} />;
      case 'missed':
        return <XCircle className={`h-5 w-5 ${MEDICATION_STATUS_COLORS[status]}`} />;
      case 'upcoming':
        return <Bell className={`h-5 w-5 ${MEDICATION_STATUS_COLORS[status]}`} />;
    }
  };

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view medication adherence</CardDescription>
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
                      <div className="mt-1">
                        <Progress value={patient.overallAdherence} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">
                          {patient.overallAdherence}% adherence
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Medication Dashboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Medication Adherence - {selectedPatient.name}</h2>
              <p className="text-muted-foreground">Last updated: {selectedPatient.lastUpdate}</p>
            </div>
            <Badge className={STATUS_COLORS[selectedPatient.status]} className="text-lg">
              {selectedPatient.overallAdherence}% Overall Adherence
            </Badge>
          </div>

          {/* Adherence Stats */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Adherence Trend</CardTitle>
                <CardDescription>Medication adherence over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.adherenceHistory}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="adherence"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={{ fill: '#0ea5e9' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adherence Breakdown</CardTitle>
                <CardDescription>Distribution of medication adherence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={selectedPatient.medicationStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {selectedPatient.medicationStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {selectedPatient.medicationStats.map((stat, index) => (
                      <div key={stat.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[index] }} />
                        <span className="text-sm">{stat.name}: {stat.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Medications */}
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Active prescriptions and adherence status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPatient.medications.map((medication) => (
                  <div key={medication.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Pill className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{medication.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage} • {medication.frequency}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{medication.timeOfDay}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {getMedicationStatusIcon(medication.status)}
                        <span className="font-medium">{medication.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last taken: {medication.lastTaken}
                      </p>
                      <div className="mt-2">
                        <Progress value={medication.adherenceRate} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">
                          {medication.adherenceRate}% adherence
                        </p>
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

export default MedicationAdherence;
