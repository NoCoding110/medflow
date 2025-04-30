
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, Users, Calendar, CreditCard, Activity } from "lucide-react";

const Analytics = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into clinic performance and patient care
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (MTD)</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$147,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Visits (MTD)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93% approved</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full w-full rounded-md bg-muted p-6 flex items-center justify-center">
              <p className="text-center text-muted-foreground">Revenue chart visualization will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="mt-8 mb-4 text-xl font-semibold">Key Performance Indicators</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded-md bg-muted p-4 flex items-center justify-center">
              <p className="text-center text-muted-foreground">Age & gender distribution chart</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Female</span>
                <span className="font-medium">58%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Male</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Average Age</span>
                <span className="font-medium">42 years</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Provider Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dr. Sarah Johnson</span>
                <span className="text-sm font-medium">98%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "98%" }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dr. Michael Chen</span>
                <span className="text-sm font-medium">96%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "96%" }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dr. Emily Lee</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "92%" }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dr. Robert Wilson</span>
                <span className="text-sm font-medium">88%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "88%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Leakage Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-amber-50 border border-amber-200 p-3 mb-4">
              <h3 className="text-sm font-medium text-amber-900">Potential Lost Revenue</h3>
              <div className="text-2xl font-bold text-amber-900">$23,450</div>
            </div>
            
            <div className="space-y-3">
              <div className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Unbilled Procedures</span>
                  <span className="text-sm font-medium">$8,200</span>
                </div>
              </div>
              <div className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Denied Claims</span>
                  <span className="text-sm font-medium">$6,750</span>
                </div>
              </div>
              <div className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Coding Errors</span>
                  <span className="text-sm font-medium">$5,300</span>
                </div>
              </div>
              <div className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Missed Charges</span>
                  <span className="text-sm font-medium">$3,200</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
