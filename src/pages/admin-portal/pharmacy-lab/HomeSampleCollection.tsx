
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, MapPin, Clock, Calendar, Search, 
  Filter, RefreshCcw, Truck, User, Check, X
} from "lucide-react";
import { Input } from "@/components/ui/input";

const HomeSampleCollection = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home Sample Collection</h1>
          <p className="text-muted-foreground">
            Schedule and track phlebotomist home visits for sample collection
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule View
          </Button>
          <Button className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh Status
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Home Collections
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">
              7 completed, 5 in progress, 2 pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Collection Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 min</div>
            <p className="text-xs text-muted-foreground">
              Per home visit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Phlebotomists
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              On duty today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Patient Satisfaction
            </CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9/5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑0.2</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Active Home Collection Visits</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search patients..." className="pl-8 w-full sm:w-[250px]" />
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
                <select className="rounded-md border bg-transparent px-3 py-1 h-9">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead className="border-b bg-muted/50 text-xs font-medium">
                  <tr>
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Time</th>
                    <th className="px-4 py-3 text-left">Tests</th>
                    <th className="px-4 py-3 text-left">Address</th>
                    <th className="px-4 py-3 text-left">Phlebotomist</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-xs text-muted-foreground">ID: P-23456</div>
                    </td>
                    <td className="px-4 py-3 text-sm">9:00 AM</td>
                    <td className="px-4 py-3 text-sm">CBC, Metabolic Panel</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>123 Main St, Apt 4B</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Maria Garcia</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">Robert Chen</div>
                      <div className="text-xs text-muted-foreground">ID: P-34567</div>
                    </td>
                    <td className="px-4 py-3 text-sm">10:30 AM</td>
                    <td className="px-4 py-3 text-sm">Lipid Panel, A1C</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>456 Oak Ave</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">James Wilson</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50 bg-blue-50">
                    <td className="px-4 py-3">
                      <div className="font-medium">Michael Davis</div>
                      <div className="text-xs text-muted-foreground">ID: P-45678</div>
                    </td>
                    <td className="px-4 py-3 text-sm">11:45 AM</td>
                    <td className="px-4 py-3 text-sm">CBC, Coagulation Panel</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>789 Pine Ln</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">David Martinez</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Button size="sm">Track</Button>
                        <Button variant="outline" size="sm">Call</Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50 bg-blue-50">
                    <td className="px-4 py-3">
                      <div className="font-medium">Jennifer Miller</div>
                      <div className="text-xs text-muted-foreground">ID: P-56789</div>
                    </td>
                    <td className="px-4 py-3 text-sm">1:15 PM</td>
                    <td className="px-4 py-3 text-sm">Vitamin Panel, TSH</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>234 Maple Dr</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">Maria Garcia</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Button size="sm">Track</Button>
                        <Button variant="outline" size="sm">Call</Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">David Brown</div>
                      <div className="text-xs text-muted-foreground">ID: P-67890</div>
                    </td>
                    <td className="px-4 py-3 text-sm">3:00 PM</td>
                    <td className="px-4 py-3 text-sm">CBC, Chemistry Panel</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>567 Cedar St</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">James Wilson</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button variant="outline" size="sm">Reschedule</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Tracking Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Live Phlebotomist Tracking Map</p>
                <p className="text-xs text-muted-foreground">
                  Showing real-time location of mobile phlebotomists
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Maria Garcia</span>
                </div>
                <span className="text-xs text-muted-foreground">En route to next patient (2.3 miles away)</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">James Wilson</span>
                </div>
                <span className="text-xs text-muted-foreground">Currently with patient</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm">David Martinez</span>
                </div>
                <span className="text-xs text-muted-foreground">Currently with patient</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span className="text-sm">Emily Johnson</span>
                </div>
                <span className="text-xs text-muted-foreground">Returning to lab</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span className="text-sm">Alex Rodriguez</span>
                </div>
                <span className="text-xs text-muted-foreground">On break (returns at 2:30 PM)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sample Collection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-3 text-sm font-medium">Today's Collections</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span>Completed</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span>In Progress</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "36%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span>Pending</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "14%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-sm font-medium">Sample Types Collected Today</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border p-3 text-center">
                    <div className="font-medium">18</div>
                    <p className="text-xs text-muted-foreground">Blood Samples</p>
                  </div>
                  <div className="rounded-md border p-3 text-center">
                    <div className="font-medium">5</div>
                    <p className="text-xs text-muted-foreground">Urine Samples</p>
                  </div>
                  <div className="rounded-md border p-3 text-center">
                    <div className="font-medium">2</div>
                    <p className="text-xs text-muted-foreground">Throat Cultures</p>
                  </div>
                  <div className="rounded-md border p-3 text-center">
                    <div className="font-medium">1</div>
                    <p className="text-xs text-muted-foreground">Other Samples</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Quality Metrics</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Sample rejection rate</span>
                    <div className="flex items-center">
                      <span className="font-medium text-green-600">0.5%</span>
                      <span className="text-xs text-muted-foreground ml-1">(very low)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Timely collection rate</span>
                    <div className="flex items-center">
                      <span className="font-medium text-green-600">98.2%</span>
                      <span className="text-xs text-muted-foreground ml-1">(excellent)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>First-attempt success</span>
                    <div className="flex items-center">
                      <span className="font-medium text-green-600">94.7%</span>
                      <span className="text-xs text-muted-foreground ml-1">(very good)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Schedule New Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Patient</label>
                <select className="rounded-md border bg-background px-3 py-2 text-sm">
                  <option>Select patient</option>
                  <option>Emily Wilson</option>
                  <option>John Smith</option>
                  <option>Lisa Garcia</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Sample Type</label>
                <select className="rounded-md border bg-background px-3 py-2 text-sm">
                  <option>Select sample type</option>
                  <option>Blood Draw</option>
                  <option>Urine Collection</option>
                  <option>Throat Culture</option>
                  <option>Multiple Samples</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Time</label>
                <select className="rounded-md border bg-background px-3 py-2 text-sm">
                  <option>Select time</option>
                  <option>8:00 AM</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Special Instructions</label>
                <Input placeholder="E.g., Fasting required" />
              </div>
              <Button className="w-full">
                Schedule Collection
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Collection Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center mb-4">
              <div className="text-center">
                <Truck className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Collection Performance Chart</p>
                <p className="text-xs text-muted-foreground">
                  Showing collections by day and completion rate
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-md bg-muted p-3 text-center">
                <div className="text-2xl font-bold">147</div>
                <p className="text-xs text-muted-foreground">
                  Collections this month
                </p>
              </div>
              <div className="rounded-md bg-muted p-3 text-center">
                <div className="text-2xl font-bold text-green-600">98.6%</div>
                <p className="text-xs text-muted-foreground">
                  Successful collections
                </p>
              </div>
              <div className="rounded-md bg-muted p-3 text-center">
                <div className="text-2xl font-bold">12.4</div>
                <p className="text-xs text-muted-foreground">
                  Avg. miles per day
                </p>
              </div>
              <div className="rounded-md bg-muted p-3 text-center">
                <div className="text-2xl font-bold text-amber-600">1.4%</div>
                <p className="text-xs text-muted-foreground">
                  Rescheduled visits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeSampleCollection;
