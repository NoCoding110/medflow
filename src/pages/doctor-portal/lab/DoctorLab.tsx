import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  FileText,
  Search,
  Clock,
  Bell,
  Filter,
  Download,
  Calendar,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Activity,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { Workflow, LabTest } from "@/lib/types";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { PDFDocument, rgb } from 'pdf-lib';

// Sample data for lab tests
const labTests = [
  {
    id: "LT001",
    patientName: "Sarah Connor",
    patientId: "P12345",
    testType: "Complete Blood Count",
    status: "Completed",
    date: "2025-04-25",
    results: {
      status: "Normal",
      components: [
        { name: "WBC", value: 7.5, unit: "K/µL", range: "4.5-11.0", status: "normal" },
        { name: "RBC", value: 4.8, unit: "M/µL", range: "4.0-5.5", status: "normal" },
        { name: "Hemoglobin", value: 14.2, unit: "g/dL", range: "12.0-16.0", status: "normal" },
        { name: "Platelets", value: 250, unit: "K/µL", range: "150-450", status: "normal" },
      ],
      notes: "All parameters within normal range",
      doctor: "Dr. Smith",
      lab: "Central Lab",
    },
    priority: "routine",
  },
  {
    id: "LT002",
    patientName: "John Doe",
    patientId: "P12346",
    testType: "Lipid Panel",
    status: "Pending",
    date: "2025-04-26",
    results: "Awaiting",
    priority: "urgent",
  },
  {
    id: "LT003",
    patientName: "Jane Smith",
    patientId: "P12347",
    testType: "Thyroid Function",
    status: "In Progress",
    date: "2025-04-26",
    results: "Processing",
    priority: "high",
  },
  {
    id: "LT004",
    patientName: "Mike Johnson",
    patientId: "P12348",
    testType: "Glucose Test",
    status: "Completed",
    date: "2025-04-24",
    results: {
      status: "Abnormal",
      components: [
        { name: "Fasting Glucose", value: 130, unit: "mg/dL", range: "70-100", status: "high" },
      ],
      notes: "Patient shows elevated glucose levels",
      doctor: "Dr. Johnson",
      lab: "Central Lab",
    },
    priority: "routine",
  },
];

// Analytics data
const analyticsData = {
  testsByType: [
    { name: "Blood Tests", value: 45, color: "#0088FE" },
    { name: "Urine Analysis", value: 25, color: "#00C49F" },
    { name: "Imaging", value: 20, color: "#FFBB28" },
    { name: "Other", value: 10, color: "#FF8042" },
  ],
  trendsData: [
    { month: "Jan", tests: 65, abnormal: 8, avgTurnaround: 24 },
    { month: "Feb", tests: 72, abnormal: 10, avgTurnaround: 22 },
    { month: "Mar", tests: 58, abnormal: 6, avgTurnaround: 20 },
    { month: "Apr", tests: 80, abnormal: 12, avgTurnaround: 18 },
    { month: "May", tests: 74, abnormal: 9, avgTurnaround: 19 },
    { month: "Jun", tests: 85, abnormal: 11, avgTurnaround: 16 },
  ],
  testTurnaround: [
    { range: "0-12h", count: 25 },
    { range: "12-24h", count: 45 },
    { range: "24-48h", count: 20 },
    { range: ">48h", count: 10 },
  ],
  abnormalityByCategory: [
    { category: "Hematology", normal: 85, abnormal: 15 },
    { category: "Chemistry", normal: 78, abnormal: 22 },
    { category: "Microbiology", normal: 90, abnormal: 10 },
    { category: "Immunology", normal: 88, abnormal: 12 },
  ],
  recentTrends: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    urgent: [12, 15, 10, 18],
    routine: [45, 42, 50, 48],
    completed: [52, 50, 55, 58],
  }
};

// Workflow statuses and their corresponding steps
const workflowSteps = {
  "request_created": 0,
  "sample_collected": 1,
  "processing": 2,
  "review_pending": 3,
  "completed": 4,
  "cancelled": -1,
};

// WebSocket connection for real-time updates
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

const DoctorLab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [tests, setTests] = useState<LabTest[]>(labTests);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedTests, setSelectedTests] = useState<LabTest[]>([]);

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || test.status === filterStatus;
    const matchesPriority = filterPriority === "all" || test.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Initialize WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleRealtimeUpdate(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to establish real-time connection",
        variant: "destructive",
      });
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Handle real-time updates
  const handleRealtimeUpdate = (data: any) => {
    switch (data.type) {
      case 'TEST_UPDATE':
        updateTestStatus(data.testId, data.status);
        break;
      case 'NEW_TEST':
        addNewTest(data.test);
        break;
      case 'WORKFLOW_UPDATE':
        updateWorkflow(data.workflowId, data.status);
        break;
      default:
        console.log('Unknown update type:', data.type);
    }
  };

  const updateTestStatus = (testId: string, newStatus: string) => {
    setTests(prev => 
      prev.map(test => 
        test.id === testId ? { ...test, status: newStatus } : test
      )
    );
    
    toast({
      title: "Test Status Updated",
      description: `Test ${testId} status changed to ${newStatus}`,
    });
  };

  const addNewTest = (newTest: LabTest) => {
    setTests(prev => [...prev, newTest]);
    toast({
      title: "New Test Request",
      description: `New test request received for ${newTest.patientName}`,
    });
  };

  const updateWorkflow = (workflowId: string, newStatus: string) => {
    setWorkflows(prev =>
      prev.map(workflow =>
        workflow.id === workflowId ? { ...workflow, status: newStatus } : workflow
      )
    );
  };

  // Function to create a new test request with workflow
  const createTestRequest = async (testData: any) => {
    try {
      const response = await fetch('/api/lab/test-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (!response.ok) throw new Error('Failed to create test request');

      const data = await response.json();
      addNewTest(data.test);
      setWorkflows(prev => [...prev, data.workflow]);

      toast({
        title: "Test Request Created",
        description: "New test request has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create test request",
        variant: "destructive",
      });
    }
  };

  // Function to update workflow status
  const updateWorkflowStatus = async (workflowId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/lab/workflow/${workflowId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update workflow');

      const data = await response.json();
      updateWorkflow(workflowId, newStatus);

      toast({
        title: "Workflow Updated",
        description: `Workflow status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update workflow status",
        variant: "destructive",
      });
    }
  };

  // Enhanced export functionality
  const handleExport = async (format: string) => {
    const dataToExport = selectedTests.length > 0 ? selectedTests : tests;
    
    switch (format) {
      case 'csv':
        exportToCSV(dataToExport);
        break;
      case 'excel':
        exportToExcel(dataToExport);
        break;
      case 'pdf':
        await exportToPDF(dataToExport);
        break;
      case 'json':
        exportToJSON(dataToExport);
        break;
      default:
        console.error('Unsupported format');
    }
  };

  const exportToCSV = (data: LabTest[]) => {
    const headers = ['Test ID', 'Patient Name', 'Test Type', 'Status', 'Date', 'Priority'];
    const csvData = data.map(test => [
      test.id,
      test.patientName,
      test.testType,
      test.status,
      test.date,
      test.priority
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'lab_tests.csv');
  };

  const exportToExcel = (data: LabTest[]) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Lab Tests');
    XLSX.writeFile(wb, 'lab_tests.xlsx');
  };

  const exportToPDF = async (data: LabTest[]) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { height, width } = page.getSize();
    
    let yOffset = height - 50;
    
    // Add title
    page.drawText('Lab Tests Report', {
      x: 50,
      y: yOffset,
      size: 20,
      color: rgb(0, 0, 0),
    });
    
    yOffset -= 30;
    
    // Add data
    data.forEach((test) => {
      if (yOffset < 50) {
        // Add new page if needed
        const newPage = pdfDoc.addPage();
        yOffset = newPage.getSize().height - 50;
      }
      
      page.drawText(`${test.id} - ${test.patientName} - ${test.testType}`, {
        x: 50,
        y: yOffset,
        size: 12,
        color: rgb(0, 0, 0),
      });
      
      yOffset -= 20;
    });
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'lab_tests.pdf');
  };

  const exportToJSON = (data: LabTest[]) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, 'lab_tests.json');
  };

  // Test comparison functionality
  const toggleTestSelection = (test: LabTest) => {
    if (selectedTests.find(t => t.id === test.id)) {
      setSelectedTests(prev => prev.filter(t => t.id !== test.id));
    } else {
      setSelectedTests(prev => [...prev, test]);
    }
  };

  const getTestHistory = async (patientId: string, testType: string) => {
    try {
      const response = await fetch(`/api/lab/test-history?patientId=${patientId}&testType=${testType}`);
      if (!response.ok) throw new Error('Failed to fetch test history');
      return await response.json();
    } catch (error) {
      console.error('Error fetching test history:', error);
      return [];
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-500 bg-red-100";
      case "high":
        return "text-orange-500 bg-orange-100";
      default:
        return "text-green-500 bg-green-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "In Progress":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lab Integration</h1>
          <p className="text-muted-foreground">Manage and track laboratory tests</p>
        </div>
        <div className="flex items-center gap-4">
          <Select onValueChange={handleExport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Export as..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">Export as CSV</SelectItem>
              <SelectItem value="excel">Export as Excel</SelectItem>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="json">Export as JSON</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setCompareMode(!compareMode)}
            className={compareMode ? 'bg-primary text-primary-foreground' : ''}
          >
            {compareMode ? 'Exit Compare' : 'Compare Tests'}
          </Button>
          <Button className="bg-clinical">
            <FileText className="h-4 w-4 mr-2" />
            New Lab Request
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                <h3 className="text-2xl font-bold">{labTests.length}</h3>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-bold">
                  {labTests.filter(t => t.status === "Pending").length}
                </h3>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                <h3 className="text-2xl font-bold">
                  {labTests.filter(t => t.status === "Completed" && t.date === format(new Date(), "yyyy-MM-dd")).length}
                </h3>
              </div>
              <BarChart2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgent</p>
                <h3 className="text-2xl font-bold">
                  {labTests.filter(t => t.priority === "urgent").length}
                </h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by patient name, test type, or ID..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="routine">Routine</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lab Tests</CardTitle>
              <CardDescription>View and manage all laboratory tests</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredTests.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
                      onClick={() => compareMode ? toggleTestSelection(test) : (setSelectedTest(test), setShowTestDetails(true))}
                    >
                      <div className="flex items-center gap-4">
                        {compareMode && (
                          <input
                            type="checkbox"
                            checked={selectedTests.some(t => t.id === test.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleTestSelection(test);
                            }}
                            className="h-4 w-4"
                          />
                        )}
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            {test.patientName}
                            <Badge variant="outline" className={getPriorityColor(test.priority)}>
                              {test.priority}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {test.testType} - {test.id}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className={`text-sm font-medium ${getStatusColor(test.status)}`}>
                          {test.status}
                        </div>
                        <div className="text-sm text-muted-foreground">{test.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Test Distribution</CardTitle>
                <CardDescription>Distribution of tests by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.testsByType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analyticsData.testsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Trends</CardTitle>
                <CardDescription>Monthly test volumes and abnormal results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.trendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="tests"
                        stroke="#0088FE"
                        name="Total Tests"
                      />
                      <Line
                        type="monotone"
                        dataKey="abnormal"
                        stroke="#FF8042"
                        name="Abnormal Results"
                      />
                      <Line
                        type="monotone"
                        dataKey="avgTurnaround"
                        stroke="#82ca9d"
                        name="Avg Turnaround (hrs)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Turnaround Time</CardTitle>
                <CardDescription>Distribution of test completion times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.testTurnaround}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8">
                        {analyticsData.testTurnaround.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Abnormality by Category</CardTitle>
                <CardDescription>Test results distribution by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analyticsData.abnormalityByCategory}
                      layout="vertical"
                      stackOffset="expand"
                      barSize={30}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" unit="%" />
                      <YAxis type="category" dataKey="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="normal" stackId="a" fill="#0088FE" name="Normal" />
                      <Bar dataKey="abnormal" stackId="a" fill="#FF8042" name="Abnormal" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Test Details Dialog */}
      <Dialog open={showTestDetails} onOpenChange={setShowTestDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Test Details</DialogTitle>
            <DialogDescription>
              Detailed information about the laboratory test
            </DialogDescription>
          </DialogHeader>
          {selectedTest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient Name</Label>
                  <p className="font-medium">{selectedTest.patientName}</p>
                </div>
                <div>
                  <Label>Patient ID</Label>
                  <p className="font-medium">{selectedTest.patientId}</p>
                </div>
                <div>
                  <Label>Test Type</Label>
                  <p className="font-medium">{selectedTest.testType}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedTest.status)}>
                    {selectedTest.status}
                  </Badge>
                </div>
              </div>

              {selectedTest.results && typeof selectedTest.results === 'object' && (
                <>
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Test Results</h4>
                    <div className="space-y-2">
                      {selectedTest.results.components?.map((component: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-accent rounded">
                          <div>
                            <span className="font-medium">{component.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({component.range} {component.unit})
                            </span>
                          </div>
                          <Badge variant={component.status === "normal" ? "default" : "destructive"}>
                            {component.value} {component.unit}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {selectedTest.results.notes && (
                      <div className="mt-4">
                        <Label>Notes</Label>
                        <p className="text-sm text-muted-foreground">{selectedTest.results.notes}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Workflow Status */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Workflow Status</h4>
                <div className="relative">
                  <div className="flex justify-between mb-2">
                    {Object.keys(workflowSteps).map((step, index) => (
                      <div
                        key={step}
                        className={`flex flex-col items-center ${
                          index <= (workflowSteps as any)[selectedTest.status] ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${
                          index <= (workflowSteps as any)[selectedTest.status] ? 'bg-primary' : 'bg-muted'
                        }`} />
                        <span className="text-xs mt-1">{step.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-2 left-0 right-0 h-0.5 bg-muted -z-10" />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestDetails(false)}>
              Close
            </Button>
            <Button onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Comparison View */}
      {compareMode && selectedTests.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Comparison</CardTitle>
            <CardDescription>Compare selected test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedTests.map((test) => (
                <div key={test.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{test.patientName}</h3>
                  <p className="text-sm text-muted-foreground">{test.testType}</p>
                  {test.results && typeof test.results === 'object' && (
                    <div className="mt-2 space-y-2">
                      {test.results.components?.map((component: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{component.name}</span>
                          <span className={
                            component.status === 'normal' ? 'text-green-600' : 'text-red-600'
                          }>
                            {component.value} {component.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorLab;
