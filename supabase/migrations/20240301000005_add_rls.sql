-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_patients ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (temporarily allow all access)
CREATE POLICY "Allow all access to users"
  ON users FOR ALL
  USING (true);

CREATE POLICY "Allow all access to patients"
  ON patients FOR ALL
  USING (true);

CREATE POLICY "Allow all access to doctor_patients"
  ON doctor_patients FOR ALL
  USING (true); 