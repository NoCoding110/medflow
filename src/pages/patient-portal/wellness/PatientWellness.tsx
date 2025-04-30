import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Pill, Thermometer, MessageSquare, Watch, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PatientWellness = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Wellness & Fitness Hub</h1>
        <p className="text-muted-foreground">
          Your personal AI-powered health companion
        </p>
      </div>

      {/* AI Health Assistant Card */}
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-blue-800">
            <Bot className="mr-2 h-6 w-6 text-blue-600" />
            AI Health Assistant
          </CardTitle>
          <CardDescription className="text-blue-700">
            Your 24/7 personal health companion powered by advanced AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium text-blue-800">What I can help you with:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>Analyze your medical reports and lab results</span>
                </li>
                <li className="flex items-center gap-2 text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>Answer your health-related questions</span>
                </li>
                <li className="flex items-center gap-2 text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>Provide personalized wellness recommendations</span>
                </li>
                <li className="flex items-center gap-2 text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>Help understand your medications and treatments</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/patient/health-assistant">
                  Chat with AI Health Assistant
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="progress">Your Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-purple-50 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Watch className="h-5 w-5 text-purple-600" />
                  <span>Vitals Tracker</span>
                </CardTitle>
                <CardDescription>Connect your wearable devices</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Steps today</span>
                      <span className="text-sm text-green-600 font-medium">6,372</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Heart rate (avg)</span>
                      <span className="text-sm text-blue-600 font-medium">72 bpm</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sleep last night</span>
                      <span className="text-sm text-amber-600 font-medium">6.5 hrs</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: '81%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/patient/vitals">Track Your Vitals</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-blue-50 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Exercise Plans</span>
                </CardTitle>
                <CardDescription>Personalized for your health profile</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div>
                  <h3 className="font-medium">Recommended for you:</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Morning stretching routine - 10 mins</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>Moderate walking - 20 mins daily</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                      <span>Strength training - 2x weekly</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/patient/exercise">View Exercise Plans</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-green-50 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Pill className="h-5 w-5 text-green-600" />
                  <span>Nutrition Tips</span>
                </CardTitle>
                <CardDescription>Diet plans and calorie tracking</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div>
                  <h3 className="font-medium">Today's nutrition focus:</h3>
                  <p className="mt-2 text-sm">Boost your omega-3 intake with these heart-healthy options:</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Salmon or fatty fish</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Walnuts and flaxseeds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>Avocados</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/patient/nutrition">View Nutrition Plans</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Based on your health profile and recent activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h3 className="flex items-center gap-2 font-medium">
                      <Activity className="h-4 w-4 text-blue-600" />
                      Exercise
                    </h3>
                    <p className="mt-1 text-sm">
                      Low-impact workouts like swimming or cycling would be beneficial for your joint health.
                    </p>
                  </div>
                  
                  <div className="rounded-lg bg-green-50 p-4">
                    <h3 className="flex items-center gap-2 font-medium">
                      <Pill className="h-4 w-4 text-green-600" />
                      Nutrition
                    </h3>
                    <p className="mt-1 text-sm">
                      Increasing fiber intake could help manage your cholesterol levels.
                    </p>
                  </div>
                  
                  <div className="rounded-lg bg-amber-50 p-4">
                    <h3 className="flex items-center gap-2 font-medium">
                      <Thermometer className="h-4 w-4 text-amber-600" />
                      Health Habits
                    </h3>
                    <p className="mt-1 text-sm">
                      Your sleep patterns show improvement. Continue your current bedtime routine.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Health Focus</CardTitle>
                <CardDescription>
                  This week's suggested health focus area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-purple-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <Heart className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Stress Management</h3>
                  <p className="mt-2 text-sm">
                    Your heart rate variability indicates elevated stress levels. 
                    This week, try incorporating 10 minutes of mindfulness or 
                    deep breathing exercises daily.
                  </p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link to="/patient/health-tips">View Stress Management Techniques</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Your Health Progress</CardTitle>
              <CardDescription>
                Track your wellness journey over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium">Activity Tracking</h3>
                  <div className="mt-4 h-[200px] w-full bg-slate-50 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Activity chart visualization would appear here</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Health Metrics</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Weight</div>
                      <div className="mt-1 flex items-end gap-1">
                        <span className="text-2xl font-bold">168</span>
                        <span className="text-sm text-muted-foreground">lbs</span>
                      </div>
                      <div className="mt-2 text-xs text-green-600">↓ 2.1 lbs (30 days)</div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Blood Pressure</div>
                      <div className="mt-1 flex items-end gap-1">
                        <span className="text-2xl font-bold">128/82</span>
                        <span className="text-sm text-muted-foreground">mmHg</span>
                      </div>
                      <div className="mt-2 text-xs text-green-600">↓ 5 points (30 days)</div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Avg. Steps</div>
                      <div className="mt-1 flex items-end gap-1">
                        <span className="text-2xl font-bold">7,248</span>
                        <span className="text-sm text-muted-foreground">daily</span>
                      </div>
                      <div className="mt-2 text-xs text-green-600">↑ 1,032 (30 days)</div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Sleep Quality</div>
                      <div className="mt-1 flex items-end gap-1">
                        <span className="text-2xl font-bold">76%</span>
                      </div>
                      <div className="mt-2 text-xs text-amber-600">↑ 4% (30 days)</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/patient/vitals">View Detailed Health Reports</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientWellness;
