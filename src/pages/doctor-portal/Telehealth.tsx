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
  InputLabel
} from '@mui/material';
import {
  Add as AddIcon,
  VideoCall as VideoCallIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Chat as ChatIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getTelehealthSessions, createTelehealthSession } from '../../lib/services/mockDoctorService';
import { getPatients } from '../../lib/services/mockDoctorService';

interface TelehealthSession {
  id: string;
  patientId: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  type: string;
  link: string;
  notes: string;
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

const Telehealth: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<TelehealthSession[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [openSessionDialog, setOpenSessionDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TelehealthSession | null>(null);
  const [newSession, setNewSession] = useState({
    patientId: '',
    date: '',
    time: '',
    type: '',
    notes: '',
    duration: 30
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sessionsData, patientsData] = await Promise.all([
        getTelehealthSessions(),
        getPatients()
      ]);
      setSessions(sessionsData);
      setPatients(patientsData);
      setError(null);
    } catch (err) {
      setError('Failed to load telehealth sessions data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async () => {
    try {
      const session = await createTelehealthSession(newSession);
      setSessions([...sessions, session]);
      setOpenNewDialog(false);
      setNewSession({
        patientId: '',
        date: '',
        time: '',
        type: '',
        notes: '',
        duration: 30
      });
    } catch (err) {
      setError('Failed to create telehealth session');
    }
  };

  const handleStartSession = (session: TelehealthSession) => {
    setSelectedSession(session);
    setOpenSessionDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'primary';
      case 'in-progress':
        return 'success';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

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
          Telehealth Sessions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewDialog(true)}
        >
          New Session
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
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
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{getPatientName(session.patientId)}</TableCell>
                <TableCell>{session.date}</TableCell>
                <TableCell>{session.time}</TableCell>
                <TableCell>{session.type}</TableCell>
                <TableCell>
                  <Chip
                    label={session.status}
                    color={getStatusColor(session.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{session.duration} min</TableCell>
                <TableCell align="right">
                  <Tooltip title="Start Session">
                    <IconButton
                      onClick={() => handleStartSession(session)}
                      color="primary"
                      disabled={session.status !== 'scheduled'}
                    >
                      <VideoCallIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* New Session Dialog */}
      <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Telehealth Session</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Patient</InputLabel>
              <Select
                value={newSession.patientId}
                onChange={(e) => setNewSession({ ...newSession, patientId: e.target.value })}
                label="Patient"
              >
                {patients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Date"
              type="date"
              value={newSession.date}
              onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Time"
              type="time"
              value={newSession.time}
              onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newSession.type}
                onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                label="Type"
              >
                <MenuItem value="consultation">Consultation</MenuItem>
                <MenuItem value="follow-up">Follow-up</MenuItem>
                <MenuItem value="emergency">Emergency</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Duration (minutes)"
              type="number"
              value={newSession.duration}
              onChange={(e) => setNewSession({ ...newSession, duration: Number(e.target.value) })}
              fullWidth
            />
            <TextField
              label="Notes"
              multiline
              rows={4}
              value={newSession.notes}
              onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateSession} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Active Session Dialog */}
      <Dialog
        open={openSessionDialog}
        onClose={() => setOpenSessionDialog(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            maxHeight: '80vh'
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Telehealth Session with {selectedSession && getPatientName(selectedSession.patientId)}
            </Typography>
            <IconButton onClick={() => setOpenSessionDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
            <Box sx={{ flex: 0.75 }}>
              <Box
                sx={{
                  backgroundColor: 'black',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1
                }}
              >
                <Typography color="white">Video Feed</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 0.25, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Session Info
                  </Typography>
                  <Typography variant="body2">
                    Date: {selectedSession?.date}
                  </Typography>
                  <Typography variant="body2">
                    Time: {selectedSession?.time}
                  </Typography>
                  <Typography variant="body2">
                    Duration: {selectedSession?.duration} min
                  </Typography>
                  <Typography variant="body2">
                    Type: {selectedSession?.type}
                  </Typography>
                </CardContent>
              </Card>
              {isChatOpen && (
                <Card sx={{ flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Chat
                    </Typography>
                    {/* Chat messages would go here */}
                  </CardContent>
                </Card>
              )}
            </Box>
          </Box>
        </DialogContent>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            backgroundColor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
            <IconButton onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOffIcon /> : <MicIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}>
            <IconButton onClick={() => setIsVideoOff(!isVideoOff)}>
              {isVideoOff ? <VideocamOffIcon /> : <VideocamIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isScreenSharing ? 'Stop sharing' : 'Share screen'}>
            <IconButton onClick={() => setIsScreenSharing(!isScreenSharing)}>
              {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isChatOpen ? 'Close chat' : 'Open chat'}>
            <IconButton onClick={() => setIsChatOpen(!isChatOpen)}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenSessionDialog(false)}
          >
            End Session
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Telehealth; 