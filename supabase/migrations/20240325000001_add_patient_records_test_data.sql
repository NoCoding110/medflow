-- Add test lab result
INSERT INTO patient_records (patient_id, doctor_id, type, title, description, data, created_at, updated_at)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  'lab',
  'CBC Blood Test',
  'Routine complete blood count. All values within normal range.',
  '{"WBC": "5.2", "RBC": "4.7", "Hemoglobin": "14.1", "Platelets": "250"}',
  NOW(), NOW()
);

-- Add test imaging result
INSERT INTO patient_records (patient_id, doctor_id, type, title, description, data, created_at, updated_at)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  'imaging',
  'Chest X-Ray',
  'No acute cardiopulmonary process. Lungs clear.',
  '{"findings": "Normal", "impression": "No acute disease"}',
  NOW(), NOW()
);

-- Add test document
INSERT INTO patient_records (patient_id, doctor_id, type, title, description, data, created_at, updated_at)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  'document',
  'Discharge Summary',
  'Patient discharged in stable condition after routine checkup.',
  '{"summary": "Stable, follow up in 3 months"}',
  NOW(), NOW()
); 