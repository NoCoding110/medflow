import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  Clock,
  User,
  FileText,
  Brain,
  AlertCircle,
  Loader2,
  ChevronDown,
  BarChart2,
  LineChart,
  PieChart,
  TrendingUp,
  Bell,
  Settings,
  Download,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { LineChart as RechartsLineChart, BarChart as RechartsBarChart, PieChart as RechartsPieChart } from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "react-hot-toast";

interface VisitData {
  id: string;
  patientName: string;
  dateTime: string;
  status: string;
  type: string;
  preparationStatus: string;
  aiSuggestions: string[];
  requiredDocuments: string[];
  notes: string;
  patientId: string;
}

interface AnalyticsData {
  preparationTrends: any[];
  visitTypeDistribution: any[];
  upcomingVisits: number;
  completedPrep: number;
  pendingPrep: number;
  alerts: number;
  comparison: { previous: number; current: number; change: number; trend: 'improved' | 'declined' | 'stable'; };
}

interface AIInsight {
  id: string;
  message: string;
  type: 'trend' | 'recommendation' | 'risk';
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
}

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  type: string;
  timestamp: string;
  patientId: string;
}

interface AnalyticsFilter {
  dateRange: DateRange;
  visitTypes: string[];
  status: string[];
  doctors: string[];
}

export const SmartVisitPrep = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [analyticsFilter, setAnalyticsFilter] = useState<AnalyticsFilter>({
    dateRange: undefined,
    visitTypes: [],
    status: [],
    doctors: [],
  });
  const [viewPreferences, setViewPreferences] = useLocalStorage('visitPrepPreferences', {
    showAI: true,
    showAnalytics: true,
    showNotifications: true,
    autoRefresh: true,
  });

  // WebSocket connection for real-time updates
  const { lastMessage, sendMessage } = useWebSocket('visit-prep');

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch data from backend
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [visitsRes, analyticsRes, aiRes, alertsRes] = await Promise.all([
        fetch('/api/visits'),
        fetch('/api/visits/analytics'),
        fetch('/api/visits/insights/ai'),
        fetch('/api/visits/alerts')
      ]);
      if (!visitsRes.ok || !analyticsRes.ok || !aiRes.ok || !alertsRes.ok) {
        throw new Error('Failed to fetch data');
      }
      const [visitsData, analyticsData, aiData, alertsData] = await Promise.all([
        visitsRes.json(),
        analyticsRes.json(),
        aiRes.json(),
        alertsRes.json()
      ]);
      setVisits(visitsData);
      setAnalytics(analyticsData);
      setAiInsights(aiData);
      setAlerts(alertsData);
      setRetryCount(0);
      toast({
        title: "Data Updated",
        description: "Visit preparation data has been refreshed",
      });
    } catch (error) {
      setError("Failed to fetch visit data");
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(fetchData, 1000 * Math.pow(2, retryCount));
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch visit data after multiple attempts",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [retryCount, toast]);

  useEffect(() => {
    fetchData();
  }, []);

  // Real-time updates handler
  useEffect(() => {
    if (lastMessage) {
      const update = JSON.parse(lastMessage.data);
      if (update.type === 'visit_update') {
        setVisits(prev => prev.map(v => v.id === update.visit.id ? update.visit : v));
      } else if (update.type === 'ai_suggestion') {
        setAiInsights(prev => [...prev, update.suggestion]);
      }
    }
  }, [lastMessage]);

  // Auto-refresh if enabled
  useEffect(() => {
    if (viewPreferences.autoRefresh) {
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [viewPreferences.autoRefresh, fetchData]);

  // Filtering and sorting
  const filteredVisits = useMemo(() => {
    return visits.filter(visit => {
      const matchesSearch = 
        visit.patientName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        visit.type.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        visit.status.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        visit.notes.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus = selectedStatus === "all" || visit.preparationStatus === selectedStatus;
      const matchesType = selectedType === "all" || visit.type === selectedType;
      // Date range filter can be added here if backend supports
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [visits, debouncedSearch, selectedStatus, selectedType]);

  // Analytics calculations
  const calculatedAnalytics = useMemo(() => {
    if (!analytics) return null;
    return {
      ...analytics,
      completionRate: analytics.completedPrep / (analytics.completedPrep + analytics.pendingPrep) * 100,
    };
  }, [analytics]);

  // Helper for alert color
  const getAlertStatusColor = (severity: 'info' | 'warning' | 'critical') => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  // Export data function
  const handleExportData = () => {
    const data = {
      visits,
      analytics,
      aiInsights,
      alerts,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visit-prep-data-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Enhanced render with new features
  return (
    <div className="flex flex-col h-full">
      {/* Header with enhanced controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 border-b"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            data-testid="back-button"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Visit Preparation</h1>
            <p className="text-sm text-muted-foreground">
              Prepare for upcoming patient visits with AI assistance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Advanced Filters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={fetchData} 
                  disabled={isLoading}
                  className="relative"
                  data-testid="refresh-button"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Date Range</Label>
                <DateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                />
              </div>
              <div>
                <Label>Visit Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="initial">Initial Visit</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients, visit types, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="px-4 py-2 border-b">
            <TabsTrigger value="upcoming">Upcoming Visits</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* Upcoming Visits Tab */}
          <TabsContent value="upcoming" className="p-4 h-full">
            <ScrollArea className="h-full">
              <div className="grid gap-4">
                {filteredVisits.map((visit) => (
                  <Card key={visit.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          {visit.patientName}
                        </CardTitle>
                        <Badge 
                          variant="outline"
                          data-testid={`status-badge-${visit.preparationStatus}`}
                        >
                          {visit.preparationStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {visit.dateTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {visit.type}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">AI Suggestions</h3>
                          <ul className="list-disc pl-4 space-y-1">
                            {visit.aiSuggestions.map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Required Documents</h3>
                          <ul className="list-disc pl-4 space-y-1">
                            {visit.requiredDocuments.map((doc, index) => (
                              <li key={index}>{doc}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="p-4 h-full">
            <ScrollArea className="h-full">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Visit Preparation Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RechartsLineChart
                      width={800}
                      height={300}
                      data={calculatedAnalytics?.preparationTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      {/* Add chart components */}
                    </RechartsLineChart>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Visit Type Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RechartsPieChart
                        width={400}
                        height={300}
                        data={calculatedAnalytics?.visitTypeDistribution}
                      >
                        {/* Add chart components */}
                      </RechartsPieChart>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Doctor Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RechartsBarChart
                        width={400}
                        height={300}
                        data={calculatedAnalytics?.doctorPerformance}
                      >
                        {/* Add chart components */}
                      </RechartsBarChart>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="p-4 h-full">
            <ScrollArea className="h-full">
              <div className="grid gap-4">
                {aiInsights.map((insight, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          {insight.type}
                        </CardTitle>
                        <Badge variant={insight.severity === 'critical' ? 'destructive' : insight.severity === 'warning' ? 'outline' : 'default'}>
                          {insight.severity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{insight.message}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {new Date(insight.timestamp).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper functions
const calculateVisitTypeDistribution = (visits: VisitData[]) => {
  const distribution = visits.reduce((acc, visit) => {
    acc[visit.type] = (acc[visit.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(distribution).map(([type, count]) => ({
    name: type,
    value: count,
  }));
};

const calculatePreparationTrends = (visits: VisitData[]) => {
  // Implementation for preparation trends calculation
  return [];
};

const calculateDoctorPerformance = (visits: VisitData[]) => {
  // Implementation for doctor performance calculation
  return [];
};

const fetchAISuggestions = async (visits: VisitData[]): Promise<AISuggestion[]> => {
  // Implementation for fetching AI suggestions
  return [];
};

// Helper function to simulate data fetching
const simulateDataFetch = async (): Promise<{ visits: VisitData[], analytics: AnalyticsData }> => {
  return {
    visits: [
      {
        id: "1",
        patientName: "John Doe",
        dateTime: "2024-03-20 09:00 AM",
        status: "scheduled",
        type: "initial",
        preparationStatus: "pending",
        aiSuggestions: [
          "Review previous medical history",
          "Prepare questionnaire for chronic condition",
          "Check recent lab results"
        ],
        requiredDocuments: [
          "Medical History Form",
          "Insurance Information",
          "Previous Test Results"
        ],
        notes: "Initial consultation for chronic condition"
      },
      {
        id: "2",
        patientName: "Jane Smith",
        dateTime: "2024-03-20 10:30 AM",
        status: "confirmed",
        type: "follow_up",
        preparationStatus: "completed",
        aiSuggestions: [
          "Compare with last visit vitals",
          "Review treatment progress",
          "Prepare medication adjustment options"
        ],
        requiredDocuments: [
          "Progress Notes",
          "Updated Medication List",
          "Recent Lab Work"
        ],
        notes: "Follow-up for medication adjustment"
      },
      // Add more mock visits as needed
    ],
    analytics: {
      preparationTrends: [
        { date: "2024-01", completed: 45, pending: 12 },
        { date: "2024-02", completed: 52, pending: 8 },
        { date: "2024-03", completed: 48, pending: 15 }
      ],
      visitTypeDistribution: [
        { type: "Initial", count: 25 },
        { type: "Follow-up", count: 45 },
        { type: "Consultation", count: 30 }
      ],
      upcomingVisits: 15,
      completedPrep: 8,
      pendingPrep: 7,
      alerts: 3
    }
  };
};

// Helper functions
const calculateAveragePrepTime = (visits: VisitData[]): number => {
  // Implementation for calculating average preparation time
  return 0; // Placeholder
};

const calculateRiskScore = (visits: VisitData[]): number => {
  // Implementation for calculating risk score
  return 0; // Placeholder
};
