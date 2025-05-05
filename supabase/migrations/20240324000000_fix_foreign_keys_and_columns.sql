-- Add foreign key constraints for visits table
ALTER TABLE visits
ADD CONSTRAINT fk_visits_doctor
FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE;

ALTER TABLE visits
ADD CONSTRAINT fk_visits_patient
FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;

-- Add foreign key constraints for prescriptions table
ALTER TABLE prescriptions
ADD CONSTRAINT fk_prescriptions_doctor
FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE;

ALTER TABLE prescriptions
ADD CONSTRAINT fk_prescriptions_patient
FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;

-- Add foreign key constraints for appointments table
ALTER TABLE appointments
ADD CONSTRAINT fk_appointments_doctor
FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE;

ALTER TABLE appointments
ADD CONSTRAINT fk_appointments_patient
FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;

-- Add missing columns to ai_insights table
ALTER TABLE ai_insights
ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_visits_doctor_id ON visits(doctor_id);
CREATE INDEX IF NOT EXISTS idx_visits_patient_id ON visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_patient_id ON ai_insights(patient_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_doctor_id ON ai_insights(doctor_id);

-- Add RLS policies for ai_insights table
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can view their own insights"
  ON ai_insights FOR SELECT
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can create insights"
  ON ai_insights FOR INSERT
  WITH CHECK (doctor_id = auth.uid());

CREATE POLICY "Doctors can update their own insights"
  ON ai_insights FOR UPDATE
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can delete their own insights"
  ON ai_insights FOR DELETE
  USING (doctor_id = auth.uid());

CREATE POLICY "Patients can view insights about them"
  ON ai_insights FOR SELECT
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  )); 