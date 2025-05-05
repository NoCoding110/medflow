ALTER TABLE patients
  ADD COLUMN IF NOT EXISTS emergency_contact jsonb,
  ADD COLUMN IF NOT EXISTS insurance jsonb,
  ADD COLUMN IF NOT EXISTS medical_history jsonb,
  ADD COLUMN IF NOT EXISTS wearable_devices jsonb,
  ADD COLUMN IF NOT EXISTS preferences jsonb; 