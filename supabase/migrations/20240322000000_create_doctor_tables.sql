-- Create doctor_notes table
CREATE TABLE IF NOT EXISTS doctor_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create doctor_reminders table
CREATE TABLE IF NOT EXISTS doctor_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  medication TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  instructions TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_doctor_notes_doctor_id ON doctor_notes(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_notes_patient_id ON doctor_notes(patient_id);
CREATE INDEX IF NOT EXISTS idx_doctor_reminders_doctor_id ON doctor_reminders(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_reminders_patient_id ON doctor_reminders(patient_id);
CREATE INDEX IF NOT EXISTS idx_doctor_reminders_due_date ON doctor_reminders(due_date);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescriptions(status);

-- Create RLS policies
ALTER TABLE doctor_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;

-- Policies for doctor_notes
CREATE POLICY "Doctors can view their own notes"
  ON doctor_notes FOR SELECT
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can create notes"
  ON doctor_notes FOR INSERT
  WITH CHECK (doctor_id = auth.uid());

CREATE POLICY "Doctors can update their own notes"
  ON doctor_notes FOR UPDATE
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can delete their own notes"
  ON doctor_notes FOR DELETE
  USING (doctor_id = auth.uid());

CREATE POLICY "Patients can view notes about them"
  ON doctor_notes FOR SELECT
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Policies for doctor_reminders
CREATE POLICY "Doctors can view their own reminders"
  ON doctor_reminders FOR SELECT
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can create reminders"
  ON doctor_reminders FOR INSERT
  WITH CHECK (doctor_id = auth.uid());

CREATE POLICY "Doctors can update their own reminders"
  ON doctor_reminders FOR UPDATE
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can delete their own reminders"
  ON doctor_reminders FOR DELETE
  USING (doctor_id = auth.uid());

-- Policies for prescriptions
CREATE POLICY "Doctors can view their own prescriptions"
  ON prescriptions FOR SELECT
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can create prescriptions"
  ON prescriptions FOR INSERT
  WITH CHECK (doctor_id = auth.uid());

CREATE POLICY "Doctors can update their own prescriptions"
  ON prescriptions FOR UPDATE
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can delete their own prescriptions"
  ON prescriptions FOR DELETE
  USING (doctor_id = auth.uid());

CREATE POLICY "Patients can view their own prescriptions"
  ON prescriptions FOR SELECT
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Create triggers for updated_at
CREATE TRIGGER update_doctor_notes_updated_at
  BEFORE UPDATE ON doctor_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctor_reminders_updated_at
  BEFORE UPDATE ON doctor_reminders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prescriptions_updated_at
  BEFORE UPDATE ON prescriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 