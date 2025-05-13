import { v4 as uuidv4 } from 'uuid';

// Helper function to generate consistent IDs
const generateId = () => uuidv4();

// Mock data for patients
export const mockPatients = [
  {
    id: generateId(),
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
    id: generateId(),
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
  {
    id: generateId(),
    firstName: "Michael",
    lastName: "Brown",
    dateOfBirth: "1985-03-10",
    gender: "Male",
    email: "michael.b@email.com",
    phone: "555-0125",
    status: "active",
    lastVisit: "2024-03-05",
    nextAppointment: "2024-03-25",
    address: "789 Pine Rd, City, State",
    medicalHistory: ["High Cholesterol"],
    medications: ["Atorvastatin"],
    allergies: ["None"],
    riskLevel: "low"
  }
];

// Mock data for appointments
export const mockAppointments = [
  {
    id: generateId(),
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
    id: generateId(),
    patientId: mockPatients[1].id,
    date: "2024-03-20",
    time: "10:30",
    type: "New Patient",
    status: "scheduled",
    notes: "Initial consultation",
    telehealthLink: "https://meet.example.com/124",
    duration: 45
  },
  {
    id: generateId(),
    patientId: mockPatients[2].id,
    date: "2024-03-25",
    time: "14:00",
    type: "Follow-up",
    status: "scheduled",
    notes: "Cholesterol check",
    telehealthLink: "https://meet.example.com/125",
    duration: 30
  }
];

// Mock data for clinical notes
export const mockClinicalNotes = [
  {
    id: generateId(),
    patientId: mockPatients[0].id,
    date: "2024-03-15",
    content: "Regular checkup completed. Patient is in good health. Blood pressure and blood sugar levels are stable. Continue current medication regimen.",
    type: "checkup",
    status: "completed"
  },
  {
    id: generateId(),
    patientId: mockPatients[1].id,
    date: "2024-03-16",
    content: "Follow-up appointment. Patient reported improvement in symptoms. Asthma is well-controlled with current medication. Anxiety symptoms have decreased.",
    type: "followup",
    status: "completed"
  },
  {
    id: generateId(),
    patientId: mockPatients[2].id,
    date: "2024-03-17",
    content: "Initial consultation completed. Patient presents with high cholesterol. Started on Atorvastatin. Recommended lifestyle modifications.",
    type: "new",
    status: "completed"
  }
];

// Mock data for medical records
export const mockMedicalRecords = [
  {
    id: generateId(),
    patientId: mockPatients[0].id,
    date: "2024-03-15",
    type: "general",
    diagnosis: "Hypertension, Type 2 Diabetes",
    treatment: "Lisinopril 10mg daily, Metformin 500mg twice daily",
    status: "active"
  },
  {
    id: generateId(),
    patientId: mockPatients[1].id,
    date: "2024-03-16",
    type: "followup",
    diagnosis: "Asthma, Anxiety",
    treatment: "Albuterol PRN, Sertraline 50mg daily",
    status: "active"
  },
  {
    id: generateId(),
    patientId: mockPatients[2].id,
    date: "2024-03-17",
    type: "new",
    diagnosis: "High Cholesterol",
    treatment: "Atorvastatin 20mg daily",
    status: "active"
  }
];

// Mock data for lab results
export const mockLabResults = [
  {
    id: generateId(),
    patientId: mockPatients[0].id,
    date: "2024-03-15",
    type: "blood",
    tests: [
      {
        name: "Complete Blood Count",
        value: "Normal",
        unit: "N/A",
        range: "Normal Range"
      },
      {
        name: "Hemoglobin A1C",
        value: "6.2",
        unit: "%",
        range: "4.0-5.6"
      }
    ],
    status: "completed",
    notes: "A1C slightly elevated, continue monitoring"
  },
  {
    id: generateId(),
    patientId: mockPatients[1].id,
    date: "2024-03-16",
    type: "pulmonary",
    tests: [
      {
        name: "Spirometry",
        value: "85",
        unit: "%",
        range: "80-120"
      }
    ],
    status: "completed",
    notes: "Lung function within normal range"
  },
  {
    id: generateId(),
    patientId: mockPatients[2].id,
    date: "2024-03-17",
    type: "lipid",
    tests: [
      {
        name: "Total Cholesterol",
        value: "240",
        unit: "mg/dL",
        range: "<200"
      },
      {
        name: "LDL",
        value: "160",
        unit: "mg/dL",
        range: "<100"
      }
    ],
    status: "completed",
    notes: "Elevated cholesterol levels, started on statin therapy"
  }
];

// Mock data for billing
export const mockBilling = [
  {
    id: generateId(),
    patientId: mockPatients[0].id,
    date: "2024-03-15",
    type: "consultation",
    amount: 150,
    status: "paid",
    insurance: "Blue Cross",
    claimNumber: "BC123456"
  },
  {
    id: generateId(),
    patientId: mockPatients[1].id,
    date: "2024-03-16",
    type: "procedure",
    amount: 300,
    status: "pending",
    insurance: "Aetna",
    claimNumber: "AE789012"
  },
  {
    id: generateId(),
    patientId: mockPatients[2].id,
    date: "2024-03-17",
    type: "consultation",
    amount: 150,
    status: "pending",
    insurance: "United Healthcare",
    claimNumber: "UH345678"
  }
];

// Mock data for prescriptions
export const mockPrescriptions = [
  {
    id: generateId(),
    patientId: mockPatients[0].id,
    date: "2024-03-15",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Daily",
    status: "active",
    refills: 3,
    pharmacy: "CVS Pharmacy"
  },
  {
    id: generateId(),
    patientId: mockPatients[1].id,
    date: "2024-03-16",
    medication: "Sertraline",
    dosage: "50mg",
    frequency: "Daily",
    status: "active",
    refills: 2,
    pharmacy: "Walgreens"
  },
  {
    id: generateId(),
    patientId: mockPatients[2].id,
    date: "2024-03-17",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Daily",
    status: "active",
    refills: 1,
    pharmacy: "Rite Aid"
  }
];

// Mock data for reminders
export const mockReminders = [
  {
    id: generateId(),
    patientId: mockPatients[0].id,
    date: "2024-03-20",
    type: "appointment",
    message: "Follow-up appointment scheduled",
    status: "pending"
  },
  {
    id: generateId(),
    patientId: mockPatients[1].id,
    date: "2024-03-25",
    type: "prescription",
    message: "Prescription refill due",
    status: "pending"
  },
  {
    id: generateId(),
    patientId: mockPatients[2].id,
    date: "2024-03-30",
    type: "lab",
    message: "Follow-up lab work required",
    status: "pending"
  }
];

// Mock data for telehealth sessions
export const mockTelehealthSessions = [
  {
    id: generateId(),
    patientId: mockPatients[0].id,
    date: "2024-03-20",
    time: "10:00",
    type: "consultation",
    status: "scheduled",
    notes: "Follow-up consultation for diabetes management",
    duration: 30,
    platform: "MedFlow Telehealth",
    meetingLink: "https://meet.example.com/123"
  },
  {
    id: generateId(),
    patientId: mockPatients[1].id,
    date: "2024-03-21",
    time: "14:00",
    type: "followup",
    status: "scheduled",
    notes: "Asthma control assessment",
    duration: 30,
    platform: "MedFlow Telehealth",
    meetingLink: "https://meet.example.com/124"
  },
  {
    id: generateId(),
    patientId: mockPatients[2].id,
    date: "2024-03-22",
    time: "11:00",
    type: "consultation",
    status: "scheduled",
    notes: "Cholesterol management follow-up",
    duration: 30,
    platform: "MedFlow Telehealth",
    meetingLink: "https://meet.example.com/125"
  }
]; 