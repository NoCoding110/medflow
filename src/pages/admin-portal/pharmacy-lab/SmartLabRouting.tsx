import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FlaskConical, Search, Filter, RefreshCcw, Clock, 
  DollarSign, TrendingUp, AlertTriangle
} from "lucide-react";
import { Input } from "@/components/ui/input";

const SmartLabRouting = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Lab Routing</h1>
          <p className="text-muted-foreground">
            Optimize lab orders based on turnaround time and insurance contracts
          </p>
        </div>
        <Button className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Lab Orders
            </CardTitle>
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Turnaround Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 hours</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↓8%</span> with optimal routing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cost Savings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,240</div>
            <p className="text-xs text-muted-foreground">
              This month through smart routing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Network Utilization
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">
              Of lab orders using preferred providers
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Lab Network Partners</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search labs..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
              <select className="rounded-md border bg-transparent px-3 py-1 h-9">
                <option value="all">All Partners</option>
                <option value="preferred">Preferred</option>
                <option value="specialty">Specialty</option>
                <option value="urgent">Stat/Urgent</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="border-b bg-muted/50 text-xs font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Lab Partner</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Avg. Turnaround</th>
                  <th className="px-4 py-3 text-center">Cost Index</th>
                  <th className="px-4 py-3 text-center">Quality Score</th>
                  <th className="px-4 py-3 text-left">Specialties</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="font-medium">LabCorp</div>
                    <div className="text-xs text-muted-foreground">ID: LC-001</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                      Preferred
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">2.8 hours</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-muted" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">4.8/5</td>
                  <td className="px-4 py-3 text-sm">General, Hematology, Chemistry</td>
                  <td className="px-4 py-3 text-center">
                    <Button size="sm" variant="outline">View Details</Button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="font-medium">Quest Diagnostics</div>
                    <div className="text-xs text-muted-foreground">ID: QD-002</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                      Preferred
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">3.1 hours</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-muted" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">4.6/5</td>
                  <td className="px-4 py-3 text-sm">General, Microbiology, Toxicology</td>
                  <td className="px-4 py-3 text-center">
                    <Button size="sm" variant="outline">View Details</Button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="font-medium">Specialty Diagnostics</div>
                    <div className="text-xs text-muted-foreground">ID: SD-003</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                      Specialty
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">4.5 hours</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-amber-500" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">4.9/5</td>
                  <td className="px-4 py-3 text-sm">Genetic, Oncology, Rare Disease</td>
                  <td className="px-4 py-3 text-center">
                    <Button size="sm" variant="outline">View Details</Button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="font-medium">Rapid Results Labs</div>
                    <div className="text-xs text-muted-foreground">ID: RR-004</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800">
                      Urgent
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">1.2 hours</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-amber-500" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">4.5/5</td>
                  <td className="px-4 py-3 text-sm">STAT, Emergent Care, Critical Values</td>
                  <td className="px-4 py-3 text-center">
                    <Button size="sm" variant="outline">View Details</Button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50 bg-amber-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">Value Labs, Inc.</div>
                    <div className="text-xs text-muted-foreground">ID: VL-005</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">
                      Warning
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">5.4 hours</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-amber-500" />
                      <DollarSign className="h-4 w-4 text-muted" />
                      <DollarSign className="h-4 w-4 text-muted" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">3.8/5</td>
                  <td className="px-4 py-3 text-sm">General, Basic Chemistry</td>
                  <td className="px-4 py-3 text-center">
                    <Button size="sm" variant="outline">View Details</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Smart Routing Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-green-200 bg-green-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-green-800">CBC Panels</h3>
                  <span className="rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-800">High Volume</span>
                </div>
                <p className="mt-1 text-sm text-green-700">
                  Route to LabCorp for optimal cost-effectiveness (saves $8/test)
                </p>
                <div className="mt-2 flex items-center text-xs text-green-700">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Average turnaround: 2.8 hours</span>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Set as Default
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Metabolic Panels</h3>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">Medium Volume</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Split between LabCorp (weekdays) and Quest (weekends) for optimal turnaround
                </p>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Average turnaround: 3.0 hours</span>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Set as Default
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Genetic Testing</h3>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">Low Volume</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use Specialty Diagnostics exclusively for highest quality results
                </p>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Average turnaround: 4.5 hours (24-48h for complex panels)</span>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Set as Default
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lab Routing Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-medium text-red-800">Value Labs Performance Issue</h3>
                </div>
                <p className="mt-1 text-sm text-red-700">
                  Turnaround times have increased by 22% in the past week. Consider temporarily routing general chemistry tests to alternate providers.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Apply Temporary Routing
                </Button>
              </div>
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium text-amber-800">Insurance Coverage Update</h3>
                </div>
                <p className="mt-1 text-sm text-amber-700">
                  BlueShield has updated their lab network. Specialty Diagnostics now requires prior authorization for genetic panels.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Update Routing Rules
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Holiday Schedule</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Plan for the upcoming holiday weekend (May 25-27). Rapid Results Labs will be the only partner with normal operations.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Holiday Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lab Test Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Bundled Test Recommendations</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Consider updating your order sets to take advantage of bundled pricing for commonly ordered combinations:
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm">
                  <span>CBC + CMP + Lipid Panel</span>
                  <span className="font-medium text-green-600">Save $22/patient</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm">
                  <span>Thyroid Panel + Vitamin D</span>
                  <span className="font-medium text-green-600">Save $18/patient</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm">
                  <span>Hemoglobin A1C + Lipid Panel</span>
                  <span className="font-medium text-green-600">Save $15/patient</span>
                </div>
              </div>
              <Button className="mt-3">
                Update Order Sets
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartLabRouting;
