import { v4 as uuidv4 } from 'uuid';
import { Patient } from '@/types';

export const mockPatients: Patient[] = [
  {
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
  },
  {
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
];

export const getPatients = () => mockPatients;
export const getPatient = (id: string) => mockPatients.find(p => p.id === id); 