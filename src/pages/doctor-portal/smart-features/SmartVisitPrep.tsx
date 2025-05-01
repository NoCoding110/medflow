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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { LineChart, BarChart } from "@/components/ui/charts";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
}

interface AnalyticsData {
  preparationTrends: any[];
  visitTypeDistribution: any[];
  upcomingVisits: number;
  completedPrep: number;
  pendingPrep: number;
  alerts: number;
}

export const SmartVisitPrep = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Memoized filter function
  const filteredVisits = useMemo(() => {
    return visits.filter(visit => {
      const matchesSearch = 
        visit.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.status.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === "all" || visit.preparationStatus === selectedStatus;
      const matchesType = selectedType === "all" || visit.type === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [visits, searchQuery, selectedStatus, selectedType]);

  // Memoized analytics calculations
  const calculatedAnalytics = useMemo(() => {
    if (!analytics) return null;
    
    return {
      ...analytics,
      completionRate: analytics.completedPrep / (analytics.completedPrep + analytics.pendingPrep) * 100,
      averagePrepTime: calculateAveragePrepTime(visits),
      riskScore: calculateRiskScore(visits),
    };
  }, [analytics, visits]);

  // Optimized data fetch with retry logic
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await simulateDataFetch();
      setVisits(data.visits);
      setAnalytics(data.analytics);
      setRetryCount(0);
      
      toast({
        title: "Data Updated",
        description: "Visit preparation data has been refreshed",
      });
    } catch (error) {
      setError("Failed to fetch visit data");
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(fetchData, 1000 * Math.pow(2, retryCount)); // Exponential backoff
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

  // Initial load and periodic refresh with cleanup
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  // Error boundary fallback
  if (error && retryCount >= 3) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchData} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  // Loading state
  if (isLoading && !visits.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
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
                  onClick={fetchData} 
                  disabled={isLoading}
                  className="relative"
                  data-testid="refresh-button"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  {isLoading && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-b bg-gray-50"
      >
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients, visit types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <button
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              data-testid="status-select"
              onClick={() => {}}
            >
              <span>{selectedStatus === 'all' ? 'All Status' : selectedStatus}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </div>
          <div className="grid gap-2">
            <button
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              data-testid="type-select"
              onClick={() => {}}
            >
              <span>{selectedType === 'all' ? 'All Types' : selectedType}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
          </div>
          <div className="grid gap-2">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="px-4 py-2 border-b">
            <TabsTrigger value="upcoming">Upcoming Visits</TabsTrigger>
            <TabsTrigger value="analytics" data-testid="analytics-tab">Analytics</TabsTrigger>
          </TabsList>
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
          <TabsContent value="analytics" className="p-4 h-full">
            <ScrollArea className="h-full">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle data-testid="preparation-trends">Preparation Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={analytics?.preparationTrends || []} />
                  </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Visit Type Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BarChart data={analytics?.visitTypeDistribution || []} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div className="tracking-tight text-sm font-medium">Upcoming Visits</div>
                          </div>
                          <div className="text-lg font-semibold">{analytics?.upcomingVisits}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div className="tracking-tight text-sm font-medium">Completed Prep</div>
                          </div>
                          <div className="text-lg font-semibold">{analytics?.completedPrep}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div className="tracking-tight text-sm font-medium">Pending Prep</div>
                          </div>
                          <div className="text-lg font-semibold">{analytics?.pendingPrep}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            <div className="tracking-tight text-sm font-medium">Alerts</div>
                          </div>
                          <div className="text-lg font-semibold">{analytics?.alerts}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
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
