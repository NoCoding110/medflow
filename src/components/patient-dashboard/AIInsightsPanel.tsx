import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Activity, Heart, Moon, TrendingUp } from "lucide-react";
import { useRealtimeUpdates } from "@/hooks/use-realtime-updates";

interface AIInsightsPanelProps {
  patientId: string;
}

interface Insight {
  type: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  icon: React.ReactNode;
}

export const AIInsightsPanel = ({ patientId }: AIInsightsPanelProps) => {
  const { wearableData, loading, error } = useRealtimeUpdates(patientId);
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    if (wearableData && wearableData.length > 0) {
      const newInsights = analyzeData(wearableData);
      setInsights(newInsights);
    }
  }, [wearableData]);

  const analyzeData = (wearableData: any[]): Insight[] => {
    if (!wearableData || wearableData.length === 0) return [];

    const latestData = wearableData[0].data;
    const insights: Insight[] = [];

    // Analyze heart rate
    if (latestData.heartRate) {
      if (latestData.heartRate > 100) {
        insights.push({
          type: "heart_rate",
          title: "Elevated Heart Rate",
          description: "Your heart rate is higher than normal. Consider taking a break and practicing deep breathing exercises.",
          severity: "warning",
          icon: <Heart className="h-5 w-5 text-red-500" />
        });
      } else if (latestData.heartRate < 50) {
        insights.push({
          type: "heart_rate",
          title: "Low Heart Rate",
          description: "Your heart rate is lower than normal. If this persists, please consult your doctor.",
          severity: "warning",
          icon: <Heart className="h-5 w-5 text-blue-500" />
        });
      }
    }

    // Analyze sleep
    if (latestData.sleep) {
      if (latestData.sleep.duration < 6) {
        insights.push({
          type: "sleep",
          title: "Insufficient Sleep",
          description: "You're not getting enough sleep. Aim for 7-9 hours of sleep per night for optimal health.",
          severity: "warning",
          icon: <Moon className="h-5 w-5 text-yellow-500" />
        });
      }
      if (latestData.sleep.quality < 70) {
        insights.push({
          type: "sleep_quality",
          title: "Poor Sleep Quality",
          description: "Your sleep quality could be improved. Try establishing a consistent bedtime routine and reducing screen time before bed.",
          severity: "info",
          icon: <Moon className="h-5 w-5 text-purple-500" />
        });
      }
    }

    // Analyze activity
    if (latestData.steps) {
      if (latestData.steps < 5000) {
        insights.push({
          type: "activity",
          title: "Low Activity Level",
          description: "You're not meeting the recommended daily step count. Try to incorporate more movement into your day.",
          severity: "info",
          icon: <Activity className="h-5 w-5 text-orange-500" />
        });
      } else if (latestData.steps > 15000) {
        insights.push({
          type: "activity",
          title: "High Activity Level",
          description: "You're very active today! Make sure to stay hydrated and listen to your body's signals.",
          severity: "info",
          icon: <Activity className="h-5 w-5 text-green-500" />
        });
      }
    }

    // Analyze stress
    if (latestData.stress) {
      if (latestData.stress > 70) {
        insights.push({
          type: "stress",
          title: "High Stress Level",
          description: "Your stress levels are elevated. Consider practicing mindfulness or taking a short break.",
          severity: "warning",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />
        });
      }
    }

    return insights;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (insights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            No insights available at the moment. Your health metrics look good!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                insight.severity === "critical"
                  ? "bg-red-50 border border-red-200"
                  : insight.severity === "warning"
                  ? "bg-yellow-50 border border-yellow-200"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{insight.icon}</div>
                <div>
                  <h3 className="font-semibold">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 