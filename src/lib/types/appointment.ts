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