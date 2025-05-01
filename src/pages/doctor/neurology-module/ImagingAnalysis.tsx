import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Upload, Search, FileBarChart } from "lucide-react";

const ImagingAnalysis = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Neurological Imaging Analysis</h2>
        <p className="text-gray-600">AI-powered analysis of brain scans and neurological imaging</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload New Scan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Button variant="outline" className="w-full">
                Select Files to Upload
              </Button>
              <p className="mt-2 text-sm text-gray-500">
                Support for DICOM, NIfTI, and standard image formats
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Quick Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="default">
                <Search className="h-4 w-4 mr-2" />
                Analyze Latest Scan
              </Button>
              <Button className="w-full" variant="outline">
                <FileBarChart className="h-4 w-4 mr-2" />
                View Analysis History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ScrollArea className="h-[400px] mt-6">
        <div className="space-y-4">
          {/* Recent Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add analysis results here */}
                <p className="text-gray-600">No recent analyses found</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ImagingAnalysis; 