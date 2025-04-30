
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, Calendar, Phone, Mail, RefreshCcw, 
  Clock, Users, PieChart, BarChart2
} from "lucide-react";

const NoShowPrediction = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">No-Show Prediction</h1>
          <p className="text-muted-foreground">
            AI-powered prediction of patients likely to miss appointments
          </p>
        </div>
        <Button className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Refresh Predictions
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              Across all providers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted No-Shows
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">14.3%</span> of appointments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High-Risk Appointments
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">3</div>
            <p className="text-xs text-muted-foreground">
              &gt;70% probability of no-show
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reminder Effectiveness
            </CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑8%</span> with extra reminders
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>High-Risk Appointments (Today)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="border-b bg-muted/50 text-xs font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Patient</th>
                  <th className="px-4 py-3 text-left">Appointment Time</th>
                  <th className="px-4 py-3 text-left">Provider</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-center">Risk Score</th>
                  <th className="px-4 py-3 text-left">Risk Factors</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3">Robert Johnson</td>
                  <td className="px-4 py-3 text-sm">10:30 AM</td>
                  <td className="px-4 py-3 text-sm">Dr. Wilson</td>
                  <td className="px-4 py-3 text-sm">Follow-up</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      85%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">Previous no-shows (2), Weather</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Phone className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Mail className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3">Sarah Miller</td>
                  <td className="px-4 py-3 text-sm">1:15 PM</td>
                  <td className="px-4 py-3 text-sm">Dr. Martinez</td>
                  <td className="px-4 py-3 text-sm">Annual Checkup</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      78%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">Transportation issues, Far distance</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Phone className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Mail className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3">Michael Chen</td>
                  <td className="px-4 py-3 text-sm">3:30 PM</td>
                  <td className="px-4 py-3 text-sm">Dr. Taylor</td>
                  <td className="px-4 py-3 text-sm">Consultation</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      75%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">New patient, Late afternoon</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Phone className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Mail className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>No-Show Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <BarChart2 className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Risk Factor Distribution</p>
                <p className="text-xs text-muted-foreground">
                  Showing contribution of each factor to no-show probability
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Previous no-show history</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Appointment time (late afternoon)</span>
                <span className="text-sm font-medium">24%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weather conditions</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Distance from clinic</span>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">New patient status</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Other factors</span>
                <span className="text-sm font-medium">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mitigation Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <Phone className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Extra Reminder Calls</h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule additional phone reminder 2 hours before appointment for high-risk patients
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <Button variant="outline" size="sm">Apply to Selected</Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <Clock className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Strategic Overbooking</h3>
                    <p className="text-sm text-muted-foreground">
                      Consider double-booking specific time slots with high no-show risks
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <Button variant="outline" size="sm">View Recommendations</Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2">
                    <Users className="h-4 w-4 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telehealth Options</h3>
                    <p className="text-sm text-muted-foreground">
                      Offer telehealth alternatives to patients with transportation barriers
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <Button variant="outline" size="sm">Switch to Telehealth</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>No-Show Trends</CardTitle>
              <div>
                <Button variant="outline" size="sm">Weekly</Button>
                <Button variant="ghost" size="sm">Monthly</Button>
                <Button variant="ghost" size="sm">Quarterly</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">No-Show Trend Visualization</p>
                <p className="text-xs text-muted-foreground">
                  Showing historical no-show rates and intervention effectiveness
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-md bg-muted p-3">
                <div className="text-2xl font-bold">14.3%</div>
                <p className="text-xs text-muted-foreground">Current no-show rate</p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <div className="text-2xl font-bold text-green-600">-3.2%</div>
                <p className="text-xs text-muted-foreground">YoY improvement</p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <div className="text-2xl font-bold">$42,500</div>
                <p className="text-xs text-muted-foreground">Revenue protected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NoShowPrediction;
