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
    id: uuidv4(),
    patientId: mockPatients[0].id,
    date: "2024-03-01",
    type: "Follow-up",
    content: "Patient reports improved blood pressure control. Continue current medication regimen.",
    attachments: ["blood_pressure_chart.pdf"],
    tags: ["Hypertension", "Follow-up"]
  },
  {
    id: uuidv4(),
    patientId: mockPatients[1].id,
    date: "2024-02-28",
    type: "Initial",
    content: "New patient consultation. Discussed asthma management plan.",
    attachments: ["asthma_action_plan.pdf"],
    tags: ["Asthma", "New Patient"]
  },
  // Add more mock notes...
];

// Mock data for medical records
export const mockMedicalRecords = [
  {
    id: uuidv4(),
    patientId: mockPatients[0].id,
    type: "Lab Result",
    date: "2024-03-01",
    title: "Blood Work Results",
    content: "Complete blood count and metabolic panel results",
    attachments: ["lab_results_20240301.pdf"],
    status: "reviewed"
  },
  {
    id: uuidv4(),
    patientId: mockPatients[1].id,
    type: "Imaging",
    date: "2024-02-28",
    title: "Chest X-Ray",
    content: "Routine chest X-ray results",
    attachments: ["chest_xray_20240228.pdf"],
    status: "pending"
  },
  // Add more mock records...
];

// Mock data for lab results
export const mockLabResults = [
  {
    id: uuidv4(),
    patientId: mockPatients[0].id,
    date: "2024-03-01",
    type: "Blood Work",
    tests: [
      { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5" },
      { name: "Glucose", value: "95", unit: "mg/dL", range: "70-100" }
    ],
    status: "completed",
    notes: "All values within normal range"
  },
  {
    id: uuidv4(),
    patientId: mockPatients[1].id,
    date: "2024-02-28",
    type: "Urinalysis",
    tests: [
      { name: "pH", value: "6.0", unit: "", range: "5.0-7.0" },
      { name: "Protein", value: "Negative", unit: "", range: "Negative" }
    ],
    status: "completed",
    notes: "Normal results"
  },
  // Add more mock lab results...
];

// Mock data for billing
export const mockBilling = [
  {
    id: uuidv4(),
    patientId: mockPatients[0].id,
    date: "2024-03-01",
    type: "Consultation",
    amount: 150.00,
    status: "paid",
    insurance: "Blue Cross",
    claimNumber: "BC123456"
  },
  {
    id: uuidv4(),
    patientId: mockPatients[1].id,
    date: "2024-02-28",
    type: "New Patient Visit",
    amount: 200.00,
    status: "pending",
    insurance: "Aetna",
    claimNumber: "AE789012"
  },
  // Add more mock billing records...
];

// Mock data for prescriptions
export const mockPrescriptions = [
  {
    id: uuidv4(),
    patientId: mockPatients[0].id,
    date: "2024-03-01",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    status: "active",
    refills: 2,
    pharmacy: "CVS Pharmacy"
  },
  {
    id: uuidv4(),
    patientId: mockPatients[1].id,
    date: "2024-02-28",
    medication: "Albuterol",
    dosage: "90mcg",
    frequency: "As needed",
    duration: "90 days",
    status: "active",
    refills: 1,
    pharmacy: "Walgreens"
  },
  // Add more mock prescriptions...
];

// Mock data for reminders
export const mockReminders = [
  {
    id: uuidv4(),
    title: "Follow up with John Smith",
    date: "2024-03-15",
    time: "09:00",
    type: "Patient Follow-up",
    status: "pending",
    priority: "high",
    notes: "Check blood pressure control"
  },
  {
    id: uuidv4(),
    title: "Review Sarah Johnson's lab results",
    date: "2024-03-20",
    time: "10:30",
    type: "Lab Review",
    status: "pending",
    priority: "medium",
    notes: "New patient lab work review"
  },
  // Add more mock reminders...
];

// Mock data for telehealth sessions
export const mockTelehealthSessions = [
  {
    id: uuidv4(),
    patientId: mockPatients[0].id,
    date: "2024-03-15",
    time: "09:00",
    duration: 30,
    status: "scheduled",
    type: "Follow-up",
    link: "https://meet.example.com/123",
    notes: "Regular check-up via telehealth"
  },
  {
    id: uuidv4(),
    patientId: mockPatients[1].id,
    date: "2024-03-20",
    time: "10:30",
    duration: 45,
    status: "scheduled",
    type: "New Patient",
    link: "https://meet.example.com/124",
    notes: "Initial consultation via telehealth"
  },
  // Add more mock telehealth sessions...
]; 