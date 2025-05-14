import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRealtimeUpdates } from "@/hooks/use-realtime-updates";
import { WearableDataPanel } from "@/components/patient-dashboard/WearableDataPanel";
import { AIInsightsPanel } from "@/components/patient-dashboard/AIInsightsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Calendar as CalendarIcon, Clock, User } from "lucide-react";

export const PatientDashboard = () => {
  const { user } = useAuth();
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use real-time updates hook
  const { patientData, wearableData, loading: realtimeLoading, error: realtimeError } = useRealtimeUpdates(user?.id || "");

  useEffect(() => {
    // Fetch next appointment and other data
    // This would be implemented based on your appointment management system
    setLoading(false);
  }, []);

  if (loading || realtimeLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (realtimeError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error loading dashboard data</div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Here's your health overview</p>
        </div>
        <Button>Schedule Appointment</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {nextAppointment ? (
              <div>
                <div className="text-2xl font-bold">Mar 16, 2024</div>
                <p className="text-xs text-muted-foreground">
                  Dr. Smith - General Checkup
                </p>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No upcoming appointments</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 28, 2024</div>
            <p className="text-xs text-muted-foreground">
              Dr. Johnson - Follow-up
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patientData?.medicalHistory?.medications?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Active medications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WearableDataPanel patientId={user?.id} />
        <AIInsightsPanel patientId={user?.id} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {wearableData.slice(0, 3).map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">
                      {data.deviceType === "apple_watch" ? "Apple Watch" : "Oura Ring"} Data Updated
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(data.lastSync).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 