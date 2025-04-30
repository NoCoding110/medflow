
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Check, Bell } from "lucide-react";
import PatientFilter from "@/components/doctor-portal/smart-features/PatientFilter";

const PreventiveCare = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("all");

  const handlePatientChange = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Preventive Care Management</h1>
      
      <PatientFilter onPatientChange={handlePatientChange} />
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Screenings</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Bell className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Screenings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { patient: "Sarah Johnson", screening: "Mammogram", date: "2025-05-15" },
                { patient: "Michael Brown", screening: "Colonoscopy", date: "2025-05-18" },
                { patient: "Emily Davis", screening: "Blood Pressure", date: "2025-05-20" },
                { patient: "Robert Wilson", screening: "Cholesterol Test", date: "2025-05-22" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.patient}</p>
                    <p className="text-sm text-muted-foreground">{item.screening}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Maintenance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Annual Wellness Visits", count: 12, status: "Overdue" },
                { title: "Immunizations", count: 8, status: "Due Soon" },
                { title: "Cancer Screenings", count: 5, status: "Scheduled" },
                { title: "Chronic Disease Monitoring", count: 15, status: "In Progress" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.status}</p>
                  </div>
                  <div className="text-xl font-bold">{item.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreventiveCare;
