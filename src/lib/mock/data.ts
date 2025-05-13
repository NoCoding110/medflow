// Mock data for the application
export const mockUsers = [
  {
    id: '1',
    name: 'Dr. John Smith',
    email: 'john@medflow.com',
    role: 'doctor',
    specialization: 'Cardiology',
    patients: ['2', '3', '4']
  },
  {
    id: '2',
    name: 'John Patient',
    email: 'patient@medflow.com',
    role: 'patient',
    doctorId: '1',
    age: 45,
    gender: 'male',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes']
  },
  {
    id: '3',
    name: 'Sarah Patient',
    email: 'sarah@medflow.com',
    role: 'patient',
    doctorId: '1',
    age: 32,
    gender: 'female',
    medicalHistory: ['Asthma']
  }
];

export const mockAppointments = [
  {
    id: '1',
    patientId: '2',
    doctorId: '1',
    date: '2024-03-20T10:00:00Z',
    status: 'scheduled',
    type: 'checkup',
    notes: 'Regular checkup'
  },
  {
    id: '2',
    patientId: '3',
    doctorId: '1',
    date: '2024-03-21T14:30:00Z',
    status: 'scheduled',
    type: 'consultation',
    notes: 'Follow-up consultation'
  }
];

export const mockMedicalRecords = [
  {
    id: '1',
    patientId: '2',
    doctorId: '1',
    date: '2024-03-15T09:00:00Z',
    diagnosis: 'Hypertension',
    prescription: 'Lisinopril 10mg daily',
    notes: 'Blood pressure elevated, starting medication'
  },
  {
    id: '2',
    patientId: '3',
    doctorId: '1',
    date: '2024-03-16T11:00:00Z',
    diagnosis: 'Asthma',
    prescription: 'Albuterol inhaler',
    notes: 'Mild asthma symptoms, prescribed rescue inhaler'
  }
]; 