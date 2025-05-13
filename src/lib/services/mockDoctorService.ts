import {
  mockPatients,
  mockAppointments,
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

// Patients
export const getPatients = async () => {
  await delay(500);
  return mockPatients;
};

export const getPatientById = async (id: string) => {
  await delay(300);
  return mockPatients.find(p => p.id === id);
};

// Appointments
export const getAppointments = async () => {
  await delay(500);
  return mockAppointments;
};

export const getAppointmentById = async (id: string) => {
  await delay(300);
  return mockAppointments.find(a => a.id === id);
};

export const createAppointment = async (appointment: any) => {
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
  await simulateApiDelay();
  return {
    totalPatients: 150,
    activePatients: 120,
    totalAppointments: 45,
    upcomingAppointments: 12,
    totalPrescriptions: 85,
    activePrescriptions: 30,
    totalNotes: 200,
    pendingLabResults: 5,
    totalBilling: 25000,
    pendingBilling: 5000,
    patientTrend: [
      { date: '2024-01', count: 120 },
      { date: '2024-02', count: 130 },
      { date: '2024-03', count: 140 },
      { date: '2024-04', count: 150 }
    ],
    appointmentTrend: [
      { date: '2024-01', count: 35 },
      { date: '2024-02', count: 40 },
      { date: '2024-03', count: 42 },
      { date: '2024-04', count: 45 }
    ]
  };
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  await simulateApiDelay();
  return [
    {
      id: '1',
      type: 'appointment',
      title: 'New appointment scheduled',
      timestamp: new Date().toISOString(),
      status: 'pending',
      patientName: 'John Doe'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Prescription updated',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'completed',
      patientName: 'Jane Smith'
    },
    {
      id: '3',
      type: 'lab',
      title: 'Lab results received',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'warning',
      patientName: 'Mike Johnson'
    },
    {
      id: '4',
      type: 'note',
      title: 'Clinical note added',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      status: 'completed',
      patientName: 'Sarah Williams'
    },
    {
      id: '5',
      type: 'billing',
      title: 'Payment received',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      status: 'completed',
      patientName: 'Robert Brown'
    }
  ];
}; 