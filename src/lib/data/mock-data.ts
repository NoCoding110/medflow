import { Patient, Appointment } from '../types/patient';
import { Note } from '../types/medical';

export const mockPatients: Patient[] = [
  {
    id: "P001",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 94123",
    insuranceProvider: "HealthPlus",
    insuranceNumber: "HP12345678",
    medicalHistory: {
      conditions: ["Hypertension", "Type 2 Diabetes"],
      surgeries: [
        {
          name: "Appendectomy",
          date: "2010-03-12",
          notes: "No complications"
        }
      ],
      familyHistory: ["Heart disease - Father", "Breast cancer - Mother"]
    },
    allergies: ["Penicillin", "Shellfish"],
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2020-01-15",
        prescribedBy: "Dr. Sarah Johnson"
      },
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2019-11-20",
        prescribedBy: "Dr. Sarah Johnson"
      }
    ]
  },
  {
    id: "P002",
    firstName: "Jane",
    lastName: "Smith",
    dateOfBirth: "1992-09-22",
    gender: "Female",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Springfield, CA 95678",
    insuranceProvider: "MediCare Plus",
    insuranceNumber: "MC98765432",
    medicalHistory: {
      conditions: ["Asthma"],
      immunizations: [
        {
          name: "Influenza",
          date: "2022-10-05",
          provider: "Springfield Clinic"
        }
      ]
    },
    allergies: ["Dust", "Pollen"],
    medications: [
      {
        name: "Albuterol",
        dosage: "90mcg",
        frequency: "As needed",
        startDate: "2018-05-10",
        prescribedBy: "Dr. Michael Chen"
      }
    ]
  },
  {
    id: "P003",
    firstName: "Robert",
    lastName: "Johnson",
    dateOfBirth: "1975-03-30",
    gender: "Male",
    email: "robert.johnson@example.com",
    phone: "(555) 345-6789",
    address: "789 Pine Lane, Riverdale, CA 91234",
    insuranceProvider: "Blue Shield",
    insuranceNumber: "BS56781234",
    medicalHistory: {
      conditions: ["Migraine"],
      familyHistory: ["Alzheimer's - Grandmother"]
    },
    medications: [
      {
        name: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed for migraine",
        startDate: "2021-02-25",
        prescribedBy: "Dr. Sarah Johnson"
      }
    ]
  },
  {
    id: "P004",
    firstName: "Emily",
    lastName: "Chen",
    dateOfBirth: "1990-11-12",
    gender: "Female",
    email: "emily.chen@example.com",
    phone: "(555) 456-7890",
    address: "321 Cedar Court, Lakeside, CA 92345",
    insuranceProvider: "Health Net",
    insuranceNumber: "HN43219876",
    allergies: ["Latex"],
    medications: []
  },
  {
    id: "P005",
    firstName: "Michael",
    lastName: "Williams",
    dateOfBirth: "1968-07-24",
    gender: "Male",
    email: "michael.williams@example.com",
    phone: "(555) 234-5678",
    address: "567 Maple Avenue, Hillcrest, CA 93456",
    insuranceProvider: "Kaiser Permanente",
    insuranceNumber: "KP87654321",
    medicalHistory: {
      conditions: ["Coronary Artery Disease", "Hyperlipidemia"],
      surgeries: [
        {
          name: "Angioplasty",
          date: "2019-08-17",
          notes: "Stent placed in LAD"
        }
      ]
    },
    medications: [
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        startDate: "2019-09-01",
        prescribedBy: "Dr. Michael Chen"
      },
      {
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        startDate: "2019-08-20",
        prescribedBy: "Dr. Michael Chen"
      }
    ]
  },
  {
    id: "P006",
    firstName: "Maria",
    lastName: "Garcia",
    dateOfBirth: "1995-04-05",
    gender: "Female",
    email: "maria.garcia@example.com",
    phone: "(555) 876-5432",
    address: "890 Elm Street, Westside, CA 94567",
    insuranceProvider: "Anthem",
    insuranceNumber: "AN12348765",
    allergies: []
  }
];

export const mockNotes: Note[] = [
  {
    id: "N001",
    patientId: "P001",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-10-15T10:45:00Z",
    title: "Follow-up Appointment",
    content: "Patient reports improved control of blood pressure with current medication. Blood pressure today: 128/82. Glucose levels have been within target range. Discussed dietary changes and encouraged continued exercise regimen. Will continue current medications with no changes.",
    type: "Follow-up"
  },
  {
    id: "N002",
    patientId: "P001",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    createdAt: "2023-07-22T09:15:00Z",
    updatedAt: "2023-07-22T09:35:00Z",
    title: "Quarterly Review",
    content: "Patient experiencing occasional dizzy spells. Blood pressure elevated at 146/95. Adjusted Lisinopril dosage to 20mg daily. Ordered comprehensive metabolic panel. Recommended reducing sodium intake and following up in one month.",
    type: "Progress"
  },
  {
    id: "N003",
    patientId: "P002",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    createdAt: "2023-09-05T14:00:00Z",
    updatedAt: "2023-09-05T14:25:00Z",
    title: "Annual Physical",
    content: "Patient reports occasional asthma flares with seasonal changes but overall well controlled. Lung exam clear. Reviewed proper inhaler technique. Scheduled pulmonary function test for next month. Flu vaccination administered today.",
    type: "Initial"
  },
  {
    id: "N004",
    patientId: "P003",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    createdAt: "2023-10-10T11:00:00Z",
    updatedAt: "2023-10-10T11:20:00Z",
    title: "Migraine Management",
    content: "Patient reports migraine frequency reduced from 3x/month to 1x/month with Sumatriptan. Still experiencing aura before episodes. Discussed trigger avoidance. Recommended keeping a migraine journal. Will continue current medication approach.",
    type: "Follow-up"
  },
  {
    id: "N005",
    patientId: "P005",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    createdAt: "2023-09-28T16:45:00Z",
    updatedAt: "2023-09-28T17:10:00Z",
    title: "Cardiac Follow-up",
    content: "Patient reports good compliance with medications. No chest pain or shortness of breath. Recent lipid panel shows improvement: LDL 110 mg/dL (down from 145). ECG shows normal sinus rhythm. Encouraged continued exercise program and Mediterranean diet.",
    type: "Lab"
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "Doe, John",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-11-15",
    startTime: "09:00",
    endTime: "09:30",
    reason: "Diabetes Follow-up",
    status: "Scheduled",
    isVirtual: false
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Smith, Jane",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    date: "2023-11-15",
    startTime: "10:00",
    endTime: "10:30",
    reason: "Asthma Review",
    status: "Scheduled",
    isVirtual: true
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Johnson, Robert",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-11-16",
    startTime: "14:00",
    endTime: "14:30",
    reason: "Migraine Consultation",
    status: "Scheduled",
    isVirtual: false
  },
  {
    id: "A004",
    patientId: "P004",
    patientName: "Chen, Emily",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    date: "2023-11-17",
    startTime: "11:00",
    endTime: "11:30",
    reason: "Annual Physical",
    status: "Scheduled",
    isVirtual: false
  },
  {
    id: "A005",
    patientId: "P005",
    patientName: "Williams, Michael",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    date: "2023-11-18",
    startTime: "15:30",
    endTime: "16:00",
    reason: "Cardiac Follow-up",
    status: "Scheduled",
    isVirtual: true
  },
  {
    id: "A006",
    patientId: "P001",
    patientName: "Doe, John",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-10-15",
    startTime: "10:30",
    endTime: "11:00",
    reason: "Blood Pressure Check",
    status: "Completed",
    isVirtual: false
  },
  {
    id: "A007",
    patientId: "P002",
    patientName: "Smith, Jane",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-10-05",
    startTime: "09:30",
    endTime: "10:00",
    reason: "Prescription Refill",
    status: "Completed",
    isVirtual: true
  },
  {
    id: "A008",
    patientId: "P006",
    patientName: "Garcia, Maria",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    date: "2023-11-15",
    startTime: "16:00",
    endTime: "16:30",
    reason: "Initial Consultation",
    status: "Scheduled",
    isVirtual: true
  }
];
