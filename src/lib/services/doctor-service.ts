import { supabase } from "@/lib/supabase";
import { Patient } from "./patient-service";

export interface Doctor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'doctor';
  specialization?: string;
  licenseNumber?: string;
  phone?: string;
  address?: string;
  bio?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorAnalytics {
  totalPatients: number;
  activePatients: number;
  appointmentsToday: number;
  revenue: {
    current: number;
    previous: number;
    trend: 'up' | 'down';
  };
  patientEngagement: {
    score: number;
    trend: 'up' | 'down';
  };
  healthOutcomes: {
    improvement: number;
    decline: number;
    stable: number;
  };
}

export interface DoctorAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'checkup' | 'follow-up' | 'consultation' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  patient?: Patient;
}

export interface DoctorMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system' | 'alert';
  read: boolean;
  metadata?: Record<string, any>;
}

export interface DoctorAlert {
  id: string;
  type: 'lab' | 'medication' | 'patient' | 'system';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  patientId?: string;
  patientName?: string;
  data?: Record<string, any>;
}

interface DoctorPatientResponse {
  patients: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: "Male" | "Female" | "Other" | "Prefer not to say";
    phone: string;
    address: string;
    emergency_contact: {
      name: string;
      relationship: string;
      phone: string;
    };
    insurance: {
      provider: string;
      policyNumber: string;
      groupNumber: string;
      contactNumber: string;
    };
    medical_history: {
      allergies: string[];
      medications: string[];
      surgeries: string[];
      conditions: string[];
      primaryCarePhysician: string;
    };
    wearable_devices: {
      appleWatch: boolean;
      fitbit: boolean;
      ouraRing: boolean;
      other: string[];
    };
    preferences: {
      notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
      };
      aiInsights: {
        fitness: boolean;
        nutrition: boolean;
        vitals: boolean;
        mentalHealth: boolean;
        medication: boolean;
      };
    };
    created_at: string;
    updated_at: string;
    users: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
    }[];
  };
}

export const getDoctorByEmail = async (email: string): Promise<Doctor | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("role", "doctor")
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor by email:", error);
    throw error;
  }
};

export const getDoctorById = async (doctorId: string): Promise<Doctor | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", doctorId)
      .eq("role", "doctor")
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    throw error;
  }
};

export const getDoctors = async (): Promise<Doctor[]> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "doctor");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const updateDoctor = async (doctorId: string, updates: Partial<Doctor>): Promise<Doctor> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", doctorId)
      .eq("role", "doctor")
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

export const getDoctorPatients = async (doctorId: string): Promise<Patient[]> => {
  try {
    const { data, error } = await supabase
      .from("doctor_patients")
      .select(`
        patients (
          id,
          user_id,
          first_name,
          last_name,
          date_of_birth,
          gender,
          phone,
          address,
          emergency_contact,
          insurance,
          medical_history,
          wearable_devices,
          preferences,
          created_at,
          updated_at,
          users (
            id,
            email,
            first_name,
            last_name
          )
        )
      `)
      .eq("doctor_id", doctorId);

    if (error) throw error;
    return ((data as unknown) as DoctorPatientResponse[])?.map(d => ({
      id: d.patients.id,
      userId: d.patients.user_id,
      firstName: d.patients.first_name,
      lastName: d.patients.last_name,
      dateOfBirth: d.patients.date_of_birth,
      gender: d.patients.gender,
      email: d.patients.users[0]?.email || '',
      phone: d.patients.phone,
      address: d.patients.address,
      emergencyContact: d.patients.emergency_contact,
      insurance: d.patients.insurance,
      medicalHistory: d.patients.medical_history,
      wearableDevices: d.patients.wearable_devices,
      preferences: d.patients.preferences,
      createdAt: d.patients.created_at,
      updatedAt: d.patients.updated_at
    })) || [];
  } catch (error) {
    console.error("Error fetching doctor's patients:", error);
    throw error;
  }
};

export const getDoctorAnalytics = async (doctorId: string): Promise<DoctorAnalytics> => {
  try {
    const { data, error } = await supabase.rpc('get_doctor_analytics', { doctor_id: doctorId });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor analytics:", error);
    throw error;
  }
};

export const getDoctorAppointments = async (doctorId: string, date?: string): Promise<DoctorAppointment[]> => {
  try {
    let query = supabase
      .from("appointments")
      .select(`
        *,
        patients (
          *,
          users (
            id,
            email,
            first_name,
            last_name
          )
        )
      `)
      .eq("doctor_id", doctorId);

    if (date) {
      query = query.eq("date", date);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    throw error;
  }
};

export const getDoctorMessages = async (doctorId: string): Promise<DoctorMessage[]> => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${doctorId},receiver_id.eq.${doctorId}`)
      .order("timestamp", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor messages:", error);
    throw error;
  }
};

export const getDoctorAlerts = async (doctorId: string): Promise<DoctorAlert[]> => {
  try {
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("timestamp", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor alerts:", error);
    throw error;
  }
};

export const getDoctorAIInsights = async (doctorId: string): Promise<DoctorAlert[]> => {
  try {
    const { data, error } = await supabase
      .from("ai_insights")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("timestamp", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor AI insights:", error);
    throw error;
  }
};

export const assignPatientToDoctor = async (doctorId: string, patientId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("doctor_patients")
      .insert([{ doctor_id: doctorId, patient_id: patientId }]);

    if (error) throw error;
  } catch (error) {
    console.error("Error assigning patient to doctor:", error);
    throw error;
  }
};

export const removePatientFromDoctor = async (doctorId: string, patientId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("doctor_patients")
      .delete()
      .eq("doctor_id", doctorId)
      .eq("patient_id", patientId);

    if (error) throw error;
  } catch (error) {
    console.error("Error removing patient from doctor:", error);
    throw error;
  }
}; 