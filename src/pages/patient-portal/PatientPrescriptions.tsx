
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const PatientPrescriptions = () => {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
        <p className="text-muted-foreground">
          Manage your medications and request refills
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="bg-green-50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Pill className="h-5 w-5 text-green-600" />
                <span>Lisinopril 10mg</span>
              </CardTitle>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Instructions:</span>
                <span>1 tablet daily</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Prescribed by:</span>
                <span>Dr. Michael Chen</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date prescribed:</span>
                <span>November 10, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last refill:</span>
                <span>February 15, 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Refills remaining:</span>
                <span>3 of 6</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Supply remaining:</span>
                  <span>24 days</span>
                </div>
                <Progress value={80} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <Button className="w-full gap-1.5">
              <RefreshCw className="h-4 w-4" /> Request Refill
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="bg-green-50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Pill className="h-5 w-5 text-green-600" />
                <span>Atorvastatin 20mg</span>
              </CardTitle>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Instructions:</span>
                <span>1 tablet at bedtime</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Prescribed by:</span>
                <span>Dr. Michael Chen</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date prescribed:</span>
                <span>November 10, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last refill:</span>
                <span>February 15, 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Refills remaining:</span>
                <span>2 of 6</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Supply remaining:</span>
                  <span>18 days</span>
                </div>
                <Progress value={60} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <Button className="w-full gap-1.5">
              <RefreshCw className="h-4 w-4" /> Request Refill
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="bg-gray-50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Pill className="h-5 w-5 text-gray-500" />
                <span>Amoxicillin 500mg</span>
              </CardTitle>
              <Badge variant="outline">Completed</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Instructions:</span>
                <span>1 capsule 3 times daily for 7 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Prescribed by:</span>
                <span>Dr. Sarah Johnson</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date prescribed:</span>
                <span>July 15, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Reason:</span>
                <span>Sinus infection</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientPrescriptions;
