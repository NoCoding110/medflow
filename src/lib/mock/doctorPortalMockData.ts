import { v4 as uuidv4 } from 'uuid';

// Types
export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on_leave';
  schedule: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
  };
  patients: string[];
  appointments: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'checkup' | 'followup' | 'consultation' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  duration: number; // in minutes
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  status: 'active' | 'completed' | 'cancelled';
  refills: number;
  notes?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  type: string;
  results: Array<{
    name: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'normal' | 'abnormal' | 'critical';
  }>;
  status: 'pending' | 'completed' | 'reviewed';
  notes?: string;
}

export interface BillingRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  services: Array<{
    name: string;
    cost: number;
    insuranceCoverage: number;
    patientResponsibility: number;
  }>;
  totalAmount: number;
  insuranceCoverage: number;
  patientResponsibility: number;
  status: 'pending' | 'paid' | 'overdue';
  paymentMethod?: string;
}

// Mock Data
export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    firstName: 'John',
    lastName: 'Smith',
    specialization: 'Cardiology',
    email: 'john.smith@medflow.com',
    phone: '555-0101',
    status: 'active',
    schedule: {
      monday: ['09:00-17:00'],
      tuesday: ['09:00-17:00'],
      wednesday: ['09:00-17:00'],
      thursday: ['09:00-17:00'],
      friday: ['09:00-17:00']
    },
    patients: ['p1', 'p2', 'p3'],
    appointments: ['a1', 'a2', 'a3']
  },
  {
    id: 'd2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialization: 'Neurology',
    email: 'sarah.johnson@medflow.com',
    phone: '555-0102',
    status: 'active',
    schedule: {
      monday: ['10:00-18:00'],
      tuesday: ['10:00-18:00'],
      wednesday: ['10:00-18:00'],
      thursday: ['10:00-18:00'],
      friday: ['10:00-18:00']
    },
    patients: ['p4', 'p5'],
    appointments: ['a4', 'a5']
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2024-03-20',
    time: '09:00',
    type: 'checkup',
    status: 'scheduled',
    duration: 30,
    notes: 'Regular checkup'
  },
  {
    id: 'a2',
    patientId: 'p2',
    doctorId: 'd1',
    date: '2024-03-20',
    time: '10:00',
    type: 'followup',
    status: 'scheduled',
    duration: 45,
    notes: 'Follow-up after medication change'
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'pr1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2024-03-15',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning with food'
      }
    ],
    status: 'active',
    refills: 2,
    notes: 'Monitor blood pressure'
  }
];

export const mockLabResults: LabResult[] = [
  {
    id: 'l1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2024-03-18',
    type: 'Blood Work',
    results: [
      {
        name: 'Hemoglobin',
        value: '14.2',
        unit: 'g/dL',
        referenceRange: '13.5-17.5',
        status: 'normal'
      },
      {
        name: 'Glucose',
        value: '95',
        unit: 'mg/dL',
        referenceRange: '70-100',
        status: 'normal'
      }
    ],
    status: 'completed',
    notes: 'All values within normal range'
  }
];

export const mockBillingRecords: BillingRecord[] = [
  {
    id: 'b1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2024-03-20',
    services: [
      {
        name: 'Office Visit',
        cost: 150,
        insuranceCoverage: 120,
        patientResponsibility: 30
      }
    ],
    totalAmount: 150,
    insuranceCoverage: 120,
    patientResponsibility: 30,
    status: 'pending',
    paymentMethod: 'Credit Card'
  }
];

// Helper functions
export const getDoctorAppointments = (doctorId: string, date?: string) => {
  let filtered = mockAppointments.filter(a => a.doctorId === doctorId);
  if (date) {
    filtered = filtered.filter(a => a.date === date);
  }
  return filtered;
};

export const getDoctorPatients = (doctorId: string) => {
  const doctor = mockDoctors.find(d => d.id === doctorId);
  return doctor ? doctor.patients : [];
};

export const getPatientPrescriptions = (patientId: string) => {
  return mockPrescriptions.filter(p => p.patientId === patientId);
};

export const getPatientLabResults = (patientId: string) => {
  return mockLabResults.filter(l => l.patientId === patientId);
};

export const getPatientBillingRecords = (patientId: string) => {
  return mockBillingRecords.filter(b => b.patientId === patientId);
}; 