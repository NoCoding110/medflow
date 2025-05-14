import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack
} from '@mui/material';
import {
  LocalPharmacy as PharmacyIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

interface Medication {
  id: string;
  name: string;
  form: string;
  strength: string;
  isControlled: boolean;
  schedule?: string;
}

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance?: number;
}

interface PrescriptionFormProps {
  patientId: string;
  onSubmit: (prescription: any) => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ patientId, onSubmit }) => {
  const [medication, setMedication] = useState<Medication | null>(null);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [quantity, setQuantity] = useState('');
  const [refills, setRefills] = useState('0');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [showInteractions, setShowInteractions] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  // Load medications from FDB database
  const searchMedications = async (term: string) => {
    if (!term) return;
    try {
      const response = await fetch(`/api/medications/search?term=${term}`);
      const data = await response.json();
      setMedications(data);
    } catch (error) {
      console.error('Error searching medications:', error);
    }
  };

  // Search nearby pharmacies using geolocation
  const searchPharmacies = async () => {
    if (!locationPermission) {
      const permission = await requestLocationPermission();
      if (!permission) return;
    }

    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `/api/prescriptions/pharmacies/search?latitude=${latitude}&longitude=${longitude}&radius=10`
        );
        const data = await response.json();
        setPharmacies(data);
      });
    } catch (error) {
      console.error('Error searching pharmacies:', error);
    }
  };

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      const granted = result.state === 'granted';
      setLocationPermission(granted);
      return granted;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  // Check drug interactions when medication changes
  useEffect(() => {
    if (medication) {
      checkInteractions();
    }
  }, [medication]);

  // Check drug interactions
  const checkInteractions = async () => {
    if (!medication) return;
    try {
      const response = await fetch('/api/prescriptions/check-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medications: [medication.name]
        })
      });
      const data = await response.json();
      setInteractions(data);
      if (data.length > 0) {
        setShowInteractions(true);
      }
    } catch (error) {
      console.error('Error checking interactions:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medication || !pharmacy) return;

    setLoading(true);
    try {
      const prescription = {
        patientId,
        medication: medication.name,
        dosage,
        frequency,
        duration: parseInt(duration),
        quantity: parseInt(quantity),
        refills: parseInt(refills),
        pharmacy: {
          id: pharmacy.id,
          name: pharmacy.name,
          address: pharmacy.address,
          phone: pharmacy.phone
        },
        instructions
      };

      await onSubmit(prescription);
    } catch (error) {
      console.error('Error submitting prescription:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            New Prescription
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={medications}
                loading={loading}
                getOptionLabel={(option) => 
                  `${option.name} ${option.strength} ${option.form}${option.isControlled ? ' (Controlled)' : ''}`
                }
                onChange={(_, value) => setMedication(value)}
                onInputChange={(_, value) => searchMedications(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Medication"
                    required
                    helperText={medication?.isControlled ? 'This is a controlled substance' : ''}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>{option.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.strength} {option.form}
                      </Typography>
                      {option.isControlled && (
                        <Chip
                          size="small"
                          color="warning"
                          label={`Schedule ${option.schedule}`}
                        />
                      )}
                    </Stack>
                  </li>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <MenuItem value="once">Once daily</MenuItem>
                  <MenuItem value="twice">Twice daily</MenuItem>
                  <MenuItem value="three">Three times daily</MenuItem>
                  <MenuItem value="four">Four times daily</MenuItem>
                  <MenuItem value="asneeded">As needed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Duration (days)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Refills"
                value={refills}
                onChange={(e) => setRefills(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  <PharmacyIcon sx={{ mr: 1 }} /> Select Pharmacy
                </Typography>
                <Button
                  variant="outlined"
                  onClick={searchPharmacies}
                  sx={{ mb: 2 }}
                >
                  Find Nearby Pharmacies
                </Button>
                {pharmacies.length > 0 && (
                  <Autocomplete
                    fullWidth
                    options={pharmacies}
                    getOptionLabel={(option) => 
                      `${option.name} (${option.distance?.toFixed(1)} mi)`
                    }
                    onChange={(_, value) => setPharmacy(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Pharmacy" required />
                    )}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <Stack spacing={0.5}>
                          <Typography>{option.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {option.address}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {option.phone} • {option.distance?.toFixed(1)} miles
                          </Typography>
                        </Stack>
                      </li>
                    )}
                  />
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !medication || !pharmacy}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Prescription'}
            </Button>
          </Box>
        </form>

        <Dialog open={showInteractions} onClose={() => setShowInteractions(false)}>
          <DialogTitle>Drug Interactions Found</DialogTitle>
          <DialogContent>
            {interactions.map((interaction, index) => (
              <Alert
                key={index}
                severity={interaction.severity === 'high' ? 'error' : 'warning'}
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle2">{interaction.description}</Typography>
                <Typography variant="body2">{interaction.recommendation}</Typography>
              </Alert>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowInteractions(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PrescriptionForm; 