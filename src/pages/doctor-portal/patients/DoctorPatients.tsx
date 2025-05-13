import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tab,
  Tabs
} from '@mui/material';
import {
  Edit as EditIcon,
  LocalHospital as PrescriptionIcon,
  Assignment as RecordsIcon,
  Event as AppointmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PatientSearch from './PatientSearch';

interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  status: string;
  lastVisit?: string;
  nextAppointment?: string;
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
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DoctorPatients: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/patients', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };

  const handleNewPrescription = (patientId: string) => {
    navigate(`/doctor/prescriptions?patientId=${patientId}`);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Patient Management
        </Typography>

        <PatientSearch onPatientSelect={handlePatientSelect} />

        <TableContainer sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>MRN</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Visit</TableCell>
                <TableCell>Next Appointment</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell>
                    {patient.lastName}, {patient.firstName}
                  </TableCell>
                  <TableCell>{patient.mrn}</TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell>
                    <Chip
                      label={patient.status}
                      color={patient.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{patient.lastVisit || 'N/A'}</TableCell>
                  <TableCell>{patient.nextAppointment || 'N/A'}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleNewPrescription(patient.id)}
                      >
                        <PrescriptionIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={showDetails}
          onClose={() => setShowDetails(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedPatient && (
            <>
              <DialogTitle>
                <Typography variant="h6">
                  {selectedPatient.lastName}, {selectedPatient.firstName}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  MRN: {selectedPatient.mrn} • DOB: {selectedPatient.dateOfBirth}
                </Typography>
              </DialogTitle>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Overview" />
                  <Tab label="Medical Records" />
                  <Tab label="Prescriptions" />
                  <Tab label="Appointments" />
                </Tabs>
              </Box>

              <DialogContent>
                <TabPanel value={tabValue} index={0}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Contact Information
                      </Typography>
                      <Typography>Email: {selectedPatient.email}</Typography>
                      <Typography>Phone: {selectedPatient.phone}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Appointments
                      </Typography>
                      <Typography>
                        Last Visit: {selectedPatient.lastVisit || 'N/A'}
                      </Typography>
                      <Typography>
                        Next Appointment: {selectedPatient.nextAppointment || 'N/A'}
                      </Typography>
                    </Box>
                  </Stack>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RecordsIcon sx={{ mr: 1 }} />
                    <Typography>Medical Records</Typography>
                  </Box>
                  {/* Medical records content */}
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PrescriptionIcon sx={{ mr: 1 }} />
                    <Typography>Prescriptions</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<PrescriptionIcon />}
                    onClick={() => handleNewPrescription(selectedPatient.id)}
                  >
                    New Prescription
                  </Button>
                  {/* Prescriptions list */}
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AppointmentIcon sx={{ mr: 1 }} />
                    <Typography>Appointments</Typography>
                  </Box>
                  {/* Appointments content */}
                </TabPanel>
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setShowDetails(false)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Paper>
    </Container>
  );
};

export default DoctorPatients; 