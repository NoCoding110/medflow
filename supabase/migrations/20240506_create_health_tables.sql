-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create vitals table
CREATE TABLE IF NOT EXISTS vitals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    heart_rate INTEGER,
    blood_pressure_systolic INTEGER,
    blood_pressure_diastolic INTEGER,
    temperature DECIMAL,
    oxygen_saturation DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fitness table
CREATE TABLE IF NOT EXISTS fitness (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    steps INTEGER,
    distance DECIMAL,
    calories_burned INTEGER,
    activity_type TEXT,
    duration INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create nutrition table
CREATE TABLE IF NOT EXISTS nutrition (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meal_type TEXT,
    food_items JSONB,
    calories INTEGER,
    protein DECIMAL,
    carbs DECIMAL,
    fat DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for vitals
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can view their patients' vitals"
    ON vitals FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM doctor_patients
            WHERE doctor_patients.doctor_id = auth.uid()
            AND doctor_patients.patient_id = vitals.patient_id
        )
    );

CREATE POLICY "Patients can view their own vitals"
    ON vitals FOR SELECT
    USING (patient_id = auth.uid());

-- Create RLS policies for fitness
ALTER TABLE fitness ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can view their patients' fitness data"
    ON fitness FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM doctor_patients
            WHERE doctor_patients.doctor_id = auth.uid()
            AND doctor_patients.patient_id = fitness.patient_id
        )
    );

CREATE POLICY "Patients can view their own fitness data"
    ON fitness FOR SELECT
    USING (patient_id = auth.uid());

-- Create RLS policies for nutrition
ALTER TABLE nutrition ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can view their patients' nutrition data"
    ON nutrition FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM doctor_patients
            WHERE doctor_patients.doctor_id = auth.uid()
            AND doctor_patients.patient_id = nutrition.patient_id
        )
    );

CREATE POLICY "Patients can view their own nutrition data"
    ON nutrition FOR SELECT
    USING (patient_id = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vitals_patient_id ON vitals(patient_id);
CREATE INDEX IF NOT EXISTS idx_vitals_recorded_at ON vitals(recorded_at);

CREATE INDEX IF NOT EXISTS idx_fitness_patient_id ON fitness(patient_id);
CREATE INDEX IF NOT EXISTS idx_fitness_recorded_at ON fitness(recorded_at);

CREATE INDEX IF NOT EXISTS idx_nutrition_patient_id ON nutrition(patient_id);
CREATE INDEX IF NOT EXISTS idx_nutrition_date ON nutrition(date); 