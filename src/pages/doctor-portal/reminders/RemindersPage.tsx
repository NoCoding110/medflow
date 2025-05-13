import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { getReminders } from "@/lib/mock/remindersMockData";

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        // Use mock data instead of Supabase
        const data = getReminders('11111111-1111-1111-1111-111111111111');
        setReminders(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reminders:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p>Loading reminders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <AlertCircle className="mx-auto mb-4 h-8 w-8" />
          <p>Error loading reminders. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">Reminders</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reminders.map((reminder) => (
          <Card key={reminder.id} className="overflow-hidden">
            <CardHeader className="border-b bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{reminder.title}</CardTitle>
                <Badge
                  variant={
                    reminder.priority === "high"
                      ? "destructive"
                      : reminder.priority === "medium"
                      ? "secondary"
                      : "default"
                  }
                >
                  {reminder.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {reminder.description}
                </p>
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>
                    Due: {format(new Date(reminder.due_date), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>
                    {format(new Date(reminder.due_date), "h:mm a")}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium">Patient: </span>
                  <span className="ml-2">{reminder.patient.name}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Handle complete
                  }}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Complete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Handle cancel
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 