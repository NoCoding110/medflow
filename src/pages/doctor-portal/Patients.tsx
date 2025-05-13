import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
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
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../../lib/services/mockDoctorService';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  status: string;
  lastVisit: string;
  nextAppointment: string;
  riskLevel: string;
}

type SortField = 'name' | 'status' | 'lastVisit' | 'nextAppointment' | 'riskLevel';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  status: string[];
  riskLevel: string[];
  gender: string[];
  hasUpcomingAppointment: boolean;
}

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    riskLevel: [],
    gender: [],
    hasUpcomingAppointment: false
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to load patients data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (category: keyof FilterState, value: string | boolean) => {
    setFilters(prev => {
      if (typeof value === 'boolean') {
        return { ...prev, [category]: value };
      }
      const currentValues = prev[category] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  const filteredAndSortedPatients = useMemo(() => {
    let result = [...patients];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery)
      );
    }

    // Apply status filters
    if (filters.status.length > 0) {
      result = result.filter(patient => filters.status.includes(patient.status));
    }

    // Apply risk level filters
    if (filters.riskLevel.length > 0) {
      result = result.filter(patient => filters.riskLevel.includes(patient.riskLevel));
    }

    // Apply gender filters
    if (filters.gender.length > 0) {
      result = result.filter(patient => filters.gender.includes(patient.gender));
    }

    // Apply upcoming appointment filter
    if (filters.hasUpcomingAppointment) {
      result = result.filter(patient => patient.nextAppointment !== 'None');
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'lastVisit':
          comparison = new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime();
          break;
        case 'nextAppointment':
          comparison = new Date(a.nextAppointment).getTime() - new Date(b.nextAppointment).getTime();
          break;
        case 'riskLevel':
          comparison = a.riskLevel.localeCompare(b.riskLevel);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [patients, searchQuery, filters, sortField, sortOrder]);

  const handleViewPatient = (patient: Patient) => {
    navigate(`/doctor/patients/${patient.id}`);
  };

  const handleEditPatient = (patient: Patient) => {
    navigate(`/doctor/patients/${patient.id}/edit`);
  };

  const handleDeletePatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedPatient) {
      // In a real application, this would call an API to delete the patient
      setPatients(patients.filter(p => p.id !== selectedPatient.id));
      setOpenDialog(false);
      setSelectedPatient(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
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
          Patients
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/doctor/patients/new')}
        >
          Add New Patient
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search patients by name, email, or phone"
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
            <Box>
              <Tooltip title="Filter Patients">
                <IconButton onClick={handleFilterClick}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Status" />
              <Stack direction="row" spacing={1}>
                {['active', 'inactive', 'pending'].map((status) => (
                  <Chip
                    key={status}
                    label={status}
                    size="small"
                    color={filters.status.includes(status) ? (getStatusColor(status) as any) : 'default'}
                    onClick={() => handleFilterChange('status', status)}
                  />
                ))}
              </Stack>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Risk Level" />
              <Stack direction="row" spacing={1}>
                {['high', 'medium', 'low'].map((level) => (
                  <Chip
                    key={level}
                    label={level}
                    size="small"
                    color={filters.riskLevel.includes(level) ? (getRiskLevelColor(level) as any) : 'default'}
                    onClick={() => handleFilterChange('riskLevel', level)}
                  />
                ))}
              </Stack>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Gender" />
              <Stack direction="row" spacing={1}>
                {['male', 'female', 'other'].map((gender) => (
                  <Chip
                    key={gender}
                    label={gender}
                    size="small"
                    onClick={() => handleFilterChange('gender', gender)}
                  />
                ))}
              </Stack>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  checked={filters.hasUpcomingAppointment}
                  onChange={(e) => handleFilterChange('hasUpcomingAppointment', e.target.checked)}
                />
              </ListItemIcon>
              <ListItemText primary="Has Upcoming Appointment" />
            </ListItem>
          </List>
        </Box>
      </Popover>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>
                  Patient
                  {sortField === 'name' && (
                    sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>
                  Status
                  {sortField === 'status' && (
                    sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleSort('lastVisit')}>
                  Last Visit
                  {sortField === 'lastVisit' && (
                    sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleSort('nextAppointment')}>
                  Next Appointment
                  {sortField === 'nextAppointment' && (
                    sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleSort('riskLevel')}>
                  Risk Level
                  {sortField === 'riskLevel' && (
                    sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 2 }}>{patient.firstName[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {patient.firstName} {patient.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {patient.dateOfBirth} • {patient.gender}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{patient.email}</Typography>
                  <Typography variant="body2">{patient.phone}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={patient.status}
                    color={getStatusColor(patient.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>{patient.nextAppointment}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.riskLevel}
                    color={getRiskLevelColor(patient.riskLevel) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleViewPatient(patient)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Patient">
                    <IconButton onClick={() => handleEditPatient(patient)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Patient">
                    <IconButton onClick={() => handleDeletePatient(patient)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedPatient?.firstName} {selectedPatient?.lastName}?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Patients; 