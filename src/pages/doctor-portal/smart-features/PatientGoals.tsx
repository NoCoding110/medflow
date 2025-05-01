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
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import {
  Search,
  User,
  Target,
  Trophy,
  Clock,
  TrendingUp,
  CheckCircle2,
  Timer,
  Calendar,
  Activity
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  category: 'health' | 'fitness' | 'nutrition' | 'mental';
  progress: number;
  target: string;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'completed';
  lastUpdate: string;
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
  }>;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastUpdate: string;
  status: 'active' | 'review-needed' | 'completed';
  activeGoals: number;
  completedGoals: number;
  overallProgress: number;
  goals: Goal[];
  progressHistory: Array<{
    week: string;
    progress: number;
  }>;
  categoryProgress: Array<{
    category: string;
    progress: number;
  }>;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 32,
    lastUpdate: '2 hours ago',
    status: 'active',
    activeGoals: 3,
    completedGoals: 5,
    overallProgress: 75,
    goals: [
      {
        id: 'g1',
        title: 'Weight Management',
        category: 'health',
        progress: 80,
        target: 'Lose 10 lbs',
        deadline: '2024-04-15',
        status: 'on-track',
        lastUpdate: '1 day ago',
        milestones: [
          {
            id: 'm1',
            title: 'Initial weigh-in',
            completed: true,
            dueDate: '2024-03-01'
          },
          {
            id: 'm2',
            title: 'Midway check',
            completed: true,
            dueDate: '2024-03-15'
          },
          {
            id: 'm3',
            title: 'Final weigh-in',
            completed: false,
            dueDate: '2024-04-15'
          }
        ]
      },
      {
        id: 'g2',
        title: 'Exercise Routine',
        category: 'fitness',
        progress: 65,
        target: '30 mins daily workout',
        deadline: '2024-04-30',
        status: 'on-track',
        lastUpdate: '3 hours ago',
        milestones: [
          {
            id: 'm4',
            title: 'Start with 10 mins',
            completed: true,
            dueDate: '2024-03-05'
          },
          {
            id: 'm5',
            title: 'Increase to 20 mins',
            completed: true,
            dueDate: '2024-03-20'
          },
          {
            id: 'm6',
            title: 'Achieve 30 mins',
            completed: false,
            dueDate: '2024-04-30'
          }
        ]
      }
    ],
    progressHistory: [
      { week: 'Week 1', progress: 40 },
      { week: 'Week 2', progress: 55 },
      { week: 'Week 3', progress: 65 },
      { week: 'Week 4', progress: 75 }
    ],
    categoryProgress: [
      { category: 'Health', progress: 80 },
      { category: 'Fitness', progress: 65 },
      { category: 'Nutrition', progress: 70 },
      { category: 'Mental', progress: 85 }
    ]
  },
  {
    id: '2',
    name: 'James Anderson',
    age: 45,
    lastUpdate: '1 day ago',
    status: 'review-needed',
    activeGoals: 4,
    completedGoals: 2,
    overallProgress: 45,
    goals: [
      {
        id: 'g3',
        title: 'Blood Pressure Management',
        category: 'health',
        progress: 50,
        target: 'Maintain BP below 130/85',
        deadline: '2024-05-01',
        status: 'at-risk',
        lastUpdate: '2 days ago',
        milestones: [
          {
            id: 'm7',
            title: 'Start BP monitoring',
            completed: true,
            dueDate: '2024-03-01'
          },
          {
            id: 'm8',
            title: 'Medication review',
            completed: false,
            dueDate: '2024-04-01'
          }
        ]
      }
    ],
    progressHistory: [
      { week: 'Week 1', progress: 30 },
      { week: 'Week 2', progress: 35 },
      { week: 'Week 3', progress: 40 },
      { week: 'Week 4', progress: 45 }
    ],
    categoryProgress: [
      { category: 'Health', progress: 50 },
      { category: 'Fitness', progress: 40 },
      { category: 'Nutrition', progress: 45 },
      { category: 'Mental', progress: 55 }
    ]
  }
];

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  'review-needed': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800'
};

const GOAL_STATUS_COLORS = {
  'on-track': 'text-green-500',
  'at-risk': 'text-yellow-500',
  completed: 'text-blue-500'
};

const CATEGORY_COLORS = {
  Health: '#22c55e',
  Fitness: '#3b82f6',
  Nutrition: '#f59e0b',
  Mental: '#8b5cf6'
};

const PatientGoals = () => {
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
            <CardDescription>Select a patient to view goals</CardDescription>
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
                      <div className="mt-2">
                        <Progress value={patient.overallProgress} className="h-2" />
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-muted-foreground">
                            {patient.activeGoals} active goals
                          </span>
                          <span className="text-sm font-medium">
                            {patient.overallProgress}% complete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Goals Dashboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Patient Goals - {selectedPatient.name}</h2>
              <p className="text-muted-foreground">Last updated: {selectedPatient.lastUpdate}</p>
            </div>
            <Badge className={STATUS_COLORS[selectedPatient.status]}>
              {selectedPatient.status.toUpperCase()}
            </Badge>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPatient.overallProgress}%</h3>
                    <Progress value={selectedPatient.overallProgress} className="h-2 mt-2" />
                  </div>
                  <Target className="h-5 w-5 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPatient.activeGoals}</h3>
                    <p className="text-sm text-muted-foreground">In progress</p>
                  </div>
                  <Activity className="h-5 w-5 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPatient.completedGoals}</h3>
                    <p className="text-sm text-muted-foreground">Achieved</p>
                  </div>
                  <Trophy className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progress History</CardTitle>
                <CardDescription>Weekly goal completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.progressHistory}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Progress</CardTitle>
                <CardDescription>Progress by goal category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedPatient.categoryProgress}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="progress" fill="#3b82f6">
                        {selectedPatient.categoryProgress.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Active Goals</CardTitle>
              <CardDescription>Current goals and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedPatient.goals.map((goal) => (
                  <div key={goal.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Deadline: {goal.deadline}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          goal.status === 'on-track'
                            ? 'bg-green-100 text-green-800'
                            : goal.status === 'at-risk'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {goal.status}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Milestones</h5>
                        {goal.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className="flex items-center justify-between bg-accent/50 rounded-lg p-2"
                          >
                            <div className="flex items-center gap-2">
                              {milestone.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Timer className="h-4 w-4 text-yellow-500" />
                              )}
                              <span className="text-sm">{milestone.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              Due: {milestone.dueDate}
                            </span>
                          </div>
                        ))}
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

export default PatientGoals;
