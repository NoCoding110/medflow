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
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getBillingRecords, createBillingRecord, getPatients } from '@/lib/services/mockDoctorService';

interface BillingRecord {
  id: string;
  patientId: string;
  type: string;
  date: string;
  amount: number;
  status: string;
  insurance: string;
  claimNumber: string;
  description?: string;
  attachments?: string[];
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  nextAppointment: string;
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
      id={`billing-tabpanel-${index}`}
      aria-labelledby={`billing-tab-${index}`}
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

const Billing: React.FC = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<BillingRecord | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    type: '',
    amount: 0,
    status: 'pending',
    insurance: {
      provider: '',
      policyNumber: '',
      coverage: 0
    },
    claimNumber: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recordsData, patientsData] = await Promise.all([
        getBillingRecords(),
        getPatients()
      ]);
      const transformedRecords: BillingRecord[] = recordsData.map(record => ({
        id: record.id,
        patientId: record.patientId,
        date: record.date,
        type: record.type,
        amount: record.amount,
        status: record.status,
        insurance: record.insurance,
        claimNumber: record.claimNumber,
        description: '',
        attachments: []
      }));
      setRecords(transformedRecords);
      setPatients(patientsData);
      setError(null);
    } catch (err) {
      setError('Failed to load billing records data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = (record: BillingRecord) => {
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
      const record = await createBillingRecord(newRecord);
      setRecords([...records, record]);
      setOpenNewDialog(false);
      setNewRecord({
        patientId: '',
        type: '',
        amount: 0,
        status: 'pending',
        insurance: {
          provider: '',
          policyNumber: '',
          coverage: 0
        },
        claimNumber: '',
        description: ''
      });
    } catch (err) {
      setError('Failed to create billing record');
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
      record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.insurance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.claimNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
          Billing & Invoicing
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewDialog(true)}
        >
          New Billing Record
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
            placeholder="Search records by patient name, type, insurance provider, or claim number"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="billing records tabs">
          <Tab label="All Records" />
          <Tab label="Pending" />
          <Tab label="Paid" />
          <Tab label="Overdue" />
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
                <TableCell>Amount</TableCell>
                <TableCell>Insurance</TableCell>
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
                  <TableCell>{formatCurrency(record.amount)}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{record.insurance}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      color={
                        record.status === 'paid'
                          ? 'success'
                          : record.status === 'pending'
                          ? 'warning'
                          : record.status === 'overdue'
                          ? 'error'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton onClick={() => navigate(`/doctor/billing/${record.id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Record">
                      <IconButton onClick={() => navigate(`/doctor/billing/${record.id}/edit`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Invoice">
                      <IconButton onClick={() => alert('Download functionality would be implemented here')}>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Record Payment">
                      <IconButton onClick={() => alert('Payment recording functionality would be implemented here')}>
                        <PaymentIcon />
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
            Are you sure you want to delete this billing record? This action cannot be undone.
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
        <DialogTitle>New Billing Record</DialogTitle>
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
                <MenuItem value="procedure">Procedure</MenuItem>
                <MenuItem value="medication">Medication</MenuItem>
                <MenuItem value="lab-test">Lab Test</MenuItem>
                <MenuItem value="imaging">Imaging</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              value={newRecord.amount}
              onChange={(e) => setNewRecord({ ...newRecord, amount: parseFloat(e.target.value) })}
              fullWidth
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
              }}
            />
            <TextField
              label="Insurance Provider"
              value={newRecord.insurance.provider}
              onChange={(e) =>
                setNewRecord({
                  ...newRecord,
                  insurance: { ...newRecord.insurance, provider: e.target.value }
                })
              }
              fullWidth
            />
            <TextField
              label="Policy Number"
              value={newRecord.insurance.policyNumber}
              onChange={(e) =>
                setNewRecord({
                  ...newRecord,
                  insurance: { ...newRecord.insurance, policyNumber: e.target.value }
                })
              }
              fullWidth
            />
            <TextField
              label="Coverage Percentage"
              type="number"
              value={newRecord.insurance.coverage}
              onChange={(e) =>
                setNewRecord({
                  ...newRecord,
                  insurance: { ...newRecord.insurance, coverage: parseFloat(e.target.value) }
                })
              }
              fullWidth
              InputProps={{
                endAdornment: <Typography>%</Typography>
              }}
            />
            <TextField
              label="Claim Number"
              value={newRecord.claimNumber}
              onChange={(e) => setNewRecord({ ...newRecord, claimNumber: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={newRecord.description}
              onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
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
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
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

export default Billing; 