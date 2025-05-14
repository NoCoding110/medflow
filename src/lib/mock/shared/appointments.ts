import { Appointment, UUID } from './types';
import { addDays, addHours, format, subDays } from 'date-fns';
import { doctors, patients } from './users';

// Helper functions for date manipulation
const now = new Date();
const formatDate = (date: Date): string => format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
const futureDate = (days: number) => formatDate(addDays(now, days));
const pastDate = (days: number) => formatDate(subDays(now, days));

// Sample appointment data
export const appointments: Appointment[] = [
  // Upcoming appointments
  {
    id: 'appt-1234-abcd-5678',
    patientId: patients[0].id,
    doctorId: doctors[0].id,
    dateTime: futureDate(2),
    duration: 30,
    status: 'confirmed',
    type: 'in-person',
    reasonForVisit: 'Annual cardiac checkup',
    notes: 'Patient has reported chest pain during exercise',
    createdAt: pastDate(30),
    updatedAt: pastDate(5)
  },
  {
    id: 'appt-2345-bcde-6789',
    patientId: patients[1].id,
    doctorId: doctors[3].id,
    dateTime: futureDate(3),
    duration: 45,
    status: 'scheduled',
    type: 'in-person',
    reasonForVisit: 'Routine pediatric checkup',
    createdAt: pastDate(60),
    updatedAt: pastDate(7)
  },
  {
    id: 'appt-3456-cdef-7890',
    patientId: patients[2].id,
    doctorId: doctors[0].id,
    dateTime: futureDate(4),
    duration: 30,
    status: 'confirmed',
    type: 'telehealth',
    reasonForVisit: 'Follow-up on cardiac medications',
    notes: 'Review recent blood pressure readings',
    createdAt: pastDate(15),
    updatedAt: pastDate(2)
  },
  {
    id: 'appt-4567-defg-8901',
    patientId: patients[3].id,
    doctorId: doctors[2].id,
    dateTime: futureDate(5),
    duration: 20,
    status: 'scheduled',
    type: 'in-person',
    reasonForVisit: 'Flu symptoms',
    createdAt: pastDate(3),
    updatedAt: pastDate(1)
  },
  {
    id: 'appt-5678-efgh-9012',
    patientId: patients[4].id,
    doctorId: doctors[4].id,
    dateTime: futureDate(7),
    duration: 45,
    status: 'scheduled',
    type: 'in-person',
    reasonForVisit: 'Knee pain follow-up',
    createdAt: pastDate(10),
    updatedAt: pastDate(2)
  },
  {
    id: 'appt-6789-fghi-0123',
    patientId: patients[3].id,
    doctorId: doctors[1].id,
    dateTime: futureDate(10),
    duration: 60,
    status: 'scheduled',
    type: 'in-person',
    reasonForVisit: 'Neurological evaluation for recurring migraines',
    createdAt: pastDate(20),
    updatedAt: pastDate(20)
  },
  
  // Past appointments
  {
    id: 'appt-7890-ghij-1234',
    patientId: patients[0].id,
    doctorId: doctors[0].id,
    dateTime: pastDate(15),
    duration: 30,
    status: 'completed',
    type: 'in-person',
    reasonForVisit: 'Blood pressure check',
    notes: 'Blood pressure elevated at 140/90. Increased Lisinopril dosage.',
    vitals: {
      date: pastDate(15),
      bloodPressure: {
        systolic: 140,
        diastolic: 90
      },
      heartRate: 78,
      temperature: 36.8,
      weight: 86,
      height: 180,
      oxygenSaturation: 97,
      respiratoryRate: 17
    },
    createdAt: pastDate(45),
    updatedAt: pastDate(15)
  },
  {
    id: 'appt-8901-hijk-2345',
    patientId: patients[1].id,
    doctorId: doctors[3].id,
    dateTime: pastDate(30),
    duration: 30,
    status: 'completed',
    type: 'telehealth',
    reasonForVisit: 'Asthma medication review',
    notes: 'Patient reports good control with current inhaler. No changes needed.',
    createdAt: pastDate(60),
    updatedAt: pastDate(30)
  },
  {
    id: 'appt-9012-ijkl-3456',
    patientId: patients[2].id,
    doctorId: doctors[1].id,
    dateTime: pastDate(45),
    duration: 60,
    status: 'completed',
    type: 'in-person',
    reasonForVisit: 'Neurological consultation',
    notes: 'Referred to cardiologist for evaluation of potential TIA.',
    vitals: {
      date: pastDate(45),
      bloodPressure: {
        systolic: 132,
        diastolic: 84
      },
      heartRate: 76,
      temperature: 36.7,
      weight: 87.5,
      height: 175,
      oxygenSaturation: 96,
      respiratoryRate: 18
    },
    createdAt: pastDate(60),
    updatedAt: pastDate(45)
  },
  {
    id: 'appt-0123-jklm-4567',
    patientId: patients[2].id,
    doctorId: doctors[0].id,
    dateTime: pastDate(10),
    duration: 45,
    status: 'completed',
    type: 'in-person',
    reasonForVisit: 'Cardiac evaluation',
    notes: 'ECG showed normal sinus rhythm. Recommended continued monitoring of blood pressure.',
    vitals: {
      date: pastDate(10),
      bloodPressure: {
        systolic: 130,
        diastolic: 82
      },
      heartRate: 74,
      temperature: 36.6,
      weight: 88,
      height: 175,
      oxygenSaturation: 97,
      respiratoryRate: 16
    },
    createdAt: pastDate(40),
    updatedAt: pastDate(10)
  },
  {
    id: 'appt-1234-klmn-5678',
    patientId: patients[4].id,
    doctorId: doctors[4].id,
    dateTime: pastDate(5),
    duration: 30,
    status: 'completed',
    type: 'in-person',
    reasonForVisit: 'Knee pain',
    notes: 'X-ray shows mild osteoarthritis. Prescribed NSAIDs and physical therapy.',
    vitals: {
      date: pastDate(5),
      bloodPressure: {
        systolic: 136,
        diastolic: 84
      },
      heartRate: 72,
      temperature: 36.6,
      weight: 95,
      height: 183,
      oxygenSaturation: 97,
      respiratoryRate: 16
    },
    createdAt: pastDate(15),
    updatedAt: pastDate(5)
  },
  {
    id: 'appt-2345-lmno-6789',
    patientId: patients[0].id,
    doctorId: doctors[2].id,
    dateTime: pastDate(20),
    duration: 30,
    status: 'no-show',
    type: 'in-person',
    reasonForVisit: 'Annual physical',
    notes: 'Patient did not show up. Attempted to contact but no response.',
    createdAt: pastDate(35),
    updatedAt: pastDate(20)
  },
  {
    id: 'appt-3456-mnop-7890',
    patientId: patients[3].id,
    doctorId: doctors[2].id,
    dateTime: pastDate(7),
    duration: 30,
    status: 'cancelled',
    type: 'telehealth',
    reasonForVisit: 'Discuss lab results',
    notes: 'Patient cancelled due to work conflict. Rescheduled for next week.',
    createdAt: pastDate(20),
    updatedAt: pastDate(8)
  }
];

// TODAY's Appointments (for dashboard quick access)
export const getTodayAppointments = (): Appointment[] => {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  
  // Create some appointments for today
  return [
    {
      id: 'appt-today-001',
      patientId: patients[0].id,
      doctorId: doctors[0].id,
      dateTime: formatDate(addHours(today, 1)),
      duration: 30,
      status: 'confirmed',
      type: 'in-person',
      reasonForVisit: 'Blood pressure check',
      createdAt: pastDate(7),
      updatedAt: pastDate(1)
    },
    {
      id: 'appt-today-002',
      patientId: patients[1].id,
      doctorId: doctors[3].id,
      dateTime: formatDate(addHours(today, 2)),
      duration: 45,
      status: 'confirmed',
      type: 'telehealth',
      reasonForVisit: 'Asthma follow-up',
      createdAt: pastDate(14),
      updatedAt: pastDate(2)
    },
    {
      id: 'appt-today-003',
      patientId: patients[4].id,
      doctorId: doctors[4].id,
      dateTime: formatDate(addHours(today, 3)),
      duration: 30,
      status: 'confirmed',
      type: 'in-person',
      reasonForVisit: 'Physical therapy evaluation',
      createdAt: pastDate(10),
      updatedAt: pastDate(1)
    },
    {
      id: 'appt-today-004',
      patientId: patients[2].id,
      doctorId: doctors[0].id,
      dateTime: formatDate(addHours(today, 4)),
      duration: 30,
      status: 'confirmed',
      type: 'in-person',
      reasonForVisit: 'Medication review',
      createdAt: pastDate(5),
      updatedAt: pastDate(1)
    }
  ];
};

// Utility functions for appointments
export const getAppointmentById = (id: UUID): Appointment | undefined => {
  return appointments.find(appointment => appointment.id === id);
};

export const getAppointmentsByPatientId = (patientId: UUID): Appointment[] => {
  return appointments.filter(appointment => appointment.patientId === patientId);
};

export const getAppointmentsByDoctorId = (doctorId: UUID): Appointment[] => {
  return appointments.filter(appointment => appointment.doctorId === doctorId);
};

export const getUpcomingAppointmentsByPatientId = (patientId: UUID): Appointment[] => {
  const today = new Date();
  return appointments
    .filter(appointment => 
      appointment.patientId === patientId && 
      new Date(appointment.dateTime) > today &&
      (appointment.status === 'scheduled' || appointment.status === 'confirmed')
    )
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
};

export const getUpcomingAppointmentsByDoctorId = (doctorId: UUID): Appointment[] => {
  const today = new Date();
  return appointments
    .filter(appointment => 
      appointment.doctorId === doctorId && 
      new Date(appointment.dateTime) > today &&
      (appointment.status === 'scheduled' || appointment.status === 'confirmed')
    )
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
};

export const getPastAppointmentsByPatientId = (patientId: UUID): Appointment[] => {
  const today = new Date();
  return appointments
    .filter(appointment => 
      appointment.patientId === patientId && 
      new Date(appointment.dateTime) < today
    )
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
};

export const getPastAppointmentsByDoctorId = (doctorId: UUID): Appointment[] => {
  const today = new Date();
  return appointments
    .filter(appointment => 
      appointment.doctorId === doctorId && 
      new Date(appointment.dateTime) < today
    )
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
}; 