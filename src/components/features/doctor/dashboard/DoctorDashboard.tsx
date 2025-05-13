import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Activity, 
  AlertCircle,
  Brain,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { LineChart, BarChart, PieChart } from "@/components/ui/charts";
import { useToast } from "@/components/ui/use-toast";

interface DashboardData {
  appointments: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
  };
  patients: {
    total: number;
    new: number;
    active: number;
  };
  analytics: {
    patientTrends: any[];
    appointmentStats: any[];
    revenueData: any[];
  };
  alerts: {
    critical: number;
    warning: number;
    info: number;
  };
  aiInsights: {
    predictions: any[];
    recommendations: any[];
  };
}

export const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedPatient, setSelectedPatient] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // Simulated real-time updates
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const data = await simulateDataFetch();
        setDashboardData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Dashboard data refreshed",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients, appointments..."
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center gap-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="active">Active Patients</SelectItem>
              <SelectItem value="new">New Patients</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.appointments.total || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.appointments.upcoming || 0} upcoming
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.patients.active || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.patients.new || 0} new this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Patient Activity</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData?.analytics.patientTrends?.length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active engagements
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.alerts.critical || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.alerts.warning || 0} warnings
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart data={dashboardData?.analytics.patientTrends || []} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointment Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart data={dashboardData?.analytics.appointmentStats || []} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart data={dashboardData?.analytics.revenueData || []} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart data={dashboardData?.analytics.patientTrends || []} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-insights" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.aiInsights.predictions.map((prediction, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1">
                          {prediction.type}
                        </Badge>
                        <div>
                          <p className="font-medium">{prediction.title}</p>
                          <p className="text-sm text-muted-foreground">{prediction.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.aiInsights.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1">
                          {recommendation.priority}
                        </Badge>
                        <div>
                          <p className="font-medium">{recommendation.title}</p>
                          <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

// Helper function to simulate data fetching
const simulateDataFetch = async (): Promise<DashboardData> => {
  return {
    appointments: {
      total: 156,
      upcoming: 23,
      completed: 128,
      cancelled: 5
    },
    patients: {
      total: 245,
      new: 12,
      active: 189
    },
    analytics: {
      patientTrends: [
        { date: "2024-01", value: 120 },
        { date: "2024-02", value: 145 },
        { date: "2024-03", value: 189 }
      ],
      appointmentStats: [
        { type: "Regular", count: 85 },
        { type: "Follow-up", count: 45 },
        { type: "Emergency", count: 26 }
      ],
      revenueData: [
        { month: "Jan", revenue: 45000 },
        { month: "Feb", revenue: 52000 },
        { month: "Mar", revenue: 48000 }
      ]
    },
    alerts: {
      critical: 3,
      warning: 7,
      info: 12
    },
    aiInsights: {
      predictions: [
        {
          type: "Patient Risk",
          title: "High Risk Patient Identified",
          description: "Patient #12345 shows signs of potential complications"
        },
        {
          type: "Resource Usage",
          title: "Resource Optimization",
          description: "Expected high patient load next week"
        }
      ],
      recommendations: [
        {
          priority: "High",
          title: "Schedule Follow-up",
          description: "Patient #67890 requires immediate follow-up"
        },
        {
          priority: "Medium",
          title: "Update Treatment Plan",
          description: "Consider adjusting medication for Patient #54321"
        }
      ]
    }
  };
}; 