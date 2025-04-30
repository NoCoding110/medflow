
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, AlertTriangle, Check, RefreshCcw, FileCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

const BillingScrubber = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Billing Scrubber</h1>
          <p className="text-muted-foreground">
            Automatically detect and fix coding errors before claim submission
          </p>
        </div>
        <Button className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Scan Claims
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Claims Analyzed
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">143</div>
            <p className="text-xs text-muted-foreground">
              Past 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Errors Detected
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">12.6%</span> error rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue Protected
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">
              From corrections
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Queue
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Claims pending review
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Claims Requiring Review</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search claims..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <select className="rounded-md border bg-transparent px-3 py-1 h-10">
                <option value="all">All Types</option>
                <option value="coding">Coding Errors</option>
                <option value="missing">Missing Info</option>
                <option value="duplicate">Duplicates</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="border-b bg-muted/50 text-xs font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Claim ID</th>
                  <th className="px-4 py-3 text-left">Patient</th>
                  <th className="px-4 py-3 text-left">Issue Type</th>
                  <th className="px-4 py-3 text-left">Detected Error</th>
                  <th className="px-4 py-3 text-left">Suggested Fix</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">CL-2024-1234</td>
                  <td className="px-4 py-3">John Smith</td>
                  <td className="px-4 py-3 text-sm">Coding Error</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Incorrect CPT code 99214</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">Use 99213 based on documentation</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">View</Button>
                      <Button size="sm" variant="outline">Fix</Button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">CL-2024-1236</td>
                  <td className="px-4 py-3">Sarah Johnson</td>
                  <td className="px-4 py-3 text-sm">Missing Info</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Missing modifier -25</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">Add modifier -25 for separate E&M</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">View</Button>
                      <Button size="sm" variant="outline">Fix</Button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">CL-2024-1242</td>
                  <td className="px-4 py-3">Michael Chen</td>
                  <td className="px-4 py-3 text-sm">Duplicate</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Duplicate claim for same DOS</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">Remove duplicate claim CL-2024-1241</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      Critical
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">View</Button>
                      <Button size="sm" variant="outline">Fix</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Common Billing Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Incorrect CPT codes</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: "42%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Missing modifiers</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: "28%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">ICD-10 mismatch</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "18%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Duplicate claims</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: "12%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm font-medium">Higher Revenue Opportunity</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Consider using code 99204 instead of 99203 when documentation supports it (potential $15-25 increase per visit)
                </p>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm font-medium">Documentation Suggestion</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Always document time spent with patient for time-based billing codes
                </p>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm font-medium">Modifier Usage</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use modifier -25 appropriately when a separate E&M service is provided
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingScrubber;
