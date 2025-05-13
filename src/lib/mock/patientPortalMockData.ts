import { v4 as uuidv4 } from 'uuid';

// Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
  preferences: {
    language: string;
    notifications: boolean;
    reminders: boolean;
    theme: 'light' | 'dark';
  };
}

export interface PatientAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'checkup' | 'followup' | 'consultation' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  duration: number;
  doctor: {
    name: string;
    specialization: string;
  };
}

export interface PatientMessage {
  id: string;
  patientId: string;
  senderId: string;
  senderType: 'doctor' | 'nurse' | 'admin';
  subject: string;
  content: string;
  status: 'unread' | 'read';
  createdAt: string;
  attachments?: string[];
}

export interface PatientChallenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'fitness' | 'nutrition' | 'medication' | 'general';
  participants: number;
  progress: number;
  rewards: string[];
  status: 'active' | 'completed' | 'upcoming';
}

export interface PatientLeaderboard {
  id: string;
  challengeId: string;
  patientId: string;
  points: number;
  rank: number;
  achievements: string[];
  streak: number;
  lastUpdated: string;
}

export interface PatientFamily {
  id: string;
  patientId: string;
  members: Array<{
    id: string;
    name: string;
    relationship: string;
    dateOfBirth: string;
    gender: string;
    medicalHistory?: string[];
  }>;
}

// Mock Data
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '555-0101',
    dateOfBirth: '1980-05-15',
    gender: 'male',
    address: '123 Main St, City, State',
    insurance: {
      provider: 'Aetna',
      policyNumber: 'POL123456',
      groupNumber: 'GRP789012'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '555-0102'
    },
    medicalHistory: {
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      allergies: ['Penicillin'],
      medications: ['Lisinopril', 'Metformin']
    },
    preferences: {
      language: 'en',
      notifications: true,
      reminders: true,
      theme: 'light'
    }
  }
];

export const mockPatientAppointments: PatientAppointment[] = [
  {
    id: 'pa1',
    patientId: 'p1',
    doctorId: 'd1',
    date: '2024-03-25',
    time: '09:00',
    type: 'checkup',
    status: 'scheduled',
    notes: 'Regular checkup',
    duration: 30,
    doctor: {
      name: 'Dr. John Smith',
      specialization: 'Cardiology'
    }
  }
];

export const mockPatientMessages: PatientMessage[] = [
  {
    id: 'm1',
    patientId: 'p1',
    senderId: 'd1',
    senderType: 'doctor',
    subject: 'Test Results',
    content: 'Your recent test results are now available in your patient portal.',
    status: 'unread',
    createdAt: '2024-03-20T10:00:00Z',
    attachments: ['test_results.pdf']
  }
];

export const mockPatientChallenges: PatientChallenge[] = [
  {
    id: 'c1',
    title: '30-Day Fitness Challenge',
    description: 'Complete 30 minutes of exercise daily for 30 days',
    startDate: '2024-03-01',
    endDate: '2024-03-30',
    type: 'fitness',
    participants: 150,
    progress: 65,
    rewards: ['Certificate', 'Points', 'Badge'],
    status: 'active'
  }
];

export const mockPatientLeaderboard: PatientLeaderboard[] = [
  {
    id: 'l1',
    challengeId: 'c1',
    patientId: 'p1',
    points: 850,
    rank: 5,
    achievements: ['Early Bird', 'Consistency King'],
    streak: 15,
    lastUpdated: '2024-03-20T00:00:00Z'
  }
];

export const mockPatientFamily: PatientFamily[] = [
  {
    id: 'f1',
    patientId: 'p1',
    members: [
      {
        id: 'fm1',
        name: 'Jane Doe',
        relationship: 'Spouse',
        dateOfBirth: '1982-08-20',
        gender: 'female',
        medicalHistory: ['Asthma']
      },
      {
        id: 'fm2',
        name: 'Junior Doe',
        relationship: 'Child',
        dateOfBirth: '2010-03-15',
        gender: 'male'
      }
    ]
  }
];

// Helper functions
export const getPatientAppointments = (patientId: string, status?: string) => {
  let filtered = mockPatientAppointments.filter(a => a.patientId === patientId);
  if (status) {
    filtered = filtered.filter(a => a.status === status);
  }
  return filtered;
};

export const getPatientMessages = (patientId: string, status?: string) => {
  let filtered = mockPatientMessages.filter(m => m.patientId === patientId);
  if (status) {
    filtered = filtered.filter(m => m.status === status);
  }
  return filtered;
};

export const getPatientChallenges = (patientId: string, status?: string) => {
  let filtered = mockPatientChallenges;
  if (status) {
    filtered = filtered.filter(c => c.status === status);
  }
  return filtered;
};

export const getPatientLeaderboard = (patientId: string) => {
  return mockPatientLeaderboard.find(l => l.patientId === patientId);
};

export const getPatientFamily = (patientId: string) => {
  return mockPatientFamily.find(f => f.patientId === patientId);
}; 