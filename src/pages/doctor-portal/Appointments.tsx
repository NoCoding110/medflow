import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Tabs,
  Tab,
  Badge,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoCall as VideoCallIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAppointments, createAppointment } from '../../lib/services/mockDoctorService';
import { getPatients } from '../../lib/services/mockDoctorService';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress' | 'overdue';
  notes: string;
  telehealthLink?: string;
  duration: number;
  isVirtual: boolean;
}

interface Analytics {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
  overdue: number;
  trends: {
    scheduled: 'up' | 'down';
    completed: 'up' | 'down';
    cancelled: 'up' | 'down';
  };
}

interface AIInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  patientName?: string;
}

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState({
    appointments: false,
    analytics: false,
    insights: false
  });
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    date: '',
    time: '',
    type: '',
    notes: '',
    duration: 30,
    isVirtual: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading({ appointments: true, analytics: true, insights: true });
      const [appointmentsData, patientsData] = await Promise.all([
        getAppointments(),
        getPatients()
      ]);
      
      // Transform appointments data to match the interface
      const transformedAppointments = appointmentsData.map(appointment => {
        const patient = patientsData.find(p => p.id === appointment.patientId);
        return {
          id: appointment.id,
          patientId: appointment.patientId,
          date: appointment.date,
          time: appointment.time,
          type: appointment.type,
          status: appointment.status as 'scheduled' | 'completed' | 'cancelled' | 'in-progress' | 'overdue',
          notes: appointment.notes,
          telehealthLink: appointment.telehealthLink,
          duration: appointment.duration,
          patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
          isVirtual: appointment.type === 'telehealth'
        };
      });
      
      setAppointments(transformedAppointments);
      setPatients(patientsData);
      
      // Simulate analytics and insights data
      setAnalytics({
        total: appointmentsData.length,
        upcoming: appointmentsData.filter(a => a.status === 'scheduled').length,
        completed: appointmentsData.filter(a => a.status === 'completed').length,
        cancelled: appointmentsData.filter(a => a.status === 'cancelled').length,
        overdue: appointmentsData.filter(a => a.status === 'overdue').length,
        trends: {
          scheduled: 'up',
          completed: 'up',
          cancelled: 'down'
        }
      });
      setAiInsights([
        {
          id: '1',
          type: 'scheduling',
          title: 'High No-Show Risk',
          description: 'Patient has missed 2 appointments in the last 3 months',
          severity: 'high',
          timestamp: new Date().toISOString(),
          patientName: 'John Doe'
        }
      ]);
      setError(null);
    } catch (err) {
      setError('Failed to load appointments data');
    } finally {
      setLoading({ appointments: false, analytics: false, insights: false });
    }
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedAppointment) {
      setAppointments(appointments.filter(a => a.id !== selectedAppointment.id));
      setOpenDialog(false);
      setSelectedAppointment(null);
    }
  };

  const handleCreateAppointment = async () => {
    try {
      const appointment = await createAppointment(newAppointment);
      setAppointments([...appointments, appointment]);
      setOpenNewDialog(false);
      setNewAppointment({
        patientId: '',
        date: '',
        time: '',
        type: '',
        notes: '',
        duration: 30,
        isVirtual: false
      });
    } catch (err) {
      setError('Failed to create appointment');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'in-progress':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = [...appointments];
    if (searchTerm) {
      filtered = filtered.filter(a =>
        getPatientName(a.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(a => a.status === statusFilter);
    }
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Appointment];
      const bValue = b[sortConfig.key as keyof Appointment];
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [appointments, searchTerm, statusFilter, sortConfig, patients]);

  if (loading.appointments) {
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
          Appointments
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchData}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenNewDialog(true)}
          >
            New Appointment
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Calendar View
            </Typography>
            <Box sx={{ height: 400 }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                events={appointments.map(appointment => ({
                  id: appointment.id,
                  title: getPatientName(appointment.patientId),
                  start: `${appointment.date}T${appointment.time}`,
                  end: `${appointment.date}T${appointment.time}`,
                  backgroundColor: appointment.isVirtual ? '#2196f3' : '#4caf50'
                }))}
                eventClick={(info) => {
                  const appointment = appointments.find(a => a.id === info.event.id);
                  if (appointment) {
                    setSelectedAppointment(appointment);
                    setOpenDialog(true);
                  }
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Box>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Analytics
              </Typography>
              {analytics && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Appointments
                    </Typography>
                    <Typography variant="h4">
                      {analytics.total}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Upcoming
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {analytics.upcoming}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Completed
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {analytics.completed}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Insights
              </Typography>
              {aiInsights.map(insight => (
                <Box key={insight.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {insight.title}
                  </Typography>
                  <Typography variant="body2">
                    {insight.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAndSortedAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{getPatientName(appointment.patientId)}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      {appointment.type}
                      {appointment.isVirtual && (
                        <Chip
                          size="small"
                          icon={<VideoCallIcon />}
                          label="Virtual"
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.status}
                        color={getStatusColor(appointment.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{appointment.duration} min</TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Details">
                        <IconButton onClick={() => setSelectedAppointment(appointment)}>
                          <CalendarIcon />
                        </IconButton>
                      </Tooltip>
                      {appointment.isVirtual && (
                        <Tooltip title="Start Virtual Session">
                          <IconButton onClick={() => window.open(appointment.telehealthLink, '_blank')}>
                            <VideoCallIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Edit Appointment">
                        <IconButton onClick={() => setSelectedAppointment(appointment)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Appointment">
                        <IconButton onClick={() => handleDeleteAppointment(appointment)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedAppointment ? 'Appointment Details' : 'New Appointment'}
        </DialogTitle>
        <DialogContent>
          {selectedAppointment ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Patient: {getPatientName(selectedAppointment.patientId)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {selectedAppointment.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Time: {selectedAppointment.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {selectedAppointment.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {selectedAppointment.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Notes: {selectedAppointment.notes}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Patient</InputLabel>
                <Select
                  value={newAppointment.patientId}
                  label="Patient"
                  onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                type="time"
                label="Time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newAppointment.type}
                  label="Type"
                  onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                >
                  <MenuItem value="checkup">Checkup</MenuItem>
                  <MenuItem value="follow-up">Follow-up</MenuItem>
                  <MenuItem value="consultation">Consultation</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {!selectedAppointment && (
            <Button onClick={handleCreateAppointment} variant="contained">
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments; 