import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Moon, TrendingUp, Watch } from "lucide-react";
import { useRealtimeUpdates } from "@/hooks/use-realtime-updates";
import { format } from "date-fns";

interface WearableDataPanelProps {
  patientId: string;
}

export const WearableDataPanel = ({ patientId }: WearableDataPanelProps) => {
  const { wearableData, loading, error } = useRealtimeUpdates(patientId);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wearable Data</CardTitle>
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
          <CardTitle>Wearable Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!wearableData || wearableData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wearable Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            No wearable data available. Connect your devices to start tracking.
          </div>
        </CardContent>
      </Card>
    );
  }

  const latestData = wearableData[0].data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Watch className="h-5 w-5" />
          Wearable Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestData.heartRate && (
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-sm text-muted-foreground">Heart Rate</div>
                <div className="text-2xl font-semibold">{latestData.heartRate} BPM</div>
              </div>
            </div>
          )}

          {latestData.steps && (
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <Activity className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Steps</div>
                <div className="text-2xl font-semibold">{latestData.steps.toLocaleString()}</div>
              </div>
            </div>
          )}

          {latestData.calories && (
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-sm text-muted-foreground">Calories</div>
                <div className="text-2xl font-semibold">{latestData.calories} kcal</div>
              </div>
            </div>
          )}

          {latestData.sleep && (
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <Moon className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">Sleep</div>
                <div className="text-2xl font-semibold">{latestData.sleep.duration.toFixed(1)}h</div>
                <div className="text-sm text-muted-foreground">
                  Quality: {latestData.sleep.quality}%
                </div>
              </div>
            </div>
          )}

          {latestData.stress && (
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <Activity className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-sm text-muted-foreground">Stress Level</div>
                <div className="text-2xl font-semibold">{latestData.stress}%</div>
              </div>
            </div>
          )}

          {latestData.bloodOxygen && (
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <Activity className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-sm text-muted-foreground">Blood Oxygen</div>
                <div className="text-2xl font-semibold">{latestData.bloodOxygen}%</div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Last updated: {format(new Date(wearableData[0].lastSync), "MMM d, yyyy h:mm a")}
        </div>
      </CardContent>
    </Card>
  );
}; 