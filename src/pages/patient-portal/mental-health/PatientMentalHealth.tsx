
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const PatientMentalHealth = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Mental Health Resources</h1>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Wellness Check</CardTitle>
            <CardDescription>
              Regular check-ins help us provide personalized mental health support
            </CardDescription>
          </CardHeader>
          {submitted ? (
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
            {!submitted && (
              <Button onClick={handleSubmit} className="w-full">Submit Check-In</Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Mental Wellness</CardTitle>
            <CardDescription>
              Track your mental wellness over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Stress Level</span>
                  <span className="text-sm text-amber-600">Moderate</span>
                </div>
                <Progress value={55} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Sleep Quality</span>
                  <span className="text-sm text-green-600">Good</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Mood</span>
                  <span className="text-sm text-green-600">Positive</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Meditation Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access guided meditation sessions designed to reduce stress and improve mental well-being.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Explore Sessions</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Therapy Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect with licensed therapists through our telehealth service or find in-network providers.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Find Therapists</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Self-Help Library</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Articles, videos, and interactive tools to support your mental health journey.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Browse Library</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PatientMentalHealth;
