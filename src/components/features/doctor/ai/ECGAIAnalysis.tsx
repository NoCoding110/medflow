
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Upload, FileText, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useApiMutation } from '@/hooks/use-api-mutation';

const ECGAIAnalysis = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  // Mock ECG analysis function
  const { mutate: analyzeECG, isLoading } = useApiMutation(
    async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        result: "Analysis complete",
        findings: [
          { severity: "critical", finding: "Atrial Fibrillation detected", confidence: 0.92 },
          { severity: "warning", finding: "Extended QT interval (480ms)", confidence: 0.87 },
          { severity: "info", finding: "Heart rate: 78 BPM", confidence: 0.99 }
        ]
      };
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select an ECG file first."
      });
      return;
    }

    setAnalyzing(true);
    try {
      const result = await analyzeECG(undefined);
      setAnalysisResult(JSON.stringify(result));
      
      toast({
        title: "Analysis Complete",
        description: "ECG analysis has been completed successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was a problem analyzing the ECG data."
      });
    } finally {
      setAnalyzing(false);
    }
  };

  // Mock recent analysis data
  const recentAnalyses = [
    { id: 1, patientName: "John Smith", date: "2024-04-15", findings: "Atrial Fibrillation", urgency: "high" },
    { id: 2, patientName: "Mary Johnson", date: "2024-04-14", findings: "Normal Sinus Rhythm", urgency: "low" },
    { id: 3, patientName: "Robert Davis", date: "2024-04-12", findings: "ST Elevation", urgency: "high" }
  ];

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">ECG AI Analysis</h1>
        <p className="text-muted-foreground">Advanced electrocardiogram analysis using deep learning algorithms</p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList className="mb-6">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
          <TabsTrigger value="reports">Analysis Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-red-500" />
                  Upload ECG Data
                </CardTitle>
                <CardDescription>
                  Upload ECG data in standard formats (XML, DICOM, PDF) for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label htmlFor="ecg-file" className="block text-sm font-medium mb-2">
                    Select ECG File
                  </label>
                  <input
                    id="ecg-file"
                    type="file"
                    accept=".xml,.dicom,.pdf,.csv"
                    onChange={handleFileChange}
                    className="w-full cursor-pointer rounded-md border border-input text-sm file:border-0 file:bg-primary file:text-primary-foreground file:text-sm file:font-medium"
                  />
                </div>
                
                <div className="mb-4">
                  {selectedFile && (
                    <div className="p-3 rounded-md bg-muted">
                      <p className="text-sm font-medium">Selected file:</p>
                      <p className="text-sm">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleAnalyze} 
                  className="w-full"
                  disabled={!selectedFile || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-5 w-5" />
                      Analyze ECG
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  AI-powered interpretation of the uploaded ECG data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisResult ? (
                  <div className="space-y-4">
                    <div className="rounded-md border-l-4 border-red-500 bg-red-50 p-3">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                        <span className="font-medium text-red-800">Critical Finding</span>
                      </div>
                      <p className="mt-1 text-sm text-red-800">Atrial Fibrillation detected</p>
                      <p className="text-xs mt-1 text-red-700">Confidence: 92%</p>
                    </div>
                    
                    <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-3">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                        <span className="font-medium text-amber-800">Warning</span>
                      </div>
                      <p className="mt-1 text-sm text-amber-800">Extended QT interval (480ms)</p>
                      <p className="text-xs mt-1 text-amber-700">Confidence: 87%</p>
                    </div>
                    
                    <div className="rounded-md border-l-4 border-blue-500 bg-blue-50 p-3">
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800">Information</span>
                      </div>
                      <p className="mt-1 text-sm text-blue-800">Heart rate: 78 BPM</p>
                      <p className="text-xs mt-1 text-blue-700">Confidence: 99%</p>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">Save to Records</Button>
                      <Button size="sm">Generate Report</Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                    <div className="text-center">
                      <Heart className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Upload and analyze an ECG to see results</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent ECG Analyses</CardTitle>
              <CardDescription>
                Review recent ECG analyses performed for your patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalyses.map(analysis => (
                  <div key={analysis.id} 
                    className={`rounded-md border p-4 ${
                      analysis.urgency === 'high' ? 'border-l-4 border-l-red-500' : ''
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold">{analysis.patientName}</h3>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {analysis.date}
                      </span>
                    </div>
                    <p className="text-sm">
                      {analysis.urgency === 'high' ? (
                        <span className="text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {analysis.findings}
                        </span>
                      ) : (
                        <span>{analysis.findings}</span>
                      )}
                    </p>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">View Report</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-500" />
                ECG Analysis Reports
              </CardTitle>
              <CardDescription>
                Generate and export comprehensive ECG analysis reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="font-semibold">Comprehensive ECG Report</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Detailed analysis with findings, recommendations, and comparison with past ECGs
                  </p>
                  <Button className="mt-4" onClick={() => toast({
                    title: "Report Generated",
                    description: "Comprehensive ECG report has been generated and saved."
                  })}>
                    Generate Report
                  </Button>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-semibold">Batch Analysis Report</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Analyze multiple ECGs at once and generate a comparative report
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => toast({
                    title: "Batch Analysis Started",
                    description: "Batch analysis of ECGs has begun. You'll be notified when complete."
                  })}>
                    Start Batch Analysis
                  </Button>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-semibold">ECG Trend Analysis</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Analyze ECG changes over time for a specific patient
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => toast({
                    title: "Trend Analysis",
                    description: "ECG trend analysis has been initiated."
                  })}>
                    Generate Trend Analysis
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ECGAIAnalysis;
