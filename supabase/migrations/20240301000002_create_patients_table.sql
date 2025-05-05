-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other', 'Prefer not to say')),
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  emergency_contact JSONB NOT NULL,
  insurance JSONB NOT NULL,
  medical_history JSONB NOT NULL,
  wearable_devices JSONB NOT NULL,
  preferences JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create doctor_patients table for many-to-many relationship
CREATE TABLE IF NOT EXISTS doctor_patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(doctor_id, patient_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_patients_doctor_id ON doctor_patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_patients_patient_id ON doctor_patients(patient_id);

-- Create RLS policies
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_patients ENABLE ROW LEVEL SECURITY;

-- Policies for patients table
CREATE POLICY "Patients can view their own profile"
  ON patients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Patients can update their own profile"
  ON patients FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can view their patients' profiles"
  ON patients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM doctor_patients
      WHERE doctor_patients.doctor_id = auth.uid()
      AND doctor_patients.patient_id = patients.id
    )
  );

CREATE POLICY "Doctors can update their patients' profiles"
  ON patients FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM doctor_patients
      WHERE doctor_patients.doctor_id = auth.uid()
      AND doctor_patients.patient_id = patients.id
    )
  );

CREATE POLICY "Admins can view all patient profiles"
  ON patients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all patient profiles"
  ON patients FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Policies for doctor_patients table
CREATE POLICY "Doctors can view their patient relationships"
  ON doctor_patients FOR SELECT
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can create patient relationships"
  ON doctor_patients FOR INSERT
  WITH CHECK (doctor_id = auth.uid());

CREATE POLICY "Doctors can delete patient relationships"
  ON doctor_patients FOR DELETE
  USING (doctor_id = auth.uid());

CREATE POLICY "Patients can view their doctor relationships"
  ON doctor_patients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM patients
      WHERE patients.id = doctor_patients.patient_id
      AND patients.user_id = auth.uid()
    )
  );

-- Create trigger for patients
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 