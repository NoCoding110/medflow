-- Insert sample doctors
INSERT INTO doctors (
    email,
    password_hash,
    first_name,
    last_name,
    specialization,
    license_number,
    phone_number,
    status,
    created_at,
    updated_at
) VALUES
    (
        'dr.smith@medflow.com',
        '$2a$10$abcdefghijklmnopqrstuvwxyz123456', -- This is a placeholder hash
        'Sarah',
        'Smith',
        'General Medicine',
        'MD123456',
        '+1-555-0201',
        'active',
        NOW(),
        NOW()
    ),
    (
        'dr.brown@medflow.com',
        '$2a$10$abcdefghijklmnopqrstuvwxyz123456', -- This is a placeholder hash
        'James',
        'Brown',
        'Cardiology',
        'MD789012',
        '+1-555-0202',
        'active',
        NOW(),
        NOW()
    ),
    (
        'dr.garcia@medflow.com',
        '$2a$10$abcdefghijklmnopqrstuvwxyz123456', -- This is a placeholder hash
        'Maria',
        'Garcia',
        'Endocrinology',
        'MD345678',
        '+1-555-0203',
        'active',
        NOW(),
        NOW()
    );

-- Insert sample appointments
INSERT INTO patient_appointments (
    patient_id,
    doctor_id,
    appointment_date,
    appointment_type,
    status,
    notes,
    created_at,
    updated_at
)
SELECT 
    p.id as patient_id,
    d.id as doctor_id,
    NOW() + INTERVAL '2 days' as appointment_date,
    'Regular Checkup' as appointment_type,
    'scheduled' as status,
    'Annual physical examination' as notes,
    NOW() as created_at,
    NOW() as updated_at
FROM patients p
CROSS JOIN doctors d
WHERE p.email = 'john.doe@example.com'
AND d.email = 'dr.smith@medflow.com';

INSERT INTO patient_appointments (
    patient_id,
    doctor_id,
    appointment_date,
    appointment_type,
    status,
    notes,
    created_at,
    updated_at
)
SELECT 
    p.id as patient_id,
    d.id as doctor_id,
    NOW() + INTERVAL '3 days' as appointment_date,
    'Cardiac Consultation' as appointment_type,
    'scheduled' as status,
    'Follow-up for hypertension management' as notes,
    NOW() as created_at,
    NOW() as updated_at
FROM patients p
CROSS JOIN doctors d
WHERE p.email = 'john.doe@example.com'
AND d.email = 'dr.brown@medflow.com';

INSERT INTO patient_appointments (
    patient_id,
    doctor_id,
    appointment_date,
    appointment_type,
    status,
    notes,
    created_at,
    updated_at
)
SELECT 
    p.id as patient_id,
    d.id as doctor_id,
    NOW() + INTERVAL '4 days' as appointment_date,
    'Diabetes Management' as appointment_type,
    'scheduled' as status,
    'Regular diabetes check and medication review' as notes,
    NOW() as created_at,
    NOW() as updated_at
FROM patients p
CROSS JOIN doctors d
WHERE p.email = 'emily.wilson@example.com'
AND d.email = 'dr.garcia@medflow.com';

INSERT INTO patient_appointments (
    patient_id,
    doctor_id,
    appointment_date,
    appointment_type,
    status,
    notes,
    created_at,
    updated_at
)
SELECT 
    p.id as patient_id,
    d.id as doctor_id,
    NOW() + INTERVAL '5 days' as appointment_date,
    'Arthritis Consultation' as appointment_type,
    'scheduled' as status,
    'Review of arthritis symptoms and treatment plan' as notes,
    NOW() as created_at,
    NOW() as updated_at
FROM patients p
CROSS JOIN doctors d
WHERE p.email = 'robert.chen@example.com'
AND d.email = 'dr.smith@medflow.com';

-- Insert some past appointments
INSERT INTO patient_appointments (
    patient_id,
    doctor_id,
    appointment_date,
    appointment_type,
    status,
    notes,
    created_at,
    updated_at
)
SELECT 
    p.id as patient_id,
    d.id as doctor_id,
    NOW() - INTERVAL '7 days' as appointment_date,
    'Follow-up' as appointment_type,
    'completed' as status,
    'Patient reported improvement in symptoms' as notes,
    NOW() as created_at,
    NOW() as updated_at
FROM patients p
CROSS JOIN doctors d
WHERE p.email = 'john.doe@example.com'
AND d.email = 'dr.smith@medflow.com';

INSERT INTO patient_appointments (
    patient_id,
    doctor_id,
    appointment_date,
    appointment_type,
    status,
    notes,
    created_at,
    updated_at
)
SELECT 
    p.id as patient_id,
    d.id as doctor_id,
    NOW() - INTERVAL '14 days' as appointment_date,
    'Initial Consultation' as appointment_type,
    'completed' as status,
    'Initial assessment completed, treatment plan established' as notes,
    NOW() as created_at,
    NOW() as updated_at
FROM patients p
CROSS JOIN doctors d
WHERE p.email = 'emily.wilson@example.com'
AND d.email = 'dr.garcia@medflow.com'; 