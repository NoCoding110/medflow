import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types';

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '11111111-1111-1111-1111-111111111111',
    receiverId: '1',
    content: 'Hello John, I wanted to follow up on your blood pressure readings from yesterday.',
    timestamp: '2024-01-20T08:00:00Z',
    status: 'read',
    attachments: []
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '11111111-1111-1111-1111-111111111111',
    content: 'Thank you for checking. The readings have been stable today.',
    timestamp: '2024-01-20T08:30:00Z',
    status: 'read',
    attachments: []
  },
  {
    id: '3',
    senderId: '11111111-1111-1111-1111-111111111111',
    receiverId: '2',
    content: 'Sarah, I\'ve reviewed your recent test results. Can we schedule a follow-up?',
    timestamp: '2024-01-20T09:00:00Z',
    status: 'delivered',
    attachments: []
  }
];

export const getMessages = (userId: string) =>
  mockMessages.filter(m => m.senderId === userId || m.receiverId === userId);

export const getMessage = (id: string) =>
  mockMessages.find(m => m.id === id);

export const getPatientMessages = (patientId: string) =>
  mockMessages.filter(m => m.receiverId === patientId || m.senderId === patientId);

export const getUnreadMessages = (userId: string) =>
  mockMessages.filter(m => m.receiverId === userId && m.status === 'delivered'); 