-- Add missing columns to ai_insights table
ALTER TABLE ai_insights
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add missing columns to prescriptions table
ALTER TABLE prescriptions
ADD COLUMN IF NOT EXISTS refills INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add missing columns to visits table
ALTER TABLE visits
ADD COLUMN IF NOT EXISTS vitals JSONB,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_ai_insights_updated_at') THEN
    EXECUTE 'DROP TRIGGER update_ai_insights_updated_at ON ai_insights;';
  END IF;
END$$;
CREATE TRIGGER update_ai_insights_updated_at
    BEFORE UPDATE ON ai_insights
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_prescriptions_updated_at') THEN
    EXECUTE 'DROP TRIGGER update_prescriptions_updated_at ON prescriptions;';
  END IF;
END$$;
CREATE TRIGGER update_prescriptions_updated_at
    BEFORE UPDATE ON prescriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_visits_updated_at') THEN
    EXECUTE 'DROP TRIGGER update_visits_updated_at ON visits;';
  END IF;
END$$;
CREATE TRIGGER update_visits_updated_at
    BEFORE UPDATE ON visits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add unique constraint for doctor license numbers
ALTER TABLE doctors
ADD CONSTRAINT unique_license_number UNIQUE (license_number);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_insights_doctor_id ON ai_insights(doctor_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_patient_id ON ai_insights(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_visits_doctor_id ON visits(doctor_id);
CREATE INDEX IF NOT EXISTS idx_visits_patient_id ON visits(patient_id); 