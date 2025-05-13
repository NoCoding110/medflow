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
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  AttachFile as AttachFileIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getClinicalNotes, createClinicalNote } from '../../lib/services/mockDoctorService';
import { getPatients } from '../../lib/services/mockDoctorService';

interface ClinicalNote {
  id: string;
  patientId: string;
  date: string;
  type: string;
  content: string;
  attachments: string[];
  tags: string[];
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<ClinicalNote[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<ClinicalNote | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({
    patientId: '',
    type: '',
    content: '',
    tags: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [notesData, patientsData] = await Promise.all([
        getClinicalNotes(),
        getPatients()
      ]);
      setNotes(notesData);
      setPatients(patientsData);
      setError(null);
    } catch (err) {
      setError('Failed to load clinical notes data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = (note: ClinicalNote) => {
    setSelectedNote(note);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedNote) {
      // In a real application, this would call an API to delete the note
      setNotes(notes.filter(n => n.id !== selectedNote.id));
      setOpenDialog(false);
      setSelectedNote(null);
    }
  };

  const handleCreateNote = async () => {
    try {
      const note = await createClinicalNote(newNote);
      setNotes([...notes, note]);
      setOpenNewDialog(false);
      setNewNote({
        patientId: '',
        type: '',
        content: '',
        tags: []
      });
    } catch (err) {
      setError('Failed to create clinical note');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter(note => {
    const patient = patients.find(p => p.id === note.patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : '';
    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
          Clinical Notes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewDialog(true)}
        >
          New Note
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
            placeholder="Search notes by patient name, content, type, or tags"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNotes.map((note) => (
              <TableRow key={note.id}>
                <TableCell>{getPatientName(note.patientId)}</TableCell>
                <TableCell>{note.date}</TableCell>
                <TableCell>{note.type}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      maxWidth: 300,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {note.content}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {note.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => navigate(`/doctor/notes/${note.id}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Note">
                    <IconButton onClick={() => navigate(`/doctor/notes/${note.id}/edit`)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Note">
                    <IconButton onClick={() => handleDeleteNote(note)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this clinical note? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Note Dialog */}
      <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>New Clinical Note</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Patient</InputLabel>
              <Select
                value={newNote.patientId}
                onChange={(e) => setNewNote({ ...newNote, patientId: e.target.value })}
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
                value={newNote.type}
                onChange={(e) => setNewNote({ ...newNote, type: e.target.value })}
                label="Type"
              >
                <MenuItem value="consultation">Consultation</MenuItem>
                <MenuItem value="follow-up">Follow-up</MenuItem>
                <MenuItem value="procedure">Procedure</MenuItem>
                <MenuItem value="emergency">Emergency</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Content"
              multiline
              rows={6}
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              fullWidth
            />
            <TextField
              label="Tags (comma-separated)"
              value={newNote.tags.join(', ')}
              onChange={(e) => setNewNote({ ...newNote, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              fullWidth
              helperText="Enter tags separated by commas"
            />
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
          <Button onClick={handleCreateNote} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notes; 