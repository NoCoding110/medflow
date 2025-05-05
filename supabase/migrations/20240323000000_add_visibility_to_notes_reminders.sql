-- Add visibility to doctor_notes
ALTER TABLE doctor_notes
ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'private';

-- Add visibility to doctor_reminders
ALTER TABLE doctor_reminders
ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'private'; 