export interface HealthMetric {
  type: 'heartRate' | 'bloodPressure' | 'bloodSugar' | 'temperature';
  value: number;
  unit: string;
  timestamp: Date;
  status: 'normal' | 'warning' | 'critical';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  nextDose: Date;
  notes?: string;
}

export interface Symptom {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  notes?: string;
}

export interface HealthGoal {
  title: string;
  target: string;
  progress: number;
  deadline: Date;
  status: 'in-progress' | 'completed' | 'at-risk';
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
} 