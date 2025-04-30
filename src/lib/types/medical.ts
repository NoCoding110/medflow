
// Medical-related types
export interface MedicalHistory {
  conditions?: string[];
  surgeries?: Surgery[];
  familyHistory?: string[];
  immunizations?: Immunization[];
}

export interface Surgery {
  name: string;
  date: string;
  notes?: string;
}

export interface Immunization {
  name: string;
  date: string;
  provider?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy?: string;
}

export interface Note {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  type: 'Progress' | 'Initial' | 'Follow-up' | 'Lab' | 'Radiology' | 'Other';
  tags?: string[];
}
