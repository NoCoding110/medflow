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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_wearable_devices_patient_id ON wearable_devices(patient_id);
CREATE INDEX IF NOT EXISTS idx_wearable_data_patient_id ON wearable_data(patient_id);
CREATE INDEX IF NOT EXISTS idx_wearable_data_device_id ON wearable_data(device_id);
CREATE INDEX IF NOT EXISTS idx_wearable_data_timestamp ON wearable_data(timestamp);

-- Create RLS policies
ALTER TABLE wearable_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE wearable_data ENABLE ROW LEVEL SECURITY;

-- Policy for wearable_devices
CREATE POLICY "Patients can view their own devices"
  ON wearable_devices FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert their own devices"
  ON wearable_devices FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own devices"
  ON wearable_devices FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can delete their own devices"
  ON wearable_devices FOR DELETE
  USING (auth.uid() = patient_id);

-- Policy for wearable_data
CREATE POLICY "Patients can view their own data"
  ON wearable_data FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert their own data"
  ON wearable_data FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for wearable_devices
CREATE TRIGGER update_wearable_devices_updated_at
  BEFORE UPDATE ON wearable_devices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 