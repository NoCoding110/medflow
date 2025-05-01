import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Activity, LineChart, Pill, RefreshCw, Filter, Download, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";

interface NeurologyStats {
  pendingAnalysis: number;
  cognitiveAssessments: number;
  activeTreatments: number;
  totalPatients: number;
}

interface ScanAnalysis {
  id: string;
  patientName: string;
  scanType: string;
  date: string;
  status: string;
  aiFindings: {
    abnormalities: string[];
    confidence: number;
    recommendations: string[];
  };
}

interface CognitiveAssessment {
  id: string;
  patientName: string;
  date: string;
  type: string;
  score: number;
  status: string;
  trends: {
    memory: number[];
    attention: number[];
    executive: number[];
  };
}

interface FilterOptions {
  scanStatus: string;
  assessmentScore: string;
  dateRange: string;
}

const NeurologyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || '';

  const handleTabChange = (value: string) => {
    navigate(`/doctor/neurology-module/${value}`);
  };

  const [stats, setStats] = useState<NeurologyStats>({
    pendingAnalysis: 2,
    cognitiveAssessments: 2,
    activeTreatments: 2,
    totalPatients: 3
  });
  const [selectedScan, setSelectedScan] = useState<ScanAnalysis | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<CognitiveAssessment | null>(null);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [recentScans, setRecentScans] = useState<ScanAnalysis[]>([]);
  const [recentAssessments, setRecentAssessments] = useState<CognitiveAssessment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    scanStatus: 'all',
    assessmentScore: 'all',
    dateRange: '7d'
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    fetchNeurologyData();
  }, []);

  const fetchNeurologyData = async () => {
    setLoading(true);
    try {
      // Fetch recent brain scans
      const scansResponse = await fetch('/api/neurology/scans/recent', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const scansData = await scansResponse.json();
      setRecentScans(scansData);

      // Fetch recent cognitive assessments
      const assessmentsResponse = await fetch('/api/neurology/assessments/recent', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const assessmentsData = await assessmentsResponse.json();
      setRecentAssessments(assessmentsData);
    } catch (error) {
      console.error('Error fetching neurology data:', error);
      setError('Failed to fetch neurology data');
    } finally {
      setLoading(false);
    }
  };

  const handleScanAnalysis = async (scanId: string) => {
    try {
      const response = await fetch(`/api/neurology/scans/${scanId}/analyze`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const analysisResult = await response.json();
      setSelectedScan(analysisResult);
      setShowScanDialog(true);
    } catch (error) {
      console.error('Error analyzing scan:', error);
      toast.error('Failed to analyze scan');
    }
  };

  const handleAssessmentAnalysis = async (assessmentId: string) => {
    try {
      const response = await fetch(`/api/neurology/assessments/${assessmentId}/analyze`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const analysisResult = await response.json();
      setSelectedAssessment(analysisResult);
      setShowAssessmentDialog(true);
    } catch (error) {
      console.error('Error analyzing assessment:', error);
      toast.error('Failed to analyze assessment');
    }
  };

  const handleRefresh = async () => {
    setRefreshLoading(true);
    try {
      await fetchNeurologyData();
      toast.success('Data refreshed successfully');
    } catch (error) {
      setError('Failed to refresh data');
    } finally {
      setRefreshLoading(false);
    }
  };

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const filteredScans = recentScans.filter(scan => {
    if (filters.scanStatus !== 'all' && scan.status !== filters.scanStatus) return false;
    // Add date range filtering logic here
    return true;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const filteredAssessments = recentAssessments.filter(assessment => {
    if (filters.assessmentScore !== 'all') {
      const score = parseInt(filters.assessmentScore);
      if (filters.assessmentScore.includes('>') && assessment.score <= score) return false;
      if (filters.assessmentScore.includes('<') && assessment.score >= score) return false;
    }
    return true;
  }).sort((a, b) => {
    return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
  });

  const handleExportReport = async (type: 'scan' | 'assessment', id: string) => {
    try {
      const response = await fetch(`/api/neurology/export/${type}/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-report-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError('Failed to export report');
    }
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Neurology Dashboard</h1>
          <p className="text-muted-foreground">Monitor and analyze neurological assessments and scans</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Analysis</p>
                <h3 className="text-2xl font-bold">{stats.pendingAnalysis}</h3>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cognitive Assessments</p>
                <h3 className="text-2xl font-bold">{stats.cognitiveAssessments}</h3>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Treatments</p>
                <h3 className="text-2xl font-bold">{stats.activeTreatments}</h3>
              </div>
              <Pill className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <h3 className="text-2xl font-bold">{stats.totalPatients}</h3>
              </div>
              <LineChart className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scans">Brain Scans</TabsTrigger>
            <TabsTrigger value="assessments">Cognitive Assessments</TabsTrigger>
            <TabsTrigger value="treatments">Treatments</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Select
              value={filters.dateRange}
              onValueChange={(value) => handleFilterChange('dateRange', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleSortToggle}>
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Brain Scans</CardTitle>
                <CardDescription>Latest neurological scan analyses</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-[200px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    {recentScans.map((scan) => (
                      <div key={scan.id} className="p-4 border-b last:border-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{scan.patientName}</h4>
                            <p className="text-sm text-muted-foreground">{scan.scanType}</p>
                          </div>
                          <Badge variant={scan.status === 'Completed' ? 'default' : 'secondary'}>
                            {scan.status}
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Date: {new Date(scan.date).toLocaleDateString()}
                          </p>
                          {scan.aiFindings && (
                            <div className="mt-2">
                              <Progress value={scan.aiFindings.confidence * 100} className="h-1" />
                              <p className="text-xs text-muted-foreground mt-1">
                                AI Confidence: {(scan.aiFindings.confidence * 100).toFixed(1)}%
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm" onClick={() => handleScanAnalysis(scan.id)}>
                            View Analysis
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cognitive Assessments</CardTitle>
                <CardDescription>Recent cognitive evaluation results</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-[200px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    {recentAssessments.map((assessment) => (
                      <div key={assessment.id} className="p-4 border-b last:border-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{assessment.patientName}</h4>
                            <p className="text-sm text-muted-foreground">{assessment.type}</p>
                          </div>
                          <Badge variant={assessment.score >= 70 ? 'default' : 'secondary'}>
                            Score: {assessment.score}
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Date: {new Date(assessment.date).toLocaleDateString()}
                          </p>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            <div>
                              <p className="text-xs text-muted-foreground">Memory</p>
                              <Progress 
                                value={assessment.trends.memory[assessment.trends.memory.length - 1]} 
                                className="h-1" 
                              />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Attention</p>
                              <Progress 
                                value={assessment.trends.attention[assessment.trends.attention.length - 1]} 
                                className="h-1" 
                              />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Executive</p>
                              <Progress 
                                value={assessment.trends.executive[assessment.trends.executive.length - 1]} 
                                className="h-1" 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleAssessmentAnalysis(assessment.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scans">
          {/* Brain Scans content */}
        </TabsContent>

        <TabsContent value="assessments">
          {/* Cognitive Assessments content */}
        </TabsContent>

        <TabsContent value="treatments">
          {/* Treatments content */}
        </TabsContent>
      </Tabs>

      {/* Scan Analysis Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Scan Analysis Results</DialogTitle>
            <DialogDescription>
              Detailed analysis of the brain scan
            </DialogDescription>
          </DialogHeader>
          {selectedScan && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient</Label>
                  <p className="font-medium">{selectedScan.patientName}</p>
                </div>
                <div>
                  <Label>Scan Type</Label>
                  <p className="font-medium">{selectedScan.scanType}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="font-medium">{new Date(selectedScan.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge variant={selectedScan.status === 'Completed' ? 'default' : 'secondary'}>
                    {selectedScan.status}
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label>AI Findings</Label>
                <div className="mt-2 space-y-2">
                  {selectedScan.aiFindings.abnormalities.map((abnormality, index) => (
                    <Alert key={index}>
                      <AlertDescription>{abnormality}</AlertDescription>
                    </Alert>
                  ))}
                </div>
                <div className="mt-4">
                  <Label>Recommendations</Label>
                  <ul className="mt-2 space-y-2">
                    {selectedScan.aiFindings.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm">• {recommendation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScanDialog(false)}>
              Close
            </Button>
            <Button onClick={() => handleExportReport('scan', selectedScan?.id || '')}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assessment Analysis Dialog */}
      <Dialog open={showAssessmentDialog} onOpenChange={setShowAssessmentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
            <DialogDescription>
              Detailed cognitive assessment results
            </DialogDescription>
          </DialogHeader>
          {selectedAssessment && (
            <div className="space-y-4">
              {/* Assessment details content */}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssessmentDialog(false)}>
              Close
            </Button>
            <Button onClick={() => handleExportReport('assessment', selectedAssessment?.id || '')}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NeurologyDashboard; 