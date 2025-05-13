import { Message, Doctor } from '@/types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@medflow.com',
    specialization: 'Cardiology',
    department: 'Cardiology',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: {
        start: '09:00',
        end: '17:00'
      }
    },
    patients: ['1', '2']
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    email: 'michael.r@medflow.com',
    specialization: 'Pulmonology',
    department: 'Respiratory',
    availability: {
      days: ['Tuesday', 'Thursday'],
      hours: {
        start: '10:00',
        end: '18:00'
      }
    },
    patients: ['2']
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Please review the latest blood pressure readings for patient John Smith.',
    timestamp: '2024-01-20T10:00:00Z',
    status: 'read',
    attachments: [
      {
        type: 'pdf',
        url: '/attachments/bp-readings.pdf',
        name: 'Blood Pressure Readings'
      }
    ]
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: 'I\'ve reviewed the readings. The trend is concerning. Let\'s schedule a follow-up.',
    timestamp: '2024-01-20T10:15:00Z',
    status: 'read'
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: 'Agreed. I\'ll set up the appointment for tomorrow morning.',
    timestamp: '2024-01-20T10:20:00Z',
    status: 'delivered'
  }
];

// Mock functions
export const getDoctor = (id: string) => mockDoctors.find(d => d.id === id);
export const getDoctorPatients = (doctorId: string) => mockDoctors.find(d => d.id === doctorId)?.patients || [];
export const getMessages = (senderId: string, receiverId: string) => 
  mockMessages.filter(m => 
    (m.senderId === senderId && m.receiverId === receiverId) ||
    (m.senderId === receiverId && m.receiverId === senderId)
  ); 