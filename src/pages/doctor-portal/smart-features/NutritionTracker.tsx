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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import {
  Apple,
  Utensils,
  Clock,
  Search,
  User,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Scale,
  Leaf,
  Fish,
  Milk,
  Beef,
  Cookie
} from 'lucide-react';

interface NutritionData {
  id: string;
  name: string;
  age: number;
  image?: string;
  lastMeal: string;
  dailyOverview: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    calorieGoal: number;
    proteinGoal: number;
    carbsGoal: number;
    fatsGoal: number;
    fiberGoal: number;
  };
  mealDistribution: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
  };
  weeklyNutrients: Array<{
    day: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }>;
  nutritionStatus: 'optimal' | 'needs-improvement' | 'attention-required';
  dietaryRestrictions: string[];
  recentMeals: Array<{
    type: string;
    time: string;
    calories: number;
    items: string[];
  }>;
  nutritionTips: Array<{
    category: string;
    tip: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

const patients: NutritionData[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 32,
    lastMeal: '1 hour ago',
    dailyOverview: {
      calories: 2100,
      protein: 85,
      carbs: 250,
      fats: 70,
      fiber: 25,
      calorieGoal: 2200,
      proteinGoal: 88,
      carbsGoal: 275,
      fatsGoal: 73,
      fiberGoal: 28
    },
    mealDistribution: {
      breakfast: 25,
      lunch: 35,
      dinner: 30,
      snacks: 10
    },
    weeklyNutrients: [
      { day: 'Mon', calories: 2000, protein: 82, carbs: 245, fats: 68 },
      { day: 'Tue', calories: 2100, protein: 85, carbs: 250, fats: 70 },
      { day: 'Wed', calories: 2150, protein: 87, carbs: 255, fats: 71 },
      { day: 'Thu', calories: 2050, protein: 84, carbs: 248, fats: 69 },
      { day: 'Fri', calories: 2200, protein: 89, carbs: 260, fats: 73 },
      { day: 'Sat', calories: 1950, protein: 80, carbs: 240, fats: 65 },
      { day: 'Sun', calories: 2000, protein: 82, carbs: 245, fats: 67 }
    ],
    nutritionStatus: 'optimal',
    dietaryRestrictions: ['Lactose Intolerant'],
    recentMeals: [
      {
        type: 'Lunch',
        time: '1:30 PM',
        calories: 650,
        items: ['Grilled Chicken Salad', 'Quinoa', 'Avocado']
      },
      {
        type: 'Breakfast',
        time: '8:30 AM',
        calories: 450,
        items: ['Oatmeal', 'Banana', 'Almond Milk']
      }
    ],
    nutritionTips: [
      {
        category: 'Protein Intake',
        tip: 'Consider adding more plant-based proteins to diversify protein sources',
        priority: 'medium'
      },
      {
        category: 'Meal Timing',
        tip: 'Try to maintain consistent meal times to optimize metabolism',
        priority: 'low'
      }
    ]
  },
  {
    id: '2',
    name: 'James Anderson',
    age: 45,
    lastMeal: '30 minutes ago',
    dailyOverview: {
      calories: 1800,
      protein: 65,
      carbs: 220,
      fats: 60,
      fiber: 18,
      calorieGoal: 2000,
      proteinGoal: 75,
      carbsGoal: 250,
      fatsGoal: 67,
      fiberGoal: 25
    },
    mealDistribution: {
      breakfast: 20,
      lunch: 40,
      dinner: 35,
      snacks: 5
    },
    weeklyNutrients: [
      { day: 'Mon', calories: 1750, protein: 63, carbs: 215, fats: 58 },
      { day: 'Tue', calories: 1800, protein: 65, carbs: 220, fats: 60 },
      { day: 'Wed', calories: 1850, protein: 67, carbs: 225, fats: 62 },
      { day: 'Thu', calories: 1780, protein: 64, carbs: 218, fats: 59 },
      { day: 'Fri', calories: 1900, protein: 69, carbs: 230, fats: 63 },
      { day: 'Sat', calories: 1700, protein: 61, carbs: 210, fats: 57 },
      { day: 'Sun', calories: 1750, protein: 63, carbs: 215, fats: 58 }
    ],
    nutritionStatus: 'needs-improvement',
    dietaryRestrictions: ['Low Sodium'],
    recentMeals: [
      {
        type: 'Lunch',
        time: '12:30 PM',
        calories: 550,
        items: ['Turkey Sandwich', 'Apple', 'Mixed Nuts']
      },
      {
        type: 'Breakfast',
        time: '7:30 AM',
        calories: 350,
        items: ['Whole Grain Toast', 'Eggs', 'Orange Juice']
      }
    ],
    nutritionTips: [
      {
        category: 'Calorie Intake',
        tip: 'Current intake is below target. Consider adding healthy snacks between meals',
        priority: 'high'
      },
      {
        category: 'Fiber Intake',
        tip: 'Increase fiber intake by adding more whole grains and vegetables',
        priority: 'medium'
      }
    ]
  },
  {
    id: '3',
    name: 'Sophie Chen',
    age: 28,
    lastMeal: '2 hours ago',
    dailyOverview: {
      calories: 2400,
      protein: 95,
      carbs: 280,
      fats: 80,
      fiber: 30,
      calorieGoal: 2300,
      proteinGoal: 90,
      carbsGoal: 270,
      fatsGoal: 77,
      fiberGoal: 28
    },
    mealDistribution: {
      breakfast: 30,
      lunch: 30,
      dinner: 30,
      snacks: 10
    },
    weeklyNutrients: [
      { day: 'Mon', calories: 2350, protein: 93, carbs: 275, fats: 78 },
      { day: 'Tue', calories: 2400, protein: 95, carbs: 280, fats: 80 },
      { day: 'Wed', calories: 2450, protein: 97, carbs: 285, fats: 82 },
      { day: 'Thu', calories: 2380, protein: 94, carbs: 278, fats: 79 },
      { day: 'Fri', calories: 2500, protein: 99, carbs: 290, fats: 83 },
      { day: 'Sat', calories: 2300, protein: 91, carbs: 270, fats: 77 },
      { day: 'Sun', calories: 2350, protein: 93, carbs: 275, fats: 78 }
    ],
    nutritionStatus: 'attention-required',
    dietaryRestrictions: ['Gluten-Free', 'No Red Meat'],
    recentMeals: [
      {
        type: 'Lunch',
        time: '1:00 PM',
        calories: 750,
        items: ['Salmon Bowl', 'Brown Rice', 'Roasted Vegetables']
      },
      {
        type: 'Breakfast',
        time: '9:00 AM',
        calories: 550,
        items: ['Protein Smoothie', 'Gluten-free Toast', 'Eggs']
      }
    ],
    nutritionTips: [
      {
        category: 'Calorie Management',
        tip: 'Current intake exceeds daily target. Focus on portion control',
        priority: 'high'
      },
      {
        category: 'Meal Balance',
        tip: 'Consider reducing carbohydrate portion sizes in evening meals',
        priority: 'medium'
      }
    ]
  }
];

const COLORS = ['#4ade80', '#60a5fa', '#f97316'];

const NutritionTracker = () => {
  const [selectedPatient, setSelectedPatient] = useState<NutritionData>(patients[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: 'optimal' | 'needs-improvement' | 'attention-required') => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-800';
      case 'needs-improvement':
        return 'bg-yellow-100 text-yellow-800';
      case 'attention-required':
        return 'bg-red-100 text-red-800';
    }
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
    }
  };

  const mealDistributionData = Object.entries(selectedPatient.mealDistribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view their nutrition data</CardDescription>
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
                        <Badge className={getStatusColor(patient.nutritionStatus)}>
                          {patient.nutritionStatus.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Last meal: {patient.lastMeal}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Nutrition Dashboard */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Nutrition Insights - {selectedPatient.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Age: {selectedPatient.age}</span>
                <span>•</span>
                <span>Last meal: {selectedPatient.lastMeal}</span>
                {selectedPatient.dietaryRestrictions.length > 0 && (
                  <>
                    <span>•</span>
                    <span>Restrictions: {selectedPatient.dietaryRestrictions.join(', ')}</span>
                  </>
                )}
              </div>
            </div>
            <Button>
              <Utensils className="mr-2 h-4 w-4" />
              Create Meal Plan
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Calories</CardTitle>
                <Apple className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{selectedPatient.dailyOverview.calories}</div>
                  <p className="text-xs text-muted-foreground">kcal consumed</p>
                  <Progress 
                    value={calculateProgress(
                      selectedPatient.dailyOverview.calories,
                      selectedPatient.dailyOverview.calorieGoal
                    )} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Goal: {selectedPatient.dailyOverview.calorieGoal} kcal
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protein Intake</CardTitle>
                <Fish className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{selectedPatient.dailyOverview.protein}g</div>
                  <p className="text-xs text-muted-foreground">Daily average</p>
                  <Progress 
                    value={calculateProgress(
                      selectedPatient.dailyOverview.protein,
                      selectedPatient.dailyOverview.proteinGoal
                    )} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Goal: {selectedPatient.dailyOverview.proteinGoal}g
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbohydrates</CardTitle>
                <Cookie className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{selectedPatient.dailyOverview.carbs}g</div>
                  <p className="text-xs text-muted-foreground">Daily average</p>
                  <Progress 
                    value={calculateProgress(
                      selectedPatient.dailyOverview.carbs,
                      selectedPatient.dailyOverview.carbsGoal
                    )} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Goal: {selectedPatient.dailyOverview.carbsGoal}g
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Healthy Fats</CardTitle>
                <Leaf className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{selectedPatient.dailyOverview.fats}g</div>
                  <p className="text-xs text-muted-foreground">Daily average</p>
                  <Progress 
                    value={calculateProgress(
                      selectedPatient.dailyOverview.fats,
                      selectedPatient.dailyOverview.fatsGoal
                    )} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Goal: {selectedPatient.dailyOverview.fatsGoal}g
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Meal Distribution & Weekly Trends */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Meal Distribution</CardTitle>
                <CardDescription>Caloric intake by meal type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mealDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mealDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Nutrient Trends</CardTitle>
                <CardDescription>Macro distribution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="calories">
                  <TabsList>
                    <TabsTrigger value="calories">Calories</TabsTrigger>
                    <TabsTrigger value="macros">Macros</TabsTrigger>
                  </TabsList>
                  <TabsContent value="calories" className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedPatient.weeklyNutrients}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="calories" stroke="#4ade80" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="macros" className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedPatient.weeklyNutrients}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="protein" fill="#60a5fa" name="Protein" />
                        <Bar dataKey="carbs" fill="#f97316" name="Carbs" />
                        <Bar dataKey="fats" fill="#4ade80" name="Fats" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Recent Meals & Nutrition Tips */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Meals</CardTitle>
                <CardDescription>Latest recorded meals and snacks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedPatient.recentMeals.map((meal, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Utensils className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{meal.type}</p>
                          <p className="text-sm text-muted-foreground">{meal.time}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-right">{meal.calories} kcal</p>
                        <p className="text-sm text-muted-foreground">{meal.items.join(', ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutrition Tips</CardTitle>
                <CardDescription>Personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedPatient.nutritionTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0">
                      <div className={`mt-1 ${getPriorityColor(tip.priority)}`}>
                        {tip.priority === 'high' ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tip.category}</p>
                        <p className="text-sm text-muted-foreground">{tip.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;
