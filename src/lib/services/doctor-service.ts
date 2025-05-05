import { supabase } from "@/lib/supabase";
import { Patient } from "./patient-service";

export interface Doctor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'doctor';
  password: string | null;
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

export interface DoctorRegistrationData {
  email: string;
  firstName: string;
  lastName: string;
  specialization: string;
  npiNumber: string;
  licenseNumber: string;
  phone: string;
  address: string;
  bio?: string;
  profileImage?: string;
}

export const getDoctorByEmail = async (email: string): Promise<Doctor | null> => {
  try {
    // First get the user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('role', 'doctor')
      .single();

    if (userError) throw userError;
    if (!userData) return null;

    // Then get the doctor profile
    const { data: doctorData, error: doctorError } = await supabase
      .from('doctors')
      .select('*')
      .eq('user_id', userData.id)
      .single();

    if (doctorError) throw doctorError;
    if (!doctorData) return null;

    // Combine the data
    return {
      id: doctorData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      role: 'doctor',
      password: userData.password,
      specialization: doctorData.specialization,
      licenseNumber: doctorData.license_number,
      phone: doctorData.phone,
      address: doctorData.address,
      bio: doctorData.bio,
      profileImage: doctorData.profile_image,
      createdAt: doctorData.created_at,
      updatedAt: doctorData.updated_at
    };
  } catch (error) {
    console.error('Error getting doctor by email:', error);
    return null;
  }
};

export const getDoctorById = async (doctorId: string): Promise<Doctor | null> => {
  try {
    // First get the doctor profile
    const { data: doctorData, error: doctorError } = await supabase
      .from('doctors')
      .select('*, users(*)')
      .eq('id', doctorId)
      .single();

    if (doctorError) throw doctorError;
    if (!doctorData) return null;

    // Combine the data
    return {
      id: doctorData.id,
      email: doctorData.users.email,
      firstName: doctorData.users.first_name,
      lastName: doctorData.users.last_name,
      role: 'doctor',
      password: doctorData.users.password,
      specialization: doctorData.specialization,
      licenseNumber: doctorData.license_number,
      phone: doctorData.phone,
      address: doctorData.address,
      bio: doctorData.bio,
      profileImage: doctorData.profile_image,
      createdAt: doctorData.created_at,
      updatedAt: doctorData.updated_at
    };
  } catch (error) {
    console.error('Error getting doctor by ID:', error);
    return null;
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
      .from('patients')
      .select(`
        *,
        users (
          id,
          email,
          first_name,
          last_name
        )
      `)
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(patient => ({
      id: patient.id,
      userId: patient.user_id,
      firstName: patient.first_name,
      lastName: patient.last_name,
      email: patient.users?.email || '',
      dateOfBirth: patient.date_of_birth,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      emergencyContact: patient.emergency_contact,
      insurance: patient.insurance,
      medicalHistory: patient.medical_history,
      wearableDevices: patient.wearable_devices,
      preferences: patient.preferences,
      status: patient.status || 'active',
      createdAt: patient.created_at,
      updatedAt: patient.updated_at
    }));
  } catch (error) {
    console.error('Error getting doctor patients:', error);
    return [];
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
    // Check if user exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'sarah@medflow.com')
      .eq('role', 'doctor')
      .single();

    if (userError && userError.code !== 'PGRST116') throw userError;

    let userId: string;
    if (!userData) {
      // Create user if not exists
      const { data: newUser, error: createUserError } = await supabase
        .from('users')
        .insert({
          email: 'sarah@medflow.com',
          first_name: 'Sarah',
          last_name: 'Johnson',
          role: 'doctor',
          password: 'password123'
        })
        .select()
        .single();

      if (createUserError) throw createUserError;
      userId = newUser.id;
    } else {
      userId = userData.id;
    }

    // Check if doctor profile exists
    const { data: doctorData, error: doctorError } = await supabase
      .from('doctors')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (doctorError && doctorError.code !== 'PGRST116') throw doctorError;

    if (!doctorData) {
      // Create doctor profile if not exists
      const { data: newDoctor, error: createDoctorError } = await supabase
        .from('doctors')
        .insert({
          user_id: userId,
          specialization: 'Cardiology',
          license_number: 'MD123456',
          phone: '+1 (555) 123-4567',
          address: '123 Medical Center Drive, Suite 456, New York, NY 10001',
          bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and advanced heart failure management.',
          profile_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        })
        .select()
        .single();

      if (createDoctorError) throw createDoctorError;
      return newDoctor;
    }

    return doctorData;
  } catch (error) {
    console.error("Error ensuring Dr. Sarah Johnson's profile:", error);
    throw error;
  }
};

export const createDoctor = async (data: DoctorRegistrationData): Promise<Doctor> => {
  try {
    // First, create the user record
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          role: "doctor",
          // Password will be set when the doctor first logs in
          password: null,
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
          specialization: data.specialization,
          npi_number: data.npiNumber,
          license_number: data.licenseNumber,
          phone: data.phone,
          address: data.address,
          bio: data.bio,
          profile_image: data.profileImage,
        },
      ])
      .select()
      .single();

    if (doctorError) throw doctorError;
    if (!doctorData) throw new Error("Failed to create doctor record");

    // Create default tables for the doctor
    await Promise.all([
      // Create appointments table
      supabase.from("appointments").insert([
        {
          doctor_id: doctorData.id,
          patient_id: null,
          date: null,
          time: null,
          type: "checkup",
          status: "scheduled",
          notes: "",
        },
      ]),
      // Create reminders table
      supabase.from("reminders").insert([
        {
          doctor_id: doctorData.id,
          title: "Welcome to MedFlow",
          description: "Set up your profile and preferences",
          due_date: new Date().toISOString(),
          priority: "medium",
          status: "pending",
        },
      ]),
      // Create notes table
      supabase.from("doctor_notes").insert([
        {
          doctor_id: doctorData.id,
          patient_id: null,
          title: "Welcome Note",
          content: "Welcome to your new MedFlow account!",
          created_at: new Date().toISOString(),
        },
      ]),
    ]);

    return {
      ...userData,
      ...doctorData,
    };
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
};

export const setupDoctorPassword = async (email: string, password: string): Promise<void> => {
  try {
    // First, verify the doctor exists and hasn't set a password yet
    const { data: doctor, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("role", "doctor")
      .is("password", null)
      .single();

    if (fetchError) throw fetchError;
    if (!doctor) throw new Error("Doctor not found or password already set");

    // Update the password
    const { error: updateError } = await supabase
      .from("users")
      .update({ password })
      .eq("id", doctor.id);

    if (updateError) throw updateError;

    // Create default settings for the doctor
    await supabase.from("doctor_settings").insert([
      {
        doctor_id: doctor.id,
        notifications_enabled: true,
        email_notifications: true,
        sms_notifications: false,
        appointment_reminders: true,
        patient_messages: true,
        lab_results: true,
        prescription_updates: true,
        working_hours: {
          monday: { start: "09:00", end: "17:00" },
          tuesday: { start: "09:00", end: "17:00" },
          wednesday: { start: "09:00", end: "17:00" },
          thursday: { start: "09:00", end: "17:00" },
          friday: { start: "09:00", end: "17:00" },
          saturday: { start: null, end: null },
          sunday: { start: null, end: null },
        },
        appointment_duration: 30, // minutes
        max_patients_per_day: 20,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  } catch (error) {
    console.error("Error setting up doctor password:", error);
    throw error;
  }
}; 