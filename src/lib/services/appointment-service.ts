import { supabase } from "@/lib/supabase";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: "checkup" | "follow-up" | "consultation" | "emergency";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentData {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: Appointment['type'];
  notes?: string;
}

export async function createAppointment(data: CreateAppointmentData): Promise<Appointment> {
  const { data: appointment, error } = await supabase
    .from('appointments')
    .insert({
      patient_id: data.patientId,
      doctor_id: data.doctorId,
      date: data.date,
      time: data.time,
      type: data.type,
      status: 'scheduled',
      notes: data.notes,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: appointment.id,
    patientId: appointment.patient_id,
    doctorId: appointment.doctor_id,
    date: appointment.date,
    time: appointment.time,
    type: appointment.type,
    status: appointment.status,
    notes: appointment.notes,
    createdAt: appointment.created_at,
    updatedAt: appointment.updated_at,
  };
}

export async function getAppointments(userId: string, role: 'patient' | 'doctor'): Promise<Appointment[]> {
  const query = supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  let appointments;
  if (role === 'patient') {
    const { data: patient } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!patient) {
      throw new Error('Patient not found');
    }

    const { data, error } = await query.eq('patient_id', patient.id);
    if (error) {
      throw new Error(error.message);
    }
    appointments = data;
  } else {
    const { data, error } = await query.eq('doctor_id', userId);
    if (error) {
      throw new Error(error.message);
    }
    appointments = data;
  }

  return appointments.map((appointment) => ({
    id: appointment.id,
    patientId: appointment.patient_id,
    doctorId: appointment.doctor_id,
    date: appointment.date,
    time: appointment.time,
    type: appointment.type,
    status: appointment.status,
    notes: appointment.notes,
    createdAt: appointment.created_at,
    updatedAt: appointment.updated_at,
  }));
}

export async function updateAppointment(
  id: string,
  data: Partial<Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Appointment> {
  const { data: appointment, error } = await supabase
    .from('appointments')
    .update({
      date: data.date,
      time: data.time,
      type: data.type,
      status: data.status,
      notes: data.notes,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: appointment.id,
    patientId: appointment.patient_id,
    doctorId: appointment.doctor_id,
    date: appointment.date,
    time: appointment.time,
    type: appointment.type,
    status: appointment.status,
    notes: appointment.notes,
    createdAt: appointment.created_at,
    updatedAt: appointment.updated_at,
  };
}

export async function cancelAppointment(id: string): Promise<Appointment> {
  const { data: appointment, error } = await supabase
    .from('appointments')
    .update({ status: 'cancelled' })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: appointment.id,
    patientId: appointment.patient_id,
    doctorId: appointment.doctor_id,
    date: appointment.date,
    time: appointment.time,
    type: appointment.type,
    status: appointment.status,
    notes: appointment.notes,
    createdAt: appointment.created_at,
    updatedAt: appointment.updated_at,
  };
}

export async function getAvailableTimeSlots(doctorId: string, date: Date): Promise<string[]> {
  // Get all appointments for the doctor on the given date
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('time')
    .eq('doctor_id', doctorId)
    .eq('date', date.toISOString().split('T')[0])
    .eq('status', 'scheduled');

  if (error) {
    throw new Error(error.message);
  }

  // Generate all possible time slots (9 AM to 5 PM, 30-minute intervals)
  const allSlots: string[] = [];
  for (let hour = 9; hour < 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      allSlots.push(time);
    }
  }

  // Filter out booked slots
  const bookedSlots = new Set(appointments.map((app) => app.time));
  return allSlots.filter((slot) => !bookedSlots.has(slot));
} 