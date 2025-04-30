
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Heart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PatientNutrition = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Diet & Nutrition</h1>
        <p className="text-muted-foreground">
          Personalized nutrition plans and dietary guidance
        </p>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="diabetes">Diabetes-Friendly</TabsTrigger>
          <TabsTrigger value="heart">Heart-Healthy</TabsTrigger>
          <TabsTrigger value="tracker">Calorie Tracker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="bg-green-50 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Your Personalized Meal Plan</CardTitle>
                  <Badge variant="outline" className="bg-green-100">Active</Badge>
                </div>
                <CardDescription>Based on your health profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Daily Goals:</h3>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      <div className="rounded-md bg-slate-50 p-3 text-center">
                        <div className="text-sm text-muted-foreground">Calories</div>
                        <div className="text-lg font-medium">1,800</div>
                      </div>
                      <div className="rounded-md bg-slate-50 p-3 text-center">
                        <div className="text-sm text-muted-foreground">Carbs</div>
                        <div className="text-lg font-medium">45%</div>
                      </div>
                      <div className="rounded-md bg-slate-50 p-3 text-center">
                        <div className="text-sm text-muted-foreground">Protein</div>
                        <div className="text-lg font-medium">25%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Dietary Focus:</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">Low Sodium</Badge>
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">Heart Healthy</Badge>
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">Diabetes Management</Badge>
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">High Fiber</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Recommendations:</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>• Increase lean protein sources (fish, chicken, legumes)</li>
                      <li>• Reduce processed foods and added sugars</li>
                      <li>• Focus on whole grains instead of refined carbohydrates</li>
                      <li>• Include healthy fats like olive oil, avocados, and nuts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button className="w-full">View Full Meal Plan</Button>
              </CardFooter>
            </Card>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Meal Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Breakfast</div>
                      <div className="mt-1">
                        <p>Steel-cut oatmeal with berries and walnuts</p>
                        <p className="mt-1 text-xs text-muted-foreground">High fiber, omega-3 fatty acids</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Lunch</div>
                      <div className="mt-1">
                        <p>Mediterranean salad with grilled chicken, olive oil & vinegar</p>
                        <p className="mt-1 text-xs text-muted-foreground">Lean protein, heart-healthy fats</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Dinner</div>
                      <div className="mt-1">
                        <p>Baked salmon with roasted vegetables and quinoa</p>
                        <p className="mt-1 text-xs text-muted-foreground">Omega-3 fatty acids, complete protein</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Snacks</div>
                      <div className="mt-1">
                        <p>Apple with almond butter, Greek yogurt with berries</p>
                        <p className="mt-1 text-xs text-muted-foreground">Balanced protein and fiber</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button variant="outline" className="w-full">View Recipes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Shopping List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm">
                      Based on your meal plan, we've generated a shopping list to make 
                      grocery shopping easier. Access it anytime on mobile.
                    </p>
                    <Button className="mt-4 w-full">Generate Shopping List</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="diabetes">
          <Card>
            <CardHeader>
              <CardTitle>Diabetes-Friendly Meal Planning</CardTitle>
              <CardDescription>
                Foods and meal plans to help manage blood glucose levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Nutrition Guidelines for Diabetes</h3>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-blue-700">•</span>
                      <span>Focus on consistent carbohydrate intake at each meal</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700">•</span>
                      <span>Choose high-fiber, low glycemic index carbohydrates</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700">•</span>
                      <span>Include lean protein with each meal to stabilize blood sugar</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700">•</span>
                      <span>Distribute carbohydrates throughout the day in smaller meals</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-700">•</span>
                      <span>Limit added sugars, refined grains, and processed foods</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">Diabetes-Friendly Meal Ideas</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Breakfast</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Greek yogurt with berries and nuts</li>
                        <li>• Veggie omelet with whole grain toast</li>
                        <li>• Overnight oats with cinnamon and apple</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Lunch</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Turkey and avocado lettuce wraps</li>
                        <li>• Quinoa salad with beans and veggies</li>
                        <li>• Lentil soup with side salad</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Dinner</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Baked fish with roasted vegetables</li>
                        <li>• Chicken stir-fry with brown rice</li>
                        <li>• Turkey chili with mixed beans</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Snacks</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Apple with almond butter</li>
                        <li>• Hummus with veggie sticks</li>
                        <li>• Small handful of nuts and seeds</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Desserts</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Chia seed pudding with berries</li>
                        <li>• Baked apple with cinnamon</li>
                        <li>• Greek yogurt with a drizzle of honey</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Beverages</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Infused water with cucumber or citrus</li>
                        <li>• Unsweetened tea or coffee</li>
                        <li>• Herbal teas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Weekly Diabetes-Friendly Meal Plan</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Get a personalized 7-day meal plan designed to help maintain stable blood sugar levels
                  </p>
                  <Button className="w-full">Generate Meal Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heart">
          <Card>
            <CardHeader>
              <CardTitle>Heart-Healthy Diet Plans</CardTitle>
              <CardDescription>
                Nutrition recommendations to support cardiovascular health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg bg-red-50 p-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <h3 className="font-medium">Heart-Healthy Eating Guidelines</h3>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-red-700">•</span>
                      <span>Limit sodium intake to less than 2,300mg per day</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700">•</span>
                      <span>Choose lean proteins and plant-based protein sources</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700">•</span>
                      <span>Increase consumption of fruits, vegetables, and whole grains</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700">•</span>
                      <span>Include foods rich in omega-3 fatty acids</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-700">•</span>
                      <span>Limit saturated and trans fats</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">Featured Heart-Healthy Diets</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="flex items-center gap-2 font-medium">
                        <Heart className="h-4 w-4 text-red-600" />
                        The DASH Diet
                      </h4>
                      <p className="mt-1 text-sm">
                        Dietary Approaches to Stop Hypertension - specifically designed to help lower blood pressure.
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md bg-slate-50 p-3">
                          <h5 className="text-sm font-medium">Focus On:</h5>
                          <ul className="mt-1 space-y-1 text-xs">
                            <li>• Fruits and vegetables</li>
                            <li>• Whole grains</li>
                            <li>• Low-fat dairy</li>
                            <li>• Lean proteins</li>
                          </ul>
                        </div>
                        <div className="rounded-md bg-slate-50 p-3">
                          <h5 className="text-sm font-medium">Limit:</h5>
                          <ul className="mt-1 space-y-1 text-xs">
                            <li>• Sodium</li>
                            <li>• Red meat</li>
                            <li>• Added sugars</li>
                            <li>• Processed foods</li>
                          </ul>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3">View DASH Diet Plan</Button>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="flex items-center gap-2 font-medium">
                        <Heart className="h-4 w-4 text-red-600" />
                        Mediterranean Diet
                      </h4>
                      <p className="mt-1 text-sm">
                        Inspired by traditional eating patterns in Mediterranean countries, known for heart health benefits.
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md bg-slate-50 p-3">
                          <h5 className="text-sm font-medium">Focus On:</h5>
                          <ul className="mt-1 space-y-1 text-xs">
                            <li>• Olive oil</li>
                            <li>• Fish and seafood</li>
                            <li>• Nuts and seeds</li>
                            <li>• Fresh produce</li>
                          </ul>
                        </div>
                        <div className="rounded-md bg-slate-50 p-3">
                          <h5 className="text-sm font-medium">Limit:</h5>
                          <ul className="mt-1 space-y-1 text-xs">
                            <li>• Red meat</li>
                            <li>• Processed foods</li>
                            <li>• Refined grains</li>
                            <li>• Added sugars</li>
                          </ul>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3">View Mediterranean Diet Plan</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Heart-Healthy Recipe Collection</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md bg-slate-50 p-3 text-center">
                      <div className="mb-2 font-medium">Breakfast</div>
                      <div className="text-xs">(12 recipes)</div>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3 text-center">
                      <div className="mb-2 font-medium">Main Dishes</div>
                      <div className="text-xs">(24 recipes)</div>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3 text-center">
                      <div className="mb-2 font-medium">Sides & Snacks</div>
                      <div className="text-xs">(18 recipes)</div>
                    </div>
                  </div>
                  <Button className="mt-4 w-full">Browse Recipe Collection</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracker">
          <Card>
            <CardHeader>
              <CardTitle>Calorie & Nutrition Tracker</CardTitle>
              <CardDescription>
                Track your daily intake and monitor nutritional balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-medium">Today's Summary</h3>
                  <div className="grid gap-4 sm:grid-cols-4">
                    <div className="space-y-1 rounded-lg border p-4 text-center">
                      <div className="text-sm text-muted-foreground">Calories</div>
                      <div className="text-2xl font-bold">1,240</div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                        <div className="h-1.5 rounded-full bg-green-500" style={{ width: '69%' }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground">of 1,800 goal</div>
                    </div>
                    
                    <div className="space-y-1 rounded-lg border p-4 text-center">
                      <div className="text-sm text-muted-foreground">Carbs</div>
                      <div className="text-2xl font-bold">142g</div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                        <div className="h-1.5 rounded-full bg-blue-500" style={{ width: '72%' }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground">of 200g goal</div>
                    </div>
                    
                    <div className="space-y-1 rounded-lg border p-4 text-center">
                      <div className="text-sm text-muted-foreground">Protein</div>
                      <div className="text-2xl font-bold">78g</div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                        <div className="h-1.5 rounded-full bg-purple-500" style={{ width: '87%' }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground">of 90g goal</div>
                    </div>
                    
                    <div className="space-y-1 rounded-lg border p-4 text-center">
                      <div className="text-sm text-muted-foreground">Fat</div>
                      <div className="text-2xl font-bold">42g</div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                        <div className="h-1.5 rounded-full bg-amber-500" style={{ width: '70%' }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground">of 60g goal</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <h3 className="font-medium">Today's Food Log</h3>
                  </div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-medium">Breakfast</div>
                        <div className="text-sm text-muted-foreground">Oatmeal with berries and walnuts</div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <Badge variant="outline">320 cal</Badge>
                          <Badge variant="outline">42g carbs</Badge>
                          <Badge variant="outline">12g protein</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-medium">Lunch</div>
                        <div className="text-sm text-muted-foreground">Grilled chicken salad with olive oil dressing</div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <Badge variant="outline">480 cal</Badge>
                          <Badge variant="outline">15g carbs</Badge>
                          <Badge variant="outline">38g protein</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-medium">Snack</div>
                        <div className="text-sm text-muted-foreground">Apple and Greek yogurt</div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <Badge variant="outline">180 cal</Badge>
                          <Badge variant="outline">25g carbs</Badge>
                          <Badge variant="outline">12g protein</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-medium">Dinner</div>
                        <div className="text-sm text-muted-foreground">Baked salmon with quinoa and vegetables</div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <Badge variant="outline">440 cal</Badge>
                          <Badge variant="outline">35g carbs</Badge>
                          <Badge variant="outline">32g protein</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                  </div>
                  <div className="flex justify-center p-4">
                    <Button>Add Food Item</Button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-medium">Key Nutrients</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Sodium</span>
                          <span className="text-amber-600">1,842mg</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                          <div className="h-1.5 rounded-full bg-amber-500" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Fiber</span>
                          <span className="text-green-600">24g</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                          <div className="h-1.5 rounded-full bg-green-500" style={{ width: '86%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Sugar</span>
                          <span className="text-red-600">32g</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                          <div className="h-1.5 rounded-full bg-red-500" style={{ width: '64%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Cholesterol</span>
                          <span className="text-green-600">120mg</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                          <div className="h-1.5 rounded-full bg-green-500" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-medium">Weekly Trends</h3>
                    <div className="h-[140px] w-full bg-slate-50 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Calorie intake chart would appear here</p>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">Your calorie intake this week is 8% lower than last week</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Detailed Nutrition Reports</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientNutrition;
