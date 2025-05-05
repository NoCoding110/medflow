import { supabase } from "@/lib/supabase";
import { Patient } from "./patient-service";

export interface Doctor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  specialization: string;
  licenseNumber: string;
  phone: string;
  profileImage: string;
  bio: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorAnalytics {
  totalPatients: number;
  totalAppointments: number;
  totalPrescriptions: number;
  totalNotes: number;
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
  licenseNumber: string;
  phone: string;
  profileImage: string;
  bio: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  patient: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  id: string;
  doctorId: string;
  patientId: string;
  patient: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  visibility?: string;
}

export interface Note {
  id: string;
  doctorId: string;
  patientId: string;
  patient: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  visibility?: string;
}

export interface Visit {
  id: string;
  doctorId: string;
  patientId: string;
  patient: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  doctorId: string;
  patientId: string;
  patient: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIInsight {
  id: string;
  doctorId: string;
  patientId: string;
  patient: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  type: string;
  title: string;
  content: string;
  severity: string;
  status: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export async function getDoctorByEmail(email: string): Promise<Doctor | null> {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      role: 'doctor',
      specialization: data.specialization || '',
      licenseNumber: data.license_number || '',
      phone: data.phone_number || '',
      profileImage: data.profile_image || '',
      bio: data.bio || '',
      status: data.status || 'active',
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Error fetching doctor by email:', error);
    throw error;
  }
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .eq('role', 'doctor')
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
      specialization: data.specialization || '',
      licenseNumber: data.license_number || '',
      phone: data.phone || '',
      profileImage: data.profile_image || '',
      bio: data.bio || '',
      status: data.status || 'active',
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    throw error;
  }
}

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
    // First, get the doctor's patients through the doctor_patients table
    const { data: doctorPatients, error: doctorPatientsError } = await supabase
      .from('doctor_patients')
      .select('patient_id')
      .eq('doctor_id', doctorId);

    if (doctorPatientsError) throw doctorPatientsError;

    if (!doctorPatients || doctorPatients.length === 0) {
      return [];
    }

    // Get the patient details from the patients table
    const patientIds = doctorPatients.map(dp => dp.patient_id);
    const { data: patients, error: patientsError } = await supabase
      .from('patients')
      .select(`
        id,
        user_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone,
        address,
        emergency_contact_name,
        emergency_contact_relationship,
        emergency_contact_phone,
        insurance_provider,
        insurance_policy_number,
        insurance_group_number,
        insurance_contact_number,
        allergies,
        medications,
        conditions,
        surgeries,
        primary_care_physician,
        wearable_apple_watch,
        wearable_fitbit,
        wearable_oura_ring,
        wearable_other,
        notifications_email,
        notifications_sms,
        notifications_push,
        ai_insights_fitness,
        ai_insights_nutrition,
        ai_insights_vitals,
        ai_insights_mental_health,
        ai_insights_medication,
        status,
        created_at,
        updated_at
      `)
      .in('id', patientIds);

    if (patientsError) {
      console.error('Error fetching patients:', patientsError);
      throw patientsError;
    }

    if (!patients) {
      console.warn('No patients found for doctor:', doctorId);
      return [];
    }

    return patients.map(patient => ({
      id: patient.id,
      userId: patient.user_id,
      firstName: patient.first_name,
      lastName: patient.last_name,
      dateOfBirth: patient.date_of_birth,
      gender: patient.gender,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      emergencyContact: {
        name: patient.emergency_contact_name,
        relationship: patient.emergency_contact_relationship,
        phone: patient.emergency_contact_phone
      },
      insurance: {
        provider: patient.insurance_provider,
        policyNumber: patient.insurance_policy_number,
        groupNumber: patient.insurance_group_number,
        contactNumber: patient.insurance_contact_number
      },
      medicalHistory: {
        allergies: patient.allergies || [],
        medications: patient.medications || [],
        conditions: patient.conditions || [],
        surgeries: patient.surgeries || [],
        primaryCarePhysician: patient.primary_care_physician || ''
      },
      wearableDevices: {
        appleWatch: patient.wearable_apple_watch || false,
        fitbit: patient.wearable_fitbit || false,
        ouraRing: patient.wearable_oura_ring || false,
        other: patient.wearable_other || []
      },
      preferences: {
        notifications: {
          email: patient.notifications_email || false,
          sms: patient.notifications_sms || false,
          push: patient.notifications_push || false
        },
        aiInsights: {
          fitness: patient.ai_insights_fitness || false,
          nutrition: patient.ai_insights_nutrition || false,
          vitals: patient.ai_insights_vitals || false,
          mentalHealth: patient.ai_insights_mental_health || false,
          medication: patient.ai_insights_medication || false
        }
      },
      status: patient.status || 'active',
      createdAt: patient.created_at,
      updatedAt: patient.updated_at
    }));
  } catch (error) {
    console.error('Error fetching doctor patients:', error);
    throw error;
  }
};

export const getDoctorAnalytics = async (doctorId: string): Promise<DoctorAnalytics> => {
  try {
    // Get total patients
    const { data: patients, error: patientsError } = await supabase
      .from('doctor_patients')
      .select('patient_id')
      .eq('doctor_id', doctorId);

    if (patientsError) throw patientsError;

    const totalPatients = patients?.length || 0;

    // Get total appointments
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*')
      .eq('doctor_id', doctorId);

    if (appointmentsError) throw appointmentsError;

    const totalAppointments = appointments?.length || 0;

    // Get total prescriptions
    const { data: prescriptions, error: prescriptionsError } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('doctor_id', doctorId);

    if (prescriptionsError) throw prescriptionsError;

    const totalPrescriptions = prescriptions?.length || 0;

    // Get total notes
    const { data: notes, error: notesError } = await supabase
      .from('doctor_notes')
      .select('*')
      .eq('doctor_id', doctorId);

    if (notesError) throw notesError;

    const totalNotes = notes?.length || 0;

    return {
      totalPatients,
      totalAppointments,
      totalPrescriptions,
      totalNotes
    };
  } catch (error) {
    console.error('Error fetching doctor analytics:', error);
    throw error;
  }
};

export const getDoctorVisits = async (doctorId: string): Promise<Visit[]> => {
  try {
    const { data: visits, error } = await supabase
      .from('visits')
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .eq('doctor_id', doctorId)
      .order('date', { ascending: false });

    if (error) throw error;

    return (visits || []).map(visit => ({
      id: visit.id,
      doctorId: visit.doctor_id,
      patientId: visit.patient_id,
      patient: visit.patient ? {
        id: visit.patient.id,
        userId: visit.patient.user.id,
        firstName: visit.patient.user.first_name,
        lastName: visit.patient.user.last_name,
        email: visit.patient.user.email
      } : null,
      date: visit.date,
      time: visit.time,
      type: visit.type,
      status: visit.status,
      notes: visit.notes,
      createdAt: visit.created_at,
      updatedAt: visit.updated_at
    }));
  } catch (error) {
    console.error('Error fetching doctor visits:', error);
    throw error;
  }
};

export const getDoctorPrescriptions = async (doctorId: string): Promise<Prescription[]> => {
  try {
    const { data: prescriptions, error } = await supabase
      .from('prescriptions')
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (prescriptions || []).map(prescription => ({
      id: prescription.id,
      doctorId: prescription.doctor_id,
      patientId: prescription.patient_id,
      patient: prescription.patient ? {
        id: prescription.patient.id,
        userId: prescription.patient.user.id,
        firstName: prescription.patient.user.first_name,
        lastName: prescription.patient.user.last_name,
        email: prescription.patient.user.email
      } : null,
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      startDate: prescription.start_date,
      endDate: prescription.end_date,
      instructions: prescription.instructions,
      status: prescription.status,
      createdAt: prescription.created_at,
      updatedAt: prescription.updated_at
    }));
  } catch (error) {
    console.error('Error fetching doctor prescriptions:', error);
    throw error;
  }
};

export const getDoctorAppointments = async (doctorId: string): Promise<Appointment[]> => {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .eq('doctor_id', doctorId)
      .order('date', { ascending: false });

    if (error) throw error;

    return (appointments || []).map(appointment => ({
      id: appointment.id,
      doctorId: appointment.doctor_id,
      patientId: appointment.patient_id,
      patient: appointment.patient ? {
        id: appointment.patient.id,
        userId: appointment.patient.user.id,
        firstName: appointment.patient.user.first_name,
        lastName: appointment.patient.user.last_name,
        email: appointment.patient.user.email
      } : null,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes,
      createdAt: appointment.created_at,
      updatedAt: appointment.updated_at
    }));
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
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

export const getDoctorAIInsights = async (doctorId: string): Promise<AIInsight[]> => {
  try {
    const { data: insights, error } = await supabase
      .from('ai_insights')
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (insights || []).map(insight => ({
      id: insight.id,
      doctorId: insight.doctor_id,
      patientId: insight.patient_id,
      patient: insight.patient ? {
        id: insight.patient.id,
        userId: insight.patient.user.id,
        firstName: insight.patient.user.first_name,
        lastName: insight.patient.user.last_name,
        email: insight.patient.user.email
      } : null,
      type: insight.type,
      title: insight.title,
      content: insight.content,
      severity: insight.severity,
      status: insight.status,
      metadata: insight.metadata,
      createdAt: insight.created_at,
      updatedAt: insight.updated_at
    }));
  } catch (error) {
    console.error('Error fetching doctor AI insights:', error);
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

export const createDoctor = async (data: DoctorRegistrationData): Promise<Doctor> => {
  try {
    const { data: newDoctor, error } = await supabase
      .from('doctors')
      .insert({
        email: data.email,
        password_hash: 'hashed_password_here', // In production, this should be properly hashed
        first_name: data.firstName,
        last_name: data.lastName,
        specialization: data.specialization,
        license_number: data.licenseNumber,
        phone_number: data.phone,
        profile_image: data.profileImage || '',
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;
    if (!newDoctor) throw new Error('Failed to create doctor profile');

    return {
      id: newDoctor.id,
      email: newDoctor.email,
      firstName: newDoctor.first_name,
      lastName: newDoctor.last_name,
      role: 'doctor',
      specialization: newDoctor.specialization,
      licenseNumber: newDoctor.license_number,
      phone: newDoctor.phone_number,
      profileImage: newDoctor.profile_image || '',
      bio: '', // Not stored in the database
      status: newDoctor.status || 'active',
      createdAt: newDoctor.created_at,
      updatedAt: newDoctor.updated_at
    };
  } catch (error) {
    console.error('Error creating doctor:', error);
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

export const getDoctorReminders = async (doctorId: string, visibility?: string): Promise<Reminder[]> => {
  try {
    let query = supabase
      .from('doctor_reminders')
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .eq('doctor_id', doctorId)
      .order('due_date', { ascending: true });
    if (visibility) query = query.eq('visibility', visibility);
    const { data: reminders, error } = await query;

    if (error) throw error;

    return (reminders || []).map(reminder => ({
      id: reminder.id,
      doctorId: reminder.doctor_id,
      patientId: reminder.patient_id,
      patient: reminder.patient ? {
        id: reminder.patient.id,
        userId: reminder.patient.user.id,
        firstName: reminder.patient.user.first_name,
        lastName: reminder.patient.user.last_name,
        email: reminder.patient.user.email
      } : null,
      title: reminder.title,
      description: reminder.description,
      dueDate: reminder.due_date,
      priority: reminder.priority,
      status: reminder.status,
      createdAt: reminder.created_at,
      updatedAt: reminder.updated_at
    }));
  } catch (error) {
    console.error('Error fetching doctor reminders:', error);
    throw error;
  }
};

export const getDoctorNotes = async (doctorId: string, visibility?: string): Promise<Note[]> => {
  try {
    let query = supabase
      .from('doctor_notes')
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false });
    if (visibility) query = query.eq('visibility', visibility);
    const { data: notes, error } = await query;

    if (error) throw error;

    return (notes || []).map(note => ({
      id: note.id,
      doctorId: note.doctor_id,
      patientId: note.patient_id,
      patient: note.patient ? {
        id: note.patient.id,
        userId: note.patient.user.id,
        firstName: note.patient.user.first_name,
        lastName: note.patient.user.last_name,
        email: note.patient.user.email
      } : null,
      title: note.title,
      content: note.content,
      createdAt: note.created_at,
      updatedAt: note.updated_at
    }));
  } catch (error) {
    console.error('Error fetching doctor notes:', error);
    throw error;
  }
};

export const createDoctorAppointment = async (data: {
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  notes?: string;
}): Promise<Appointment> => {
  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert({
        doctor_id: data.doctorId,
        patient_id: data.patientId,
        date: data.date,
        time: data.time,
        type: data.type,
        status: 'scheduled',
        notes: data.notes || ''
      })
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .single();

    if (error) throw error;
    if (!appointment) throw new Error('Failed to create appointment');

    return {
      id: appointment.id,
      doctorId: appointment.doctor_id,
      patientId: appointment.patient_id,
      patient: appointment.patient ? {
        id: appointment.patient.id,
        userId: appointment.patient.user.id,
        firstName: appointment.patient.user.first_name,
        lastName: appointment.patient.user.last_name,
        email: appointment.patient.user.email
      } : null,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes || '',
      createdAt: appointment.created_at,
      updatedAt: appointment.updated_at
    };
  } catch (error) {
    console.error('Error creating doctor appointment:', error);
    throw error;
  }
};

export const createDoctorReminder = async (data: {
  doctorId: string;
  patientId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  visibility?: string;
}): Promise<Reminder> => {
  try {
    const { data: reminder, error } = await supabase
      .from('doctor_reminders')
      .insert({
        doctor_id: data.doctorId,
        patient_id: data.patientId,
        title: data.title,
        description: data.description,
        due_date: data.dueDate,
        priority: data.priority,
        status: 'pending',
        visibility: data.visibility || 'private'
      })
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .single();

    if (error) throw error;
    if (!reminder) throw new Error('Failed to create reminder');

    return {
      id: reminder.id,
      doctorId: reminder.doctor_id,
      patientId: reminder.patient_id,
      patient: reminder.patient ? {
        id: reminder.patient.id,
        userId: reminder.patient.user.id,
        firstName: reminder.patient.user.first_name,
        lastName: reminder.patient.user.last_name,
        email: reminder.patient.user.email
      } : null,
      title: reminder.title,
      description: reminder.description,
      dueDate: reminder.due_date,
      priority: reminder.priority,
      status: reminder.status,
      createdAt: reminder.created_at,
      updatedAt: reminder.updated_at
    };
  } catch (error) {
    console.error('Error creating doctor reminder:', error);
    throw error;
  }
};

export const createDoctorNote = async (data: {
  doctorId: string;
  patientId: string;
  title: string;
  content: string;
  visibility?: string;
}): Promise<Note> => {
  try {
    const { data: note, error } = await supabase
      .from('doctor_notes')
      .insert({
        doctor_id: data.doctorId,
        patient_id: data.patientId,
        title: data.title,
        content: data.content,
        visibility: data.visibility || 'private'
      })
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .single();

    if (error) throw error;
    if (!note) throw new Error('Failed to create note');

    return {
      id: note.id,
      doctorId: note.doctor_id,
      patientId: note.patient_id,
      patient: note.patient ? {
        id: note.patient.id,
        userId: note.patient.user.id,
        firstName: note.patient.user.first_name,
        lastName: note.patient.user.last_name,
        email: note.patient.user.email
      } : null,
      title: note.title,
      content: note.content,
      createdAt: note.created_at,
      updatedAt: note.updated_at
    };
  } catch (error) {
    console.error('Error creating doctor note:', error);
    throw error;
  }
};

export const updateDoctorAppointment = async (
  appointmentId: string,
  updates: {
    date?: string;
    time?: string;
    type?: string;
    status?: string;
    notes?: string;
  }
): Promise<Appointment> => {
  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .update({
        date: updates.date,
        time: updates.time,
        type: updates.type,
        status: updates.status,
        notes: updates.notes
      })
      .eq('id', appointmentId)
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .single();

    if (error) throw error;
    if (!appointment) throw new Error('Failed to update appointment');

    return {
      id: appointment.id,
      doctorId: appointment.doctor_id,
      patientId: appointment.patient_id,
      patient: appointment.patient ? {
        id: appointment.patient.id,
        userId: appointment.patient.user.id,
        firstName: appointment.patient.user.first_name,
        lastName: appointment.patient.user.last_name,
        email: appointment.patient.user.email
      } : null,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes || '',
      createdAt: appointment.created_at,
      updatedAt: appointment.updated_at
    };
  } catch (error) {
    console.error('Error updating doctor appointment:', error);
    throw error;
  }
};

export const updateDoctorReminder = async (
  reminderId: string,
  updates: {
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: string;
    status?: string;
    visibility?: string;
  }
): Promise<Reminder> => {
  try {
    const { data: reminder, error } = await supabase
      .from('doctor_reminders')
      .update({
        title: updates.title,
        description: updates.description,
        due_date: updates.dueDate,
        priority: updates.priority,
        status: updates.status,
        visibility: updates.visibility
      })
      .eq('id', reminderId)
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .single();

    if (error) throw error;
    if (!reminder) throw new Error('Failed to update reminder');

    return {
      id: reminder.id,
      doctorId: reminder.doctor_id,
      patientId: reminder.patient_id,
      patient: reminder.patient ? {
        id: reminder.patient.id,
        userId: reminder.patient.user.id,
        firstName: reminder.patient.user.first_name,
        lastName: reminder.patient.user.last_name,
        email: reminder.patient.user.email
      } : null,
      title: reminder.title,
      description: reminder.description,
      dueDate: reminder.due_date,
      priority: reminder.priority,
      status: reminder.status,
      createdAt: reminder.created_at,
      updatedAt: reminder.updated_at
    };
  } catch (error) {
    console.error('Error updating doctor reminder:', error);
    throw error;
  }
};

export const updateDoctorNote = async (
  noteId: string,
  updates: {
    title?: string;
    content?: string;
  }
): Promise<Note> => {
  try {
    const { data: note, error } = await supabase
      .from('doctor_notes')
      .update({
        title: updates.title,
        content: updates.content
      })
      .eq('id', noteId)
      .select(`
        *,
        patient:patient_id (
          id,
          user:user_id (
            id,
            first_name,
            last_name,
            email
          )
        )
      `)
      .single();

    if (error) throw error;
    if (!note) throw new Error('Failed to update note');

    return {
      id: note.id,
      doctorId: note.doctor_id,
      patientId: note.patient_id,
      patient: note.patient ? {
        id: note.patient.id,
        userId: note.patient.user.id,
        firstName: note.patient.user.first_name,
        lastName: note.patient.user.last_name,
        email: note.patient.user.email
      } : null,
      title: note.title,
      content: note.content,
      createdAt: note.created_at,
      updatedAt: note.updated_at
    };
  } catch (error) {
    console.error('Error updating doctor note:', error);
    throw error;
  }
}; 