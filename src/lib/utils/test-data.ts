import { supabase } from "@/lib/supabase";
import { Doctor } from "@/lib/services/doctor-service";

interface TestDoctorData {
  email: string;
  first_name: string;
  last_name: string;
  specialization: string;
  license_number: string;
  phone_number: string;
  profile_image?: string;
}

export const createTestDoctor = async (data: TestDoctorData) => {
  try {
    // Create the doctor record
    const { data: doctorData, error: doctorError } = await supabase
      .from("doctors")
      .insert([
        {
          email: data.email,
          password_hash: "hashed_password_here", // In production, this should be properly hashed
          first_name: data.first_name,
          last_name: data.last_name,
          specialization: data.specialization,
          license_number: data.license_number,
          phone_number: data.phone_number,
          profile_image: data.profile_image || "https://example.com/default-doctor.jpg",
          status: "active"
        },
      ])
      .select()
      .single();

    if (doctorError) throw doctorError;
    if (!doctorData) throw new Error("Failed to create doctor record");

    return doctorData;
  } catch (error) {
    console.error("Error creating test doctor:", error);
    throw error;
  }
};

export const createTestDoctorWithSampleData = async (data: TestDoctorData) => {
  try {
    const doctorData = await createTestDoctor(data);

    // Create some sample appointments
    const { error: appointmentsError } = await supabase
      .from("patient_appointments")
      .insert([
        {
          doctor_id: doctorData.id,
          patient_id: "44444444-4444-4444-4444-444444444444", // Using the test patient ID
          date: "2024-03-20",
          time: "09:00",
          type: "checkup",
          status: "scheduled",
          notes: "Annual physical examination",
        },
        {
          doctor_id: doctorData.id,
          patient_id: "55555555-5555-5555-5555-555555555555", // Using the test patient ID
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
          patient_id: "44444444-4444-4444-4444-444444444444", // Using the test patient ID
          title: "Treatment plan update",
          content: "Patient showing good progress with new medication. Continue current treatment plan.",
          created_at: new Date().toISOString(),
        },
        {
          doctor_id: doctorData.id,
          patient_id: "55555555-5555-5555-5555-555555555555", // Using the test patient ID
          title: "Follow-up required",
          content: "Patient needs additional testing for diabetes management.",
          created_at: new Date().toISOString(),
        },
      ]);

    if (notesError) throw notesError;

    return doctorData;
  } catch (error) {
    console.error("Error creating test doctor with sample data:", error);
    throw error;
  }
};

export const ensureTestDoctor = async (data: TestDoctorData): Promise<Doctor> => {
  try {
    // Check if the doctor exists
    const { data: existingDoctor, error: checkError } = await supabase
      .from('doctors')
      .select('*')
      .eq('email', data.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existingDoctor) {
      return {
        id: existingDoctor.id,
        email: existingDoctor.email,
        firstName: existingDoctor.first_name,
        lastName: existingDoctor.last_name,
        role: 'doctor',
        specialization: existingDoctor.specialization,
        licenseNumber: existingDoctor.license_number,
        phone: existingDoctor.phone_number,
        profileImage: existingDoctor.profile_image || '',
        bio: '', // Not stored in the database
        status: existingDoctor.status || 'active',
        createdAt: existingDoctor.created_at,
        updatedAt: existingDoctor.updated_at
      };
    }

    // Create the doctor if they don't exist
    const newDoctor = await createTestDoctor(data);

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
    console.error('Error ensuring test doctor:', error);
    throw error;
  }
}; 