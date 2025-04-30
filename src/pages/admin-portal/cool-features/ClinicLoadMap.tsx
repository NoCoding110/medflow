
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RefreshCcw, Calendar, User, Users, AlertTriangle, Clock
} from "lucide-react";

const ClinicLoadMap = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinic Load Map</h1>
          <p className="text-muted-foreground">
            Visualize clinic activity and resource utilization in real time
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Patient Load
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26</div>
            <p className="text-xs text-muted-foreground">
              Patients in clinic now
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Staff
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              5 doctors, 8 nurses, 5 staff
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
            <div className="text-2xl font-bold">14 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">↑4 min</span> from average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resource Utilization
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">↑12%</span> from average
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Real-Time Clinic Load Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <div className="min-w-[800px]">
              <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
                {/* Legend */}
                <div className="col-span-5 grid grid-cols-5 gap-2 mb-4">
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span>Almost Done</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>Cleanup Required</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                    <span>Out of Service</span>
                  </div>
                </div>

                {/* Exam Rooms Area */}
                <div className="col-span-3 space-y-4">
                  <h3 className="text-sm font-medium">Exam Rooms</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {/* Render exam rooms */}
                    {[
                      "blue", "blue", "amber", "green", "blue",
                      "red", "amber", "blue", "green", "blue",
                      "blue", "blue", "gray", "blue", "green"
                    ].map((color, i) => (
                      <div
                        key={`exam-${i + 1}`}
                        className={`aspect-square rounded-md border p-2 flex flex-col items-center justify-center text-xs ${
                          color === "blue" ? "bg-blue-100 border-blue-300" :
                          color === "green" ? "bg-green-100 border-green-300" :
                          color === "amber" ? "bg-amber-100 border-amber-300" :
                          color === "red" ? "bg-red-100 border-red-300" :
                          "bg-gray-100 border-gray-300"
                        }`}
                      >
                        <span>Room {i + 1}</span>
                        {color === "blue" && <span className="mt-1 text-[10px] text-blue-600">In Use</span>}
                        {color === "amber" && <span className="mt-1 text-[10px] text-amber-600">5 min left</span>}
                        {color === "red" && <span className="mt-1 text-[10px] text-red-600">Cleanup</span>}
                        {color === "green" && <span className="mt-1 text-[10px] text-green-600">Available</span>}
                        {color === "gray" && <span className="mt-1 text-[10px] text-gray-600">Maintenance</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Waiting Area */}
                <div className="col-span-2 space-y-4">
                  <h3 className="text-sm font-medium">Waiting Area</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {/* Render waiting area seats */}
                    {[
                      "blue", "blue", "blue", "green",
                      "blue", "green", "green", "green",
                      "blue", "blue", "green", "green"
                    ].map((color, i) => (
                      <div
                        key={`waiting-${i + 1}`}
                        className={`aspect-square rounded-md border p-2 flex items-center justify-center text-xs ${
                          color === "blue" ? "bg-blue-100 border-blue-300" :
                          color === "green" ? "bg-green-100 border-green-300" : ""
                        }`}
                      >
                        <span>S{i + 1}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-sm font-medium mt-6">Check-in/Check-out</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-amber-300 bg-amber-100 p-2 text-xs text-center">
                      <div>Check-in</div>
                      <div className="mt-1 text-amber-800">2 patients</div>
                    </div>
                    <div className="rounded-md border border-blue-300 bg-blue-100 p-2 text-xs text-center">
                      <div>Check-out</div>
                      <div className="mt-1 text-blue-800">1 patient</div>
                    </div>
                  </div>
                </div>

                {/* Laboratory Area */}
                <div className="col-span-2 space-y-4">
                  <h3 className="text-sm font-medium">Laboratory</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Render lab stations */}
                    {[
                      "blue", "amber", 
                      "blue", "green"
                    ].map((color, i) => (
                      <div
                        key={`lab-${i + 1}`}
                        className={`aspect-square rounded-md border p-2 flex flex-col items-center justify-center text-xs ${
                          color === "blue" ? "bg-blue-100 border-blue-300" :
                          color === "green" ? "bg-green-100 border-green-300" :
                          color === "amber" ? "bg-amber-100 border-amber-300" : ""
                        }`}
                      >
                        <span>Lab {i + 1}</span>
                        {color === "blue" && <span className="mt-1 text-[10px] text-blue-600">Active</span>}
                        {color === "amber" && <span className="mt-1 text-[10px] text-amber-600">Almost Done</span>}
                        {color === "green" && <span className="mt-1 text-[10px] text-green-600">Available</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imaging Area */}
                <div className="col-span-2 space-y-4">
                  <h3 className="text-sm font-medium">Imaging</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Render imaging rooms */}
                    <div className="aspect-square rounded-md border border-blue-300 bg-blue-100 p-2 flex flex-col items-center justify-center text-xs">
                      <span>X-Ray</span>
                      <span className="mt-1 text-[10px] text-blue-600">In Use</span>
                    </div>
                    <div className="aspect-square rounded-md border border-green-300 bg-green-100 p-2 flex flex-col items-center justify-center text-xs">
                      <span>Ultrasound</span>
                      <span className="mt-1 text-[10px] text-green-600">Available</span>
                    </div>
                  </div>
                </div>

                {/* Staff Area */}
                <div className="col-span-1 space-y-4">
                  <h3 className="text-sm font-medium">Staff Area</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="aspect-square rounded-md border border-blue-300 bg-blue-100 p-2 flex flex-col items-center justify-center text-xs">
                      <span>Break Room</span>
                      <span className="mt-1 text-[10px] text-blue-600">3 staff</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between text-sm">
            <div className="text-muted-foreground">
              Last updated: Just now
            </div>
            <Button variant="outline" size="sm">
              Full Screen View
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Load Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <Users className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Patient Load Forecast</p>
                <p className="text-xs text-muted-foreground">
                  Showing predicted patient volume by hour
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Peak Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">10:00 - 11:00 AM</span>
                  </div>
                  <span className="text-sm font-medium">High Load (85%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">2:00 - 3:00 PM</span>
                  </div>
                  <span className="text-sm font-medium">Moderate Load (65%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">4:00 - 5:00 PM</span>
                  </div>
                  <span className="text-sm font-medium">Light Load (40%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <h3 className="font-medium text-amber-800">Peak Time Alert (10 AM - 11 AM)</h3>
                <p className="mt-1 text-sm text-amber-700">
                  Patient volume exceeds optimal capacity by 15%. Consider opening additional exam rooms or scheduling overflow appointments for later in the day.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Adjust Schedule
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Staffing Recommendation</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add 1 additional medical assistant during peak hours (10 AM - 12 PM) to reduce wait times.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Adjust Staffing
                </Button>
              </div>
              <div className="rounded-md border border-green-200 bg-green-50 p-4">
                <h3 className="font-medium text-green-800">Resource Efficiency</h3>
                <p className="mt-1 text-sm text-green-700">
                  Consider consolidating lab draw appointments in the morning to optimize phlebotomist utilization.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Load Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium mb-2">Primary Care</h3>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current load:</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-red-500" style={{ width: "85%" }}></div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>10 providers active</span>
                <span>18 patients in care</span>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium mb-2">Urgent Care</h3>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current load:</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: "65%" }}></div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>4 providers active</span>
                <span>7 patients in care</span>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium mb-2">Laboratory</h3>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current load:</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "45%" }}></div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>3 techs active</span>
                <span>4 samples processing</span>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium mb-2">Imaging</h3>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current load:</span>
                <span className="font-medium">50%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "50%" }}></div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>2 techs active</span>
                <span>1 procedure in progress</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicLoadMap;
