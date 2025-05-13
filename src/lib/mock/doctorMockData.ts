import { v4 as uuidv4 } from 'uuid';

// Mock data for patients
export const mockPatients = [
  {
    id: uuidv4(),
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: "1980-05-15",
    gender: "Male",
    email: "john.smith@email.com",
    phone: "555-0123",
    status: "active",
    lastVisit: "2024-03-01",
    nextAppointment: "2024-03-15",
    address: "123 Main St, City, State",
    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Lisinopril", "Metformin"],
    allergies: ["Penicillin"],
    riskLevel: "medium"
  },
  {
    id: uuidv4(),
    firstName: "Sarah",
    lastName: "Johnson",
    dateOfBirth: "1975-08-22",
    gender: "Female",
    email: "sarah.j@email.com",
    phone: "555-0124",
    status: "active",
    lastVisit: "2024-02-28",
    nextAppointment: "2024-03-20",
    address: "456 Oak Ave, City, State",
    medicalHistory: ["Asthma", "Anxiety"],
    medications: ["Albuterol", "Sertraline"],
    allergies: ["Shellfish"],
    riskLevel: "low"
  },
  // Add more mock patients...
];

// Mock data for appointments
export const mockAppointments = [
  {
    id: uuidv4(),
    patientId: mockPatients[0].id,
    date: "2024-03-15",
    time: "09:00",
    type: "Follow-up",
    status: "scheduled",
    notes: "Regular check-up",
    telehealthLink: "https://meet.example.com/123",
    duration: 30
  },
  {
    id: uuidv4(),
    patientId: mockPatients[1].id,
    date: "2024-03-20",
    time: "10:30",
    type: "New Patient",
    status: "scheduled",
    notes: "Initial consultation",
    telehealthLink: "https://meet.example.com/124",
    duration: 45
  },
  // Add more mock appointments...
];

// Mock data for clinical notes
export const mockClinicalNotes = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-15',
    content: 'Regular checkup completed. Patient is in good health.',
    type: 'checkup',
    status: 'completed'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-03-16',
    content: 'Follow-up appointment. Patient reported improvement in symptoms.',
    type: 'followup',
    status: 'completed'
  }
];

// Mock data for medical records
export const mockMedicalRecords = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-15',
    type: 'general',
    diagnosis: 'Healthy',
    treatment: 'None required',
    status: 'active'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-03-16',
    type: 'followup',
    diagnosis: 'Recovering',
    treatment: 'Continue medication',
    status: 'active'
  }
];

// Mock data for lab results
export const mockLabResults = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-15',
    type: 'blood',
    tests: [
      {
        name: 'Complete Blood Count',
        value: 'Normal',
        unit: 'N/A',
        range: 'Normal Range'
      }
    ],
    status: 'completed',
    notes: 'All values within normal range'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-03-16',
    type: 'urine',
    tests: [
      {
        name: 'Urinalysis',
        value: 'Normal',
        unit: 'N/A',
        range: 'Normal Range'
      }
    ],
    status: 'completed',
    notes: 'No abnormalities detected'
  }
];

// Mock data for billing
export const mockBilling = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-15',
    type: 'consultation',
    amount: 150,
    status: 'paid',
    insurance: 'Blue Cross',
    claimNumber: 'BC123456'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-03-16',
    type: 'procedure',
    amount: 300,
    status: 'pending',
    insurance: 'Aetna',
    claimNumber: 'AE789012'
  }
];

// Mock data for prescriptions
export const mockPrescriptions = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-15',
    medication: 'Vitamin D',
    dosage: '1000 IU',
    frequency: 'Daily',
    status: 'active'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-03-16',
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Twice daily',
    status: 'active'
  }
];

// Mock data for reminders
export const mockReminders = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-20',
    type: 'appointment',
    message: 'Follow-up appointment scheduled',
    status: 'pending'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-03-21',
    type: 'medication',
    message: 'Refill prescription',
    status: 'pending'
  }
];

// Mock data for telehealth sessions
export const mockTelehealthSessions = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-20',
    time: '10:00 AM',
    type: 'consultation',
    status: 'scheduled'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-03-21',
    time: '2:00 PM',
    type: 'followup',
    status: 'scheduled'
  }
]; 