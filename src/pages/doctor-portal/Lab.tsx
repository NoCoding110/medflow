import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  AttachFile as AttachFileIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Science as ScienceIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getLabResults } from '../../lib/services/mockDoctorService';
import { getPatients } from '../../lib/services/mockDoctorService';

interface LabResult {
  id: string;
  patientId: string;
  type: string;
  date: string;
  tests: {
    name: string;
    value: string;
    unit: string;
    range: string;
    status?: 'normal' | 'high' | 'low' | 'critical';
  }[];
  status: string;
  notes: string;
  attachments?: string[];
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lab-tabpanel-${index}`}
      aria-labelledby={`lab-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Lab: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<LabResult[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [newResult, setNewResult] = useState({
    patientId: '',
    type: '',
    tests: [] as LabResult['tests'],
    status: 'pending',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resultsData, patientsData] = await Promise.all([
        getLabResults(),
        getPatients()
      ]);
      const transformedResults: LabResult[] = resultsData.map(result => ({
        id: result.id,
        patientId: result.patientId,
        date: result.date,
        type: result.type,
        tests: result.tests.map(test => ({
          name: test.name,
          value: test.value,
          unit: test.unit,
          range: test.range,
          status: 'normal'
        })),
        status: result.status,
        notes: result.notes,
        attachments: []
      }));
      setResults(transformedResults);
      setPatients(patientsData);
      setError(null);
    } catch (err) {
      setError('Failed to load lab results data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResult = (result: LabResult) => {
    setSelectedResult(result);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedResult) {
      // In a real application, this would call an API to delete the result
      setResults(results.filter(r => r.id !== selectedResult.id));
      setOpenDialog(false);
      setSelectedResult(null);
    }
  };

  const handleCreateResult = async () => {
    try {
      const createdResult: LabResult = {
        id: Math.random().toString(36).substr(2, 9),
        patientId: newResult.patientId,
        date: new Date().toISOString().split('T')[0],
        type: newResult.type,
        tests: [],
        status: 'pending',
        notes: newResult.notes,
        attachments: []
      };
      setResults([...results, createdResult]);
      setOpenNewDialog(false);
      setNewResult({
        patientId: '',
        type: '',
        tests: [],
        status: 'pending',
        notes: ''
      });
    } catch (err) {
      setError('Failed to create lab result');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredResults = results.filter(result => {
    const patient = patients.find(p => p.id === result.patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : '';
    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tests.some(test => test.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'success';
      case 'high':
      case 'low':
        return 'warning';
      case 'critical':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Laboratory Results
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewDialog(true)}
        >
          New Lab Result
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search results by patient name, type, or test name"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="lab results tabs">
          <Tab label="All Results" />
          <Tab label="Pending" />
          <Tab label="Completed" />
          <Tab label="Critical" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Tests</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{getPatientName(result.patientId)}</TableCell>
                  <TableCell>{result.date}</TableCell>
                  <TableCell>{result.type}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {result.tests.map((test, index) => (
                        <Chip
                          key={index}
                          label={`${test.name}: ${test.value} ${test.unit}`}
                          color={getTestStatusColor(test.status)}
                          size="small"
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={result.status}
                      color={
                        result.status === 'completed'
                          ? 'success'
                          : result.status === 'pending'
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton onClick={() => navigate(`/doctor/lab/${result.id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Result">
                      <IconButton onClick={() => navigate(`/doctor/lab/${result.id}/edit`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton onClick={() => alert('Download functionality would be implemented here')}>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                      <IconButton onClick={() => alert('Share functionality would be implemented here')}>
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Result">
                      <IconButton onClick={() => handleDeleteResult(result)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this lab result? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Result Dialog */}
      <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>New Lab Result</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Patient</InputLabel>
              <Select
                value={newResult.patientId}
                onChange={(e) => setNewResult({ ...newResult, patientId: e.target.value })}
                label="Patient"
              >
                {patients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newResult.type}
                onChange={(e) => setNewResult({ ...newResult, type: e.target.value })}
                label="Type"
              >
                <MenuItem value="blood">Blood Test</MenuItem>
                <MenuItem value="urine">Urine Test</MenuItem>
                <MenuItem value="imaging">Imaging</MenuItem>
                <MenuItem value="biopsy">Biopsy</MenuItem>
                <MenuItem value="culture">Culture</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Notes"
              multiline
              rows={4}
              value={newResult.notes}
              onChange={(e) => setNewResult({ ...newResult, notes: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newResult.status}
                onChange={(e) => setNewResult({ ...newResult, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="reviewed">Reviewed</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<AttachFileIcon />}
              onClick={() => {
                // In a real application, this would handle file uploads
                alert('File upload functionality would be implemented here');
              }}
            >
              Attach Files
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateResult} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Lab; 