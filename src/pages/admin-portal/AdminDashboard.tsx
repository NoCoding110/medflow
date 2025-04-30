
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  Activity, 
  AlertCircle, 
  DollarSign, 
  Layers, 
  CheckSquare, 
  UserCheck, 
  Clock,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCw
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { handleActionWithToast } from "@/lib/portal-utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [refreshing, setRefreshing] = useState(false);
  const [alertsExpanded, setAlertsExpanded] = useState(false);
  
  const handleRefreshData = async () => {
    setRefreshing(true);
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));
      },
      "Dashboard data refreshed successfully",
      "Failed to refresh dashboard data"
    );
    setRefreshing(false);
  };
  
  const handleDownloadReport = async () => {
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
      },
      "Report downloaded successfully",
      "Failed to download report"
    );
  };
  
  const handleClearAlert = async (alertId: string) => {
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
      },
      "Alert cleared successfully",
      "Failed to clear alert"
    );
  };
  
  // Mock data for charts
  const patientVisitsData = [
    { name: 'Mon', visits: 35 },
    { name: 'Tue', visits: 42 },
    { name: 'Wed', visits: 38 },
    { name: 'Thu', visits: 45 },
    { name: 'Fri', visits: 48 },
    { name: 'Sat', visits: 25 },
    { name: 'Sun', visits: 20 },
  ];
  
  const revenueData = [
    { name: 'Mon', revenue: 2100 },
    { name: 'Tue', revenue: 2400 },
    { name: 'Wed', revenue: 1900 },
    { name: 'Thu', revenue: 2700 },
    { name: 'Fri', revenue: 2600 },
    { name: 'Sat', revenue: 1200 },
    { name: 'Sun', revenue: 900 },
  ];
  
  const departmentData = [
    { name: 'Cardiology', value: 35 },
    { name: 'Pediatrics', value: 25 },
    { name: 'Neurology', value: 20 },
    { name: 'Orthopedics', value: 15 },
    { name: 'Other', value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const alerts = [
    {
      id: "alert1",
      type: "critical",
      message: "Server load exceeding threshold - 85% CPU utilization",
      time: "10 minutes ago"
    },
    {
      id: "alert2",
      type: "warning",
      message: "5 staff members have not completed required compliance training",
      time: "1 hour ago"
    },
    {
      id: "alert3",
      type: "warning",
      message: "Low inventory alert: Surgical masks (23% remaining)",
      time: "2 hours ago"
    },
    {
      id: "alert4",
      type: "info",
      message: "System maintenance scheduled for tonight at 2:00 AM",
      time: "3 hours ago"
    }
  ];
  
  const displayedAlerts = alertsExpanded ? alerts : alerts.slice(0, 2);

  return (
    <div className="container p-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of system performance and clinic metrics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRefreshData} disabled={refreshing}>
            {refreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 font-medium flex items-center">
                <ChevronUp className="h-3 w-3 mr-1" /> 8%
              </span>
              <span className="ml-1">from previous {timeRange}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 font-medium flex items-center">
                <ChevronUp className="h-3 w-3 mr-1" /> 12%
              </span>
              <span className="ml-1">from previous {timeRange}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,560</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 font-medium flex items-center">
                <ChevronUp className="h-3 w-3 mr-1" /> 4.3%
              </span>
              <span className="ml-1">from previous {timeRange}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-red-500 font-medium flex items-center">
                <ChevronDown className="h-3 w-3 mr-1" /> 2%
              </span>
              <span className="ml-1">from previous {timeRange}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* KPI Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">4.8/5.0</div>
            <Progress value={96} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Based on 320 reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Staff Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">92%</div>
            <Progress value={92} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Average time per patient: 18 mins</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">No-Show Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">4.2%</div>
            <Progress value={4.2} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Down from 5.6% last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">98.7%</div>
            <Progress value={98.7} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">5 items require attention</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Visits</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientVisitsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Button variant="outline" className="ml-auto" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b98120" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Button variant="outline" className="ml-auto" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Notifications requiring your attention</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                className="ml-auto p-0 h-8 w-8"
                onClick={() => setAlertsExpanded(!alertsExpanded)}
              >
                {alertsExpanded ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {displayedAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`flex items-start p-3 rounded-lg ${
                      alert.type === 'critical' ? 'bg-red-50 border border-red-200' : 
                      alert.type === 'warning' ? 'bg-amber-50 border border-amber-200' : 
                      'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      alert.type === 'critical' ? 'bg-red-100 text-red-600' : 
                      alert.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium">{alert.message}</div>
                      <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-2"
                      onClick={() => handleClearAlert(alert.id)}
                    >
                      <CheckSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <Button className="w-full" onClick={() => setAlertsExpanded(!alertsExpanded)}>
                {alertsExpanded ? 'Show Less' : 'View All Alerts'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Tasks and Staff */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Critical Tasks</CardTitle>
            <CardDescription>
              Tasks needing immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Update system security patches</div>
                  <div className="text-sm text-gray-500">Due in 2 days</div>
                </div>
                <Button size="sm" className="ml-2">
                  <CheckSquare className="h-4 w-4 mr-1" />
                  Complete
                </Button>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Staff compliance training deadline</div>
                  <div className="text-sm text-gray-500">Due in 5 days</div>
                </div>
                <Button size="sm" className="ml-2" variant="outline">
                  <UserCheck className="h-4 w-4 mr-1" />
                  Review
                </Button>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Monthly report submission</div>
                  <div className="text-sm text-gray-500">Due in 1 week</div>
                </div>
                <Button size="sm" className="ml-2" variant="outline">
                  <Activity className="h-4 w-4 mr-1" />
                  Start
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Staff Overview</CardTitle>
            <CardDescription>
              Active staff members right now
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 text-center flex items-center justify-center">
                  <span className="font-medium text-green-600">DJ</span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Dr. Johnson</div>
                  <div className="text-sm text-gray-500">Cardiology - Room 204</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">Active</div>
                  <div className="text-xs text-gray-500">Since 8:30 AM</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-center flex items-center justify-center">
                  <span className="font-medium text-blue-600">NM</span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Nurse Martinez</div>
                  <div className="text-sm text-gray-500">Emergency - Station 3</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">Active</div>
                  <div className="text-xs text-gray-500">Since 7:15 AM</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-100 text-center flex items-center justify-center">
                  <span className="font-medium text-purple-600">AT</span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Admin Thompson</div>
                  <div className="text-sm text-gray-500">Front Desk</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-amber-600">Break</div>
                  <div className="text-xs text-gray-500">Returns in 15 mins</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col items-center justify-center border rounded-lg p-6 text-center bg-navy-800 text-white">
        <h3 className="text-xl font-medium mb-2">Need help with the admin tools?</h3>
        <p className="text-beige-300 mb-4">Our support team is available 24/7 to assist with any questions</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="bg-transparent border-orange-400 text-orange-400 hover:bg-orange-400/10">
            View Documentation
          </Button>
          <Button className="bg-orange-400 text-navy-800 hover:bg-orange-500">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
