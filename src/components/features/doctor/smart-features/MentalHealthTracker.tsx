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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  Search,
  User,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Heart,
  SmilePlus,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { PatientSelector } from '@/components/PatientSelector';
import AIInsightsPanel from '@/components/AIInsightsPanel';
import { Button } from '@/components/ui/button';

interface Assessment {
  id: string;
  type: string;
  score: number;
  date: string;
  change: 'improved' | 'declined' | 'stable';
  notes: string;
}

interface MentalHealthMetrics {
  anxiety: number;
  depression: number;
  stress: number;
  sleep: number;
  mood: number;
  energy: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastAssessment: string;
  status: 'stable' | 'monitoring' | 'attention';
  riskLevel: 'low' | 'moderate' | 'high';
  currentMetrics: MentalHealthMetrics;
  weeklyMood: Array<{
    day: string;
    mood: number;
    anxiety: number;
    stress: number;
  }>;
  recentAssessments: Assessment[];
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 32,
    lastAssessment: '2 hours ago',
    status: 'stable',
    riskLevel: 'low',
    currentMetrics: {
      anxiety: 2,
      depression: 1,
      stress: 3,
      sleep: 7,
      mood: 8,
      energy: 7
    },
    weeklyMood: [
      { day: 'Mon', mood: 7, anxiety: 3, stress: 4 },
      { day: 'Tue', mood: 6, anxiety: 4, stress: 4 },
      { day: 'Wed', mood: 8, anxiety: 2, stress: 3 },
      { day: 'Thu', mood: 7, anxiety: 3, stress: 3 },
      { day: 'Fri', mood: 8, anxiety: 2, stress: 2 },
      { day: 'Sat', mood: 8, anxiety: 2, stress: 2 },
      { day: 'Sun', mood: 7, anxiety: 3, stress: 3 }
    ],
    recentAssessments: [
      {
        id: 'a1',
        type: 'PHQ-9',
        score: 4,
        date: '2024-03-05',
        change: 'improved',
        notes: 'Showing consistent improvement in mood'
      },
      {
        id: 'a2',
        type: 'GAD-7',
        score: 5,
        date: '2024-03-05',
        change: 'stable',
        notes: 'Anxiety levels remain manageable'
      }
    ]
  },
  {
    id: '2',
    name: 'James Anderson',
    age: 45,
    lastAssessment: '1 day ago',
    status: 'monitoring',
    riskLevel: 'moderate',
    currentMetrics: {
      anxiety: 6,
      depression: 5,
      stress: 7,
      sleep: 5,
      mood: 5,
      energy: 4
    },
    weeklyMood: [
      { day: 'Mon', mood: 4, anxiety: 6, stress: 7 },
      { day: 'Tue', mood: 5, anxiety: 6, stress: 6 },
      { day: 'Wed', mood: 4, anxiety: 7, stress: 7 },
      { day: 'Thu', mood: 5, anxiety: 6, stress: 6 },
      { day: 'Fri', mood: 6, anxiety: 5, stress: 5 },
      { day: 'Sat', mood: 5, anxiety: 6, stress: 6 },
      { day: 'Sun', mood: 4, anxiety: 7, stress: 7 }
    ],
    recentAssessments: [
      {
        id: 'a3',
        type: 'PHQ-9',
        score: 12,
        date: '2024-03-04',
        change: 'declined',
        notes: 'Increased depressive symptoms noted'
      },
      {
        id: 'a4',
        type: 'GAD-7',
        score: 14,
        date: '2024-03-04',
        change: 'declined',
        notes: 'Higher anxiety levels reported'
      }
    ]
  }
];

const STATUS_COLORS = {
  stable: 'bg-green-100 text-green-800',
  monitoring: 'bg-yellow-100 text-yellow-800',
  attention: 'bg-red-100 text-red-800'
};

const RISK_COLORS = {
  low: 'text-green-500',
  moderate: 'text-yellow-500',
  high: 'text-red-500'
};

const CHANGE_ICONS = {
  improved: <TrendingUp className="h-4 w-4 text-green-500" />,
  declined: <TrendingDown className="h-4 w-4 text-red-500" />,
  stable: <TrendingUp className="h-4 w-4 text-yellow-500" />
};

const getRiskLevelColor = (level: 'low' | 'moderate' | 'high') => {
  switch (level) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
  }
};

const MentalHealthTracker = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(mockPatients[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient Selector */}
        <PatientSelector
          patients={mockPatients.map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            lastActivity: p.lastAssessment,
            image: p.image,
          }))}
          selectedPatientId={selectedPatient?.id || null}
          onSelect={id => setSelectedPatient(mockPatients.find(p => p.id === id) || null)}
        />

        {/* Mental Health Dashboard */}
        <div className="space-y-6">
          {selectedPatient && (
            <>
              <AIInsightsPanel
                patient={{ id: selectedPatient.id, name: selectedPatient.name }}
                module="mental-health"
                data={selectedPatient}
              />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Mental Health Overview - {selectedPatient.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Age: {selectedPatient.age}</span>
                    <span>•</span>
                    <span>Last assessment: {selectedPatient.lastAssessment}</span>
                    <span>•</span>
                    <Badge className={getRiskLevelColor(selectedPatient.riskLevel)}>
                      {selectedPatient.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Assessment
                </Button>
              </div>

              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Anxiety Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{selectedPatient.currentMetrics.anxiety}/10</h3>
                        <Progress value={selectedPatient.currentMetrics.anxiety * 10} className="h-2 mt-2" />
                      </div>
                      <Brain className="h-5 w-5 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Depression Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{selectedPatient.currentMetrics.depression}/10</h3>
                        <Progress value={selectedPatient.currentMetrics.depression * 10} className="h-2 mt-2" />
                      </div>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{selectedPatient.currentMetrics.stress}/10</h3>
                        <Progress value={selectedPatient.currentMetrics.stress * 10} className="h-2 mt-2" />
                      </div>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Mood Trends</CardTitle>
                    <CardDescription>Tracking mood, anxiety, and stress levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedPatient.weeklyMood}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="day" />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="mood"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ fill: '#3b82f6' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="anxiety"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={{ fill: '#8b5cf6' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="stress"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={{ fill: '#ef4444' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mental Health Metrics</CardTitle>
                    <CardDescription>Overall assessment of key indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[selectedPatient.currentMetrics]}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} />
                          <Radar
                            name="Current"
                            dataKey="value"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Assessments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Assessments</CardTitle>
                  <CardDescription>Latest mental health evaluations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPatient.recentAssessments.map((assessment) => (
                      <div key={assessment.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div>
                          <h4 className="font-medium">{assessment.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            Date: {assessment.date}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {assessment.notes}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <span className="font-medium">Score: {assessment.score}</span>
                            {CHANGE_ICONS[assessment.change]}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Status: {assessment.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalHealthTracker;
