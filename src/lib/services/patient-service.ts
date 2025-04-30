
import { Patient } from '../types/patient';
import { Appointment } from '../types/patient';
import { Note } from '../types/medical';
import { mockPatients, mockNotes, mockAppointments } from '../data/mock-data';

// Create a new patient
export const createPatient = (patient: Omit<Patient, 'id'>): Patient => {
  const newPatient = {
    ...patient,
    id: `P${String(mockPatients.length + 1).padStart(3, '0')}`,
  };
  mockPatients.push(newPatient);
  return newPatient;
};

// Create a new note
export const createNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note => {
  const now = new Date().toISOString();
  const newNote = {
    ...note,
    id: `N${String(mockNotes.length + 1).padStart(3, '0')}`,
    createdAt: now,
    updatedAt: now,
  };
  mockNotes.push(newNote);
  return newNote;
};

// Create a new appointment
export const createAppointment = (appointment: Omit<Appointment, 'id'>): Appointment => {
  const newAppointment = {
    ...appointment,
    id: `A${String(mockAppointments.length + 1).padStart(3, '0')}`,
  };
  mockAppointments.push(newAppointment);
  return newAppointment;
};
