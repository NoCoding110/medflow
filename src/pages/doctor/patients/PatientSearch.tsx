import React, { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { Search as SearchIcon, History as HistoryIcon, Person as PersonIcon } from '@mui/icons-material';
import { debounce } from 'lodash';

interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
}

interface PatientSearchProps {
  onPatientSelect: (patient: Patient) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ onPatientSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  // Load recent patients from localStorage on mount
  useEffect(() => {
    const recent = localStorage.getItem('recentPatients');
    if (recent) {
      setRecentPatients(JSON.parse(recent));
    }
  }, []);

  // Debounced search function
  const searchPatients = debounce(async (term: string, field: string) => {
    if (!term) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/patients/search?term=${term}&field=${field}`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error searching patients:', error);
    } finally {
      setLoading(false);
    }
  }, 300);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.length >= 2) {
      searchPatients(term, searchField);
    } else {
      setPatients([]);
    }
  };

  // Handle patient selection
  const handlePatientSelect = (patient: Patient) => {
    onPatientSelect(patient);
    // Add to recent patients
    const updated = [patient, ...recentPatients.filter(p => p.id !== patient.id)].slice(0, 5);
    setRecentPatients(updated);
    localStorage.setItem('recentPatients', JSON.stringify(updated));
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Find Patient
          </Typography>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Search By</InputLabel>
              <Select
                value={searchField}
                label="Search By"
                onChange={(e) => setSearchField(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="mrn">MRN</MenuItem>
                <MenuItem value="dob">Date of Birth</MenuItem>
                <MenuItem value="phone">Phone</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </Select>
            </FormControl>
            <Autocomplete
              fullWidth
              freeSolo
              options={patients}
              loading={loading}
              getOptionLabel={(option: Patient | string) => {
                if (typeof option === 'string') return option;
                return `${option.lastName}, ${option.firstName} (MRN: ${option.mrn})`;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Patients"
                  variant="outlined"
                  onChange={handleSearchChange}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
                  }}
                />
              )}
              onChange={(_, value) => {
                if (value && typeof value !== 'string') {
                  handlePatientSelect(value);
                }
              }}
            />
          </Stack>
        </Box>

        {recentPatients.length > 0 && (
          <Box>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HistoryIcon sx={{ mr: 1 }} /> Recent Patients
            </Typography>
            <List>
              {recentPatients.map((patient) => (
                <ListItem
                  key={patient.id}
                  button
                  onClick={() => handlePatientSelect(patient)}
                  divider
                >
                  <ListItemText
                    primary={`${patient.lastName}, ${patient.firstName}`}
                    secondary={
                      <Stack direction="row" spacing={1}>
                        <Chip size="small" label={`MRN: ${patient.mrn}`} />
                        <Chip size="small" label={`DOB: ${patient.dateOfBirth}`} />
                      </Stack>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handlePatientSelect(patient)}>
                      <PersonIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientSearch; 