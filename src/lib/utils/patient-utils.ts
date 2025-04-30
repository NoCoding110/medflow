
import { Patient, Appointment } from '../types/patient';
import { Note } from '../types/medical';
import { mockPatients, mockNotes, mockAppointments } from '../data/mock-data';

// Helper function to format patient name
export const formatPatientName = (patient: Patient): string => {
  return `${patient.lastName}, ${patient.firstName}`;
};

// Helper function to calculate age
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Function to get patient by ID
export const getPatientById = (patientId: string): Patient | undefined => {
  return mockPatients.find(patient => patient.id === patientId);
};

// Function to get notes by patient ID
export const getNotesByPatientId = (patientId: string): Note[] => {
  return mockNotes.filter(note => note.patientId === patientId);
};

// Function to get appointments by patient ID
export const getAppointmentsByPatientId = (patientId: string): Appointment[] => {
  return mockAppointments.filter(appointment => appointment.patientId === patientId);
};

// Function to get appointments by doctor ID
export const getAppointmentsByDoctorId = (doctorId: string): Appointment[] => {
  return mockAppointments.filter(appointment => appointment.doctorId === doctorId);
};

// Function to get appointments by date
export const getAppointmentsByDate = (date: string): Appointment[] => {
  return mockAppointments.filter(appointment => appointment.date === date);
};
