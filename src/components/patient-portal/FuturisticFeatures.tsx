
import React, { useState } from "react";
import { Heart, Thermometer, Video, Users, Headphones } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function FuturisticFeatures() {
  const [mentalHealthSubmitted, setMentalHealthSubmitted] = useState(false);

  const handleMentalHealthSubmit = () => {
    setMentalHealthSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">AI Health Insights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <span>Risk Assessment</span>
              </CardTitle>
              <CardDescription>AI-powered health risk prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Diabetes Risk</span>
                    <span className="text-sm text-green-600">Low</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Heart Disease Risk</span>
                    <span className="text-sm text-amber-600">Moderate</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Hypertension Risk</span>
                    <span className="text-sm text-green-600">Low</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Based on your medical history, lifestyle data, and family history
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Detailed Analysis</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <span>Mental Health Check-In</span>
              </CardTitle>
              <CardDescription>Weekly mood and mental wellness tracking</CardDescription>
            </CardHeader>
            {mentalHealthSubmitted ? (
              <CardContent>
                <div className="py-6 text-center">
                  <Heart className="mx-auto h-12 w-12 text-green-500 mb-2" />
                  <h3 className="text-lg font-medium">Thank you for your check-in</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your mental health is important to us. We'll provide personalized resources 
                    based on your responses.
                  </p>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">Over the past week, how often have you felt:</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Little interest or pleasure in doing things?</p>
                      <RadioGroup defaultValue="not-at-all" className="flex space-x-2">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="not-at-all" id="not-at-all" />
                          <Label htmlFor="not-at-all" className="text-xs">Not at all</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="several-days" id="several-days" />
                          <Label htmlFor="several-days" className="text-xs">Several days</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="more-than-half" id="more-than-half" />
                          <Label htmlFor="more-than-half" className="text-xs">More than half</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Feeling down, depressed, or hopeless?</p>
                      <RadioGroup defaultValue="not-at-all" className="flex space-x-2">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="not-at-all" id="not-at-all-2" />
                          <Label htmlFor="not-at-all-2" className="text-xs">Not at all</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="several-days" id="several-days-2" />
                          <Label htmlFor="several-days-2" className="text-xs">Several days</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="more-than-half" id="more-than-half-2" />
                          <Label htmlFor="more-than-half-2" className="text-xs">More than half</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
            <CardFooter>
              {!mentalHealthSubmitted && (
                <Button onClick={handleMentalHealthSubmit} className="w-full">Submit Check-In</Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Advanced Care Features</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Video className="h-5 w-5 text-blue-500" />
                <span>Telehealth</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect with your healthcare provider through secure video consultations right from the portal.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Schedule Virtual Visit</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-green-500" />
                <span>Family Accounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your family members' health information under one secure account.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Manage Family</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Headphones className="h-5 w-5 text-purple-500" />
                <span>Voice Commands</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Navigate the portal hands-free using voice commands compatible with smart assistants.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Setup Voice Assistant</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
