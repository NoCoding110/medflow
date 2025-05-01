import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Legend
} from 'recharts';
import {
  Activity,
  AlertCircle,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Search,
  ThermometerIcon,
  User,
  HeartPulse,
  Stethoscope,
  PlusCircle,
  History,
  Brain
} from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: number;
  duration: string;
  frequency: string;
  lastOccurrence: string;
  status: 'active' | 'improving' | 'resolved';
  notes: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

interface PatientSymptoms {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastCheckup: string;
  status: 'stable' | 'monitoring' | 'urgent';
  vitalSigns: {
    temperature: number;
    heartRate: number;
    bloodPressure: string;
    respiratoryRate: number;
  };
  currentSymptoms: Symptom[];
  symptomHistory: Array<{
    date: string;
    symptoms: string[];
    severity: number;
  }>;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
  }>;
  recentNotes: Array<{
    date: string;
    note: string;
    type: 'observation' | 'treatment' | 'followup';
  }>;
  aiAnalysis: {
    possibleConditions: string[];
    recommendedTests: string[];
    riskLevel: 'low' | 'medium' | 'high';
    suggestions: string[];
  };
}

const patients: PatientSymptoms[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 32,
    lastCheckup: '2 hours ago',
    status: 'stable',
    vitalSigns: {
      temperature: 37.2,
      heartRate: 72,
      bloodPressure: '120/80',
      respiratoryRate: 16
    },
    currentSymptoms: [
      {
        id: 's1',
        name: 'Headache',
        severity: 3,
        duration: '3 days',
        frequency: 'Intermittent',
        lastOccurrence: '6 hours ago',
        status: 'improving',
        notes: 'Responds well to OTC pain medication',
        trend: 'decreasing'
      },
      {
        id: 's2',
        name: 'Fatigue',
        severity: 2,
        duration: '1 week',
        frequency: 'Daily',
        lastOccurrence: 'Ongoing',
        status: 'active',
        notes: 'Worse in the evenings',
        trend: 'stable'
      }
    ],
    symptomHistory: [
      { date: '2024-03-01', symptoms: ['Headache', 'Fatigue'], severity: 4 },
      { date: '2024-03-02', symptoms: ['Headache', 'Fatigue'], severity: 3 },
      { date: '2024-03-03', symptoms: ['Headache'], severity: 2 },
      { date: '2024-03-04', symptoms: ['Fatigue'], severity: 2 },
      { date: '2024-03-05', symptoms: ['Headache', 'Fatigue'], severity: 3 }
    ],
    medications: [
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed',
        startDate: '2024-03-01'
      }
    ],
    recentNotes: [
      {
        date: '2024-03-05',
        note: 'Patient reports improvement in headache intensity',
        type: 'observation'
      },
      {
        date: '2024-03-03',
        note: 'Recommended stress management techniques',
        type: 'treatment'
      }
    ],
    aiAnalysis: {
      possibleConditions: ['Tension Headache', 'Stress-related Fatigue'],
      recommendedTests: ['Complete Blood Count', 'Stress Assessment'],
      riskLevel: 'low',
      suggestions: [
        'Consider stress management techniques',
        'Monitor sleep patterns',
        'Track caffeine intake'
      ]
    }
  },
  {
    id: '2',
    name: 'James Anderson',
    age: 45,
    lastCheckup: '1 day ago',
    status: 'monitoring',
    vitalSigns: {
      temperature: 37.8,
      heartRate: 88,
      bloodPressure: '135/85',
      respiratoryRate: 18
    },
    currentSymptoms: [
      {
        id: 's3',
        name: 'Chest Pain',
        severity: 4,
        duration: '2 days',
        frequency: 'Episodes',
        lastOccurrence: '12 hours ago',
        status: 'active',
        notes: 'Associated with exertion',
        trend: 'increasing'
      }
    ],
    symptomHistory: [
      { date: '2024-03-01', symptoms: ['Shortness of Breath'], severity: 2 },
      { date: '2024-03-02', symptoms: ['Chest Pain'], severity: 3 },
      { date: '2024-03-03', symptoms: ['Chest Pain', 'Fatigue'], severity: 4 },
      { date: '2024-03-04', symptoms: ['Chest Pain'], severity: 4 },
      { date: '2024-03-05', symptoms: ['Chest Pain', 'Shortness of Breath'], severity: 4 }
    ],
    medications: [
      {
        name: 'Aspirin',
        dosage: '81mg',
        frequency: 'Daily',
        startDate: '2024-03-02'
      }
    ],
    recentNotes: [
      {
        date: '2024-03-05',
        note: 'Scheduled for cardiac evaluation',
        type: 'followup'
      },
      {
        date: '2024-03-03',
        note: 'ECG shows minor abnormalities',
        type: 'observation'
      }
    ],
    aiAnalysis: {
      possibleConditions: ['Angina', 'Coronary Artery Disease'],
      recommendedTests: ['Stress Test', 'Cardiac Enzyme Panel', 'Echocardiogram'],
      riskLevel: 'high',
      suggestions: [
        'Immediate cardiac evaluation',
        'Monitor blood pressure frequently',
        'Restrict physical activity'
      ]
    }
  },
  {
    id: '3',
    name: 'Sophie Chen',
    age: 28,
    lastCheckup: '3 hours ago',
    status: 'urgent',
    vitalSigns: {
      temperature: 39.2,
      heartRate: 96,
      bloodPressure: '110/70',
      respiratoryRate: 20
    },
    currentSymptoms: [
      {
        id: 's4',
        name: 'High Fever',
        severity: 5,
        duration: '24 hours',
        frequency: 'Constant',
        lastOccurrence: 'Ongoing',
        status: 'active',
        notes: 'Not responding to antipyretics',
        trend: 'increasing'
      },
      {
        id: 's5',
        name: 'Body Aches',
        severity: 4,
        duration: '24 hours',
        frequency: 'Constant',
        lastOccurrence: 'Ongoing',
        status: 'active',
        notes: 'Generalized muscle pain',
        trend: 'stable'
      }
    ],
    symptomHistory: [
      { date: '2024-03-01', symptoms: ['Mild Fever'], severity: 2 },
      { date: '2024-03-02', symptoms: ['Fever', 'Fatigue'], severity: 3 },
      { date: '2024-03-03', symptoms: ['High Fever', 'Body Aches'], severity: 4 },
      { date: '2024-03-04', symptoms: ['High Fever', 'Body Aches'], severity: 5 },
      { date: '2024-03-05', symptoms: ['High Fever', 'Body Aches', 'Chills'], severity: 5 }
    ],
    medications: [
      {
        name: 'Acetaminophen',
        dosage: '1000mg',
        frequency: 'Every 6 hours',
        startDate: '2024-03-03'
      }
    ],
    recentNotes: [
      {
        date: '2024-03-05',
        note: 'Fever not responding to medication',
        type: 'observation'
      },
      {
        date: '2024-03-04',
        note: 'Blood cultures ordered',
        type: 'treatment'
      }
    ],
    aiAnalysis: {
      possibleConditions: ['Severe Viral Infection', 'Early Sepsis'],
      recommendedTests: ['Blood Culture', 'CBC with Differential', 'CRP'],
      riskLevel: 'high',
      suggestions: [
        'Consider hospital admission',
        'IV antibiotics evaluation',
        'Close temperature monitoring'
      ]
    }
  }
];

const SEVERITY_COLORS = ['#4ade80', '#fbbf24', '#f87171', '#ef4444', '#dc2626'];
const STATUS_COLORS = {
  stable: 'bg-green-100 text-green-800',
  monitoring: 'bg-yellow-100 text-yellow-800',
  urgent: 'bg-red-100 text-red-800'
};

const SymptomsTracker = () => {
  const [selectedPatient, setSelectedPatient] = useState<PatientSymptoms>(patients[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityColor = (severity: number) => {
    return SEVERITY_COLORS[severity - 1] || SEVERITY_COLORS[0];
  };

  const getTrendIcon = (trend: 'increasing' | 'stable' | 'decreasing') => {
    switch (trend) {
      case 'increasing':
        return <Activity className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'decreasing':
        return <Activity className="h-4 w-4 text-green-500" />;
    }
  };

  const getRiskLevelColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
    }
  };

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
                        <Badge className={STATUS_COLORS[patient.status]}>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Last checkup: {patient.lastCheckup}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Symptoms Dashboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Symptoms Overview - {selectedPatient.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Age: {selectedPatient.age}</span>
                <span>•</span>
                <span>Last checkup: {selectedPatient.lastCheckup}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Symptom
              </Button>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <ThermometerIcon className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPatient.vitalSigns.temperature}°C</div>
                <p className="text-xs text-muted-foreground">Last recorded</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <HeartPulse className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPatient.vitalSigns.heartRate} BPM</div>
                <p className="text-xs text-muted-foreground">Last recorded</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPatient.vitalSigns.bloodPressure}</div>
                <p className="text-xs text-muted-foreground">Last recorded</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Respiratory Rate</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPatient.vitalSigns.respiratoryRate}/min</div>
                <p className="text-xs text-muted-foreground">Last recorded</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle>Current Symptoms</CardTitle>
              <CardDescription>Active and monitored symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPatient.currentSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Stethoscope className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{symptom.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Duration: {symptom.duration} • Frequency: {symptom.frequency}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <Badge
                          className={`${
                            symptom.status === 'active'
                              ? 'bg-yellow-100 text-yellow-800'
                              : symptom.status === 'improving'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {symptom.status}
                        </Badge>
                        <div className="flex items-center gap-1 mt-1 justify-end">
                          <span className="text-sm text-muted-foreground">Severity: </span>
                          <span className="font-medium" style={{ color: getSeverityColor(symptom.severity) }}>
                            {symptom.severity}/5
                          </span>
                          {getTrendIcon(symptom.trend)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Symptom History & AI Analysis */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Symptom History</CardTitle>
                <CardDescription>Progression over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.symptomHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="severity" stroke="#ef4444" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI Analysis</CardTitle>
                    <CardDescription>Symptom pattern analysis and recommendations</CardDescription>
                  </div>
                  <Brain className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Possible Conditions:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.aiAnalysis.possibleConditions.map((condition, index) => (
                        <Badge key={index} variant="secondary">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Recommended Tests:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.aiAnalysis.recommendedTests.map((test, index) => (
                        <Badge key={index} variant="outline">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium">Risk Level:</p>
                      <Badge className={getRiskLevelColor(selectedPatient.aiAnalysis.riskLevel)}>
                        {selectedPatient.aiAnalysis.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {selectedPatient.aiAnalysis.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 mt-0.5 text-primary" />
                          <p className="text-sm">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notes</CardTitle>
              <CardDescription>Latest observations and treatments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPatient.recentNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className="p-2 bg-primary/10 rounded-full mt-1">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{note.date}</p>
                        <Badge variant="outline">{note.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{note.note}</p>
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

export default SymptomsTracker; 