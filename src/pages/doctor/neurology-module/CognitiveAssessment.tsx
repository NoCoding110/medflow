import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Activity, LineChart, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CognitiveAssessment = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Cognitive Assessment</h2>
        <p className="text-gray-600">Track and analyze cognitive function with standardized assessments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="default">
                Start MMSE Assessment
              </Button>
              <Button className="w-full" variant="outline">
                Start MoCA Test
              </Button>
              <Button className="w-full" variant="outline">
                Custom Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">MMSE Score</span>
                  <span className="text-sm text-gray-500">28/30</span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">MoCA Score</span>
                  <span className="text-sm text-gray-500">25/30</span>
                </div>
                <Progress value={83} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ScrollArea className="h-[400px] mt-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Cognitive Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add cognitive trends visualization here */}
                <p className="text-gray-600">No trend data available</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assessment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add assessment history here */}
                <p className="text-gray-600">No assessment history found</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CognitiveAssessment; 