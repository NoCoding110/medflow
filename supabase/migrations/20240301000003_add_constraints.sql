-- Add foreign key constraints
ALTER TABLE patients
  ADD CONSTRAINT fk_patients_user_id
  FOREIGN KEY (user_id)
  REFERENCES users(id)
  ON DELETE CASCADE;

ALTER TABLE doctor_patients
  ADD CONSTRAINT fk_doctor_patients_doctor_id
  FOREIGN KEY (doctor_id)
  REFERENCES users(id)
  ON DELETE CASCADE;

ALTER TABLE doctor_patients
  ADD CONSTRAINT fk_doctor_patients_patient_id
  FOREIGN KEY (patient_id)
  REFERENCES patients(id)
  ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_patients ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for patients table
CREATE POLICY "Patients can view their own profile"
  ON patients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Patients can update their own profile"
  ON patients FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Patients can delete their own profile"
  ON patients FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for doctor_patients table
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