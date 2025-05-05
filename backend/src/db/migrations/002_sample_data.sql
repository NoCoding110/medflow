-- Insert sample patients
INSERT INTO patients (
    email,
    password_hash,
    first_name,
    last_name,
    date_of_birth,
    gender,
    phone_number,
    address,
    city,
    state,
    zip_code,
    country,
    emergency_contact_name,
    emergency_contact_phone,
    emergency_contact_relationship,
    blood_type,
    height,
    weight,
    allergies,
    chronic_conditions,
    medications,
    dietary_restrictions,
    fitness_level,
    insurance_provider,
    insurance_policy_number,
    insurance_group_number,
    primary_care_physician,
    status,
    created_at,
    updated_at
) VALUES
    (
        'john.doe@example.com',
        '$2a$10$abcdefghijklmnopqrstuvwxyz123456', -- This is a placeholder hash
        'John',
        'Doe',
        '1980-05-15',
        'male',
        '+1-555-0123',
        '123 Main St',
        'Boston',
        'MA',
        '02108',
        'USA',
        'Jane Doe',
        '+1-555-0124',
        'Spouse',
        'O+',
        180,
        80,
        ARRAY['Penicillin', 'Shellfish'],
        ARRAY['Hypertension'],
        ARRAY['Lisinopril 10mg', 'Aspirin 81mg'],
        ARRAY['Low Sodium'],
        'Intermediate',
        'Blue Cross Blue Shield',
        'POL123456',
        'GRP789012',
        'Dr. Sarah Smith',
        'active',
        NOW(),
        NOW()
    ),
    (
        'emily.wilson@example.com',
        '$2a$10$abcdefghijklmnopqrstuvwxyz123456', -- This is a placeholder hash
        'Emily',
        'Wilson',
        '1992-08-23',
        'female',
        '+1-555-0125',
        '456 Oak Ave',
        'Chicago',
        'IL',
        '60601',
        'USA',
        'Michael Wilson',
        '+1-555-0126',
        'Spouse',
        'A+',
        165,
        62,
        ARRAY['Peanuts'],
        ARRAY['Asthma', 'Type 2 Diabetes'],
        ARRAY['Metformin 500mg', 'Albuterol Inhaler'],
        ARRAY['Gluten Free'],
        'Beginner',
        'Aetna',
        'POL789012',
        'GRP345678',
        'Dr. James Brown',
        'active',
        NOW(),
        NOW()
    ),
    (
        'robert.chen@example.com',
        '$2a$10$abcdefghijklmnopqrstuvwxyz123456', -- This is a placeholder hash
        'Robert',
        'Chen',
        '1975-11-30',
        'male',
        '+1-555-0127',
        '789 Pine St',
        'San Francisco',
        'CA',
        '94105',
        'USA',
        'Lisa Chen',
        '+1-555-0128',
        'Spouse',
        'B+',
        175,
        75,
        ARRAY['Latex'],
        ARRAY['Arthritis'],
        ARRAY['Ibuprofen 400mg', 'Calcium Supplement'],
        ARRAY['Dairy Free'],
        'Advanced',
        'UnitedHealthcare',
        'POL345678',
        'GRP901234',
        'Dr. Maria Garcia',
        'active',
        NOW(),
        NOW()
    );

-- Insert sample vitals for each patient
INSERT INTO vitals (patient_id, type, value, unit, status, recorded_at)
SELECT 
    id,
    'systolic_pressure',
    120,
    'mmHg',
    'normal',
    NOW() - INTERVAL '1 day'
FROM patients;

INSERT INTO vitals (patient_id, type, value, unit, status, recorded_at)
SELECT 
    id,
    'diastolic_pressure',
    80,
    'mmHg',
    'normal',
    NOW() - INTERVAL '1 day'
FROM patients;

INSERT INTO vitals (patient_id, type, value, unit, status, recorded_at)
SELECT 
    id,
    'heart_rate',
    72,
    'bpm',
    'normal',
    NOW() - INTERVAL '1 day'
FROM patients;

INSERT INTO vitals (patient_id, type, value, unit, status, recorded_at)
SELECT 
    id,
    'temperature',
    37.0,
    '°C',
    'normal',
    NOW() - INTERVAL '1 day'
FROM patients;

-- Insert sample nutrition entries
INSERT INTO nutrition (patient_id, meal_type, calories, protein, carbs, fat, fiber, sugar, sodium, recorded_at)
SELECT 
    id,
    'breakfast',
    450,
    20,
    60,
    15,
    8,
    12,
    300,
    NOW() - INTERVAL '1 day'
FROM patients;

-- Insert sample fitness entries
INSERT INTO fitness (patient_id, type, value, unit, status, recorded_at)
SELECT 
    id,
    'steps',
    8500,
    'steps',
    'normal',
    NOW() - INTERVAL '1 day'
FROM patients;

INSERT INTO fitness (patient_id, type, value, unit, status, recorded_at)
SELECT 
    id,
    'active_minutes',
    45,
    'minutes',
    'normal',
    NOW() - INTERVAL '1 day'
FROM patients; 