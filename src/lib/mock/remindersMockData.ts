import { Patient } from '@/types';

export interface DoctorReminder {
  id: string;
  doctor_id: string;
  patient_id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'pending' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  patient: Patient;
}

export const mockReminders: DoctorReminder[] = [
  {
    id: '1',
    doctor_id: '11111111-1111-1111-1111-111111111111',
    patient_id: '1',
    title: 'Review Blood Pressure Readings',
    description: 'Patient reported increased morning readings',
    due_date: '2024-02-01T09:00:00Z',
    status: 'pending',
    priority: 'high',
    created_at: '2024-01-20T08:00:00Z',
    updated_at: '2024-01-20T08:00:00Z',
    patient: {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1980-05-15',
      gender: 'male',
      address: '123 Main St, City, State 12345',
      medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
      allergies: ['Penicillin'],
      emergencyContact: {
        name: 'Jane Smith',
        relationship: 'Spouse',
        phone: '+1 (555) 987-6543'
      },
      insurance: {
        provider: 'Blue Cross',
        policyNumber: 'BC123456789',
        groupNumber: 'GRP987654'
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  },
  {
    id: '2',
    doctor_id: '11111111-1111-1111-1111-111111111111',
    patient_id: '2',
    title: 'Follow-up on Asthma Treatment',
    description: 'Check effectiveness of new inhaler',
    due_date: '2024-02-02T10:00:00Z',
    status: 'pending',
    priority: 'medium',
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-01-20T09:00:00Z',
    patient: {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1992-08-23',
      gender: 'female',
      address: '456 Oak Ave, City, State 12345',
      medicalHistory: ['Asthma'],
      allergies: ['Shellfish'],
      emergencyContact: {
        name: 'Mike Johnson',
        relationship: 'Brother',
        phone: '+1 (555) 876-5432'
      },
      insurance: {
        provider: 'Aetna',
        policyNumber: 'AE987654321',
        groupNumber: 'GRP123456'
      },
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z'
    }
  }
];

// Mock functions
export const getReminders = (doctorId: string) => 
  mockReminders.filter(r => r.doctor_id === doctorId);

export const getReminder = (id: string) => 
  mockReminders.find(r => r.id === id); 