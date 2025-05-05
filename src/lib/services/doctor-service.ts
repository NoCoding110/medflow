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

export const createDoctorSarahJohnson = async () => {
  try {
    // First, create the user record
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          email: "sarah.johnson@medflow.com",
          first_name: "Sarah",
          last_name: "Johnson",
          role: "doctor",
          password: "hashed_password_here", // In production, this should be properly hashed
        },
      ])
      .select()
      .single();

    if (userError) throw userError;
    if (!userData) throw new Error("Failed to create user record");

    // Then, create the doctor profile
    const { data: doctorData, error: doctorError } = await supabase
      .from("doctors")
      .insert([
        {
          user_id: userData.id,
          specialization: "Internal Medicine",
          license_number: "MD123456",
          phone: "+1 (555) 123-4567",
          address: "123 Medical Center Dr, Suite 200, San Francisco, CA 94102",
          bio: "Dr. Sarah Johnson is a board-certified internal medicine physician with over 15 years of experience. She specializes in preventive care and chronic disease management.",
          profile_image: "https://example.com/sarah-johnson.jpg",
        },
      ])
      .select()
      .single();

    if (doctorError) throw doctorError;
    if (!doctorData) throw new Error("Failed to create doctor record");

    // Create some sample appointments
    const { error: appointmentsError } = await supabase
      .from("appointments")
      .insert([
        {
          doctor_id: doctorData.id,
          patient_id: "patient_id_1", // Replace with actual patient ID
          date: "2024-03-20",
          time: "09:00",
          type: "checkup",
          status: "scheduled",
          notes: "Annual physical examination",
        },
        {
          doctor_id: doctorData.id,
          patient_id: "patient_id_2", // Replace with actual patient ID
          date: "2024-03-20",
          time: "10:30",
          type: "follow-up",
          status: "scheduled",
          notes: "Diabetes management follow-up",
        },
      ]);

    if (appointmentsError) throw appointmentsError;

    // Create some sample reminders
    const { error: remindersError } = await supabase
      .from("reminders")
      .insert([
        {
          doctor_id: doctorData.id,
          title: "Review lab results",
          description: "Review and follow up on patient lab results from last week",
          due_date: "2024-03-19",
          priority: "high",
          status: "pending",
        },
        {
          doctor_id: doctorData.id,
          title: "Update patient records",
          description: "Update electronic health records for patients seen today",
          due_date: "2024-03-20",
          priority: "medium",
          status: "pending",
        },
      ]);

    if (remindersError) throw remindersError;

    // Create some sample notes
    const { error: notesError } = await supabase
      .from("doctor_notes")
      .insert([
        {
          doctor_id: doctorData.id,
          patient_id: "patient_id_1", // Replace with actual patient ID
          title: "Treatment plan update",
          content: "Patient showing good progress with new medication. Continue current treatment plan.",
          created_at: new Date().toISOString(),
        },
        {
          doctor_id: doctorData.id,
          patient_id: "patient_id_2", // Replace with actual patient ID
          title: "Follow-up required",
          content: "Patient needs additional testing for diabetes management.",
          created_at: new Date().toISOString(),
        },
      ]);

    if (notesError) throw notesError;

    return {
      user: userData,
      doctor: doctorData,
    };
  } catch (error) {
    console.error("Error creating Dr. Sarah Johnson's profile:", error);
    throw error;
  }
};

export const ensureDoctorSarahJohnson = async () => {
  try {
    // Check if Dr. Sarah Johnson exists
    const { data: existingDoctor, error: fetchError } = await supabase
      .from("users")
      .select(`
        *,
        doctors (*)
      `)
      .eq("email", "sarah.johnson@medflow.com")
      .eq("role", "doctor")
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 is "not found" error
      throw fetchError;
    }

    if (!existingDoctor) {
      // Create Dr. Sarah Johnson's profile if it doesn't exist
      console.log("Creating Dr. Sarah Johnson's profile...");
      await createDoctorSarahJohnson();
      console.log("Dr. Sarah Johnson's profile created successfully");
    } else {
      console.log("Dr. Sarah Johnson's profile already exists");
    }

    return true;
  } catch (error) {
    console.error("Error ensuring Dr. Sarah Johnson's profile:", error);
    throw error;
  }
}; 