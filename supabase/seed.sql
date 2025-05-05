-- Clear existing data (be careful with this in production!)
TRUNCATE TABLE doctor_notes CASCADE;
TRUNCATE TABLE doctor_reminders CASCADE;
TRUNCATE TABLE patient_appointments CASCADE;
TRUNCATE TABLE doctor_patients CASCADE;
TRUNCATE TABLE doctors CASCADE;
TRUNCATE TABLE patients CASCADE;

-- Insert test doctors
INSERT INTO doctors (
  id,
  email,
  password_hash,
  first_name,
  last_name,
  specialization,
  license_number,
  phone_number,
  profile_image,
  status
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'sarah@medflow.com',
    'hashed_password_here',
    'Sarah',
    'Johnson',
    'Internal Medicine',
    'MD123456',
    '+1 (555) 123-4567',
    'https://example.com/sarah-johnson.jpg',
    'active'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'john@medflow.com',
    'hashed_password_here',
    'John',
    'Smith',
    'Cardiology',
    'MD789012',
    '+1 (555) 987-6543',
    'https://example.com/john-smith.jpg',
    'active'
  );

-- Insert test patients
INSERT INTO patients (
  id,
  user_id,
  first_name,
  last_name,
  date_of_birth,
  gender,
  phone,
  address,
  emergency_contact_name,
  emergency_contact_relationship,
  emergency_contact_phone,
  insurance_provider,
  insurance_policy_number,
  insurance_group_number,
  insurance_contact_number,
  status
) VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    '33333333-3333-3333-3333-333333333333',
    'Jane',
    'Doe',
    '1980-01-01',
    'Female',
    '+1 (555) 111-2222',
    '123 Main St, Anytown, USA',
    'John Doe',
    'Spouse',
    '+1 (555) 111-3333',
    'Blue Cross',
    'BC123456',
    'GRP789',
    '+1 (555) 111-4444',
    'active'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    '66666666-6666-6666-6666-666666666666',
    'Bob',
    'Wilson',
    '1975-05-15',
    'Male',
    '+1 (555) 222-3333',
    '456 Oak Ave, Somewhere, USA',
    'Mary Wilson',
    'Spouse',
    '+1 (555) 222-4444',
    'Aetna',
    'AE789012',
    'GRP456',
    '+1 (555) 222-5555',
    'active'
  );

-- Link doctors to patients
INSERT INTO doctor_patients (doctor_id, patient_id) VALUES
  ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444'),
  ('11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555'),
  ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444');

-- Insert test appointments
INSERT INTO patient_appointments (
  doctor_id,
  patient_id,
  date,
  time,
  type,
  status,
  notes
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    '44444444-4444-4444-4444-444444444444',
    '2024-03-20',
    '09:00',
    'checkup',
    'scheduled',
    'Annual physical examination'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    '55555555-5555-5555-5555-555555555555',
    '2024-03-20',
    '10:30',
    'follow-up',
    'scheduled',
    'Diabetes management follow-up'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '44444444-4444-4444-4444-444444444444',
    '2024-03-21',
    '14:00',
    'consultation',
    'scheduled',
    'Cardiac consultation'
  );

-- Insert test reminders
INSERT INTO doctor_reminders (
  doctor_id,
  patient_id,
  title,
  description,
  due_date,
  priority,
  status
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    '44444444-4444-4444-4444-444444444444',
    'Review lab results',
    'Review and follow up on patient lab results from last week',
    '2024-03-19',
    'high',
    'pending'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    '55555555-5555-5555-5555-555555555555',
    'Update patient records',
    'Update electronic health records for patients seen today',
    '2024-03-20',
    'medium',
    'pending'
  );

-- Insert test notes
INSERT INTO doctor_notes (
  doctor_id,
  patient_id,
  title,
  content
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    '44444444-4444-4444-4444-444444444444',
    'Treatment plan update',
    'Patient showing good progress with new medication. Continue current treatment plan.'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    '55555555-5555-5555-5555-555555555555',
    'Follow-up required',
    'Patient needs additional testing for diabetes management.'
  ); 