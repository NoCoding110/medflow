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
    surgeries: string[];
    conditions: string[];
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
  createdAt: string;
  updatedAt: string;
}

export const createPatient = async (patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
  try {
    const { data, error } = await supabase
      .from("patients")
      .insert([patientData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

export const getPatient = async (patientId: string) => {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*, users(*)")
      .eq("id", patientId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching patient:", error);
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
