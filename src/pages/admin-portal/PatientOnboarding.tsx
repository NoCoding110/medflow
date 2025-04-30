
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CheckSquare, Mail, MessageSquare, Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

const PatientOnboarding = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Onboarding</h1>
          <p className="text-muted-foreground">
            Streamline the process of adding new patients to your practice
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Patient
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Registrations
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review and approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Forms Completion Rate
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑6%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Patients (MTD)
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Recent Registration Requests</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search patients..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="border-b bg-muted/50 text-xs font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Patient Name</th>
                  <th className="px-4 py-3 text-left">Submitted</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Form Completion</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">Sarah Williams</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Today, 9:32 AM</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">
                      Pending Review
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                      </div>
                      <span className="text-xs">100%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" size="sm">Review</Button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">Michael Brown</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Yesterday, 4:15 PM</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800">
                      Pending Review
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                      </div>
                      <span className="text-xs">100%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" size="sm">Review</Button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">Emma Davis</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Yesterday, 2:30 PM</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      Incomplete
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-amber-500" style={{ width: "60%" }}></div>
                      </div>
                      <span className="text-xs">60%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" size="sm">Send Reminder</Button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">Robert Martinez</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">May 1, 11:20 AM</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "100%" }}></div>
                      </div>
                      <span className="text-xs">100%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">Lisa Johnson</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">May 1, 9:45 AM</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      Incomplete
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-red-500" style={{ width: "30%" }}></div>
                      </div>
                      <span className="text-xs">30%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" size="sm">Send Reminder</Button>
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
            <CardTitle>Invitation Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">New Patient Email</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Standard welcome email with registration instructions
                </p>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                    <h3 className="font-medium">New Patient SMS</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Quick text message with registration link
                </p>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-amber-500" />
                    <h3 className="font-medium">Registration Reminder</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Follow-up for incomplete registrations
                </p>
              </div>
              <Button className="w-full">
                Create New Template
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Form Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Patient Information</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Basic contact and demographic information
                </p>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-500" />
                    <h3 className="font-medium">Medical History</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Past medical conditions and history
                </p>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-500" />
                    <h3 className="font-medium">Insurance Information</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Insurance policy details collection
                </p>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-amber-500" />
                    <h3 className="font-medium">Consent Forms</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Legal agreements and HIPAA consent
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientOnboarding;
