
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Thermometer, Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PatientVitalsTracker = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vitals Tracker</h1>
        <p className="text-muted-foreground">
          Monitor your health metrics and connect with wearable devices
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="connect">Connect Devices</TabsTrigger>
          <TabsTrigger value="trends">Health Trends</TabsTrigger>
          <TabsTrigger value="reportcard">Health Report Card</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Heart Rate</span>
                </CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <div className="text-2xl font-bold">72</div>
                    <div className="text-sm text-muted-foreground">BPM (resting)</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-end text-sm">
                      <span className="text-green-600">↓ 4</span>
                      <span className="ml-1 text-muted-foreground">from avg.</span>
                    </div>
                    <div className="mt-1 flex items-center justify-end text-sm">
                      <span className="text-sm text-muted-foreground">Range:</span>
                      <span className="ml-1">65-88</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-[70px] w-full bg-slate-50 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Heart rate graph visualization</p>
                </div>
              </CardContent>
              <CardFooter className="border-t p-2">
                <Button variant="ghost" size="sm" className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <span>Blood Pressure</span>
                </CardTitle>
                <CardDescription>Last reading: Today, 8:30am</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <div className="text-2xl font-bold">128/82</div>
                    <div className="text-sm text-muted-foreground">mmHg</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-end text-sm">
                      <span className="text-amber-600">↑ 3/1</span>
                      <span className="ml-1 text-muted-foreground">from avg.</span>
                    </div>
                    <div className="mt-1 flex items-center justify-end">
                      <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100">Elevated</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-[70px] w-full bg-slate-50 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Blood pressure trend visualization</p>
                </div>
              </CardContent>
              <CardFooter className="border-t p-2">
                <Button variant="ghost" size="sm" className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-5 w-5 text-green-500" />
                  <span>Daily Steps</span>
                </CardTitle>
                <CardDescription>Today's progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <div className="text-2xl font-bold">6,842</div>
                    <div className="text-sm text-muted-foreground">steps today</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-end text-sm">
                      <span className="text-green-600">68%</span>
                      <span className="ml-1 text-muted-foreground">of goal</span>
                    </div>
                    <div className="mt-1 flex items-center justify-end text-sm">
                      <span className="text-sm text-muted-foreground">Goal:</span>
                      <span className="ml-1">10,000</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '68%' }}></div>
                </div>
                <div className="mt-4 h-[50px] w-full bg-slate-50 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Steps by hour visualization</p>
                </div>
              </CardContent>
              <CardFooter className="border-t p-2">
                <Button variant="ghost" size="sm" className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Watch className="h-5 w-5 text-purple-500" />
                  <span>Sleep</span>
                </CardTitle>
                <CardDescription>Last night</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <div className="text-2xl font-bold">6.5</div>
                    <div className="text-sm text-muted-foreground">hours</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-end text-sm">
                      <span className="text-amber-600">↓ 0.5</span>
                      <span className="ml-1 text-muted-foreground">from avg.</span>
                    </div>
                    <div className="mt-1 flex items-center justify-end text-sm">
                      <span className="text-sm text-muted-foreground">Quality:</span>
                      <span className="ml-1">81%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-[70px] w-full bg-slate-50 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Sleep stages visualization</p>
                </div>
              </CardContent>
              <CardFooter className="border-t p-2">
                <Button variant="ghost" size="sm" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Measurements</CardTitle>
                <CardDescription>Manually tracked vital signs</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="divide-y">
                  <div className="flex items-center p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Activity className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium">Blood Glucose</div>
                      <div className="text-sm text-muted-foreground">Today, 7:15am (fasting)</div>
                    </div>
                    <div className="mr-4 text-right">
                      <div className="font-medium">118</div>
                      <div className="text-sm text-muted-foreground">mg/dL</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Thermometer className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium">Body Temperature</div>
                      <div className="text-sm text-muted-foreground">Yesterday, 8:30pm</div>
                    </div>
                    <div className="mr-4 text-right">
                      <div className="font-medium">98.6</div>
                      <div className="text-sm text-muted-foreground">°F</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Activity className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium">Weight</div>
                      <div className="text-sm text-muted-foreground">3 days ago</div>
                    </div>
                    <div className="mr-4 text-right">
                      <div className="font-medium">168</div>
                      <div className="text-sm text-muted-foreground">lbs</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Heart className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium">Pulse Oximetry (SpO2)</div>
                      <div className="text-sm text-muted-foreground">4 days ago</div>
                    </div>
                    <div className="mr-4 text-right">
                      <div className="font-medium">98%</div>
                      <div className="text-sm text-muted-foreground">O2 saturation</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Record New Measurement</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Health Summary</CardTitle>
                <CardDescription>April 21 - April 27, 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Activity Summary</h3>
                    <Badge variant="outline" className="bg-blue-100">Good</Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Avg. Steps</div>
                      <div className="text-lg font-medium">7,246 daily</div>
                      <div className="text-xs text-green-600">↑ 824 from last week</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Active Minutes</div>
                      <div className="text-lg font-medium">22 mins/day</div>
                      <div className="text-xs text-green-600">↑ 5 mins from last week</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-red-50 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Heart Health</h3>
                    <Badge variant="outline" className="bg-amber-100">Watch</Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Avg. Blood Pressure</div>
                      <div className="text-lg font-medium">129/83</div>
                      <div className="text-xs text-amber-600">↑ 2/1 from last week</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Resting HR</div>
                      <div className="text-lg font-medium">72 bpm</div>
                      <div className="text-xs text-green-600">↓ 1 from last week</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-purple-50 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Sleep Patterns</h3>
                    <Badge variant="outline" className="bg-amber-100">Improve</Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Avg. Sleep</div>
                      <div className="text-lg font-medium">6.4 hrs/night</div>
                      <div className="text-xs text-red-600">↓ 0.3 from last week</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Sleep Quality</div>
                      <div className="text-lg font-medium">78%</div>
                      <div className="text-xs text-amber-600">↓ 3% from last week</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Full Report</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="connect">
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Wearable Devices</CardTitle>
              <CardDescription>
                Sync data from your wearables for better health tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="font-medium">Why Connect Your Devices?</h3>
                  <p className="mt-1 text-sm">
                    Connecting your wearable devices allows your healthcare team to monitor your 
                    vitals between visits, spot trends, and provide more personalized care. All your 
                    data is securely stored and accessible only to you and your care team.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border p-5 text-center">
                    <div className="mb-3 inline-block rounded-full bg-blue-100 p-3">
                      <Watch className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-lg font-medium">Apple Watch</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Connect to sync heart rate, activity, ECG, and sleep data
                    </p>
                    <Button className="mt-3 w-full">Connect</Button>
                  </div>
                  
                  <div className="rounded-lg border p-5 text-center">
                    <div className="mb-3 inline-block rounded-full bg-blue-100 p-3">
                      <Activity className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-lg font-medium">Fitbit</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Connect to sync activity, sleep, and heart rate data
                    </p>
                    <Button className="mt-3 w-full">Connect</Button>
                  </div>
                  
                  <div className="rounded-lg border p-5 text-center">
                    <div className="mb-3 inline-block rounded-full bg-blue-100 p-3">
                      <Heart className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-lg font-medium">Blood Pressure Monitor</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Connect compatible Bluetooth BP monitors
                    </p>
                    <Button className="mt-3 w-full">Connect</Button>
                  </div>
                </div>

                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <h3 className="font-medium">Other Compatible Devices</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <Activity className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <div className="font-medium">Glucose Monitors</div>
                          <div className="text-xs text-muted-foreground">Continuous and traditional</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <Heart className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <div className="font-medium">Smart Scales</div>
                          <div className="text-xs text-muted-foreground">Track weight and body composition</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <Thermometer className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <div className="font-medium">Smart Thermometers</div>
                          <div className="text-xs text-muted-foreground">Auto-record temperature</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <Watch className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <div className="font-medium">Pulse Oximeters</div>
                          <div className="text-xs text-muted-foreground">Track oxygen saturation</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <Activity className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <div className="font-medium">Samsung Galaxy Watch</div>
                          <div className="text-xs text-muted-foreground">Activity and heart monitoring</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                          <Heart className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <div className="font-medium">Oura Ring</div>
                          <div className="text-xs text-muted-foreground">Sleep and activity tracking</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline">View All Compatible Devices</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Health Trends Analysis</CardTitle>
              <CardDescription>
                AI-powered insights into your health patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <h3 className="font-medium">Blood Pressure Trends</h3>
                  </div>
                  <div className="p-4">
                    <div className="mb-4 h-[200px] w-full bg-slate-50 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Blood pressure trend graph visualization</p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-3">
                      <h4 className="text-sm font-medium">AI Insight:</h4>
                      <p className="mt-1 text-sm">
                        Your systolic pressure tends to be higher in the morning and on workdays. 
                        Consider taking your medication earlier in the day and practicing morning 
                        relaxation techniques to help manage these patterns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <h3 className="font-medium">Activity vs. Sleep Quality</h3>
                  </div>
                  <div className="p-4">
                    <div className="mb-4 h-[200px] w-full bg-slate-50 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Activity and sleep correlation visualization</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3">
                      <h4 className="text-sm font-medium">AI Insight:</h4>
                      <p className="mt-1 text-sm">
                        On days when you achieve 7,000+ steps, your deep sleep duration increases by an 
                        average of 18 minutes. Try to maintain consistent daily activity for better sleep quality.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border">
                    <div className="border-b p-4">
                      <h3 className="font-medium">Heart Rate Variability</h3>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 h-[150px] w-full bg-slate-50 flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">HRV trend visualization</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-3">
                        <h4 className="text-sm font-medium">AI Insight:</h4>
                        <p className="mt-1 text-xs">
                          Your HRV shows lower resilience during high-stress periods. 
                          Regular breathing exercises appear to improve your metrics.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border">
                    <div className="border-b p-4">
                      <h3 className="font-medium">Glucose Response</h3>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 h-[150px] w-full bg-slate-50 flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Glucose pattern visualization</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-3">
                        <h4 className="text-sm font-medium">AI Insight:</h4>
                        <p className="mt-1 text-xs">
                          Your glucose levels show better stability when you have protein 
                          with carbohydrates at breakfast.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate Comprehensive Health Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reportcard">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Health Report Card</CardTitle>
              <CardDescription>
                Your personalized health summary for April 21-27, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Overall Health Score</h3>
                      <Badge className="bg-green-100 text-green-800">Good</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="relative h-32 w-32 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center rounded-full border-8 border-green-500">
                          <span className="text-3xl font-bold">78</span>
                        </div>
                      </div>
                      <div className="ml-6">
                        <p className="text-sm">
                          Your health score is based on your vitals, activity levels, sleep quality, 
                          and adherence to your care plan. You're doing well in most areas, with room 
                          for improvement in blood pressure management and sleep duration.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-sm font-medium">Previous score: 75</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">↑ 3 points</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border">
                    <div className="border-b p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Strengths</h3>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                          <span className="text-sm font-medium text-green-800">3</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="rounded-md bg-green-50 p-3">
                          <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-green-600" />
                            <h4 className="font-medium">Physical Activity</h4>
                          </div>
                          <p className="mt-1 text-sm">
                            You've increased your daily step count by 11% over the past two weeks, 
                            which is helping your cardiovascular health.
                          </p>
                        </div>

                        <div className="rounded-md bg-green-50 p-3">
                          <div className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-green-600" />
                            <h4 className="font-medium">Heart Rate</h4>
                          </div>
                          <p className="mt-1 text-sm">
                            Your resting heart rate has improved from 76 to 72 BPM, showing better 
                            cardiovascular fitness.
                          </p>
                        </div>

                        <div className="rounded-md bg-green-50 p-3">
                          <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-green-600" />
                            <h4 className="font-medium">Medication Adherence</h4>
                          </div>
                          <p className="mt-1 text-sm">
                            You've taken your medications as prescribed 98% of the time this month.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border">
                    <div className="border-b p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Areas for Improvement</h3>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                          <span className="text-sm font-medium text-amber-800">2</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="rounded-md bg-amber-50 p-3">
                          <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-amber-600" />
                            <h4 className="font-medium">Blood Pressure</h4>
                          </div>
                          <p className="mt-1 text-sm">
                            Your blood pressure has been in the elevated range (averaging 128/82) 
                            this week. Focusing on sodium reduction and stress management techniques may help.
                          </p>
                        </div>

                        <div className="rounded-md bg-amber-50 p-3">
                          <div className="flex items-center gap-2">
                            <Watch className="h-5 w-5 text-amber-600" />
                            <h4 className="font-medium">Sleep Duration</h4>
                          </div>
                          <p className="mt-1 text-sm">
                            You're averaging 6.4 hours of sleep, below the recommended 7-8 hours. 
                            Consider adjusting your bedtime routine.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <h3 className="font-medium">Recommended Actions</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="rounded-md bg-blue-50 p-3">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium">Schedule BP Check</h4>
                        </div>
                        <p className="mt-1 text-sm">
                          Consider scheduling a blood pressure check with your provider to discuss 
                          your recent elevated readings.
                        </p>
                        <Button size="sm" className="mt-2">Schedule Appointment</Button>
                      </div>

                      <div className="rounded-md bg-blue-50 p-3">
                        <div className="flex items-center gap-2">
                          <Watch className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium">Review Sleep Hygiene</h4>
                        </div>
                        <p className="mt-1 text-sm">
                          Check our sleep hygiene tips to improve your sleep duration and quality.
                        </p>
                        <Button size="sm" className="mt-2">View Sleep Tips</Button>
                      </div>

                      <div className="rounded-md bg-blue-50 p-3">
                        <div className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium">Continue Activity Progress</h4>
                        </div>
                        <p className="mt-1 text-sm">
                          Your increased step count is making a positive difference. Try to maintain 
                          or gradually increase this level of activity.
                        </p>
                        <Button size="sm" className="mt-2">View Exercise Plan</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col sm:flex-row gap-3">
                <Button className="sm:flex-1">Share With My Doctor</Button>
                <Button variant="outline" className="sm:flex-1">Download as PDF</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientVitalsTracker;
