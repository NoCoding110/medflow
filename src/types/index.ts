export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  medicalHistory: string[];
  allergies: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PatientNote {
  id: string;
  patientId: string;
  content: string;
  type: 'progress' | 'treatment' | 'observation';
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  type: 'checkup' | 'followup' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  duration: number;
}

export interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  notes: string;
}

export interface VitalsRecord {
  id: string;
  patientId: string;
  recordedAt: string;
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
}

export interface FitnessRecord {
  id: string;
  patientId: string;
  recordedAt: string;
  steps: number;
  distance: number;
  caloriesBurned: number;
  activeMinutes: number;
  heartRateZones: {
    peak: number;
    cardio: number;
    fatBurn: number;
    rest: number;
  };
}

export interface NutritionRecord {
  id: string;
  patientId: string;
  recordedAt: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  meals: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  department: string;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  patients: string[];
}

export interface AIInsight {
  id: string;
  type: 'trend' | 'recommendation' | 'risk';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  patientId: string;
}

export interface Alert {
  id: string;
  patientId: string;
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  status: 'active' | 'resolved';
} 