import React, { useState, useEffect, useCallback } from "react";
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
  Brain,
  AlertCircle,
  TestTube,
  Microscope,
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
  AreaChart,
  Area,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { Workflow, LabTest } from "@/lib/types";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { PDFDocument, rgb } from 'pdf-lib';
import { supabase } from '@/lib/supabaseClient';

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
  const [tests, setTests] = useState<LabTest[]>([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [errorTests, setErrorTests] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedTests, setSelectedTests] = useState<LabTest[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Add new state for AI insights and alerts
  const [aiInsights, setAiInsights] = useState<{
    id: string;
    type: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
    patientName?: string;
  }[]>([]);

  const [criticalAlerts, setCriticalAlerts] = useState<{
    id: string;
    type: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
    patientName?: string;
  }[]>([]);

  // Add new analytics state
  const [advancedAnalytics, setAdvancedAnalytics] = useState<{
    turnaroundTime: { category: string; average: number }[];
    abnormalityRates: { category: string; rate: number }[];
    testVolumeTrends: { date: string; count: number }[];
    departmentPerformance: { department: string; efficiency: number }[];
  } | null>(null);

  // Move export functions above handleExport
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

  // Fetch lab tests from Supabase
  const fetchTests = useCallback(async () => {
    setLoadingTests(true);
    setErrorTests(null);
    try {
      let query = supabase.from('lab_tests').select('*');
      if (filterStatus !== 'all') query = query.eq('status', filterStatus);
      if (filterPriority !== 'all') query = query.eq('priority', filterPriority);
      if (searchQuery) query = query.ilike('patient_name', `%${searchQuery}%`);
      const { data, error } = await query.order('date', { ascending: false });
      if (error) throw error;
      setTests(data || []);
    } catch (e: any) {
      setErrorTests(e.message || 'Failed to load lab tests');
      setTests([]);
    } finally {
      setLoadingTests(false);
    }
  }, [filterStatus, filterPriority, searchQuery]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  const filteredTests = tests; // Filtering is now handled by backend

  // Fetch AI insights from Supabase
  const fetchInsights = useCallback(async () => {
    setLoadingInsights(true);
    try {
      const { data, error } = await supabase.from('ai_insights').select('*').order('timestamp', { ascending: false });
      if (error) throw error;
      setInsights({ patterns: [], recommendations: data || [] });
    } catch (e) {
      setInsights(null);
      toast({ title: 'Error', description: 'Failed to load AI insights', variant: 'destructive' });
    } finally {
      setLoadingInsights(false);
    }
  }, [toast]);

  // Fetch AI insights and alerts from Supabase
  const fetchAiInsights = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('ai_insights').select('*').order('timestamp', { ascending: false });
      if (error) throw error;
      setAiInsights(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load AI insights', variant: 'destructive' });
    }
  }, [toast]);

  const fetchCriticalAlerts = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('alerts').select('*').order('timestamp', { ascending: false });
      if (error) throw error;
      setCriticalAlerts(data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load alerts', variant: 'destructive' });
    }
  }, [toast]);

  const fetchAdvancedAnalytics = useCallback(async () => {
    try {
      const res = await fetch('/api/lab/analytics/advanced', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch advanced analytics');
      const data = await res.json();
      setAdvancedAnalytics(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load advanced analytics', variant: 'destructive' });
    }
  }, [toast]);

  useEffect(() => {
    fetchInsights();
    fetchAiInsights();
    fetchCriticalAlerts();
    fetchAdvancedAnalytics();
  }, [fetchInsights, fetchAiInsights, fetchCriticalAlerts, fetchAdvancedAnalytics]);

  // Move these functions inside the component to access state
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

  const toggleTestSelection = (test: LabTest) => {
    if (selectedTests.find(t => t.id === test.id)) {
      setSelectedTests(prev => prev.filter(t => t.id !== test.id));
    } else {
      setSelectedTests(prev => [...prev, test]);
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
                <h3 className="text-2xl font-bold">{tests.length}</h3>
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
                  {tests.filter(t => t.status === "Pending").length}
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
                  {tests.filter(t => t.status === "Completed" && t.date === format(new Date(), "yyyy-MM-dd")).length}
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
                  {tests.filter(t => t.priority === "urgent").length}
                </h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Abnormal Results</p>
                <h3 className="text-2xl font-bold">
                  {tests.filter(t => t.results?.components?.some(c => c.status !== "normal")).length}
                </h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Alerts Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              AI Insights
            </CardTitle>
            <CardDescription>Smart analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`h-8 w-8 rounded-full ${
                        insight.severity === 'high' ? 'bg-red-100 text-red-700' :
                        insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      } flex items-center justify-center`}>
                        <Brain className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                        {insight.patientName && (
                          <Badge variant="outline" className="mt-2">
                            {insight.patientName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Critical Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`h-8 w-8 rounded-full ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      } flex items-center justify-center`}>
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        {alert.patientName && (
                          <Badge variant="outline" className="mt-2">
                            {alert.patientName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
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
              {loadingTests ? (
                <div>Loading...</div>
              ) : errorTests ? (
                <div className="text-red-600">{errorTests}</div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {filteredTests.length === 0 ? (
                      <div className="text-muted-foreground">No lab tests found.</div>
                    ) : (
                      filteredTests.map((test) => (
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
                      ))
                    )}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Test Distribution</CardTitle>
                <CardDescription>Distribution of tests by category</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingAnalytics ? (
                  <div>Loading...</div>
                ) : analytics && analytics.byCategory ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(analytics.byCategory).map(([name, value]) => ({ name, value }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.entries(analytics.byCategory).map(([name], index) => (
                          <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div>No data</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Trends</CardTitle>
                <CardDescription>Monthly test volumes and abnormal results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <div className="flex items-center justify-center h-full text-muted-foreground">No data</div>
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
                  <div className="flex items-center justify-center h-full text-muted-foreground">No data</div>
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
                  <div className="flex items-center justify-center h-full text-muted-foreground">No data</div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Automated analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingInsights ? (
                  <div>Loading...</div>
                ) : insights ? (
                  <div>
                    <h4 className="font-medium mb-2">Patterns</h4>
                    <pre className="bg-muted p-2 rounded text-xs mb-2">{JSON.stringify(insights.patterns, null, 2)}</pre>
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    {insights.recommendations && insights.recommendations.length > 0 ? (
                      <ul className="list-disc pl-6">
                        {insights.recommendations.map((rec: any, idx: number) => (
                          <li key={idx} className={rec.priority === 'high' ? 'text-red-600' : 'text-yellow-700'}>
                            <b>{rec.type}:</b> {rec.message}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>No recommendations</div>
                    )}
                  </div>
                ) : (
                  <div>No insights</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Turnaround Time Analysis</CardTitle>
                <CardDescription>Average processing time by test category</CardDescription>
              </CardHeader>
              <CardContent>
                {advancedAnalytics?.turnaroundTime ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={advancedAnalytics.turnaroundTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="average" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Volume Trends</CardTitle>
                <CardDescription>Daily test volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                {advancedAnalytics?.testVolumeTrends ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={advancedAnalytics.testVolumeTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
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
