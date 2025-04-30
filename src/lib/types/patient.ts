import { MedicalHistory, Medication, Note } from './medical';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  email?: string;
  phone?: string;
  address?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  medicalHistory?: MedicalHistory;
  allergies?: string[];
  medications?: Medication[];
  notes?: Note[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show';
  notes?: string;
  isVirtual?: boolean;
}
