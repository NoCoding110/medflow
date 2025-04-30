
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DoctorLab = () => {
  const labTests = [
    {
      id: "LT001",
      patientName: "Sarah Connor",
      testType: "Complete Blood Count",
      status: "Completed",
      date: "2025-04-25",
      results: "Normal",
    },
    {
      id: "LT002",
      patientName: "John Doe",
      testType: "Lipid Panel",
      status: "Pending",
      date: "2025-04-26",
      results: "Awaiting",
    },
    {
      id: "LT003",
      patientName: "Jane Smith",
      testType: "Thyroid Function",
      status: "In Progress",
      date: "2025-04-26",
      results: "Processing",
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Lab Integration</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Fixed Input component by removing the icon prop and using a wrapper div for search icon */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search lab tests..." 
            className="pl-10"
          />
        </div>
        <Button className="bg-clinical">
          <FileText className="h-4 w-4 mr-2" />
          New Lab Request
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Lab Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {labTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{test.patientName}</div>
                    <div className="text-sm text-muted-foreground">{test.testType}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className={`text-sm font-medium ${
                      test.status === "Completed" ? "text-green-600" :
                      test.status === "Pending" ? "text-yellow-600" : "text-blue-600"
                    }`}>
                      {test.status}
                    </div>
                    <div className="text-sm text-muted-foreground">{test.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pending Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { patient: "Mike Johnson", test: "Glucose Test", time: "2 hours ago" },
                  { patient: "Lisa Brown", test: "Liver Function", time: "5 hours ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-2 border-b">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{item.patient}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.test} - {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Urgent Result Available", message: "CBC results for Patient #12345", time: "10 min ago" },
                  { title: "New Lab Request", message: "Thyroid panel requested", time: "1 hour ago" },
                ].map((notification, i) => (
                  <div key={i} className="flex items-start gap-4 p-2 border-b">
                    <Bell className="h-4 w-4 text-clinical mt-1" />
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-muted-foreground">{notification.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorLab;
