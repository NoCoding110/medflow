import { useState, useEffect } from 'react';

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  lastVisit: string;
  nextAppointment: string;
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    coverageDetails: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export function usePatient() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // TODO: Implement actual API call
        const response = await fetch('/api/patient');
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        setPatient(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, []);

  return { patient, isLoading, error };
} 