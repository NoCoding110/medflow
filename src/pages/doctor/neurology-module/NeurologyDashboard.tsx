import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  Chip,
  Stack,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  TabsContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Snackbar
} from '@mui/material';
import {
  Timeline,
  Assessment,
  Science,
  Warning,
  TrendingUp,
  Image,
  Psychology,
  Medication,
  BarChart,
  CompareArrows,
  Notifications,
  Refresh,
  FilterList,
  Download,
  Sort,
  PsychologyAlt
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Activity, LineChart, Pill } from "lucide-react";
import { AlertDescription } from "@/components/ui/alert";
import { Button as ShadcnButton } from "@/components/ui/button";

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
  const [activeTab, setActiveTab] = useState(0);
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
      // Update the scan with AI analysis results
      setSelectedScan(analysisResult);
      setShowScanDialog(true);
    } catch (error) {
      console.error('Error analyzing scan:', error);
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
    }
  };

  const handleRefresh = async () => {
    setRefreshLoading(true);
    try {
      await fetchNeurologyData();
      setSnackbar({ open: true, message: 'Data refreshed successfully' });
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
    <div className="container mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Neurology Module</h1>
        <p className="text-gray-600">Comprehensive neurological assessment and monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Analysis</p>
                <h3 className="text-2xl font-bold">{stats.pendingAnalysis}</h3>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cognitive Assessments</p>
                <h3 className="text-2xl font-bold">{stats.cognitiveAssessments}</h3>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Treatments</p>
                <h3 className="text-2xl font-bold">{stats.activeTreatments}</h3>
              </div>
              <Pill className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <h3 className="text-2xl font-bold">{stats.totalPatients}</h3>
              </div>
              <LineChart className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={currentPath} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Dashboard
            </div>
          </TabsTrigger>
          <TabsTrigger value="imaging">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Imaging Analysis
            </div>
          </TabsTrigger>
          <TabsTrigger value="cognitive">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Cognitive Assessment
            </div>
          </TabsTrigger>
          <TabsTrigger value="treatment">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Treatment Monitoring
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <p>Select a section to view detailed information.</p>
          </div>
        </TabsContent>
        <TabsContent value="imaging">
          <Outlet />
        </TabsContent>
        <TabsContent value="cognitive">
          <Outlet />
        </TabsContent>
        <TabsContent value="treatment">
          <Outlet />
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={handleRefresh} disabled={refreshLoading}>
          <Activity className="h-4 w-4" />
          Export Data
        </Button>
        <Button className="flex items-center gap-2" onClick={() => navigate('/doctor/neurology-module/new-analysis')}>
          <Brain className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleRefresh} disabled={refreshLoading}>
            <Activity className="h-4 w-4" />
            Export Data
          </Button>
          <Button className="flex items-center gap-2" onClick={() => navigate('/doctor/neurology-module/new-analysis')}>
            <Brain className="h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Scan Status</InputLabel>
              <Select
                value={filters.scanStatus}
                onChange={(e) => handleFilterChange('scanStatus', e.target.value)}
                label="Scan Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Assessment Score</InputLabel>
              <Select
                value={filters.assessmentScore}
                onChange={(e) => handleFilterChange('assessmentScore', e.target.value)}
                label="Assessment Score"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value=">70">Above 70%</MenuItem>
                <MenuItem value="<70">Below 70%</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                label="Date Range"
              >
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="90d">Last 90 days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Imaging Analysis */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                <Image sx={{ mr: 1, verticalAlign: 'middle' }} />
                Imaging Analysis
              </Typography>
              <Button variant="contained" color="primary" startIcon={<Science />}>
                New Analysis
              </Button>
            </Stack>

            <List>
              {filteredScans.map((scan) => (
                <ListItem
                  key={scan.id}
                  onClick={() => handleScanAnalysis(scan.id)}
                  divider
                  secondaryAction={
                    <Tooltip title="Export Report">
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExportReport('scan', scan.id);
                        }}
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemIcon>
                    <PsychologyAlt color={scan.status === 'pending' ? 'warning' : 'success'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={scan.patientName}
                    secondary={`${scan.scanType} • ${scan.date}`}
                  />
                  <Chip
                    label={scan.status}
                    color={scan.status === 'pending' ? 'warning' : 'success'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* AI Insights */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Science sx={{ mr: 1, verticalAlign: 'middle' }} />
              AI Insights
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TrendingUp color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Pattern Recognition"
                  secondary="AI detected 3 new patterns in recent scans"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CompareArrows color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Comparative Analysis"
                  secondary="2 cases require attention based on historical data"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Warning color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Early Detection"
                  secondary="AI flagged potential early signs in 1 case"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Right Column - Cognitive Assessment & Treatment */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">
                <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                Cognitive Assessments
              </Typography>
              <Button variant="contained" color="secondary" startIcon={<Assessment />}>
                New Assessment
              </Button>
            </Stack>

            <List>
              {filteredAssessments.map((assessment) => (
                <ListItem
                  key={assessment.id}
                  onClick={() => handleAssessmentAnalysis(assessment.id)}
                  divider
                  secondaryAction={
                    <Tooltip title="Export Report">
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExportReport('assessment', assessment.id);
                        }}
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemIcon>
                    <Psychology color={assessment.score > 70 ? 'success' : 'warning'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={assessment.patientName}
                    secondary={`${assessment.type} • ${assessment.date}`}
                  />
                  <Box sx={{ minWidth: 100 }}>
                    <Typography variant="body2" color="textSecondary">
                      Score: {assessment.score}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={assessment.score}
                      color={assessment.score > 70 ? 'success' : 'warning'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Treatment Monitoring */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
              Treatment Monitoring
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Notifications color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Treatment Progress"
                  secondary="2 patients showing significant improvement"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BarChart color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Response Analysis"
                  secondary="AI predicts positive outcomes for current protocols"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Scan Analysis Dialog */}
      <Dialog
        open={showScanDialog}
        onClose={() => setShowScanDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedScan && (
          <>
            <DialogTitle>
              <Typography variant="h6">
                Scan Analysis Results
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {selectedScan.patientName} • {selectedScan.scanType} • {selectedScan.date}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  AI Findings
                </Typography>
                <Alert severity={selectedScan.aiFindings.confidence > 0.8 ? 'success' : 'warning'}>
                  Confidence Level: {(selectedScan.aiFindings.confidence * 100).toFixed(1)}%
                </Alert>
              </Box>

              <Typography variant="subtitle1" gutterBottom>
                Detected Abnormalities
              </Typography>
              <List>
                {selectedScan.aiFindings.abnormalities.map((abnormality, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Warning color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={abnormality} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle1" gutterBottom>
                Recommendations
              </Typography>
              <List>
                {selectedScan.aiFindings.recommendations.map((recommendation, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Assessment color="info" />
                    </ListItemIcon>
                    <ListItemText primary={recommendation} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowScanDialog(false)}>Close</Button>
              <Button variant="contained" color="primary">
                Add to Patient Record
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Assessment Analysis Dialog */}
      <Dialog
        open={showAssessmentDialog}
        onClose={() => setShowAssessmentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedAssessment && (
          <>
            <DialogTitle>
              <Typography variant="h6">
                Cognitive Assessment Results
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {selectedAssessment.patientName} • {selectedAssessment.type} • {selectedAssessment.date}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Overall Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress
                    variant="determinate"
                    value={selectedAssessment.score}
                    size={80}
                    thickness={4}
                    color={selectedAssessment.score > 70 ? 'success' : 'warning'}
                    sx={{ mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h4">
                      {selectedAssessment.score}%
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Overall Performance
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="subtitle1" gutterBottom>
                Cognitive Domain Trends
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader
                      title="Memory"
                      subheader={`${selectedAssessment.trends.memory[selectedAssessment.trends.memory.length - 1]}%`}
                    />
                    <CardContent>
                      <LinearProgress
                        variant="determinate"
                        value={selectedAssessment.trends.memory[selectedAssessment.trends.memory.length - 1]}
                        color="primary"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader
                      title="Attention"
                      subheader={`${selectedAssessment.trends.attention[selectedAssessment.trends.attention.length - 1]}%`}
                    />
                    <CardContent>
                      <LinearProgress
                        variant="determinate"
                        value={selectedAssessment.trends.attention[selectedAssessment.trends.attention.length - 1]}
                        color="secondary"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader
                      title="Executive Function"
                      subheader={`${selectedAssessment.trends.executive[selectedAssessment.trends.executive.length - 1]}%`}
                    />
                    <CardContent>
                      <LinearProgress
                        variant="determinate"
                        value={selectedAssessment.trends.executive[selectedAssessment.trends.executive.length - 1]}
                        color="info"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowAssessmentDialog(false)}>Close</Button>
              <Button variant="contained" color="primary">
                Generate Report
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </div>
  );
};

export default NeurologyDashboard; 