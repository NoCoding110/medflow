
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Thermometer, Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PatientHealthTips = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Daily Health Tips</h1>
        <p className="text-muted-foreground">
          Evidence-based wellness guidance customized for your health profile
        </p>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today's Tips</TabsTrigger>
          <TabsTrigger value="sleep">Sleep Hygiene</TabsTrigger>
          <TabsTrigger value="stress">Stress Management</TabsTrigger>
          <TabsTrigger value="archive">Tip Archive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-blue-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-blue-600" />
                    <span>Heart Health</span>
                  </CardTitle>
                  <Badge variant="outline">Today</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <h3 className="font-medium text-lg">The Power of Potassium</h3>
                <p className="mt-2 text-sm">
                  Increasing your potassium intake can help counteract the effects of sodium and 
                  lower your blood pressure. Try adding these potassium-rich foods to your diet:
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Bananas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Sweet potatoes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Spinach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Avocados</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-green-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span>Physical Activity</span>
                  </CardTitle>
                  <Badge variant="outline">Today</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <h3 className="font-medium text-lg">Chair Exercises for Joint Health</h3>
                <p className="mt-2 text-sm">
                  You can improve joint mobility and strengthen muscles even when sitting. 
                  Try these gentle exercises you can do from a chair:
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Seated leg raises (10 reps each leg)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Ankle circles (10 clockwise, 10 counterclockwise)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Seated arm stretches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Seated side bends</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="outline" className="w-full">View Exercise Guide</Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-purple-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Watch className="h-5 w-5 text-purple-600" />
                    <span>Sleep Health</span>
                  </CardTitle>
                  <Badge variant="outline">Today</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <h3 className="font-medium text-lg">Optimize Your Sleep Environment</h3>
                <p className="mt-2 text-sm">
                  Your sleep environment plays a critical role in sleep quality. Consider these adjustments 
                  for better rest:
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Keep room temperature between 65-68°F (18-20°C)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Use blackout curtains to block light</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Remove electronic devices or use night mode</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Consider white noise for consistent sound</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="outline" className="w-full">Sleep Hygiene Guide</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>This Week's Focus Areas</CardTitle>
                <CardDescription>
                  Personalized health priorities based on your recent data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">Blood Pressure Management</h3>
                    </div>
                    <p className="mt-2 text-sm">
                      Your readings have been slightly elevated. Focus on sodium reduction 
                      and stress management this week.
                    </p>
                    <Button size="sm" className="mt-3">View Tips</Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Daily Movement</h3>
                    </div>
                    <p className="mt-2 text-sm">
                      Your activity levels are below target. Try incorporating more 
                      short walking breaks throughout your day.
                    </p>
                    <Button size="sm" className="mt-3">View Tips</Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Watch className="h-5 w-5 text-purple-500" />
                      <h3 className="font-medium">Sleep Quality</h3>
                    </div>
                    <p className="mt-2 text-sm">
                      Your sleep has been fragmented. Focus on consistent bedtime 
                      and evening relaxation techniques.
                    </p>
                    <Button size="sm" className="mt-3">View Tips</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Hygiene Guidelines</CardTitle>
              <CardDescription>
                Evidence-based strategies to improve your sleep quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg bg-purple-50 p-4">
                  <h3 className="mb-2 font-medium">Why Sleep Matters</h3>
                  <p className="text-sm">
                    Quality sleep is essential for your heart health, blood pressure regulation, 
                    glucose metabolism, and immune function. For your specific health profile, 
                    aiming for 7-8 hours of uninterrupted sleep is recommended.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-medium">Before Bedtime</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Establish a consistent routine</span>
                          <p className="mt-0.5 text-muted-foreground">Go to bed and wake up at the same time daily</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Create a wind-down period</span>
                          <p className="mt-0.5 text-muted-foreground">Spend 30-60 minutes doing relaxing activities</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Limit screen time</span>
                          <p className="mt-0.5 text-muted-foreground">Avoid electronics 1 hour before bed</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Watch your diet</span>
                          <p className="mt-0.5 text-muted-foreground">Avoid large meals, caffeine, and alcohol near bedtime</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Try relaxation techniques</span>
                          <p className="mt-0.5 text-muted-foreground">Deep breathing, meditation, or gentle stretching</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-medium">Sleep Environment</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Optimize your bedroom</span>
                          <p className="mt-0.5 text-muted-foreground">Keep it cool (65-68°F), dark, and quiet</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Assess your mattress and pillows</span>
                          <p className="mt-0.5 text-muted-foreground">Ensure they provide proper support for your body</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Consider white noise</span>
                          <p className="mt-0.5 text-muted-foreground">Use a fan or sound machine to mask disruptive noises</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Manage light exposure</span>
                          <p className="mt-0.5 text-muted-foreground">Use blackout curtains and avoid night lights</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <div>
                          <span className="font-medium">Reserve your bed for sleep</span>
                          <p className="mt-0.5 text-muted-foreground">Don't use your bed for work or watching TV</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-3 font-medium">Sleep-Promoting Techniques</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">4-7-8 Breathing</h4>
                      <p className="mt-1 text-sm">
                        Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times.
                      </p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Progressive Relaxation</h4>
                      <p className="mt-1 text-sm">
                        Tense and release muscles from toes to head.
                      </p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Guided Sleep Meditation</h4>
                      <p className="mt-1 text-sm">
                        Follow audio instructions to relax your mind.
                      </p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Sleep Journal</h4>
                      <p className="mt-1 text-sm">
                        Write down thoughts to clear your mind before sleep.
                      </p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Gentle Yoga</h4>
                      <p className="mt-1 text-sm">
                        Light stretching to release physical tension.
                      </p>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <h4 className="font-medium">Aromatherapy</h4>
                      <p className="mt-1 text-sm">
                        Lavender or chamomile scents can promote relaxation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Download Sleep Hygiene Guide</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="stress">
          <Card>
            <CardHeader>
              <CardTitle>Stress Management Techniques</CardTitle>
              <CardDescription>
                Personalized approaches to reduce stress and improve well-being
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-medium">The Impact of Stress on Your Health</h3>
                  <p className="text-sm">
                    For someone with your health profile, managing stress is particularly important for blood pressure 
                    regulation and heart health. Chronic stress can impact sleep quality, blood glucose levels, 
                    and exacerbate inflammation.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">Quick Stress Relief Techniques</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Box Breathing</h4>
                      <p className="mt-1 text-sm">
                        A 4-second pattern of inhale, hold, exhale, and hold that can be done anywhere.
                      </p>
                      <ol className="mt-3 space-y-1 text-sm">
                        <li className="flex gap-2">
                          <span className="text-blue-600">1.</span>
                          <span>Inhale slowly through your nose for 4 seconds</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">2.</span>
                          <span>Hold your breath for 4 seconds</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">3.</span>
                          <span>Exhale slowly through your mouth for 4 seconds</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">4.</span>
                          <span>Hold for 4 seconds before inhaling again</span>
                        </li>
                      </ol>
                      <p className="mt-2 text-sm">Repeat for 2-5 minutes when feeling stressed.</p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">5-4-3-2-1 Grounding</h4>
                      <p className="mt-1 text-sm">
                        A mindfulness technique to anchor yourself in the present moment.
                      </p>
                      <p className="mt-3 text-sm">Identify around you:</p>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>5 things you can see</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>4 things you can touch/feel</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>3 things you can hear</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>2 things you can smell</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>1 thing you can taste</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Progressive Muscle Relaxation</h4>
                      <p className="mt-1 text-sm">
                        A technique to release physical tension stored in your body.
                      </p>
                      <ol className="mt-3 space-y-1 text-sm">
                        <li className="flex gap-2">
                          <span className="text-blue-600">1.</span>
                          <span>Find a comfortable seated position</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">2.</span>
                          <span>Starting with your toes, tense the muscles for 5 seconds</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">3.</span>
                          <span>Release and notice the feeling of relaxation</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">4.</span>
                          <span>Work your way up through each muscle group</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">Daily Stress Management Practices</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Mindful Movement</h4>
                      <p className="mt-1 text-sm">
                        Gentle activities that combine physical movement with mindfulness.
                      </p>
                      <ul className="mt-3 space-y-1 text-sm">
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Chair yoga (15 minutes)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Gentle walking meditation (10 minutes)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Tai chi for beginners (10-15 minutes)</span>
                        </li>
                      </ul>
                      <Button size="sm" className="mt-3">View Guided Videos</Button>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Mindfulness Practices</h4>
                      <p className="mt-1 text-sm">
                        Simple techniques to train your focus and attention.
                      </p>
                      <ul className="mt-3 space-y-1 text-sm">
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Guided meditation (5-10 minutes)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Mindful eating practice</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Gratitude journaling (3 items daily)</span>
                        </li>
                      </ul>
                      <Button size="sm" className="mt-3">Access Guided Sessions</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Nature Connection</h4>
                      <p className="mt-1 text-sm">
                        Spending time in or connecting with nature can reduce stress hormones.
                      </p>
                      <ul className="mt-3 space-y-1 text-sm">
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Sit outside for 10 minutes daily</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Tend to houseplants or a small garden</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>View nature photographs or videos</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Social Connections</h4>
                      <p className="mt-1 text-sm">
                        Meaningful social interactions can buffer against stress effects.
                      </p>
                      <ul className="mt-3 space-y-1 text-sm">
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Schedule regular calls with family/friends</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Join a support or interest group</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Volunteer or help others (when possible)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create Personal Stress Management Plan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="archive">
          <Card>
            <CardHeader>
              <CardTitle>Health Tip Archive</CardTitle>
              <CardDescription>
                Browse previous health tips tailored to your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-medium">April 2025</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Apr 26</Badge>
                        <Badge variant="secondary">Heart Health</Badge>
                      </div>
                      <h4 className="font-medium">The Power of Potassium</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        Increasing your potassium intake can help counteract the effects of sodium...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Apr 25</Badge>
                        <Badge variant="secondary">Physical Activity</Badge>
                      </div>
                      <h4 className="font-medium">Chair Exercises for Joint Health</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        You can improve joint mobility and strengthen muscles even when sitting...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Apr 24</Badge>
                        <Badge variant="secondary">Sleep Health</Badge>
                      </div>
                      <h4 className="font-medium">Optimize Your Sleep Environment</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        Your sleep environment plays a critical role in sleep quality...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Apr 23</Badge>
                        <Badge variant="secondary">Nutrition</Badge>
                      </div>
                      <h4 className="font-medium">Understanding Food Labels</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        Learn how to decode nutrition facts to make healthier choices...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Apr 22</Badge>
                        <Badge variant="secondary">Stress Management</Badge>
                      </div>
                      <h4 className="font-medium">Two-Minute Breathing Exercise</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        This simple breathing technique can activate your parasympathetic nervous system...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Apr 21</Badge>
                        <Badge variant="secondary">Heart Health</Badge>
                      </div>
                      <h4 className="font-medium">Hydration and Heart Health</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        Maintaining proper hydration is essential for cardiovascular function...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">March 2025</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Mar 31</Badge>
                        <Badge variant="secondary">Medication</Badge>
                      </div>
                      <h4 className="font-medium">Organizing Your Medications</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        Simple systems to help you remember to take your medications...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Mar 28</Badge>
                        <Badge variant="secondary">Physical Activity</Badge>
                      </div>
                      <h4 className="font-medium">Balance Exercises for Fall Prevention</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        Simple exercises to improve stability and reduce fall risk...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">Mar 25</Badge>
                        <Badge variant="secondary">Nutrition</Badge>
                      </div>
                      <h4 className="font-medium">Anti-Inflammatory Foods</h4>
                      <p className="mt-1 text-sm line-clamp-2">
                        Incorporating these foods can help manage chronic inflammation...
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">View</Button>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline">Show More March Tips</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between">
                <Button variant="outline">Filter Tips</Button>
                <Button variant="outline">Search Archive</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientHealthTips;
