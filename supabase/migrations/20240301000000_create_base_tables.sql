-- Create users table first
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('patient', 'doctor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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

-- Create doctor_patients table
CREATE TABLE IF NOT EXISTS doctor_patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(doctor_id, patient_id)
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('checkup', 'follow-up', 'consultation', 'emergency')),
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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

-- Create wearable_devices table
CREATE TABLE IF NOT EXISTS wearable_devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL,
  device_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create wearable_data table
CREATE TABLE IF NOT EXISTS wearable_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  device_id UUID NOT NULL REFERENCES wearable_devices(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create ai_preferences table
CREATE TABLE IF NOT EXISTS ai_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences JSONB NOT NULL DEFAULT '{
    "fitness": {
      "enabled": true,
      "frequency": "daily",
      "thresholds": {
        "steps": 5000,
        "activeMinutes": 30,
        "caloriesBurned": 2000
      }
    },
    "nutrition": {
      "enabled": true,
      "frequency": "daily",
      "goals": {
        "calories": 2000,
        "protein": 150,
        "carbs": 250,
        "fat": 70
      }
    },
    "vitals": {
      "enabled": true,
      "frequency": "realtime",
      "thresholds": {
        "heartRate": {
          "min": 60,
          "max": 100
        },
        "bloodPressure": {
          "systolic": {
            "min": 90,
            "max": 120
          },
          "diastolic": {
            "min": 60,
            "max": 80
          }
        },
        "bloodOxygen": {
          "min": 95
        }
      }
    },
    "mentalHealth": {
      "enabled": true,
      "frequency": "daily",
      "metrics": {
        "stress": true,
        "mood": true,
        "sleep": true
      }
    },
    "medication": {
      "enabled": true,
      "frequency": "realtime",
      "reminders": true,
      "interactions": true,
      "adherence": true
    }
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ai_insights table
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  module VARCHAR(50),
  preferences JSONB,
  severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  type VARCHAR(50) CHECK (type IN ('trend', 'recommendation', 'risk', 'alert')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  record_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function for audit logging
CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (table_name, operation, record_id, old_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, OLD.id, row_to_json(OLD), auth.uid());
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (table_name, operation, record_id, old_data, new_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(OLD), row_to_json(NEW), auth.uid());
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (table_name, operation, record_id, new_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(NEW), auth.uid());
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create validation functions
CREATE OR REPLACE FUNCTION validate_appointment()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if doctor and patient have a relationship
  IF NOT EXISTS (
    SELECT 1 FROM doctor_patients
    WHERE doctor_id = NEW.doctor_id
    AND patient_id = NEW.patient_id
  ) THEN
    RAISE EXCEPTION 'Doctor and patient must have an established relationship';
  END IF;

  -- Check for appointment conflicts
  IF EXISTS (
    SELECT 1 FROM appointments
    WHERE doctor_id = NEW.doctor_id
    AND date = NEW.date
    AND time = NEW.time
    AND id != NEW.id
    AND status != 'cancelled'
  ) THEN
    RAISE EXCEPTION 'Appointment time slot is already booked';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_patient_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate emergency contact JSON structure
  IF NOT (
    NEW.emergency_contact ? 'name' AND
    NEW.emergency_contact ? 'phone' AND
    NEW.emergency_contact ? 'relationship'
  ) THEN
    RAISE EXCEPTION 'Emergency contact must include name, phone, and relationship';
  END IF;

  -- Validate insurance JSON structure
  IF NOT (
    NEW.insurance ? 'provider' AND
    NEW.insurance ? 'policy_number' AND
    NEW.insurance ? 'expiry_date'
  ) THEN
    RAISE EXCEPTION 'Insurance must include provider, policy number, and expiry date';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_ai_preferences()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate JSON structure
  IF NOT (
    NEW.preferences ? 'fitness' AND
    NEW.preferences ? 'nutrition' AND
    NEW.preferences ? 'vitals' AND
    NEW.preferences ? 'mentalHealth' AND
    NEW.preferences ? 'medication'
  ) THEN
    RAISE EXCEPTION 'AI preferences must include all required sections';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_patients_doctor_id ON doctor_patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_patients_patient_id ON doctor_patients(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_doctor_notes_doctor_id ON doctor_notes(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_notes_patient_id ON doctor_notes(patient_id);
CREATE INDEX IF NOT EXISTS idx_doctor_reminders_doctor_id ON doctor_reminders(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_reminders_patient_id ON doctor_reminders(patient_id);
CREATE INDEX IF NOT EXISTS idx_doctor_reminders_due_date ON doctor_reminders(due_date);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescriptions(status);
CREATE INDEX IF NOT EXISTS idx_wearable_devices_patient_id ON wearable_devices(patient_id);
CREATE INDEX IF NOT EXISTS idx_wearable_data_patient_id ON wearable_data(patient_id);
CREATE INDEX IF NOT EXISTS idx_wearable_data_device_id ON wearable_data(device_id);
CREATE INDEX IF NOT EXISTS idx_wearable_data_timestamp ON wearable_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_ai_preferences_user_id ON ai_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_user_id ON ai_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_module ON ai_insights(module);
CREATE INDEX IF NOT EXISTS idx_ai_insights_severity ON ai_insights(severity);
CREATE INDEX IF NOT EXISTS idx_ai_insights_type ON ai_insights(type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_operation ON audit_logs(operation);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wearable_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE wearable_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create RLS policies for patients table
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

-- Create RLS policies for appointments table
CREATE POLICY "Patients can view their own appointments"
  ON appointments FOR SELECT
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

CREATE POLICY "Patients can create their own appointments"
  ON appointments FOR INSERT
  WITH CHECK (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

CREATE POLICY "Patients can update their own appointments"
  ON appointments FOR UPDATE
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

CREATE POLICY "Doctors can view their appointments"
  ON appointments FOR SELECT
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctors can update their appointments"
  ON appointments FOR UPDATE
  USING (doctor_id = auth.uid());

CREATE POLICY "Admins can view all appointments"
  ON appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all appointments"
  ON appointments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create RLS policies for doctor_notes table
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

-- Create RLS policies for doctor_reminders table
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

-- Create RLS policies for prescriptions table
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

-- Create RLS policies for wearable_devices table
CREATE POLICY "Patients can view their own devices"
  ON wearable_devices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM patients
      WHERE patients.id = wearable_devices.patient_id
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Patients can insert their own devices"
  ON wearable_devices FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM patients
      WHERE patients.id = patient_id
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Patients can update their own devices"
  ON wearable_devices FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM patients
      WHERE patients.id = wearable_devices.patient_id
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Patients can delete their own devices"
  ON wearable_devices FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM patients
      WHERE patients.id = wearable_devices.patient_id
      AND patients.user_id = auth.uid()
    )
  );

-- Create RLS policies for wearable_data table
CREATE POLICY "Patients can view their own data"
  ON wearable_data FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM patients
      WHERE patients.id = wearable_data.patient_id
      AND patients.user_id = auth.uid()
    )
  );

CREATE POLICY "Patients can insert their own data"
  ON wearable_data FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM patients
      WHERE patients.id = patient_id
      AND patients.user_id = auth.uid()
    )
  );

-- Create RLS policies for ai_preferences table
CREATE POLICY "Users can view their own AI preferences"
  ON ai_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI preferences"
  ON ai_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI preferences"
  ON ai_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for ai_insights table
CREATE POLICY "Users can view their own AI insights"
  ON ai_insights FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI insights"
  ON ai_insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI insights"
  ON ai_insights FOR UPDATE
  USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

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

CREATE TRIGGER update_wearable_devices_updated_at
  BEFORE UPDATE ON wearable_devices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_preferences_updated_at
  BEFORE UPDATE ON ai_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_insights_updated_at
  BEFORE UPDATE ON ai_insights
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create validation triggers
CREATE TRIGGER validate_appointment_trigger
  BEFORE INSERT OR UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION validate_appointment();

CREATE TRIGGER validate_patient_data_trigger
  BEFORE INSERT OR UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION validate_patient_data();

CREATE TRIGGER validate_ai_preferences_trigger
  BEFORE INSERT OR UPDATE ON ai_preferences
  FOR EACH ROW
  EXECUTE FUNCTION validate_ai_preferences();

-- Create audit triggers
CREATE TRIGGER audit_users_trigger
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_patients_trigger
  AFTER INSERT OR UPDATE OR DELETE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_appointments_trigger
  AFTER INSERT OR UPDATE OR DELETE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_doctor_notes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON doctor_notes
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_doctor_reminders_trigger
  AFTER INSERT OR UPDATE OR DELETE ON doctor_reminders
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_prescriptions_trigger
  AFTER INSERT OR UPDATE OR DELETE ON prescriptions
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_wearable_devices_trigger
  AFTER INSERT OR UPDATE OR DELETE ON wearable_devices
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_wearable_data_trigger
  AFTER INSERT OR UPDATE OR DELETE ON wearable_data
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_ai_preferences_trigger
  AFTER INSERT OR UPDATE OR DELETE ON ai_preferences
  FOR EACH ROW
  EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_ai_insights_trigger
  AFTER INSERT OR UPDATE OR DELETE ON ai_insights
  FOR EACH ROW
  EXECUTE FUNCTION log_audit(); 