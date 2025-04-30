
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, Clock, User, Users, Calendar, RefreshCcw,
  TrendingDown, TrendingUp, AlertTriangle
} from "lucide-react";

const PatientFlow = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Flow Optimization</h1>
          <p className="text-muted-foreground">
            Analyze and improve patient check-in to check-out experience
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Change Date
          </Button>
          <Button className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Patient Volume
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑12%</span> from average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Wait Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↓3 min</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Visit Duration
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36 min</div>
            <p className="text-xs text-muted-foreground">
              Per patient appointment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Patients in Clinic Now
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">
              4 in waiting room
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Patient Flow Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="mx-auto max-w-4xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-center">
                    <div className="rounded-md bg-blue-100 p-4">
                      <h3 className="font-medium text-blue-800">Check-in</h3>
                      <div className="mt-1 text-2xl font-bold text-blue-900">3</div>
                      <p className="text-xs text-blue-700">patients</p>
                    </div>
                  </div>
                  <div className="w-12 border-t-2 border-dashed border-muted-foreground"></div>
                  <div className="flex-1 text-center">
                    <div className="rounded-md bg-amber-100 p-4">
                      <h3 className="font-medium text-amber-800">Waiting Room</h3>
                      <div className="mt-1 text-2xl font-bold text-amber-900">4</div>
                      <p className="text-xs text-amber-700">patients (11 min avg.)</p>
                    </div>
                  </div>
                  <div className="w-12 border-t-2 border-dashed border-muted-foreground"></div>
                  <div className="flex-1 text-center">
                    <div className="rounded-md bg-purple-100 p-4">
                      <h3 className="font-medium text-purple-800">Exam Room</h3>
                      <div className="mt-1 text-2xl font-bold text-purple-900">7</div>
                      <p className="text-xs text-purple-700">patients</p>
                    </div>
                  </div>
                  <div className="w-12 border-t-2 border-dashed border-muted-foreground"></div>
                  <div className="flex-1 text-center">
                    <div className="rounded-md bg-green-100 p-4">
                      <h3 className="font-medium text-green-800">Check-out</h3>
                      <div className="mt-1 text-2xl font-bold text-green-900">2</div>
                      <p className="text-xs text-green-700">patients</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button variant="outline" size="sm">View Details</Button>
                <div className="text-xs text-muted-foreground">Last updated: Just now</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Flow Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50 text-xs font-medium">
                  <tr>
                    <th className="px-4 py-3 text-left">Stage</th>
                    <th className="px-4 py-3 text-center">Count</th>
                    <th className="px-4 py-3 text-center">Target Time</th>
                    <th className="px-4 py-3 text-center">Current Avg. Time</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-left">Bottleneck?</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Check-in Process</td>
                    <td className="px-4 py-3 text-center">3</td>
                    <td className="px-4 py-3 text-center">5 min</td>
                    <td className="px-4 py-3 text-center">4 min</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <TrendingDown className="mr-1 h-3 w-3" />
                        On Target
                      </div>
                    </td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Waiting Room</td>
                    <td className="px-4 py-3 text-center">4</td>
                    <td className="px-4 py-3 text-center">10 min</td>
                    <td className="px-4 py-3 text-center">11 min</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Slight Delay
                      </div>
                    </td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr className="hover:bg-muted/50 bg-red-50">
                    <td className="px-4 py-3 font-medium">Vitals & Prep</td>
                    <td className="px-4 py-3 text-center">2</td>
                    <td className="px-4 py-3 text-center">5 min</td>
                    <td className="px-4 py-3 text-center">9 min</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Delayed
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-red-600">Yes</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Provider Visit</td>
                    <td className="px-4 py-3 text-center">5</td>
                    <td className="px-4 py-3 text-center">15 min</td>
                    <td className="px-4 py-3 text-center">16 min</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Slight Delay
                      </div>
                    </td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">Check-out</td>
                    <td className="px-4 py-3 text-center">2</td>
                    <td className="px-4 py-3 text-center">5 min</td>
                    <td className="px-4 py-3 text-center">4 min</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <TrendingDown className="mr-1 h-3 w-3" />
                        On Target
                      </div>
                    </td>
                    <td className="px-4 py-3">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Patient Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <Activity className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Patient Volume by Hour</p>
                <p className="text-xs text-muted-foreground">
                  Showing check-ins per hour throughout the day
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Peak hours: 9-11 AM, 1-3 PM</span>
                <span className="font-medium">14 patients/hour max</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flow Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-medium text-red-800">Vitals & Prep Bottleneck</h3>
                </div>
                <p className="mt-1 text-sm text-red-700">
                  Consider adding an additional medical assistant from 10 AM - 2 PM to help with patient prep. This could reduce waiting time by up to 4 minutes per patient.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Implement Suggestion
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Schedule Optimization</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Appointments for patients with complex conditions should be scheduled during lower-volume hours (before 9 AM or after 3 PM).
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Review Schedule Template
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Digital Check-in Expansion</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Increase digital check-in adoption from current 42% to target 75% to reduce front desk congestion.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Promote Digital Check-in
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientFlow;
