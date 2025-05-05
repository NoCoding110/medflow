import { supabase } from "@/lib/supabase";

export interface Patient {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  email: string;
  phone: string;
  address: string;
  emergencyContact: {
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
  medicalHistory: {
    allergies: string[];
    medications: string[];
    conditions: string[];
    surgeries: string[];
    primaryCarePhysician: string;
  };
  wearableDevices: {
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
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface PatientAppointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes?: string;
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
    specialization?: string;
  };
}

export interface PatientPrescription {
  id: string;
  patientId: string;
  doctorId: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  refills: number;
  status: string;
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface PatientVisit {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  type: string;
  notes: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    weight: number;
    height: number;
    temperature: number;
  };
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface PatientHealthScore {
  score: number;
  trend: "up" | "down" | "stable";
  factors: {
    name: string;
    value: number;
    impact: "positive" | "negative" | "neutral";
  }[];
}

export interface PatientAIInsight {
  id: string;
  patientId: string;
  type: string;
  message: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
}

export const createPatient = async (data: Omit<Patient, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Patient> => {
  const { data: patient, error } = await supabase
    .from('patients')
    .insert([
      {
        user_id: data.userId,
        first_name: data.firstName,
        last_name: data.lastName,
        date_of_birth: data.dateOfBirth,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        address: data.address,
        emergency_contact: data.emergencyContact,
        insurance: data.insurance,
        medical_history: data.medicalHistory,
        wearable_devices: data.wearableDevices,
        preferences: data.preferences,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  if (!patient) throw new Error('Failed to create patient');

  return {
    id: patient.id,
    userId: patient.user_id,
    firstName: patient.first_name,
    lastName: patient.last_name,
    dateOfBirth: patient.date_of_birth,
    gender: patient.gender,
    email: patient.email,
    phone: patient.phone,
    address: patient.address,
    emergencyContact: patient.emergency_contact,
    insurance: patient.insurance,
    medicalHistory: patient.medical_history,
    wearableDevices: patient.wearable_devices,
    preferences: patient.preferences,
    status: patient.status,
    createdAt: patient.created_at,
    updatedAt: patient.updated_at,
  };
};

export const getPatient = async (patientId: string) => {
  try {
    const { data, error } = await supabase
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
      .eq('id', patientId)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      userId: data.user_id,
      firstName: data.first_name,
      lastName: data.last_name,
      dateOfBirth: data.date_of_birth,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      address: data.address,
      emergencyContact: {
        name: data.emergency_contact_name,
        relationship: data.emergency_contact_relationship,
        phone: data.emergency_contact_phone
      },
      insurance: {
        provider: data.insurance_provider,
        policyNumber: data.insurance_policy_number,
        groupNumber: data.insurance_group_number,
        contactNumber: data.insurance_contact_number
      },
      medicalHistory: {
        allergies: data.allergies || [],
        medications: data.medications || [],
        conditions: data.conditions || [],
        surgeries: data.surgeries || [],
        primaryCarePhysician: data.primary_care_physician || ''
      },
      wearableDevices: {
        appleWatch: data.wearable_apple_watch || false,
        fitbit: data.wearable_fitbit || false,
        ouraRing: data.wearable_oura_ring || false,
        other: data.wearable_other || []
      },
      preferences: {
        notifications: {
          email: data.notifications_email || false,
          sms: data.notifications_sms || false,
          push: data.notifications_push || false
        },
        aiInsights: {
          fitness: data.ai_insights_fitness || false,
          nutrition: data.ai_insights_nutrition || false,
          vitals: data.ai_insights_vitals || false,
          mentalHealth: data.ai_insights_mental_health || false,
          medication: data.ai_insights_medication || false
        }
      },
      status: data.status || 'active',
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
};

export const updatePatient = async (patientId: string, updates: Partial<Patient>) => {
  try {
    const { data, error } = await supabase
      .from("patients")
      .update(updates)
      .eq("id", patientId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

export const getPatientsByDoctor = async (doctorId: string) => {
  try {
    const { data, error } = await supabase
      .from("doctor_patients")
      .select("patients(*), users(*)")
      .eq("doctor_id", doctorId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor's patients:", error);
    throw error;
  }
};

export const assignDoctorToPatient = async (doctorId: string, patientId: string) => {
  try {
    const { error } = await supabase
      .from("doctor_patients")
      .insert([{ doctor_id: doctorId, patient_id: patientId }]);

    if (error) throw error;
  } catch (error) {
    console.error("Error assigning doctor to patient:", error);
    throw error;
  }
};

export const removeDoctorFromPatient = async (doctorId: string, patientId: string) => {
  try {
    const { error } = await supabase
      .from("doctor_patients")
      .delete()
      .eq("doctor_id", doctorId)
      .eq("patient_id", patientId);

    if (error) throw error;
  } catch (error) {
    console.error("Error removing doctor from patient:", error);
    throw error;
  }
};

export const getPatientMedicalHistory = async (patientId: string) => {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("medical_history")
      .eq("id", patientId)
      .single();

    if (error) throw error;
    return data.medical_history;
  } catch (error) {
    console.error("Error fetching patient medical history:", error);
    throw error;
  }
};

export const updatePatientMedicalHistory = async (
  patientId: string,
  medicalHistory: Patient["medicalHistory"]
) => {
  try {
    const { data, error } = await supabase
      .from("patients")
      .update({ medical_history: medicalHistory })
      .eq("id", patientId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating patient medical history:", error);
    throw error;
  }
};

export const getPatientById = async (patientId: string): Promise<Patient | null> => {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select(`
        *,
        users (
          id,
          email,
          first_name,
          last_name
        )
      `)
      .eq("id", patientId)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      userId: data.user_id,
      firstName: data.first_name,
      lastName: data.last_name,
      dateOfBirth: data.date_of_birth,
      gender: data.gender,
      email: data.users.email,
      phone: data.phone,
      address: data.address,
      emergencyContact: data.emergency_contact,
      insurance: data.insurance,
      medicalHistory: data.medical_history,
      wearableDevices: data.wearable_devices,
      preferences: data.preferences,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
};

export const getPatientAppointments = async (patientId: string): Promise<PatientAppointment[]> => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select(`
        *,
        doctors (
          id,
          first_name,
          last_name,
          specialization
        )
      `)
      .eq("patient_id", patientId)
      .order("date", { ascending: true });

    if (error) throw error;
    return data?.map(appointment => ({
      id: appointment.id,
      doctorId: appointment.doctor_id,
      patientId: appointment.patient_id,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes,
      doctor: appointment.doctors ? {
        id: appointment.doctors.id,
        firstName: appointment.doctors.first_name,
        lastName: appointment.doctors.last_name,
        specialization: appointment.doctors.specialization
      } : undefined
    })) || [];
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    throw error;
  }
};

export const getPatientPrescriptions = async (patientId: string): Promise<PatientPrescription[]> => {
  try {
    const { data, error } = await supabase
      .from("prescriptions")
      .select(`
        *,
        doctors (
          id,
          first_name,
          last_name
        )
      `)
      .eq("patient_id", patientId)
      .order("start_date", { ascending: false });

    if (error) throw error;
    return data?.map(prescription => ({
      id: prescription.id,
      patientId: prescription.patient_id,
      doctorId: prescription.doctor_id,
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      startDate: prescription.start_date,
      endDate: prescription.end_date,
      refills: prescription.refills,
      status: prescription.status,
      doctor: prescription.doctors ? {
        id: prescription.doctors.id,
        firstName: prescription.doctors.first_name,
        lastName: prescription.doctors.last_name
      } : undefined
    })) || [];
  } catch (error) {
    console.error("Error fetching patient prescriptions:", error);
    throw error;
  }
};

export const getPatientVisits = async (patientId: string): Promise<PatientVisit[]> => {
  try {
    const { data, error } = await supabase
      .from("visits")
      .select(`
        *,
        doctors (
          id,
          first_name,
          last_name
        )
      `)
      .eq("patient_id", patientId)
      .order("date", { ascending: false });

    if (error) throw error;
    return data?.map(visit => ({
      id: visit.id,
      patientId: visit.patient_id,
      doctorId: visit.doctor_id,
      date: visit.date,
      type: visit.type,
      notes: visit.notes,
      vitals: visit.vitals,
      doctor: visit.doctors ? {
        id: visit.doctors.id,
        firstName: visit.doctors.first_name,
        lastName: visit.doctors.last_name
      } : undefined
    })) || [];
  } catch (error) {
    console.error("Error fetching patient visits:", error);
    throw error;
  }
};

export const getPatientHealthScore = async (patientId: string): Promise<PatientHealthScore> => {
  try {
    const { data, error } = await supabase.rpc('get_patient_health_score', { patient_id: patientId });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching patient health score:", error);
    throw error;
  }
};

export const getPatientAIInsights = async (patientId: string): Promise<PatientAIInsight[]> => {
  try {
    const { data, error } = await supabase
      .from("ai_insights")
      .select("*")
      .eq("patient_id", patientId)
      .order("timestamp", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching patient AI insights:", error);
    throw error;
  }
};

// Subscribe to real-time updates
export const subscribeToPatientUpdates = (patientId: string, callback: (payload: any) => void) => {
  const subscription = supabase
    .channel(`patient-${patientId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'patients',
        filter: `id=eq.${patientId}`
      },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};
