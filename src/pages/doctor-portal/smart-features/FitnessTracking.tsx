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
  BarChart,
  Bar,
  Legend
} from 'recharts';
import {
  Activity,
  Heart,
  Footprints,
  Timer,
  Calendar,
  Clock,
  Flame,
  Search,
  User,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Dumbbell,
  Timer as TimerIcon,
  Target
} from 'lucide-react';

interface FitnessData {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastActive: string;
  weeklyOverview: {
    averageSteps: number;
    activeDays: string;
    totalDistance: number;
    caloriesBurned: number;
    stepsGoal: number;
    distanceGoal: number;
    caloriesGoal: number;
  };
  activityTrend: Array<{
    day: string;
    steps: number;
    calories: number;
    distance: number;
    activeMinutes: number;
  }>;
  workouts: Array<{
    type: string;
    duration: number;
    calories: number;
    date: string;
  }>;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'active' | 'inactive' | 'needs-attention';
}

const patients: FitnessData[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 32,
    lastActive: '10 minutes ago',
    weeklyOverview: {
      averageSteps: 8500,
      activeDays: '5/7',
      totalDistance: 42.5,
      caloriesBurned: 2800,
      stepsGoal: 10000,
      distanceGoal: 50,
      caloriesGoal: 3000
    },
    activityTrend: [
      { day: 'Mon', steps: 9000, calories: 400, distance: 6.2, activeMinutes: 45 },
      { day: 'Tue', steps: 7500, calories: 350, distance: 5.8, activeMinutes: 38 },
      { day: 'Wed', steps: 10000, calories: 450, distance: 7.1, activeMinutes: 52 },
      { day: 'Thu', steps: 8500, calories: 380, distance: 6.5, activeMinutes: 41 },
      { day: 'Fri', steps: 12000, calories: 520, distance: 8.3, activeMinutes: 65 },
      { day: 'Sat', steps: 6000, calories: 280, distance: 4.2, activeMinutes: 30 },
      { day: 'Sun', steps: 7000, calories: 320, distance: 5.1, activeMinutes: 35 }
    ],
    workouts: [
      { type: 'Running', duration: 45, calories: 420, date: '2025-04-28' },
      { type: 'Cycling', duration: 60, calories: 380, date: '2025-04-27' },
      { type: 'Swimming', duration: 30, calories: 250, date: '2025-04-26' }
    ],
    fitnessLevel: 'Intermediate',
    status: 'active'
  },
  {
    id: '2',
    name: 'James Anderson',
    age: 45,
    lastActive: '1 hour ago',
    weeklyOverview: {
      averageSteps: 6200,
      activeDays: '4/7',
      totalDistance: 31.0,
      caloriesBurned: 2100,
      stepsGoal: 8000,
      distanceGoal: 40,
      caloriesGoal: 2500
    },
    activityTrend: [
      { day: 'Mon', steps: 6500, calories: 300, distance: 4.5, activeMinutes: 35 },
      { day: 'Tue', steps: 5800, calories: 280, distance: 4.0, activeMinutes: 30 },
      { day: 'Wed', steps: 7200, calories: 340, distance: 5.1, activeMinutes: 42 },
      { day: 'Thu', steps: 6000, calories: 290, distance: 4.2, activeMinutes: 33 },
      { day: 'Fri', steps: 8000, calories: 380, distance: 5.6, activeMinutes: 48 },
      { day: 'Sat', steps: 4500, calories: 220, distance: 3.2, activeMinutes: 25 },
      { day: 'Sun', steps: 5200, calories: 250, distance: 3.7, activeMinutes: 28 }
    ],
    workouts: [
      { type: 'Walking', duration: 45, calories: 220, date: '2025-04-28' },
      { type: 'Yoga', duration: 60, calories: 180, date: '2025-04-27' },
      { type: 'Strength', duration: 40, calories: 280, date: '2025-04-26' }
    ],
    fitnessLevel: 'Beginner',
    status: 'needs-attention'
  },
  {
    id: '3',
    name: 'Sophie Chen',
    age: 28,
    lastActive: '2 hours ago',
    weeklyOverview: {
      averageSteps: 11200,
      activeDays: '6/7',
      totalDistance: 56.0,
      caloriesBurned: 3200,
      stepsGoal: 12000,
      distanceGoal: 60,
      caloriesGoal: 3500
    },
    activityTrend: [
      { day: 'Mon', steps: 11500, calories: 520, distance: 8.1, activeMinutes: 72 },
      { day: 'Tue', steps: 10800, calories: 480, distance: 7.6, activeMinutes: 65 },
      { day: 'Wed', steps: 12200, calories: 550, distance: 8.6, activeMinutes: 78 },
      { day: 'Thu', steps: 11000, calories: 490, distance: 7.7, activeMinutes: 68 },
      { day: 'Fri', steps: 13000, calories: 580, distance: 9.1, activeMinutes: 85 },
      { day: 'Sat', steps: 9500, calories: 420, distance: 6.7, activeMinutes: 58 },
      { day: 'Sun', steps: 10200, calories: 450, distance: 7.2, activeMinutes: 62 }
    ],
    workouts: [
      { type: 'HIIT', duration: 45, calories: 480, date: '2025-04-28' },
      { type: 'Running', duration: 60, calories: 520, date: '2025-04-27' },
      { type: 'CrossFit', duration: 50, calories: 450, date: '2025-04-26' }
    ],
    fitnessLevel: 'Advanced',
    status: 'active'
  }
];

const FitnessTracking = () => {
  const [selectedPatient, setSelectedPatient] = useState<FitnessData>(patients[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: 'active' | 'inactive' | 'needs-attention') => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'needs-attention':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getFitnessLevelColor = (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'Advanced':
        return 'bg-indigo-100 text-indigo-800';
    }
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view their fitness data</CardDescription>
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
                        {patient.lastActive}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Fitness Dashboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Weekly Overview - {selectedPatient.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Age: {selectedPatient.age}</span>
                <span>•</span>
                <span>Last active: {selectedPatient.lastActive}</span>
                <span>•</span>
                <Badge className={getFitnessLevelColor(selectedPatient.fitnessLevel)}>
                  {selectedPatient.fitnessLevel}
                </Badge>
              </div>
            </div>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Training
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Steps</CardTitle>
                <Footprints className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{selectedPatient.weeklyOverview.averageSteps}</div>
                  <p className="text-xs text-muted-foreground">per day</p>
                  <Progress 
                    value={calculateProgress(
                      selectedPatient.weeklyOverview.averageSteps,
                      selectedPatient.weeklyOverview.stepsGoal
                    )} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Goal: {selectedPatient.weeklyOverview.stepsGoal} steps
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Days</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{selectedPatient.weeklyOverview.activeDays}</div>
                  <p className="text-xs text-muted-foreground">days this week</p>
                  <Progress 
                    value={(parseInt(selectedPatient.weeklyOverview.activeDays.split('/')[0]) / 7) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">Goal: 7 days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Distance</CardTitle>
                <Target className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{selectedPatient.weeklyOverview.totalDistance}km</div>
                  <p className="text-xs text-muted-foreground">total distance</p>
                  <Progress 
                    value={calculateProgress(
                      selectedPatient.weeklyOverview.totalDistance,
                      selectedPatient.weeklyOverview.distanceGoal
                    )} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Goal: {selectedPatient.weeklyOverview.distanceGoal}km
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calories</CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{selectedPatient.weeklyOverview.caloriesBurned}</div>
                  <p className="text-xs text-muted-foreground">kcal burned</p>
                  <Progress 
                    value={calculateProgress(
                      selectedPatient.weeklyOverview.caloriesBurned,
                      selectedPatient.weeklyOverview.caloriesGoal
                    )} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Goal: {selectedPatient.weeklyOverview.caloriesGoal} kcal
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Trend</CardTitle>
              <CardDescription>Daily activity metrics for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="steps">
                <TabsList>
                  <TabsTrigger value="steps">Steps</TabsTrigger>
                  <TabsTrigger value="calories">Calories</TabsTrigger>
                  <TabsTrigger value="distance">Distance</TabsTrigger>
                  <TabsTrigger value="active">Active Minutes</TabsTrigger>
                </TabsList>
                <TabsContent value="steps" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.activityTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="steps" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="calories" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.activityTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="calories" stroke="#f97316" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="distance" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.activityTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="distance" stroke="#8b5cf6" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="active" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.activityTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="activeMinutes" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Workouts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Workouts</CardTitle>
              <CardDescription>Latest exercise sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPatient.workouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Dumbbell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{workout.type}</p>
                        <p className="text-sm text-muted-foreground">{workout.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{workout.duration} min</p>
                        <p className="text-sm text-muted-foreground">Duration</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{workout.calories}</p>
                        <p className="text-sm text-muted-foreground">Calories</p>
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

export default FitnessTracking;
