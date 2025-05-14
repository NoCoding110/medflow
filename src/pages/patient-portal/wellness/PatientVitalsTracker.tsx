import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Thermometer, Watch, Plus, LineChart, Coffee, Brain, Utensils, Scale, Moon, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

// Mock data
const mockVitalsData = {
  bloodPressure: [
    { date: "2023-10-01", systolic: 120, diastolic: 80 },
    { date: "2023-10-05", systolic: 118, diastolic: 78 },
    { date: "2023-10-10", systolic: 122, diastolic: 82 },
    { date: "2023-10-15", systolic: 119, diastolic: 79 },
    { date: "2023-10-20", systolic: 121, diastolic: 80 },
  ],
  heartRate: [
    { date: "2023-10-01", value: 72 },
    { date: "2023-10-05", value: 68 },
    { date: "2023-10-10", value: 70 },
    { date: "2023-10-15", value: 74 },
    { date: "2023-10-20", value: 71 },
  ],
  weight: [
    { date: "2023-10-01", value: 165 },
    { date: "2023-10-10", value: 164 },
    { date: "2023-10-20", value: 163.5 },
  ],
  sleep: [
    { date: "2023-10-15", hours: 7.5, quality: "good" },
    { date: "2023-10-16", hours: 6.8, quality: "fair" },
    { date: "2023-10-17", hours: 7.2, quality: "good" },
    { date: "2023-10-18", hours: 8.0, quality: "excellent" },
    { date: "2023-10-19", hours: 6.5, quality: "fair" },
  ],
  nutrition: {
    calories: { target: 2000, current: 1850 },
    protein: { target: 100, current: 85 },
    carbs: { target: 250, current: 220 },
    fat: { target: 65, current: 60 },
  },
  waterIntake: { target: 8, current: 6 },
  exercise: {
    weeklyMinutes: { target: 150, current: 120 },
    activities: [
      { date: "2023-10-18", type: "Running", duration: 30, calories: 320 },
      { date: "2023-10-19", type: "Strength Training", duration: 45, calories: 280 },
      { date: "2023-10-20", type: "Yoga", duration: 60, calories: 200 },
    ],
  },
};

// Metric entry form component
interface MetricEntryFormProps {
  metricType: string;
  onSubmit: (data: any) => void;
}

const MetricEntryForm = ({ metricType, onSubmit }: MetricEntryFormProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      ...formValues,
    };
    onSubmit(formData);
    // Reset form
    setFormValues({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <DatePicker
            value={date}
            onChange={setDate}
          />
        </div>

        {metricType === "bloodPressure" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select onValueChange={(value) => handleChange("time", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="systolic">Systolic (mmHg)</Label>
              <Input
                id="systolic"
                type="number"
                placeholder="120"
                onChange={(e) => handleChange("systolic", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
              <Input
                id="diastolic"
                type="number"
                placeholder="80"
                onChange={(e) => handleChange("diastolic", parseInt(e.target.value))}
              />
            </div>
          </>
        )}

        {metricType === "heartRate" && (
          <div className="space-y-2">
            <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
            <Input
              id="heartRate"
              type="number"
              placeholder="70"
              onChange={(e) => handleChange("value", parseInt(e.target.value))}
            />
          </div>
        )}

        {metricType === "weight" && (
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="165"
              onChange={(e) => handleChange("value", parseFloat(e.target.value))}
            />
          </div>
        )}

        {metricType === "sleep" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="hours">Hours Slept</Label>
              <Input
                id="hours"
                type="number"
                step="0.1"
                placeholder="7.5"
                onChange={(e) => handleChange("hours", parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Sleep Quality</Label>
              <Select onValueChange={(value) => handleChange("quality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poor">Poor</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {metricType === "exercise" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="exerciseType">Activity Type</Label>
              <Select onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walking">Walking</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="cycling">Cycling</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                onChange={(e) => handleChange("duration", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="intensity">Intensity</Label>
              <Select onValueChange={(value) => handleChange("intensity", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories Burned (estimate)</Label>
              <Input
                id="calories"
                type="number"
                placeholder="250"
                onChange={(e) => handleChange("calories", parseInt(e.target.value))}
              />
            </div>
          </>
        )}

        {metricType === "nutrition" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="mealType">Meal Type</Label>
              <Select onValueChange={(value) => handleChange("mealType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="500"
                onChange={(e) => handleChange("calories", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="25"
                onChange={(e) => handleChange("protein", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="60"
                onChange={(e) => handleChange("carbs", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Fat (g)</Label>
              <Input
                id="fat"
                type="number"
                placeholder="15"
                onChange={(e) => handleChange("fat", parseInt(e.target.value))}
              />
            </div>
          </>
        )}
      </div>

      <Button type="submit" className="w-full md:w-auto">Record {metricType}</Button>
    </form>
  );
};

// Main component
export default function PatientVitalsTracker() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [currentMetric, setCurrentMetric] = useState("");

  const handleAddMetric = (metricType: string) => {
    setCurrentMetric(metricType);
    setShowEntryForm(true);
  };

  const handleSubmitMetric = (data: any) => {
    console.log("Recording new metric:", currentMetric, data);
    // Here you would typically call an API to save the data
    setShowEntryForm(false);
    // Refetch or update the data
  };

  // Calculate progress percentages
  const exerciseProgress = (mockVitalsData.exercise.weeklyMinutes.current / mockVitalsData.exercise.weeklyMinutes.target) * 100;
  const nutritionProgress = (mockVitalsData.nutrition.calories.current / mockVitalsData.nutrition.calories.target) * 100;
  const waterProgress = (mockVitalsData.waterIntake.current / mockVitalsData.waterIntake.target) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Metrics Tracker</h1>
          <p className="text-muted-foreground">
            Monitor your vital health metrics and track progress toward your wellness goals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowEntryForm(!showEntryForm)}>
            <Plus className="mr-2 h-4 w-4" /> Record New Metric
          </Button>
        </div>
      </div>

      {showEntryForm && (
        <Card>
          <CardHeader>
            <CardTitle>Record New Health Metric</CardTitle>
            <CardDescription>Enter your latest health measurement</CardDescription>
          </CardHeader>
          <CardContent>
            {!currentMetric ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleAddMetric("bloodPressure")}>
                  <Heart className="h-6 w-6 mb-2 text-red-500" />
                  <span>Blood Pressure</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleAddMetric("heartRate")}>
                  <Activity className="h-6 w-6 mb-2 text-indigo-500" />
                  <span>Heart Rate</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleAddMetric("weight")}>
                  <Scale className="h-6 w-6 mb-2 text-green-500" />
                  <span>Weight</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleAddMetric("sleep")}>
                  <Moon className="h-6 w-6 mb-2 text-blue-500" />
                  <span>Sleep</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleAddMetric("exercise")}>
                  <Activity className="h-6 w-6 mb-2 text-amber-500" />
                  <span>Exercise</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleAddMetric("nutrition")}>
                  <Utensils className="h-6 w-6 mb-2 text-purple-500" />
                  <span>Nutrition</span>
                </Button>
              </div>
            ) : (
              <MetricEntryForm metricType={currentMetric} onSubmit={handleSubmitMetric} />
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-3xl grid-cols-4 md:grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Activity className="h-5 w-5 text-primary mr-2" />
                  Exercise
                </CardTitle>
                <CardDescription>Weekly goal progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Activity</span>
                    <span className="font-medium">{mockVitalsData.exercise.weeklyMinutes.current}/{mockVitalsData.exercise.weeklyMinutes.target} min</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${Math.min(exerciseProgress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Last activity: {mockVitalsData.exercise.activities[0].type}</span>
                    <span>{mockVitalsData.exercise.activities[0].duration} min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  Vitals
                </CardTitle>
                <CardDescription>Latest measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="text-sm">Blood Pressure</span>
                    <span className="font-medium">
                      {mockVitalsData.bloodPressure[mockVitalsData.bloodPressure.length - 1].systolic}/
                      {mockVitalsData.bloodPressure[mockVitalsData.bloodPressure.length - 1].diastolic}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="text-sm">Heart Rate</span>
                    <span className="font-medium">
                      {mockVitalsData.heartRate[mockVitalsData.heartRate.length - 1].value} bpm
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm">Weight</span>
                    <span className="font-medium">
                      {mockVitalsData.weight[mockVitalsData.weight.length - 1].value} lbs
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Moon className="h-5 w-5 text-blue-500 mr-2" />
                  Sleep
                </CardTitle>
                <CardDescription>Recent sleep patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Last Night</span>
                    <span className="font-medium">{mockVitalsData.sleep[mockVitalsData.sleep.length - 1].hours} hrs</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="grid grid-cols-5 gap-1 w-full">
                      {mockVitalsData.sleep.map((day, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-full bg-muted rounded-sm overflow-hidden">
                            <div 
                              className={`bg-blue-${day.quality === 'excellent' ? '500' : day.quality === 'good' ? '400' : day.quality === 'fair' ? '300' : '200'} h-16 rounded-sm`}
                              style={{ height: `${(day.hours / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs mt-1">{day.date.split('-')[2]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    Average: {(mockVitalsData.sleep.reduce((acc, day) => acc + day.hours, 0) / mockVitalsData.sleep.length).toFixed(1)} hrs
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Utensils className="h-5 w-5 text-amber-500 mr-2" />
                  Nutrition
                </CardTitle>
                <CardDescription>Daily intake tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Calories</span>
                    <span className="font-medium">{mockVitalsData.nutrition.calories.current}/{mockVitalsData.nutrition.calories.target} kcal</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full" 
                      style={{ width: `${Math.min(nutritionProgress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Protein</div>
                      <div className="font-medium">{mockVitalsData.nutrition.protein.current}g</div>
                      <div className="text-xs text-muted-foreground">of {mockVitalsData.nutrition.protein.target}g</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Carbs</div>
                      <div className="font-medium">{mockVitalsData.nutrition.carbs.current}g</div>
                      <div className="text-xs text-muted-foreground">of {mockVitalsData.nutrition.carbs.target}g</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Fat</div>
                      <div className="font-medium">{mockVitalsData.nutrition.fat.current}g</div>
                      <div className="text-xs text-muted-foreground">of {mockVitalsData.nutrition.fat.target}g</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Coffee className="h-5 w-5 text-blue-500 mr-2" />
                  Water Intake
                </CardTitle>
                <CardDescription>Daily hydration tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="8"
                        fill="transparent"
                        r="42"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-blue-500 stroke-current"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        r="42"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${waterProgress * 2.64}, 1000`}
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{mockVitalsData.waterIntake.current}</span>
                      <span className="text-sm text-muted-foreground">of {mockVitalsData.waterIntake.target} cups</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => console.log("Added water")}>
                      <Plus className="h-4 w-4 mr-1" /> Add Cup
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => console.log("View water history")}>
                      <CalendarIcon className="h-4 w-4 mr-1" /> History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Health Recommendations</CardTitle>
              <CardDescription>Personalized suggestions based on your health data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="font-medium">Heart Health</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Your blood pressure is in the normal range. Continue monitoring and maintain your current habits.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Activity className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium">Activity Level</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">You're 80% of the way to your weekly exercise goal. Consider adding one more workout session.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Brain className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="font-medium">Stress Management</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Your sleep patterns suggest increased stress. Try adding a 10-minute meditation before bed.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="vitals">
          {/* Detailed vitals tracking interface */}
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure Tracking</CardTitle>
                <CardDescription>Monitor your systolic and diastolic readings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-lg bg-muted/10">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Blood pressure chart would appear here</p>
                    <p className="text-sm">Showing 120/80 readings over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Similar cards for heart rate and other vitals */}
          </div>
        </TabsContent>

        {/* Similar implementation for other tabs */}
      </Tabs>
    </div>
  );
}
