-- Create audit logging table first
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    record_id UUID NOT NULL,
    old_data JSONB,
    new_data JSONB,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function for audit logging
CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, operation, record_id, old_data, user_id)
        VALUES (TG_TABLE_NAME, TG_OP, OLD.id, row_to_json(OLD), auth.uid());
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, operation, record_id, old_data, new_data, user_id)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(OLD), row_to_json(NEW), auth.uid());
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, operation, record_id, new_data, user_id)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(NEW), auth.uid());
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create validation functions
CREATE OR REPLACE FUNCTION validate_appointment()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if doctor and patient have a relationship
    IF NOT EXISTS (
        SELECT 1 FROM doctor_patients
        WHERE doctor_id = NEW.doctor_id
        AND patient_id = NEW.patient_id
    ) THEN
        RAISE EXCEPTION 'Doctor and patient must have an established relationship';
    END IF;

    -- Check for appointment conflicts
    IF EXISTS (
        SELECT 1 FROM appointments
        WHERE doctor_id = NEW.doctor_id
        AND date = NEW.date
        AND time = NEW.time
        AND id != NEW.id
        AND status != 'cancelled'
    ) THEN
        RAISE EXCEPTION 'Appointment time slot is already booked';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_patient_data()
RETURNS TRIGGER AS $$
BEGIN
    -- Validate emergency contact JSON structure
    IF NOT (
        NEW.emergency_contact ? 'name' AND
        NEW.emergency_contact ? 'phone' AND
        NEW.emergency_contact ? 'relationship'
    ) THEN
        RAISE EXCEPTION 'Emergency contact must include name, phone, and relationship';
    END IF;

    -- Validate insurance JSON structure
    IF NOT (
        NEW.insurance ? 'provider' AND
        NEW.insurance ? 'policy_number' AND
        NEW.insurance ? 'expiry_date'
    ) THEN
        RAISE EXCEPTION 'Insurance must include provider, policy number, and expiry date';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_ai_preferences()
RETURNS TRIGGER AS $$
BEGIN
    -- Validate JSON structure
    IF NOT (
        NEW.preferences ? 'fitness' AND
        NEW.preferences ? 'nutrition' AND
        NEW.preferences ? 'vitals' AND
        NEW.preferences ? 'mentalHealth' AND
        NEW.preferences ? 'medication'
    ) THEN
        RAISE EXCEPTION 'AI preferences must include all required sections';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add indexes and constraints only if tables and columns exist
DO $$
BEGIN
    -- Check if appointments table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'appointments') THEN
        -- Add composite indexes for appointments
        CREATE INDEX IF NOT EXISTS idx_appointments_doctor_date ON appointments(doctor_id, date);
        CREATE INDEX IF NOT EXISTS idx_appointments_patient_date ON appointments(patient_id, date);
        CREATE INDEX IF NOT EXISTS idx_appointments_date_status ON appointments(date, status);

        -- Add foreign key constraint
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'fk_appointments_doctor_patient'
        ) THEN
            ALTER TABLE appointments
            ADD CONSTRAINT fk_appointments_doctor_patient
            FOREIGN KEY (doctor_id, patient_id)
            REFERENCES doctor_patients(doctor_id, patient_id)
            ON DELETE CASCADE;
        END IF;

        -- Add check constraint
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'chk_appointment_date_future'
        ) THEN
            ALTER TABLE appointments
            ADD CONSTRAINT chk_appointment_date_future
            CHECK (date >= CURRENT_DATE);
        END IF;

        -- Create appointment validation trigger
        DROP TRIGGER IF EXISTS validate_appointment_trigger ON appointments;
        CREATE TRIGGER validate_appointment_trigger
            BEFORE INSERT OR UPDATE ON appointments
            FOR EACH ROW
            EXECUTE FUNCTION validate_appointment();

        -- Create audit trigger for appointments
        DROP TRIGGER IF EXISTS audit_appointments_trigger ON appointments;
        CREATE TRIGGER audit_appointments_trigger
            AFTER INSERT OR UPDATE OR DELETE ON appointments
            FOR EACH ROW
            EXECUTE FUNCTION log_audit();
    END IF;

    -- Check if patients table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'patients') THEN
        -- Check if columns exist before creating indexes
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'patients' AND column_name = 'medical_history'
        ) THEN
            CREATE INDEX IF NOT EXISTS idx_patients_medical_history ON patients USING gin (medical_history);
        END IF;

        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'patients' AND column_name = 'wearable_devices'
        ) THEN
            CREATE INDEX IF NOT EXISTS idx_patients_wearable_devices ON patients USING gin (wearable_devices);
        END IF;

        -- Add check constraint
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'chk_patient_age'
        ) THEN
            ALTER TABLE patients
            ADD CONSTRAINT chk_patient_age
            CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '1 year');
        END IF;

        -- Create patient data validation trigger
        DROP TRIGGER IF EXISTS validate_patient_data_trigger ON patients;
        CREATE TRIGGER validate_patient_data_trigger
            BEFORE INSERT OR UPDATE ON patients
            FOR EACH ROW
            EXECUTE FUNCTION validate_patient_data();

        -- Create audit trigger for patients
        DROP TRIGGER IF EXISTS audit_patients_trigger ON patients;
        CREATE TRIGGER audit_patients_trigger
            AFTER INSERT OR UPDATE OR DELETE ON patients
            FOR EACH ROW
            EXECUTE FUNCTION log_audit();
    END IF;

    -- Check if ai_preferences table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ai_preferences') THEN
        -- Check if column exists before creating index
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'ai_preferences' AND column_name = 'preferences'
        ) THEN
            CREATE INDEX IF NOT EXISTS idx_ai_preferences_preferences ON ai_preferences USING gin (preferences);
        END IF;

        -- Create AI preferences validation trigger
        DROP TRIGGER IF EXISTS validate_ai_preferences_trigger ON ai_preferences;
        CREATE TRIGGER validate_ai_preferences_trigger
            BEFORE INSERT OR UPDATE ON ai_preferences
            FOR EACH ROW
            EXECUTE FUNCTION validate_ai_preferences();

        -- Create audit trigger for ai_preferences
        DROP TRIGGER IF EXISTS audit_ai_preferences_trigger ON ai_preferences;
        CREATE TRIGGER audit_ai_preferences_trigger
            AFTER INSERT OR UPDATE OR DELETE ON ai_preferences
            FOR EACH ROW
            EXECUTE FUNCTION log_audit();
    END IF;
END $$; 