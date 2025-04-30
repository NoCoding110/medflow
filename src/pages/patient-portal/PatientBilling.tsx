
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

const PatientBilling = () => {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Insurance</h1>
        <p className="text-muted-foreground">
          Manage your bills, payments, and insurance information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid gap-1">
                <div className="text-sm font-medium text-muted-foreground">Provider</div>
                <div>Blue Cross Blue Shield</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium text-muted-foreground">Policy Number</div>
                <div>XYZ12345678</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium text-muted-foreground">Group Number</div>
                <div>GRP987654</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium text-muted-foreground">Coverage</div>
                <div>Primary</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium text-muted-foreground">Member Since</div>
                <div>January 1, 2024</div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline">Update Insurance Information</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coverage Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Deductible</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    $750 of $1,000 met
                  </div>
                  <div className="text-sm">$250 remaining</div>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div className="h-full w-3/4 rounded-full bg-blue-500"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Out-of-Pocket Maximum</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    $2,500 of $5,000 met
                  </div>
                  <div className="text-sm">$2,500 remaining</div>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div className="h-full w-1/2 rounded-full bg-blue-500"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Primary Care Visit</div>
                <div className="text-sm">$25 copay</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Specialist Visit</div>
                <div className="text-sm">$50 copay</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Prescription Coverage</div>
                <div className="text-sm">Tier 1: $10 / Tier 2: $30 / Tier 3: $50</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">Annual Physical</div>
                    <div className="text-sm text-muted-foreground">
                      February 15, 2025 • Dr. Sarah Johnson
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge>Paid</Badge>
                    <div className="font-medium">$25.00</div>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Download className="h-4 w-4" /> Receipt
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">Cardiology Consultation</div>
                    <div className="text-sm text-muted-foreground">
                      November 10, 2024 • Dr. Michael Chen
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-amber-500">Pending</Badge>
                    <div className="font-medium">$50.00</div>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">Blood Work</div>
                    <div className="text-sm text-muted-foreground">
                      August 5, 2024 • MedFlow Laboratory
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge>Paid</Badge>
                    <div className="font-medium">$15.00</div>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Download className="h-4 w-4" /> Receipt
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientBilling;
