
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, CheckCircle, Clock, Search, Filter, 
  RefreshCcw, FileText, TestTube, TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";

const LabErrorDetection = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lab Error Detection</h1>
          <p className="text-muted-foreground">
            AI-powered detection and prevention of lab errors
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
              Errors Detected
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Errors
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prevention Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑4%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Resolution Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.4 hrs</div>
            <p className="text-xs text-muted-foreground">
              For non-critical errors
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search detected errors..." className="pl-8 w-full" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
            <select className="rounded-md border bg-background px-3 py-1 text-sm h-9">
              <option>All severities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Laboratory Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead className="border-b bg-muted/50 text-xs font-medium">
                  <tr>
                    <th className="px-4 py-3 text-left">Error ID</th>
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Test Type</th>
                    <th className="px-4 py-3 text-left">Error Type</th>
                    <th className="px-4 py-3 text-left">Detected</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50 bg-red-50">
                    <td className="px-4 py-3 text-sm">ERR-1204</td>
                    <td className="px-4 py-3">Sarah Johnson</td>
                    <td className="px-4 py-3 text-sm">Hemoglobin A1C</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Value Out of Range</span>
                    </td>
                    <td className="px-4 py-3 text-sm">10 mins ago</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">Critical</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button size="sm">Review</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50 bg-red-50">
                    <td className="px-4 py-3 text-sm">ERR-1203</td>
                    <td className="px-4 py-3">Michael Davis</td>
                    <td className="px-4 py-3 text-sm">Comprehensive Metabolic Panel</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Mismatch with Patient History</span>
                    </td>
                    <td className="px-4 py-3 text-sm">25 mins ago</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">Critical</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button size="sm">Review</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50 bg-amber-50">
                    <td className="px-4 py-3 text-sm">ERR-1202</td>
                    <td className="px-4 py-3">John Smith</td>
                    <td className="px-4 py-3 text-sm">Lipid Panel</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Sample Contamination</span>
                    </td>
                    <td className="px-4 py-3 text-sm">1.5 hours ago</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">High</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button size="sm" variant="outline">Review</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">ERR-1201</td>
                    <td className="px-4 py-3">Emma Wilson</td>
                    <td className="px-4 py-3 text-sm">Thyroid Panel</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">Incorrect Reference Range</span>
                    </td>
                    <td className="px-4 py-3 text-sm">2 hours ago</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">Medium</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button size="sm" variant="outline">Review</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">ERR-1200</td>
                    <td className="px-4 py-3">Robert Chen</td>
                    <td className="px-4 py-3 text-sm">CBC with Differential</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">Inconsistent Results</span>
                    </td>
                    <td className="px-4 py-3 text-sm">3.5 hours ago</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800">Low</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button size="sm" variant="outline">Review</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Error Detection Algorithms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium">Value Range Validation</div>
                  <div className="text-sm text-muted-foreground">Detects values outside normal ranges accounting for patient demographics</div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium">Delta Check</div>
                  <div className="text-sm text-muted-foreground">Compares current results with patient's historical values</div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium">Demographic Consistency</div>
                  <div className="text-sm text-muted-foreground">Ensures results align with patient age, sex, and known conditions</div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium">Inter-Test Correlation</div>
                  <div className="text-sm text-muted-foreground">Validates expected relationships between different test results</div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border border-dashed p-4">
                <div>
                  <div className="font-medium text-muted-foreground">Time-Series Analysis</div>
                  <div className="text-sm text-muted-foreground">Detects unlikely rapid changes in patient values over time</div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Beta</span>
                  <Button size="sm" variant="outline">Enable</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Top Error Types (Last 30 Days)</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Value Out of Range</span>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "34%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Sample Contamination</span>
                      <span className="text-sm font-medium">27%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "27%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Mismatch with Patient History</span>
                      <span className="text-sm font-medium">21%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "21%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Incorrect Reference Range</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Other</span>
                      <span className="text-sm font-medium">6%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "6%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Error Trends</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-600">↓12%</div>
                    <div className="text-sm text-muted-foreground">Monthly error rate</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">98.7%</div>
                    <div className="text-sm text-muted-foreground">Lab accuracy rate</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-amber-600">↑4</div>
                    <div className="text-sm text-muted-foreground">New error types detected</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-600">↑8%</div>
                    <div className="text-sm text-muted-foreground">AI detection improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quality Improvement Recommendations</CardTitle>
          <Button variant="outline" size="sm" className="gap-1">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-green-800">High Impact</h3>
              </div>
              <p className="mt-2 text-sm text-green-700">
                Implement double-verification for critical values on all CBC panels. This could reduce critical errors by up to 42% based on historical data.
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800">
                View Implementation Plan
              </Button>
            </div>

            <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                <TestTube className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-blue-800">Process Improvement</h3>
              </div>
              <p className="mt-2 text-sm text-blue-700">
                Update sample collection procedures for lipid panels to reduce contamination rates. Current error rate is 27% higher than benchmark.
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800">
                Review Procedures
              </Button>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <h3 className="font-medium">Training Opportunity</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Lab technicians would benefit from refresher training on handling hemolyzed specimens. This is contributing to 18% of sample rejection rates.
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Schedule Training
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabErrorDetection;
