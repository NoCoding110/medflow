import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FlaskConical, Pill, Clock, Check, AlertTriangle, FileText, 
  RefreshCcw, Search, Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";

const LabPharmacyIntegration = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lab & Pharmacy Integration</h1>
          <p className="text-muted-foreground">
            Manage and monitor lab orders and pharmacy prescriptions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh Data
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Lab Orders
            </CardTitle>
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              8 pending results
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Lab Turnaround
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 hours</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↓11%</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pharmacy Orders
            </CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57</div>
            <p className="text-xs text-muted-foreground">
              13 new today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">3</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Laboratory Orders</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search lab orders..." className="pl-8 w-full" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
              <select className="rounded-md border bg-background px-3 py-1 text-sm h-9">
                <option>All statuses</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Delayed</option>
              </select>
            </div>
          </div>
          <Card>
            <div className="rounded-md">
              <table className="w-full">
                <thead className="border-b bg-muted/50 text-xs font-medium">
                  <tr>
                    <th className="px-4 py-3 text-left">Order ID</th>
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Test Type</th>
                    <th className="px-4 py-3 text-left">Ordered By</th>
                    <th className="px-4 py-3 text-left">Lab Partner</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">ETA</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">LAB-7842</td>
                    <td className="px-4 py-3">John Smith</td>
                    <td className="px-4 py-3 text-sm">CBC with Differential</td>
                    <td className="px-4 py-3 text-sm">Dr. Wilson</td>
                    <td className="px-4 py-3 text-sm">LabCorp</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">In Progress</span>
                    </td>
                    <td className="px-4 py-3 text-sm">2 hours</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">LAB-7838</td>
                    <td className="px-4 py-3">Sarah Johnson</td>
                    <td className="px-4 py-3 text-sm">COVID-19 PCR</td>
                    <td className="px-4 py-3 text-sm">Dr. Martinez</td>
                    <td className="px-4 py-3 text-sm">Quest Diagnostics</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">Pending</span>
                    </td>
                    <td className="px-4 py-3 text-sm">4 hours</td>
                  </tr>
                  <tr className="hover:bg-muted/50 bg-red-50">
                    <td className="px-4 py-3 text-sm">LAB-7830</td>
                    <td className="px-4 py-3">Robert Chen</td>
                    <td className="px-4 py-3 text-sm">Metabolic Panel</td>
                    <td className="px-4 py-3 text-sm">Dr. Johnson</td>
                    <td className="px-4 py-3 text-sm">LabCorp</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">Delayed</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-red-600">Overdue (6+ hours)</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">LAB-7824</td>
                    <td className="px-4 py-3">Emma Wilson</td>
                    <td className="px-4 py-3 text-sm">Lipid Panel</td>
                    <td className="px-4 py-3 text-sm">Dr. Patel</td>
                    <td className="px-4 py-3 text-sm">Quest Diagnostics</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">Completed</span>
                    </td>
                    <td className="px-4 py-3 text-sm">--</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Pharmacy Orders</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search prescriptions..." className="pl-8 w-full" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
            <select className="rounded-md border bg-background px-3 py-1 text-sm h-9">
              <option>All pharmacies</option>
              <option>Internal</option>
              <option>CVS</option>
              <option>Walgreens</option>
            </select>
          </div>
        </div>
        <Card>
          <div className="rounded-md">
            <table className="w-full">
              <thead className="border-b bg-muted/50 text-xs font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Rx ID</th>
                  <th className="px-4 py-3 text-left">Patient</th>
                  <th className="px-4 py-3 text-left">Medication</th>
                  <th className="px-4 py-3 text-left">Prescribed By</th>
                  <th className="px-4 py-3 text-left">Pharmacy</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">RX-29845</td>
                  <td className="px-4 py-3">Michael Davis</td>
                  <td className="px-4 py-3 text-sm">Amoxicillin 500mg</td>
                  <td className="px-4 py-3 text-sm">Dr. Wilson</td>
                  <td className="px-4 py-3 text-sm">CVS Pharmacy</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">Filled</span>
                  </td>
                  <td className="px-4 py-3 text-sm">05/03/2024</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">RX-29844</td>
                  <td className="px-4 py-3">Lisa Garcia</td>
                  <td className="px-4 py-3 text-sm">Lisinopril 10mg</td>
                  <td className="px-4 py-3 text-sm">Dr. Taylor</td>
                  <td className="px-4 py-3 text-sm">Walgreens</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">Processing</span>
                  </td>
                  <td className="px-4 py-3 text-sm">05/03/2024</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">RX-29840</td>
                  <td className="px-4 py-3">David Brown</td>
                  <td className="px-4 py-3 text-sm">Albuterol Inhaler</td>
                  <td className="px-4 py-3 text-sm">Dr. Martinez</td>
                  <td className="px-4 py-3 text-sm">In-house Pharmacy</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">Ready for Pickup</span>
                  </td>
                  <td className="px-4 py-3 text-sm">05/02/2024</td>
                </tr>
                <tr className="hover:bg-muted/50 bg-amber-50">
                  <td className="px-4 py-3 text-sm">RX-29832</td>
                  <td className="px-4 py-3">Jennifer Miller</td>
                  <td className="px-4 py-3 text-sm">Hydrocodone 5-325mg</td>
                  <td className="px-4 py-3 text-sm">Dr. Wilson</td>
                  <td className="px-4 py-3 text-sm">CVS Pharmacy</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">Prior Auth Required</span>
                  </td>
                  <td className="px-4 py-3 text-sm">05/02/2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
        <div className="space-y-4">
          <div className="rounded-md border border-red-200 bg-red-50 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="font-medium text-red-800">Critical Alert</h3>
            </div>
            <p className="mt-1 text-sm text-red-700">
              LabCorp connection showing intermittent failures. 3 lab results may be delayed.
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              View Details
            </Button>
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="font-medium text-amber-800">Pharmacy Alert</h3>
            </div>
            <p className="mt-1 text-sm text-amber-700">
              Low inventory alert: Albuterol inhalers (5 units remaining)
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Order Supplies
            </Button>
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="font-medium text-amber-800">Turnaround Time Alert</h3>
            </div>
            <p className="mt-1 text-sm text-amber-700">
              CBC panel results for patient Robert Chen are delayed beyond SLA (6+ hours)
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Contact Lab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabPharmacyIntegration;
