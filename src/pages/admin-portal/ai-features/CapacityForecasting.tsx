
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, AlertCircle } from "lucide-react";
import { Select } from "@/components/ui/select";

const CapacityForecasting = () => {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Capacity Forecasting</h1>
        <p className="text-muted-foreground">
          AI-powered predictions to optimize staffing and resource allocation
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-1 h-4 w-4" /> Next 7 days
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-1 h-4 w-4" /> Next 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-1 h-4 w-4" /> Custom range
            </Button>
          </div>
        </div>
        <div>
          <Button variant="default" size="sm">
            <TrendingUp className="mr-1 h-4 w-4" /> Generate New Forecast
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expected Patient Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">203</div>
            <p className="text-xs text-muted-foreground">
              +12% from previous week
            </p>
            <div className="mt-4">
              <div className="text-sm font-medium mb-1">Daily breakdown</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monday</span>
                  <span className="text-sm font-medium">42 patients</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tuesday</span>
                  <span className="text-sm font-medium">38 patients</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wednesday</span>
                  <span className="text-sm font-medium">45 patients</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Thursday</span>
                  <span className="text-sm font-medium">36 patients</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Friday</span>
                  <span className="text-sm font-medium">42 patients</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recommended Staffing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 providers</div>
            <p className="text-xs text-muted-foreground">
              Based on predicted patient load
            </p>
            <div className="mt-4">
              <div className="text-sm font-medium mb-1">Staff breakdown</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Doctors</span>
                  <span className="text-sm font-medium">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Nurses</span>
                  <span className="text-sm font-medium">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Administrative</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Support staff</span>
                  <span className="text-sm font-medium">2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Capacity Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">2 alerts</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-md bg-amber-50 border border-amber-200 p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-800">Monday understaffed</span>
                </div>
                <p className="mt-1 text-xs text-amber-700">
                  Consider adding 1 additional doctor for Monday morning
                </p>
              </div>
              <div className="rounded-md bg-amber-50 border border-amber-200 p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-800">Wednesday peak</span>
                </div>
                <p className="mt-1 text-xs text-amber-700">
                  Add 1 nurse to handle vaccination appointments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Capacity Forecast Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Capacity Forecast Visualization</p>
                <p className="text-xs text-muted-foreground">
                  Showing expected load vs. capacity for the next 7 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Examination Rooms</span>
                  <span>75% utilized</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Lab Equipment</span>
                  <span>63% utilized</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "63%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Provider Time</span>
                  <span>82% utilized</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staffing Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md bg-green-50 border border-green-200 p-3">
                <span className="text-sm font-medium text-green-800">Optimization opportunity</span>
                <p className="mt-1 text-xs text-green-700">
                  Tuesday afternoon staffing could be reduced by 1 nurse without impact to patient care
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Apply Suggestion
                </Button>
              </div>
              <div className="rounded-md bg-blue-50 border border-blue-200 p-3">
                <span className="text-sm font-medium text-blue-800">Seasonal adjustment</span>
                <p className="mt-1 text-xs text-blue-700">
                  Prepare for 15% increase in respiratory cases in the upcoming flu season
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CapacityForecasting;
