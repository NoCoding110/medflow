import React, { useState, useCallback } from 'react';
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
  Brush
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar as CalendarIcon, 
  Download, 
  Filter, 
  RefreshCw,
  Pill,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { format as formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

// Enhanced test data for prescription trends (12 months)
const prescriptionTrendsData = [
  { month: 'Jan', prescriptions: 45, adherence: 82, cost: 12500, alerts: 5 },
  { month: 'Feb', prescriptions: 52, adherence: 85, cost: 14200, alerts: 3 },
  { month: 'Mar', prescriptions: 48, adherence: 78, cost: 13100, alerts: 7 },
  { month: 'Apr', prescriptions: 61, adherence: 88, cost: 16700, alerts: 2 },
  { month: 'May', prescriptions: 55, adherence: 84, cost: 15000, alerts: 4 },
  { month: 'Jun', prescriptions: 67, adherence: 91, cost: 18200, alerts: 1 },
  { month: 'Jul', prescriptions: 58, adherence: 86, cost: 15800, alerts: 3 },
  { month: 'Aug', prescriptions: 63, adherence: 89, cost: 17100, alerts: 2 },
  { month: 'Sep', prescriptions: 59, adherence: 87, cost: 16000, alerts: 4 },
  { month: 'Oct', prescriptions: 64, adherence: 90, cost: 17400, alerts: 2 },
  { month: 'Nov', prescriptions: 61, adherence: 88, cost: 16600, alerts: 3 },
  { month: 'Dec', prescriptions: 70, adherence: 92, cost: 19000, alerts: 1 },
];

// Enhanced medication distribution data
const medicationDistributionData = [
  { name: 'Antibiotics', value: 30, color: '#0088FE', interactions: 12, cost: 15000 },
  { name: 'Pain Medication', value: 25, color: '#00C49F', interactions: 8, cost: 12000 },
  { name: 'Cardiovascular', value: 20, color: '#FFBB28', interactions: 15, cost: 18000 },
  { name: 'Antidepressants', value: 15, color: '#FF8042', interactions: 6, cost: 9000 },
  { name: 'Others', value: 10, color: '#8884d8', interactions: 4, cost: 6000 },
];

// Enhanced adherence rates data
const adherenceRatesData = [
  { ageGroup: '18-30', rate: 75, patients: 120, alerts: 15, cost: 8500 },
  { ageGroup: '31-45', rate: 82, patients: 180, alerts: 12, cost: 12000 },
  { ageGroup: '46-60', rate: 88, patients: 210, alerts: 8, cost: 15500 },
  { ageGroup: '60+', rate: 79, patients: 160, alerts: 18, cost: 11000 },
];

// Enhanced refill patterns data
const refillPatternsData = [
  { day: 'Mon', onTime: 28, delayed: 8, cancelled: 3, cost: 4500 },
  { day: 'Tue', onTime: 32, delayed: 6, cancelled: 2, cost: 5200 },
  { day: 'Wed', onTime: 30, delayed: 10, cancelled: 4, cost: 4800 },
  { day: 'Thu', onTime: 35, delayed: 7, cancelled: 1, cost: 5500 },
  { day: 'Fri', onTime: 25, delayed: 12, cancelled: 5, cost: 4200 },
];

// Risk levels for alerts
const riskLevels = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

interface AnalyticsFilters {
  timeRange: string;
  medicationType: string;
  ageGroup: string;
  adherenceThreshold: number;
  showAlerts: boolean;
  costRange: [number, number];
}

const PrescriptionAnalytics = () => {
  const [date, setDate] = useState<Date>();
  const [filters, setFilters] = useState<AnalyticsFilters>({
    timeRange: "7d",
    medicationType: "all",
    ageGroup: "all",
    adherenceThreshold: 75,
    showAlerts: true,
    costRange: [0, 20000],
  });
  const [activeChart, setActiveChart] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Analytics calculations
  const analytics = {
    totalPrescriptions: prescriptionTrendsData.reduce((sum, item) => sum + item.prescriptions, 0),
    averageAdherence: Math.round(
      prescriptionTrendsData.reduce((sum, item) => sum + item.adherence, 0) / prescriptionTrendsData.length
    ),
    totalCost: prescriptionTrendsData.reduce((sum, item) => sum + item.cost, 0),
    totalAlerts: prescriptionTrendsData.reduce((sum, item) => sum + item.alerts, 0),
  };

  // Handle data export
  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    setIsExporting(true);
    try {
      // Simulate export delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const data = {
        trends: prescriptionTrendsData,
        distribution: medicationDistributionData,
        adherence: adherenceRatesData,
        patterns: refillPatternsData,
      };

      const currentDate = formatDate(new Date(), 'yyyy-MM-dd');
      const fileName = `prescription-analytics-${format}-${currentDate}`;
      
      // In a real application, you would send this to your backend
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Successfully exported data as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-bold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'Adherence' ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container py-6 space-y-6">
      {/* Header with Analytics Summary */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Prescription Analytics</h1>
            <p className="text-muted-foreground">View prescription statistics and trends</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Select value={filters.timeRange} onValueChange={(value) => setFilters({ ...filters, timeRange: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" onClick={() => handleExport('csv')} disabled={isExporting}>
                    Export as CSV
                  </Button>
                  <Button variant="ghost" onClick={() => handleExport('pdf')} disabled={isExporting}>
                    Export as PDF
                  </Button>
                  <Button variant="ghost" onClick={() => handleExport('excel')} disabled={isExporting}>
                    Export as Excel
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Prescriptions</p>
                  <h3 className="text-2xl font-bold">{analytics.totalPrescriptions}</h3>
                </div>
                <Pill className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Adherence</p>
                  <h3 className="text-2xl font-bold">{analytics.averageAdherence}%</h3>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                  <h3 className="text-2xl font-bold">${(analytics.totalCost / 1000).toFixed(1)}k</h3>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <h3 className="text-2xl font-bold">{analytics.totalAlerts}</h3>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Advanced Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Medication Type</Label>
                  <Select
                    value={filters.medicationType}
                    onValueChange={(value) => setFilters({ ...filters, medicationType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select medication type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="antibiotics">Antibiotics</SelectItem>
                      <SelectItem value="pain">Pain Medication</SelectItem>
                      <SelectItem value="cardio">Cardiovascular</SelectItem>
                      <SelectItem value="antidepressants">Antidepressants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Age Group</Label>
                  <Select
                    value={filters.ageGroup}
                    onValueChange={(value) => setFilters({ ...filters, ageGroup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ages</SelectItem>
                      <SelectItem value="18-30">18-30</SelectItem>
                      <SelectItem value="31-45">31-45</SelectItem>
                      <SelectItem value="46-60">46-60</SelectItem>
                      <SelectItem value="60+">60+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Adherence Threshold</Label>
                  <Slider
                    value={[filters.adherenceThreshold]}
                    onValueChange={([value]) => setFilters({ ...filters, adherenceThreshold: value })}
                    max={100}
                    step={5}
                  />
                  <p className="text-sm text-muted-foreground text-right">{filters.adherenceThreshold}%</p>
                </div>
                <div className="space-y-2">
                  <Label>Cost Range</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={filters.costRange[0]}
                      onChange={(e) => setFilters({
                        ...filters,
                        costRange: [parseInt(e.target.value), filters.costRange[1]]
                      })}
                      placeholder="Min"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      value={filters.costRange[1]}
                      onChange={(e) => setFilters({
                        ...filters,
                        costRange: [filters.costRange[0], parseInt(e.target.value)]
                      })}
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Show Alerts</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={filters.showAlerts}
                      onCheckedChange={(checked) => setFilters({ ...filters, showAlerts: checked })}
                    />
                    <Label>Include alert indicators</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Prescription Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Prescription Trends</CardTitle>
            <CardDescription>Monthly prescription volume and adherence rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prescriptionTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Brush dataKey="month" height={30} stroke="#8884d8" />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="prescriptions"
                    stroke="#0088FE"
                    name="Prescriptions"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="adherence"
                    stroke="#00C49F"
                    name="Adherence %"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Medication Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Medication Distribution</CardTitle>
            <CardDescription>Distribution of prescribed medication types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={medicationDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(data, index) => {
                      setActiveChart(`pie-${index}`);
                    }}
                  >
                    {medicationDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        opacity={activeChart === `pie-${index}` ? 1 : 0.7}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ScrollArea className="h-[100px] mt-4">
              <div className="space-y-2">
                {medicationDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>{item.value}%</span>
                      <Badge variant={item.interactions > 10 ? "destructive" : "secondary"}>
                        {item.interactions} interactions
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Adherence Rates Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Adherence Rates</CardTitle>
            <CardDescription>Medication adherence rates by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adherenceRatesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageGroup" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="rate"
                    fill="#8884d8"
                    label={{ position: 'top' }}
                    name="Adherence Rate"
                  >
                    {adherenceRatesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.rate >= filters.adherenceThreshold ? '#00C49F' : '#FF8042'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Target Adherence: {filters.adherenceThreshold}%</span>
                <span>Total Patients: {adherenceRatesData.reduce((sum, item) => sum + item.patients, 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refill Patterns Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Refill Patterns</CardTitle>
            <CardDescription>Weekly medication refill patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={refillPatternsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="onTime" stackId="a" fill="#00C49F" name="On-time Refills" />
                  <Bar dataKey="delayed" stackId="a" fill="#FF8042" name="Delayed Refills" />
                  <Bar dataKey="cancelled" stackId="a" fill="#FF4842" name="Cancelled Refills" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="space-x-4">
                <Badge variant="outline">
                  Total On-time: {refillPatternsData.reduce((sum, item) => sum + item.onTime, 0)}
                </Badge>
                <Badge variant="outline" className="border-orange-500 text-orange-500">
                  Total Delayed: {refillPatternsData.reduce((sum, item) => sum + item.delayed, 0)}
                </Badge>
                <Badge variant="outline" className="border-red-500 text-red-500">
                  Total Cancelled: {refillPatternsData.reduce((sum, item) => sum + item.cancelled, 0)}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Average Cost per Day: ${(refillPatternsData.reduce((sum, item) => sum + item.cost, 0) / refillPatternsData.length).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrescriptionAnalytics; 