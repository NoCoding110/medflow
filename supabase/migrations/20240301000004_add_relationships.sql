-- Add foreign key constraints
ALTER TABLE patients
  ADD CONSTRAINT fk_patients_user_id
  FOREIGN KEY (user_id)
  REFERENCES users(id)
  ON DELETE CASCADE;

ALTER TABLE doctor_patients
  ADD CONSTRAINT fk_doctor_patients_doctor_id
  FOREIGN KEY (doctor_id)
  REFERENCES users(id)
  ON DELETE CASCADE;

ALTER TABLE doctor_patients
  ADD CONSTRAINT fk_doctor_patients_patient_id
  FOREIGN KEY (patient_id)
  REFERENCES patients(id)
  ON DELETE CASCADE; 