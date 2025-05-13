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
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  AttachFile as AttachFileIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getMedicalRecords } from '../../lib/services/mockDoctorService';
import { getPatients } from '../../lib/services/mockDoctorService';

interface MedicalRecord {
  id: string;
  patientId: string;
  type: string;
  date: string;
  title: string;
  content: string;
  attachments: string[];
  status: string;
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
      id={`records-tabpanel-${index}`}
      aria-labelledby={`records-tab-${index}`}
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

const Records: React.FC = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    type: '',
    title: '',
    content: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recordsData, patientsData] = await Promise.all([
        getMedicalRecords(),
        getPatients()
      ]);
      setRecords(recordsData);
      setPatients(patientsData);
      setError(null);
    } catch (err) {
      setError('Failed to load medical records data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedRecord) {
      // In a real application, this would call an API to delete the record
      setRecords(records.filter(r => r.id !== selectedRecord.id));
      setOpenDialog(false);
      setSelectedRecord(null);
    }
  };

  const handleCreateRecord = async () => {
    try {
      const createdRecord: MedicalRecord = {
        id: Math.random().toString(36).substr(2, 9),
        patientId: newRecord.patientId,
        type: newRecord.type,
        date: new Date().toISOString().split('T')[0],
        title: newRecord.title,
        content: newRecord.content,
        attachments: [],
        status: newRecord.status
      };
      setRecords([...records, createdRecord]);
      setOpenNewDialog(false);
      setNewRecord({
        patientId: '',
        type: '',
        title: '',
        content: '',
        status: 'pending'
      });
    } catch (err) {
      setError('Failed to create medical record');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredRecords = records.filter(record => {
    const patient = patients.find(p => p.id === record.patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : '';
    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
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
          Medical Records
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewDialog(true)}
        >
          New Record
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
            placeholder="Search records by patient name, title, type, or content"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="medical records tabs">
          <Tab label="All Records" />
          <Tab label="Pending" />
          <Tab label="Completed" />
          <Tab label="Archived" />
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
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{getPatientName(record.patientId)}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      color={
                        record.status === 'completed'
                          ? 'success'
                          : record.status === 'pending'
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton onClick={() => navigate(`/doctor/records/${record.id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Record">
                      <IconButton onClick={() => navigate(`/doctor/records/${record.id}/edit`)}>
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
                    <Tooltip title="Delete Record">
                      <IconButton onClick={() => handleDeleteRecord(record)}>
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
            Are you sure you want to delete this medical record? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Record Dialog */}
      <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>New Medical Record</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Patient</InputLabel>
              <Select
                value={newRecord.patientId}
                onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
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
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                label="Type"
              >
                <MenuItem value="consultation">Consultation</MenuItem>
                <MenuItem value="lab-result">Lab Result</MenuItem>
                <MenuItem value="imaging">Imaging</MenuItem>
                <MenuItem value="prescription">Prescription</MenuItem>
                <MenuItem value="procedure">Procedure</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Title"
              value={newRecord.title}
              onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Content"
              multiline
              rows={6}
              value={newRecord.content}
              onChange={(e) => setNewRecord({ ...newRecord, content: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newRecord.status}
                onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
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
          <Button onClick={handleCreateRecord} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Records; 