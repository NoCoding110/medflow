import { v4 as uuidv4 } from 'uuid';
import { Appointment } from '@/types';
import { mockPatients } from './patientsMockData';

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '11111111-1111-1111-1111-111111111111',
    date: '2024-02-01T09:00:00Z',
    duration: 30,
    type: 'checkup',
    status: 'scheduled',
    notes: 'Regular checkup',
    patient: mockPatients[0]
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '11111111-1111-1111-1111-111111111111',
    date: '2024-02-02T10:00:00Z',
    duration: 45,
    type: 'consultation',
    status: 'scheduled',
    notes: 'Follow-up on asthma treatment',
    patient: mockPatients[1]
  }
];

export const getAppointments = (doctorId: string) => 
  mockAppointments.filter(a => a.doctorId === doctorId);

export const getAppointment = (id: string) => 
  mockAppointments.find(a => a.id === id);

export const getPatientAppointments = (patientId: string) =>
  mockAppointments.filter(a => a.patientId === patientId); 