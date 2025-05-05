-- Create doctor_patients table
CREATE TABLE IF NOT EXISTS doctor_patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID,
  patient_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(doctor_id, patient_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_doctor_patients_doctor_id ON doctor_patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_patients_patient_id ON doctor_patients(patient_id); 