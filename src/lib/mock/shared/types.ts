// Common types used across the EHR system

export type UUID = string;
export type ISO8601Date = string; // Format: YYYY-MM-DDTHH:mm:ss.sssZ

export type UserRole = 'admin' | 'doctor' | 'patient' | 'nurse' | 'staff';

export interface BaseUser {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  createdAt: ISO8601Date;
  updatedAt: ISO8601Date;
  active: boolean;
}

export interface Doctor extends BaseUser {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  department: string;
  availableForTelehealth: boolean;
  availableSlots?: TimeSlot[];
  qualifications: string[];
  languages: string[];
  bio: string;
  ratings?: {
    overall: number; // 1-5
    count: number;
  };
}

export interface Patient extends BaseUser {
  role: 'patient';
  dateOfBirth: ISO8601Date;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  address: Address;
  emergencyContact: EmergencyContact;
  primaryDoctorId?: UUID;
  insuranceInfo: InsuranceInfo;
  medicalHistory?: {
    allergies: string[];
    chronicConditions: string[];
    medications: string[];
    pastSurgeries: string[];
    familyHistory: string[];
  };
  vitalStats?: VitalStats;
}

export interface Admin extends BaseUser {
  role: 'admin';
  department: string;
  accessLevel: 'full' | 'limited' | 'read-only';
  permissions: string[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  validFrom: ISO8601Date;
  validUntil: ISO8601Date;
  copay?: number;
  coverageDetails?: string;
}

export interface TimeSlot {
  id: UUID;
  doctorId: UUID;
  date: ISO8601Date;
  startTime: ISO8601Date;
  endTime: ISO8601Date;
  available: boolean;
}

export interface Appointment {
  id: UUID;
  patientId: UUID;
  doctorId: UUID;
  dateTime: ISO8601Date;
  duration: number; // in minutes
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type: 'in-person' | 'telehealth' | 'follow-up';
  reasonForVisit: string;
  notes?: string;
  vitals?: VitalStats;
  createdAt: ISO8601Date;
  updatedAt: ISO8601Date;
}

export interface VitalStats {
  date: ISO8601Date;
  height?: number; // cm
  weight?: number; // kg
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  temperature?: number; // celsius
  heartRate?: number; // bpm
  respiratoryRate?: number; // breaths per minute
  oxygenSaturation?: number; // percentage
  bloodGlucose?: number; // mg/dL
}

export interface Prescription {
  id: UUID;
  patientId: UUID;
  doctorId: UUID;
  dateIssued: ISO8601Date;
  expiryDate: ISO8601Date;
  medications: Medication[];
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
  refillsAllowed: number;
  refillsUsed: number;
}

export interface Medication {
  id: UUID;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  sideEffects?: string[];
  contraindications?: string[];
}

export interface MedicalRecord {
  id: UUID;
  patientId: UUID;
  doctorId: UUID;
  date: ISO8601Date;
  type: 'note' | 'diagnosis' | 'treatment' | 'referral' | 'lab-order';
  title: string;
  content: string;
  attachments?: Attachment[];
  relatedRecords?: UUID[];
}

export interface Attachment {
  id: UUID;
  filename: string;
  fileType: string;
  url: string;
  uploadedBy: UUID;
  uploadedAt: ISO8601Date;
  size: number; // in bytes
}

export interface LabReport {
  id: UUID;
  patientId: UUID;
  orderedByDoctorId: UUID;
  collectedAt: ISO8601Date;
  processedAt: ISO8601Date;
  reportedAt: ISO8601Date;
  labName: string;
  testType: string;
  status: 'ordered' | 'collected' | 'in-process' | 'completed' | 'cancelled';
  results: LabResult[];
  notes?: string;
  attachments?: Attachment[];
}

export interface LabResult {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  interpretation?: 'normal' | 'low' | 'high' | 'critical';
  comments?: string;
}

export interface Message {
  id: UUID;
  senderId: UUID;
  senderRole: UserRole;
  recipientId: UUID;
  recipientRole: UserRole;
  timestamp: ISO8601Date;
  subject: string;
  content: string;
  read: boolean;
  attachments?: Attachment[];
  urgent: boolean;
  conversationId: UUID;
}

export interface Notification {
  id: UUID;
  userId: UUID;
  userRole: UserRole;
  type: 'appointment' | 'message' | 'result' | 'prescription' | 'system' | 'alert';
  title: string;
  message: string;
  timestamp: ISO8601Date;
  read: boolean;
  actionLink?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface AIInsight {
  id: UUID;
  targetId: UUID; // Could be patientId, doctorId, or null for system-wide insights
  targetType: 'patient' | 'doctor' | 'system';
  insightType: 'diagnostic' | 'trend' | 'alert' | 'recommendation' | 'administrative';
  title: string;
  description: string;
  generatedAt: ISO8601Date;
  confidence: number; // 0-1
  data?: any; // JSON data specific to the insight
  actions?: AIInsightAction[];
}

export interface AIInsightAction {
  label: string;
  type: 'link' | 'action';
  value: string; // URL or action identifier
}

export interface AuditLog {
  id: UUID;
  userId: UUID;
  userRole: UserRole;
  action: string;
  resource: string;
  resourceId?: UUID;
  timestamp: ISO8601Date;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
}

export interface SystemSettings {
  id: string;
  category: string;
  key: string;
  value: any;
  description: string;
  lastModifiedBy: UUID;
  lastModifiedAt: ISO8601Date;
} 