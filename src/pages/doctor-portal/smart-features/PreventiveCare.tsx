import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Check, Bell, Search, Filter, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import AIInsightsBox from '@/components/AIInsightsBox';

// Test data for screenings
const screenings = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    screening: "Mammogram",
    date: "2025-05-15",
    status: "due",
    priority: "high",
    lastScreening: "2024-05-20",
    notes: "Patient has family history of breast cancer",
    recommendedInterval: "1 year"
  },
  {
    id: "2",
    patientName: "Michael Brown",
    screening: "Colonoscopy",
    date: "2025-05-18",
    status: "due",
    priority: "medium",
    lastScreening: "2020-05-15",
    notes: "First screening due to age requirement",
    recommendedInterval: "5 years"
  },
  {
    id: "3",
    patientName: "Emily Davis",
    screening: "Blood Pressure",
    date: "2025-05-20",
    status: "due",
    priority: "low",
    lastScreening: "2025-02-20",
    notes: "Regular monitoring required",
    recommendedInterval: "3 months"
  }
];

// Test data for completed tasks
const completedTasks = [
  {
    id: "1",
    patientName: "John Smith",
    task: "Annual Physical",
    completedDate: "2025-04-25",
    findings: "Normal examination, all vitals within range",
    nextDue: "2026-04-25"
  },
  {
    id: "2",
    patientName: "Lisa Anderson",
    task: "Diabetes Screening",
    completedDate: "2025-04-23",
    findings: "HbA1c levels normal",
    nextDue: "2026-04-23"
  },
  {
    id: "3",
    patientName: "Robert Wilson",
    task: "Cholesterol Test",
    completedDate: "2025-04-20",
    findings: "LDL slightly elevated, recommended dietary changes",
    nextDue: "2025-10-20"
  }
];

// Test data for alerts
const alerts = [
  {
    id: "1",
    type: "Overdue Screening",
    patientName: "David Miller",
    description: "Colonoscopy overdue by 3 months",
    priority: "high",
    date: "2025-02-15"
  },
  {
    id: "2",
    type: "Follow-up Required",
    patientName: "Susan White",
    description: "Abnormal mammogram results need follow-up",
    priority: "high",
    date: "2025-04-20"
  },
  {
    id: "3",
    type: "Vaccination Due",
    patientName: "James Thompson",
    description: "Annual flu shot due",
    priority: "medium",
    date: "2025-04-25"
  }
];

// Test data for health maintenance items
const healthMaintenance = [
  {
    id: "1",
    category: "Annual Wellness Visits",
    count: 12,
    status: "Overdue",
    patients: [
      { name: "John Doe", dueDate: "2025-05-01", lastVisit: "2024-05-01" },
      { name: "Jane Smith", dueDate: "2025-05-15", lastVisit: "2024-05-15" }
    ]
  },
  {
    id: "2",
    category: "Immunizations",
    count: 8,
    status: "Due Soon",
    patients: [
      { name: "Mike Johnson", dueDate: "2025-06-01", type: "Flu Shot" },
      { name: "Sarah Davis", dueDate: "2025-06-15", type: "Pneumonia" }
    ]
  },
  {
    id: "3",
    category: "Cancer Screenings",
    count: 5,
    status: "Scheduled",
    patients: [
      { name: "Robert Brown", date: "2025-05-20", type: "Colonoscopy" },
      { name: "Emily Wilson", date: "2025-05-25", type: "Mammogram" }
    ]
  }
];

const PreventiveCare = () => {
  const navigate = useNavigate();
  const [selectedPatientId, setSelectedPatientId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handlePatientClick = (patientId: string) => {
    navigate(`/doctor/patients/${patientId}/profile`);
  };

  const filteredScreenings = screenings.filter(screening => {
    const matchesSearch = screening.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || screening.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || screening.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Preventive Care</h1>
      <AIInsightsBox />
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="due">Due</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        {/* Due Screenings Card */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Due Screenings</CardTitle>
                <Calendar className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Pending this month</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Due Screenings</DialogTitle>
              <DialogDescription>
                Screenings that need to be scheduled or completed this month
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {filteredScreenings.map((screening) => (
                  <div
                    key={screening.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                    onClick={() => handlePatientClick(screening.id)}
                  >
                    <div>
                      <p className="font-medium">{screening.patientName}</p>
                      <p className="text-sm text-muted-foreground">{screening.screening}</p>
                      <p className="text-sm text-muted-foreground">Due: {screening.date}</p>
                    </div>
                    <Badge
                      className={
                        screening.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : screening.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {screening.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Completed Tasks Card */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                <Check className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Completed Tasks</DialogTitle>
              <DialogDescription>
                Preventive care tasks completed in the last 30 days
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                    onClick={() => handlePatientClick(task.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{task.patientName}</p>
                        <p className="text-sm text-muted-foreground">{task.task}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <p className="text-sm">Findings: {task.findings}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Next due: {task.nextDue}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Alerts Card */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                <Bell className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">High priority</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Preventive Care Alerts</DialogTitle>
              <DialogDescription>
                High priority alerts requiring immediate attention
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                    onClick={() => handlePatientClick(alert.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{alert.patientName}</p>
                        <p className="text-sm font-medium">{alert.type}</p>
                      </div>
                      <Badge
                        className={
                          alert.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm">{alert.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Date: {alert.date}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Upcoming Screenings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Screenings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {screenings.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                  onClick={() => handlePatientClick(item.id)}
                >
                  <div>
                    <p className="font-medium">{item.patientName}</p>
                    <p className="text-sm text-muted-foreground">{item.screening}</p>
                    <p className="text-sm text-muted-foreground">Due: {item.date}</p>
                  </div>
                  <Badge
                    className={
                      item.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : item.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Maintenance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Health Maintenance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthMaintenance.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">{item.status}</p>
                      </div>
                      <div className="text-xl font-bold">{item.count}</div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{item.category}</DialogTitle>
                      <DialogDescription>
                        Detailed information about {item.category.toLowerCase()}
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {item.patients.map((patient, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                            onClick={() => handlePatientClick(patient.name)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                {'type' in patient && (
                                  <p className="text-sm text-muted-foreground">
                                    Type: {patient.type}
                                  </p>
                                )}
                                {'lastVisit' in patient && (
                                  <p className="text-sm text-muted-foreground">
                                    Last Visit: {patient.lastVisit}
                                  </p>
                                )}
                                {'dueDate' in patient && (
                                  <p className="text-sm text-muted-foreground">
                                    Due Date: {patient.dueDate}
                                  </p>
                                )}
                                {'date' in patient && (
                                  <p className="text-sm text-muted-foreground">
                                    Scheduled: {patient.date}
                                  </p>
                                )}
                              </div>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreventiveCare;
