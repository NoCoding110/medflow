import { Patient, PatientNote, Appointment, Prescription } from '@/types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1980-05-15',
    gender: 'male',
    address: '123 Main St, City, State 12345',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin'],
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    insurance: {
      provider: 'Blue Cross',
      policyNumber: 'BC123456789',
      groupNumber: 'GRP987654'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1992-08-23',
    gender: 'female',
    address: '456 Oak Ave, City, State 12345',
    medicalHistory: ['Asthma'],
    allergies: ['Shellfish'],
    emergencyContact: {
      name: 'Mike Johnson',
      relationship: 'Brother',
      phone: '+1 (555) 876-5432'
    },
    insurance: {
      provider: 'Aetna',
      policyNumber: 'AE987654321',
      groupNumber: 'GRP123456'
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
];

export const mockPatientNotes: PatientNote[] = [
  {
    id: '1',
    patientId: '1',
    content: 'Patient reported increased blood pressure readings in the morning.',
    type: 'progress',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    patientId: '1',
    content: 'Started new blood pressure medication. Will follow up in 2 weeks.',
    type: 'treatment',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    date: '2024-02-01T09:00:00Z',
    type: 'checkup',
    status: 'scheduled',
    notes: 'Regular checkup',
    duration: 30
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-02-02T10:00:00Z',
    type: 'followup',
    status: 'scheduled',
    notes: 'Follow-up on asthma treatment',
    duration: 20
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientId: '1',
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: 'active',
    notes: 'Take with food'
  },
  {
    id: '2',
    patientId: '2',
    medication: 'Albuterol',
    dosage: '90mcg',
    frequency: 'As needed',
    startDate: '2024-01-10',
    endDate: '2024-04-10',
    status: 'active',
    notes: 'Use before exercise'
  }
];

// Mock functions
export const getPatient = (id: string) => mockPatients.find(p => p.id === id);
export const getPatientNotes = (patientId: string) => mockPatientNotes.filter(n => n.patientId === patientId);
export const getPatientAppointments = (patientId: string) => mockAppointments.filter(a => a.patientId === patientId);
export const getPatientPrescriptions = (patientId: string) => mockPrescriptions.filter(p => p.patientId === patientId); 