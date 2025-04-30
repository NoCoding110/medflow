
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PatientExercise = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Personalized Exercise Recommendations</h1>
        <p className="text-muted-foreground">
          Customized workouts based on your health profile and goals
        </p>
      </div>

      <Tabs defaultValue="recommended" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="age-based">Age-Based</TabsTrigger>
          <TabsTrigger value="condition-based">Condition-Based</TabsTrigger>
          <TabsTrigger value="history">My History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-blue-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Morning Routine</CardTitle>
                  <Badge variant="outline">Daily</Badge>
                </div>
                <CardDescription>Low impact, 15 minutes</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Gentle stretching - 5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Light cardio (marching in place) - 5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Balance exercises - 5 minutes</span>
                  </li>
                </ul>
                <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm">
                  <p className="font-medium text-blue-800">Why this works for you:</p>
                  <p className="mt-1 text-blue-700">
                    This routine helps with joint mobility while being gentle on your knees.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button className="w-full">View Detailed Instructions</Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-green-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Walking Program</CardTitle>
                  <Badge variant="outline">3x Weekly</Badge>
                </div>
                <CardDescription>Moderate intensity, 20 minutes</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Warm up walk - 3 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Brisk walking - 15 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Cool down - 2 minutes</span>
                  </li>
                </ul>
                <div className="mt-4 rounded-md bg-green-50 p-3 text-sm">
                  <p className="font-medium text-green-800">Why this works for you:</p>
                  <p className="mt-1 text-green-700">
                    Walking improves cardiovascular health and is recommended for your blood pressure levels.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button className="w-full">View Detailed Instructions</Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-purple-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Strength Training</CardTitle>
                  <Badge variant="outline">2x Weekly</Badge>
                </div>
                <CardDescription>Moderate intensity, 20 minutes</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Seated arm exercises with light weights - 5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Wall push-ups - 3 sets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Chair squats - 3 sets</span>
                  </li>
                </ul>
                <div className="mt-4 rounded-md bg-purple-50 p-3 text-sm">
                  <p className="font-medium text-purple-800">Why this works for you:</p>
                  <p className="mt-1 text-purple-700">
                    Builds muscle mass which helps manage blood sugar levels and supports joint health.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button className="w-full">View Detailed Instructions</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Weekly Exercise Plan
                </CardTitle>
                <CardDescription>
                  Your personalized schedule for maximum benefit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-7">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                    <div key={day} className="rounded-lg border p-3">
                      <div className="font-medium">{day}</div>
                      <div className="mt-2 space-y-2">
                        {index === 0 && (
                          <>
                            <div className="rounded-md bg-blue-50 px-2 py-1 text-xs">Morning Routine</div>
                            <div className="rounded-md bg-green-50 px-2 py-1 text-xs">Walking Program</div>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <div className="rounded-md bg-blue-50 px-2 py-1 text-xs">Morning Routine</div>
                            <div className="rounded-md bg-purple-50 px-2 py-1 text-xs">Strength Training</div>
                          </>
                        )}
                        {index === 4 && (
                          <>
                            <div className="rounded-md bg-blue-50 px-2 py-1 text-xs">Morning Routine</div>
                            <div className="rounded-md bg-green-50 px-2 py-1 text-xs">Walking Program</div>
                          </>
                        )}
                        {index === 5 && (
                          <>
                            <div className="rounded-md bg-blue-50 px-2 py-1 text-xs">Morning Routine</div>
                            <div className="rounded-md bg-purple-50 px-2 py-1 text-xs">Strength Training</div>
                          </>
                        )}
                        {(index === 1 || index === 3 || index === 6) && (
                          <div className="rounded-md bg-blue-50 px-2 py-1 text-xs">Morning Routine</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Download Schedule as PDF</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="age-based">
          <Card>
            <CardHeader>
              <CardTitle>Age-Based Exercise Recommendations</CardTitle>
              <CardDescription>
                Exercises optimized for your age group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Adults 50-65</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Focus on maintaining muscle mass, joint flexibility, and cardiovascular health
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Moderate Aerobic Activity</h4>
                      <p className="mt-1 text-sm">150 minutes weekly (e.g., brisk walking)</p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Strength Training</h4>
                      <p className="mt-1 text-sm">2-3 days per week, all major muscle groups</p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Balance Training</h4>
                      <p className="mt-1 text-sm">2-3 days per week (e.g., tai chi, yoga)</p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Flexibility</h4>
                      <p className="mt-1 text-sm">Daily stretching for major muscle groups</p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Impact Management</h4>
                      <p className="mt-1 text-sm">Low-impact options to protect joints</p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Recovery</h4>
                      <p className="mt-1 text-sm">Allow 48 hours between strength training sessions</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button>View Recommended Programs</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4 opacity-60">
                  <h3 className="text-lg font-medium">Adults 65+</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Not applicable to your current age group
                  </p>
                </div>
                
                <div className="rounded-lg border p-4 opacity-60">
                  <h3 className="text-lg font-medium">Adults 40-50</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Not applicable to your current age group
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="condition-based">
          <Card>
            <CardHeader>
              <CardTitle>Condition-Based Exercise Recommendations</CardTitle>
              <CardDescription>
                Exercises tailored for specific health conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Arthritis Management</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Gentle exercises to help manage arthritis symptoms and improve joint mobility
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-md bg-slate-50 p-4">
                      <h4 className="font-medium">Gentle Yoga for Arthritis</h4>
                      <p className="mt-1 text-sm">
                        Modified yoga poses that improve flexibility without stressing joints
                      </p>
                      <Button size="sm" className="mt-2">View Program</Button>
                    </div>
                    
                    <div className="rounded-md bg-slate-50 p-4">
                      <h4 className="font-medium">Water Therapy</h4>
                      <p className="mt-1 text-sm">
                        Low-impact water exercises that reduce joint pressure while building strength
                      </p>
                      <Button size="sm" className="mt-2">View Program</Button>
                    </div>
                    
                    <div className="rounded-md bg-slate-50 p-4">
                      <h4 className="font-medium">Range of Motion Exercises</h4>
                      <p className="mt-1 text-sm">
                        Daily movements to maintain joint function and reduce stiffness
                      </p>
                      <Button size="sm" className="mt-2">View Program</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Heart Health</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cardiovascular exercises appropriate for your heart condition
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-md bg-slate-50 p-4">
                      <h4 className="font-medium">Cardiac Rehabilitation Exercises</h4>
                      <p className="mt-1 text-sm">
                        Structured program to strengthen your heart safely
                      </p>
                      <Button size="sm" className="mt-2">View Program</Button>
                    </div>
                    
                    <div className="rounded-md bg-slate-50 p-4">
                      <h4 className="font-medium">Monitored Walking Program</h4>
                      <p className="mt-1 text-sm">
                        Progressive walking routine with heart rate monitoring
                      </p>
                      <Button size="sm" className="mt-2">View Program</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Diabetes Management</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Activities to help regulate blood sugar and improve insulin sensitivity
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-md bg-slate-50 p-4">
                      <h4 className="font-medium">Interval Walking</h4>
                      <p className="mt-1 text-sm">
                        Alternating pace walking to help manage blood glucose levels
                      </p>
                      <Button size="sm" className="mt-2">View Program</Button>
                    </div>
                    
                    <div className="rounded-md bg-slate-50 p-4">
                      <h4 className="font-medium">Resistance Band Workout</h4>
                      <p className="mt-1 text-sm">
                        Strength training to improve muscle mass and glucose metabolism
                      </p>
                      <Button size="sm" className="mt-2">View Program</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Your Exercise History</CardTitle>
              <CardDescription>
                Track your progress and adherence to exercise plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">April 2025</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Morning Routine</div>
                        <div className="text-sm text-muted-foreground">Completed 18 of 21 days (86%)</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Outstanding</Badge>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                        <Activity className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Walking Program</div>
                        <div className="text-sm text-muted-foreground">Completed 8 of 12 sessions (67%)</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Good</Badge>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <Activity className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Strength Training</div>
                        <div className="text-sm text-muted-foreground">Completed 5 of 8 sessions (63%)</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Good</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">March 2025</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Morning Routine</div>
                        <div className="text-sm text-muted-foreground">Completed 17 of 23 days (74%)</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Good</Badge>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                        <Activity className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Walking Program</div>
                        <div className="text-sm text-muted-foreground">Completed 7 of 12 sessions (58%)</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Fair</Badge>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <Activity className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Strength Training</div>
                        <div className="text-sm text-muted-foreground">Completed 3 of 8 sessions (38%)</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Needs Improvement</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Download Exercise History Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientExercise;
