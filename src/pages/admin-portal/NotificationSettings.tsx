
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, FileText, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const NotificationSettings = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
          <p className="text-muted-foreground">
            Configure automated alerts, reminders, and notifications
          </p>
        </div>
        <Button className="gap-2">
          <Settings className="h-4 w-4" />
          Test Notifications
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Email Notifications
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">752</div>
            <p className="text-xs text-muted-foreground">
              Sent this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              SMS Notifications
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">468</div>
            <p className="text-xs text-muted-foreground">
              Sent this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              System Notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              Generated this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Appointment Reminders</h3>
                  <p className="text-sm text-muted-foreground">
                    Notify patients about their upcoming appointments
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="appt-email" defaultChecked />
                    <Label htmlFor="appt-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="appt-sms" defaultChecked />
                    <Label htmlFor="appt-sms" className="text-xs">SMS</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Lab Results Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Alert patients when their lab results are available
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="lab-email" defaultChecked />
                    <Label htmlFor="lab-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="lab-sms" defaultChecked />
                    <Label htmlFor="lab-sms" className="text-xs">SMS</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Prescription Refills</h3>
                  <p className="text-sm text-muted-foreground">
                    Notify when prescriptions need refilling
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="rx-email" defaultChecked />
                    <Label htmlFor="rx-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="rx-sms" defaultChecked />
                    <Label htmlFor="rx-sms" className="text-xs">SMS</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Billing & Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Send invoices and payment confirmations
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="bill-email" defaultChecked />
                    <Label htmlFor="bill-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="bill-sms" />
                    <Label htmlFor="bill-sms" className="text-xs">SMS</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Follow-up Reminders</h3>
                  <p className="text-sm text-muted-foreground">
                    Remind patients about follow-up appointments
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="follow-email" defaultChecked />
                    <Label htmlFor="follow-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="follow-sms" defaultChecked />
                    <Label htmlFor="follow-sms" className="text-xs">SMS</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Staff & System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Schedule Changes</h3>
                  <p className="text-sm text-muted-foreground">
                    Alert staff about changes to their schedules
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="schedule-email" defaultChecked />
                    <Label htmlFor="schedule-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="schedule-system" defaultChecked />
                    <Label htmlFor="schedule-system" className="text-xs">System</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Critical Lab Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Immediately notify providers about critical values
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="critlab-email" defaultChecked />
                    <Label htmlFor="critlab-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="critlab-system" defaultChecked />
                    <Label htmlFor="critlab-system" className="text-xs">System</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Appointment Cancellations</h3>
                  <p className="text-sm text-muted-foreground">
                    Notify when patients cancel appointments
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="cancel-email" />
                    <Label htmlFor="cancel-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="cancel-system" defaultChecked />
                    <Label htmlFor="cancel-system" className="text-xs">System</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Inventory Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Notify when supplies are running low
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="inventory-email" defaultChecked />
                    <Label htmlFor="inventory-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="inventory-system" defaultChecked />
                    <Label htmlFor="inventory-system" className="text-xs">System</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">System Maintenance</h3>
                  <p className="text-sm text-muted-foreground">
                    Alerts about scheduled downtime or updates
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="maintenance-email" defaultChecked />
                    <Label htmlFor="maintenance-email" className="text-xs">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="maintenance-system" defaultChecked />
                    <Label htmlFor="maintenance-system" className="text-xs">System</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Notification Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Appointment Reminder</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  "Hi [patient_name], reminder: You have an appointment with [provider_name] on [appointment_date] at [appointment_time]. Reply C to confirm or call [clinic_phone] to reschedule."
                </p>
              </div>
              
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-500" />
                    <h3 className="font-medium">Lab Results Ready</h3>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  "Hi [patient_name], your lab results from [lab_date] are now available. Please log into your patient portal to view them or call [clinic_phone] with questions."
                </p>
              </div>
            </div>
            
            <Button className="w-full">
              Manage All Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
