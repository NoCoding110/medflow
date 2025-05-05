-- Ensure auth schema exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users table first
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
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

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE wearable_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE wearable_data ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (true);  -- Temporarily allow all access

CREATE POLICY "Patients can view their own profile"
  ON patients FOR SELECT
  USING (true);  -- Temporarily allow all access

CREATE POLICY "Patients can view their own devices"
  ON wearable_devices FOR SELECT
  USING (true);  -- Temporarily allow all access

CREATE POLICY "Patients can view their own data"
  ON wearable_data FOR SELECT
  USING (true);  -- Temporarily allow all access 