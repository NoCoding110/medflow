import React, { useState } from "react";
import { Search, Plus, Bell, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface LabTest {
  id: string;
  patientName: string;
  testName: string;
  status: "Completed" | "Pending" | "In Progress";
  date: string;
  results?: string;
  urgency?: "Normal" | "Urgent" | "STAT";
}

const initialLabTests: LabTest[] = [
  {
    id: "LT001",
    patientName: "Sarah Connor",
    testName: "Complete Blood Count",
    status: "Completed",
    date: "2025-04-25",
    results: "WBC: 7.2, RBC: 4.8, Hgb: 14.2, Hct: 42%",
  },
  {
    id: "LT002",
    patientName: "John Doe",
    testName: "Lipid Panel",
    status: "Pending",
    date: "2025-04-26",
    urgency: "Normal",
  },
  {
    id: "LT003",
    patientName: "Jane Smith",
    testName: "Thyroid Function",
    status: "In Progress",
    date: "2025-04-26",
    urgency: "Urgent",
  },
];

const pendingResults = [
  {
    id: "PR001",
    patientName: "Mike Johnson",
    testName: "Glucose Test",
    timeAgo: "2 hours ago",
    urgency: "STAT",
  },
  {
    id: "PR002",
    patientName: "Lisa Brown",
    testName: "Liver Function",
    timeAgo: "5 hours ago",
    urgency: "Normal",
  },
];

const notifications = [
  {
    id: "N001",
    title: "Urgent Result Available",
    description: "CBC results for Patient #12345",
    timeAgo: "10 min ago",
    type: "urgent",
  },
  {
    id: "N002",
    title: "New Lab Request",
    description: "Thyroid panel requested",
    timeAgo: "1 hour ago",
    type: "info",
  },
];

const LabIntegration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [labTests, setLabTests] = useState(initialLabTests);
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);
  const [newRequest, setNewRequest] = useState<{
    patientName: string;
    testType: string;
    urgency: "Normal" | "Urgent" | "STAT";
  }>({
    patientName: "",
    testType: "",
    urgency: "Normal",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter lab tests based on search query
    if (!query) {
      setLabTests(initialLabTests);
    } else {
      const filtered = initialLabTests.filter(
        (test) =>
          test.patientName.toLowerCase().includes(query.toLowerCase()) ||
          test.testName.toLowerCase().includes(query.toLowerCase())
      );
      setLabTests(filtered);
    }
  };

  const handleNewRequest = () => {
    if (!newRequest.patientName || !newRequest.testType) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTest: LabTest = {
      id: `LT${Math.floor(Math.random() * 1000)}`,
      patientName: newRequest.patientName,
      testName: newRequest.testType,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      urgency: newRequest.urgency,
    };

    setLabTests([newTest, ...labTests]);
    setShowNewRequestDialog(false);
    setNewRequest({ patientName: "", testType: "", urgency: "Normal" });
    toast.success("Lab test request created successfully");
  };

  const handleViewResults = (test: LabTest) => {
    if (test.status === "Completed") {
      toast(
        <div className="flex flex-col gap-2">
          <div className="font-medium">{test.patientName} - {test.testName}</div>
          <div className="text-sm">{test.results}</div>
        </div>,
        {
          duration: 5000,
        }
      );
    } else {
      toast.info("Results not available yet");
    }
  };

  const getStatusBadge = (status: LabTest["status"]) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lab Integration</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track laboratory tests and results
          </p>
        </div>
        <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Lab Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Lab Test Request</DialogTitle>
              <DialogDescription>
                Create a new laboratory test request for a patient
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Patient Name</Label>
                <Input
                  placeholder="Enter patient name"
                  value={newRequest.patientName}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, patientName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Test Type</Label>
                <Select
                  value={newRequest.testType}
                  onValueChange={(value) =>
                    setNewRequest({ ...newRequest, testType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Complete Blood Count">Complete Blood Count</SelectItem>
                    <SelectItem value="Lipid Panel">Lipid Panel</SelectItem>
                    <SelectItem value="Thyroid Function">Thyroid Function</SelectItem>
                    <SelectItem value="Metabolic Panel">Metabolic Panel</SelectItem>
                    <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Urgency</Label>
                <Select
                  value={newRequest.urgency}
                  onValueChange={(value: "Normal" | "Urgent" | "STAT") =>
                    setNewRequest({ ...newRequest, urgency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="STAT">STAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewRequestDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleNewRequest}>Create Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search lab tests..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Lab Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {labTests.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{test.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {test.testName} • {test.date}
                        </p>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(test.status)}
                          {test.urgency && (
                            <Badge
                              className={
                                test.urgency === "STAT"
                                  ? "bg-red-100 text-red-800"
                                  : test.urgency === "Urgent"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {test.urgency}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewResults(test)}
                      >
                        View Results
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pending Results</span>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{result.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {result.testName} • {result.timeAgo}
                      </p>
                    </div>
                    <Badge
                      className={
                        result.urgency === "STAT"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {result.urgency}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Notifications</span>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                  >
                    {notification.type === "urgent" ? (
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    ) : (
                      <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timeAgo}
                      </p>
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

export default LabIntegration; 