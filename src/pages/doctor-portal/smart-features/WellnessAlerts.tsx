
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, TrendingDown, TrendingUp } from 'lucide-react';

const WellnessAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      message: "Patient BMI increased by 5% in the last 3 months",
      metric: "BMI",
      change: "+5%",
      timestamp: "2h ago"
    },
    {
      id: 2,
      type: 'warning',
      message: "Mood scores showing declining trend over 2 months",
      metric: "Mood Score",
      change: "-20%",
      timestamp: "1d ago"
    },
    {
      id: 3,
      type: 'info',
      message: "Blood pressure readings consistently above target range",
      metric: "Blood Pressure",
      change: "140/90",
      timestamp: "2d ago"
    }
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Wellness Alerts</h1>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">
            Last updated: Today at 10:30 AM
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {alert.type === 'critical' && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                {alert.type === 'warning' && (
                  <TrendingDown className="h-5 w-5 text-yellow-500" />
                )}
                {alert.type === 'info' && (
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                )}
                {alert.message}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Metric:</span>
                  <span className="ml-2 font-medium">{alert.metric}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Change:</span>
                  <span className="ml-2 font-medium">{alert.change}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WellnessAlerts;
