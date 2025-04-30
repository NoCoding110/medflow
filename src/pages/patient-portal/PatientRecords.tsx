
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const PatientRecords = () => {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
        <p className="text-muted-foreground">
          View and download your complete medical history
        </p>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="immunizations">Immunizations</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical History Timeline</CardTitle>
              <CardDescription>
                View your complete medical history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative border-l border-gray-200 pl-6">
                  <div className="absolute left-0 -ml-1 h-2 w-2 rounded-full bg-blue-600"></div>
                  <div className="mb-1 text-sm font-medium text-blue-600">Feb 15, 2025</div>
                  <div className="mb-1 font-semibold">Annual Physical Examination</div>
                  <div className="text-sm text-muted-foreground">
                    Dr. Sarah Johnson • MedFlow Primary Care
                  </div>
                  <div className="mt-2 text-sm">
                    <p>
                      Blood pressure 120/80, Heart rate 72 bpm, Weight 165 lbs.
                      All lab results within normal range. Recommended to maintain
                      current medication regimen and follow up in 3 months.
                    </p>
                  </div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <FileText className="h-4 w-4" /> View Full Report
                    </Button>
                  </div>
                </div>

                <div className="relative border-l border-gray-200 pl-6">
                  <div className="absolute left-0 -ml-1 h-2 w-2 rounded-full bg-blue-600"></div>
                  <div className="mb-1 text-sm font-medium text-blue-600">Nov 10, 2024</div>
                  <div className="mb-1 font-semibold">Cardiology Consultation</div>
                  <div className="text-sm text-muted-foreground">
                    Dr. Michael Chen • MedFlow Cardiology
                  </div>
                  <div className="mt-2 text-sm">
                    <p>
                      Patient presented with concerns about chest discomfort.
                      ECG normal, stress test completed. Recommended low-sodium diet and prescribed
                      Lisinopril 10mg daily for mild hypertension.
                    </p>
                  </div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <FileText className="h-4 w-4" /> View Full Report
                    </Button>
                  </div>
                </div>

                <div className="relative border-l border-gray-200 pl-6">
                  <div className="absolute left-0 -ml-1 h-2 w-2 rounded-full bg-blue-600"></div>
                  <div className="mb-1 text-sm font-medium text-blue-600">Aug 5, 2024</div>
                  <div className="mb-1 font-semibold">Blood Work</div>
                  <div className="text-sm text-muted-foreground">
                    Lab Tech Jane Doe • MedFlow Laboratory
                  </div>
                  <div className="mt-2 text-sm">
                    <p>
                      Routine blood work completed. Cholesterol slightly elevated.
                      Recommended dietary changes and follow up in 3 months.
                    </p>
                  </div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <FileText className="h-4 w-4" /> View Full Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lab Results</CardTitle>
              <CardDescription>
                View and download your lab test results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Complete Blood Count (CBC)</div>
                      <div className="text-sm text-muted-foreground">
                        February 15, 2025 • Dr. Sarah Johnson
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Lipid Panel</div>
                      <div className="text-sm text-muted-foreground">
                        February 15, 2025 • Dr. Sarah Johnson
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Comprehensive Metabolic Panel</div>
                      <div className="text-sm text-muted-foreground">
                        August 5, 2024 • Lab Tech Jane Doe
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Imaging Reports</CardTitle>
              <CardDescription>View and download your imaging studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Chest X-Ray</div>
                      <div className="text-sm text-muted-foreground">
                        November 10, 2024 • Dr. Michael Chen
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="immunizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Immunization Records</CardTitle>
              <CardDescription>
                View your vaccination history and upcoming recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="font-medium">Influenza Vaccine</div>
                  <div className="text-sm text-muted-foreground">
                    September 15, 2024 • MedFlow Clinic
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="font-medium">COVID-19 Booster</div>
                  <div className="text-sm text-muted-foreground">
                    January 10, 2024 • MedFlow Clinic
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="font-medium">Tetanus Booster (Td)</div>
                  <div className="text-sm text-muted-foreground">
                    June 5, 2022 • MedFlow Clinic
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientRecords;
