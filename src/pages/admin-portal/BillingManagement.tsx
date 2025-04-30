
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, FileText, AlertCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const BillingManagement = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing Management</h1>
          <p className="text-muted-foreground">
            Track and manage billing, claims, and financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </Button>
          <Button className="gap-2">
            <DollarSign className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue (MTD)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">
              Outstanding Claims
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">
              Worth $32,450
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected Claims
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Worth $4,225
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Success Rate
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <select className="rounded-md border bg-transparent px-3 py-1 h-10">
                <option value="all">All Types</option>
                <option value="payment">Payment</option>
                <option value="refund">Refund</option>
                <option value="claim">Claim</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="border-b bg-muted/50 text-xs font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Patient</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">05/01/2024</td>
                  <td className="px-4 py-3">John Smith</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Annual checkup</td>
                  <td className="px-4 py-3 text-sm">Payment</td>
                  <td className="px-4 py-3 text-right font-medium">$150.00</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">05/01/2024</td>
                  <td className="px-4 py-3">Maria Garcia</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Blood test</td>
                  <td className="px-4 py-3 text-sm">Claim</td>
                  <td className="px-4 py-3 text-right font-medium">$85.00</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">05/02/2024</td>
                  <td className="px-4 py-3">Robert Johnson</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Physical therapy</td>
                  <td className="px-4 py-3 text-sm">Payment</td>
                  <td className="px-4 py-3 text-right font-medium">$75.00</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">05/02/2024</td>
                  <td className="px-4 py-3">Emily Wilson</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Vaccination</td>
                  <td className="px-4 py-3 text-sm">Claim</td>
                  <td className="px-4 py-3 text-right font-medium">$120.00</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      Rejected
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">05/03/2024</td>
                  <td className="px-4 py-3">David Brown</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Consultation</td>
                  <td className="px-4 py-3 text-sm">Refund</td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">-$50.00</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">
                      Processing
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing 5 of 243 transactions
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Insurance Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-bold">96</div>
                  <p className="text-xs text-muted-foreground">Total active claims</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-bold text-green-600">43</div>
                    <p className="text-xs text-green-600">Approved</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-bold text-amber-600">46</div>
                    <p className="text-xs text-amber-600">Pending</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-bold text-red-600">7</div>
                    <p className="text-xs text-red-600">Rejected</p>
                  </div>
                </div>
              </div>
              
              <div className="h-10 w-full rounded-full bg-muted overflow-hidden">
                <div className="flex h-full">
                  <div className="h-full bg-green-500" style={{ width: "45%" }}></div>
                  <div className="h-full bg-amber-500" style={{ width: "48%" }}></div>
                  <div className="h-full bg-red-500" style={{ width: "7%" }}></div>
                </div>
              </div>
              
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <h3 className="text-sm font-medium text-amber-900">Attention Needed</h3>
                </div>
                <p className="mt-1 text-xs text-amber-800">
                  4 claims have been pending for over 30 days and require follow-up
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                View All Claims
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                <FileText className="h-6 w-6 mb-2" />
                <span>Generate Invoice</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                <CreditCard className="h-6 w-6 mb-2" />
                <span>Process Payment</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                <AlertCircle className="h-6 w-6 mb-2" />
                <span>Check Claim Status</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
                <DollarSign className="h-6 w-6 mb-2" />
                <span>Issue Refund</span>
              </Button>
            </div>
            
            <div className="mt-4 rounded-md border-2 border-dashed border-muted p-6 text-center">
              <h3 className="font-medium">AI Billing Assistant</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Automatically scan and fix common billing errors before submission
              </p>
              <Button className="mt-2" size="sm">
                Start Scan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingManagement;
