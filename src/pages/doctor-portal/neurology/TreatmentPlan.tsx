import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  diagnosis: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  medications: string[];
  procedures: string[];
  notes: string;
}

const TreatmentPlan: React.FC = () => {
  const [plans, setPlans] = useState<TreatmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setPlans([
        {
          id: '1',
          patientId: '1',
          patientName: 'John Doe',
          diagnosis: 'Parkinson\'s Disease',
          startDate: '2024-03-01',
          endDate: '2024-06-01',
          status: 'active',
          medications: ['Levodopa', 'Carbidopa'],
          procedures: ['Physical Therapy', 'Occupational Therapy'],
          notes: 'Regular monitoring required'
        }
      ]);
      
      setError(null);
    } catch (err) {
      setError('Failed to load treatment plans');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleOpenDialog = (plan?: TreatmentPlan) => {
    setSelectedPlan(plan || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlan(null);
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
          Treatment Plans
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchPlans}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            New Plan
          </Button>
        </Box>
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
              <TableCell>Diagnosis</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Medications</TableCell>
              <TableCell>Procedures</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.patientName}</TableCell>
                <TableCell>{plan.diagnosis}</TableCell>
                <TableCell>{plan.startDate}</TableCell>
                <TableCell>{plan.endDate}</TableCell>
                <TableCell>
                  <Chip
                    label={plan.status}
                    color={getStatusColor(plan.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{plan.medications.join(', ')}</TableCell>
                <TableCell>{plan.procedures.join(', ')}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenDialog(plan)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedPlan ? 'Edit Treatment Plan' : 'New Treatment Plan'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, pt: 2 }}>
            <TextField
              label="Patient Name"
              fullWidth
              defaultValue={selectedPlan?.patientName}
            />
            <TextField
              label="Diagnosis"
              fullWidth
              defaultValue={selectedPlan?.diagnosis}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                defaultValue={selectedPlan?.startDate}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                defaultValue={selectedPlan?.endDate}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                defaultValue={selectedPlan?.status || 'active'}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Medications"
              fullWidth
              multiline
              rows={2}
              defaultValue={selectedPlan?.medications.join(', ')}
              helperText="Enter medications separated by commas"
            />
            <TextField
              label="Procedures"
              fullWidth
              multiline
              rows={2}
              defaultValue={selectedPlan?.procedures.join(', ')}
              helperText="Enter procedures separated by commas"
            />
            <TextField
              label="Notes"
              fullWidth
              multiline
              rows={3}
              defaultValue={selectedPlan?.notes}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedPlan ? 'Save Changes' : 'Create Plan'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TreatmentPlan; 