-- Insert test doctors
INSERT INTO users (id, email, first_name, last_name, role)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'dr.smith@medflow.com', 'Sarah', 'Smith', 'doctor'),
  ('22222222-2222-2222-2222-222222222222', 'dr.brown@medflow.com', 'James', 'Brown', 'doctor'),
  ('33333333-3333-3333-3333-333333333333', 'dr.garcia@medflow.com', 'Maria', 'Garcia', 'doctor');

-- Insert test patients as users first
INSERT INTO users (id, email, first_name, last_name, role)
VALUES 
  ('44444444-4444-4444-4444-444444444444', 'john.doe@example.com', 'John', 'Doe', 'patient'),
  ('55555555-5555-5555-5555-555555555555', 'emily.wilson@example.com', 'Emily', 'Wilson', 'patient'),
  ('66666666-6666-6666-6666-666666666666', 'robert.chen@example.com', 'Robert', 'Chen', 'patient');

-- Insert patient records and store their IDs
WITH inserted_patients AS (
  INSERT INTO patients (user_id, date_of_birth, gender, phone, address, emergency_contact, insurance, medical_history, wearable_devices, preferences)
  VALUES 
    ('44444444-4444-4444-4444-444444444444', '1980-05-15', 'Male', '+1-555-0123', '123 Main St', 
     '{"name": "Jane Doe", "relationship": "Spouse", "phone": "+1-555-0124"}',
     '{"provider": "Blue Cross Blue Shield", "policyNumber": "POL123456", "groupNumber": "GRP789012"}',
     '{"allergies": ["Penicillin", "Shellfish"], "conditions": ["Hypertension"], "medications": ["Lisinopril 10mg", "Aspirin 81mg"]}',
     '{"appleWatch": true, "fitbit": false, "ouraRing": true}',
     '{"notifications": {"email": true, "sms": true, "push": true}, "aiInsights": {"fitness": true, "nutrition": true, "vitals": true}}'
    ),
    ('55555555-5555-5555-5555-555555555555', '1992-08-23', 'Female', '+1-555-0125', '456 Oak Ave',
     '{"name": "Michael Wilson", "relationship": "Spouse", "phone": "+1-555-0126"}',
     '{"provider": "Aetna", "policyNumber": "POL789012", "groupNumber": "GRP345678"}',
     '{"allergies": ["Peanuts"], "conditions": ["Asthma", "Type 2 Diabetes"], "medications": ["Metformin 500mg", "Albuterol Inhaler"]}',
     '{"appleWatch": false, "fitbit": true, "ouraRing": false}',
     '{"notifications": {"email": true, "sms": false, "push": true}, "aiInsights": {"fitness": true, "nutrition": true, "vitals": true}}'
    ),
    ('66666666-6666-6666-6666-666666666666', '1975-11-30', 'Male', '+1-555-0127', '789 Pine St',
     '{"name": "Lisa Chen", "relationship": "Spouse", "phone": "+1-555-0128"}',
     '{"provider": "UnitedHealthcare", "policyNumber": "POL345678", "groupNumber": "GRP901234"}',
     '{"allergies": ["Latex"], "conditions": ["Arthritis"], "medications": ["Ibuprofen 400mg", "Calcium Supplement"]}',
     '{"appleWatch": true, "fitbit": false, "ouraRing": false}',
     '{"notifications": {"email": true, "sms": true, "push": false}, "aiInsights": {"fitness": true, "nutrition": true, "vitals": true}}'
    )
  RETURNING id, user_id
)
-- Create doctor-patient relationships using the actual patient IDs
INSERT INTO doctor_patients (doctor_id, patient_id)
SELECT 
  CASE 
    WHEN p.user_id = '44444444-4444-4444-4444-444444444444'::uuid THEN '11111111-1111-1111-1111-111111111111'::uuid
    WHEN p.user_id = '55555555-5555-5555-5555-555555555555'::uuid THEN '22222222-2222-2222-2222-222222222222'::uuid
    WHEN p.user_id = '66666666-6666-6666-6666-666666666666'::uuid THEN '33333333-3333-3333-3333-333333333333'::uuid
  END as doctor_id,
  p.id as patient_id
FROM inserted_patients p; 