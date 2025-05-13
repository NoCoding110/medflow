import {
  mockClinicalNotes,
  mockMedicalRecords,
  mockLabResults,
  mockBilling,
  mockPrescriptions,
  mockReminders,
  mockTelehealthSessions
} from '../mock/doctorMockData';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface Activity {
  id: string;
  type: 'appointment' | 'prescription' | 'lab' | 'note' | 'billing';
  title: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'warning';
  patientName: string;
}

const simulateApiDelay = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
};

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  patients: number;
  appointments: number;
  rating: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  nextAppointment: string;
  firstName: string;
  lastName: string;
}

export const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. John Smith",
  specialization: "General Medicine",
  patients: 150,
  appointments: 25,
  rating: 4.8,
};

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Alice Johnson",
    date: "2024-03-20",
    time: "09:00 AM",
    type: "Check-up",
    status: "Scheduled",
  },
  {
    id: "2",
    patientName: "Bob Wilson",
    date: "2024-03-20",
    time: "10:30 AM",
    type: "Follow-up",
    status: "Scheduled",
  },
];

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Alice Johnson",
    firstName: "Alice",
    lastName: "Johnson",
    age: 35,
    gender: "Female",
    lastVisit: "2024-02-15",
    nextAppointment: "2024-03-20",
  },
  {
    id: "2",
    name: "Bob Wilson",
    firstName: "Bob",
    lastName: "Wilson",
    age: 45,
    gender: "Male",
    lastVisit: "2024-02-20",
    nextAppointment: "2024-03-20",
  },
];

// Patients
export const getPatients = async (): Promise<Patient[]> => {
  await delay(500);
  return mockPatients;
};

export const getPatientById = async (id: string): Promise<Patient | undefined> => {
  await delay(300);
  return mockPatients.find(p => p.id === id);
};

// Appointments
export const getAppointments = async (): Promise<Appointment[]> => {
  await delay(500);
  return mockAppointments;
};

export const getAppointmentById = async (id: string): Promise<Appointment | undefined> => {
  await delay(300);
  return mockAppointments.find(a => a.id === id);
};

export const createAppointment = async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
  await delay(500);
  const newAppointment = {
    id: Math.random().toString(36).substr(2, 9),
    ...appointment,
    status: 'scheduled'
  };
  mockAppointments.push(newAppointment);
  return newAppointment;
};

// Clinical Notes
export const getClinicalNotes = async () => {
  await delay(500);
  return mockClinicalNotes;
};

export const getClinicalNoteById = async (id: string) => {
  await delay(300);
  return mockClinicalNotes.find(n => n.id === id);
};

export const createClinicalNote = async (note: any) => {
  await delay(500);
  const newNote = {
    id: Math.random().toString(36).substr(2, 9),
    ...note,
    date: new Date().toISOString().split('T')[0]
  };
  mockClinicalNotes.push(newNote);
  return newNote;
};

// Medical Records
export const getMedicalRecords = async () => {
  await delay(500);
  return mockMedicalRecords;
};

export const getMedicalRecordById = async (id: string) => {
  await delay(300);
  return mockMedicalRecords.find(r => r.id === id);
};

// Lab Results
export const getLabResults = async () => {
  await delay(500);
  return mockLabResults;
};

export const getLabResultById = async (id: string) => {
  await delay(300);
  return mockLabResults.find(r => r.id === id);
};

// Billing
export const getBillingRecords = async () => {
  await delay(500);
  return mockBilling;
};

export const getBillingRecordById = async (id: string) => {
  await delay(300);
  return mockBilling.find(b => b.id === id);
};

export const createBillingRecord = async (record: any) => {
  await delay(500);
  const newRecord = {
    id: Math.random().toString(36).substr(2, 9),
    ...record,
    date: new Date().toISOString().split('T')[0]
  };
  mockBilling.push(newRecord);
  return newRecord;
};

// Prescriptions
export const getPrescriptions = async () => {
  await delay(500);
  return mockPrescriptions;
};

export const getPrescriptionById = async (id: string) => {
  await delay(300);
  return mockPrescriptions.find(p => p.id === id);
};

export const createPrescription = async (prescription: any) => {
  await delay(500);
  const newPrescription = {
    id: Math.random().toString(36).substr(2, 9),
    ...prescription,
    date: new Date().toISOString().split('T')[0],
    status: 'active'
  };
  mockPrescriptions.push(newPrescription);
  return newPrescription;
};

// Reminders
export const getReminders = async () => {
  await delay(500);
  return mockReminders;
};

export const getReminderById = async (id: string) => {
  await delay(300);
  return mockReminders.find(r => r.id === id);
};

export const createReminder = async (reminder: any) => {
  await delay(500);
  const newReminder = {
    id: Math.random().toString(36).substr(2, 9),
    ...reminder,
    status: 'pending'
  };
  mockReminders.push(newReminder);
  return newReminder;
};

// Telehealth
export const getTelehealthSessions = async () => {
  await delay(500);
  return mockTelehealthSessions;
};

export const getTelehealthSessionById = async (id: string) => {
  await delay(300);
  return mockTelehealthSessions.find(s => s.id === id);
};

export const createTelehealthSession = async (session: any) => {
  await delay(500);
  const newSession = {
    id: Math.random().toString(36).substr(2, 9),
    ...session,
    status: 'scheduled'
  };
  mockTelehealthSessions.push(newSession);
  return newSession;
};

// Analytics
export const getDoctorAnalytics = async () => {
  await delay(500);
  return {
    totalPatients: 150,
    newPatients: 12,
    totalAppointments: 45,
    upcomingAppointments: 8,
    avgWaitTime: 15,
    waitTimeTrend: '-5%',
    satisfaction: 95,
    satisfactionTrend: '+2%',
    monthlyStats: {
      appointments: [30, 35, 40, 45],
      patients: [120, 125, 135, 150],
      satisfaction: [92, 93, 94, 95]
    }
  };
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  await delay(500);
  return [
    {
      id: '1',
      type: 'appointment',
      title: 'Completed Appointment',
      timestamp: new Date().toISOString(),
      status: 'completed',
      patientName: 'Alice Johnson'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'New Prescription',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'pending',
      patientName: 'Bob Wilson'
    },
    {
      id: '3',
      type: 'lab',
      title: 'Lab Results Received',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'completed',
      patientName: 'Carol Davis'
    },
    {
      id: '4',
      type: 'note',
      title: 'Clinical Note Added',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      status: 'completed',
      patientName: 'David Miller'
    }
  ];
}; 