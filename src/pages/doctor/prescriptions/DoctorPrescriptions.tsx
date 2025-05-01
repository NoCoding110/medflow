import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert
} from '@mui/material';
import PatientSearch from './PatientSearch';
import PrescriptionForm from './PrescriptionForm';

interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
}

const steps = ['Select Patient', 'Create Prescription'];

const DoctorPrescriptions: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveStep(1);
  };

  const handlePrescriptionSubmit = async (prescription: any) => {
    try {
      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(prescription)
      });

      if (!response.ok) {
        throw new Error('Failed to create prescription');
      }

      setSuccess('Prescription created and sent to pharmacy successfully');
      setTimeout(() => {
        setActiveStep(0);
        setSelectedPatient(null);
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Error creating prescription:', error);
      setError('Failed to create prescription. Please try again.');
    }
  };

  const handleBack = () => {
    setActiveStep(0);
    setError(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Write Prescription
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        {activeStep === 0 ? (
          <PatientSearch onPatientSelect={handlePatientSelect} />
        ) : (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Writing prescription for:
              </Typography>
              <Typography variant="h6">
                {selectedPatient?.lastName}, {selectedPatient?.firstName}
              </Typography>
              <Typography color="text.secondary">
                MRN: {selectedPatient?.mrn} • DOB: {selectedPatient?.dateOfBirth}
              </Typography>
            </Box>

            <PrescriptionForm
              patientId={selectedPatient?.id || ''}
              onSubmit={handlePrescriptionSubmit}
            />

            <Box sx={{ mt: 3 }}>
              <Button onClick={handleBack}>
                Back to Patient Search
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default DoctorPrescriptions; 