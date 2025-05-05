-- Create doctors table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    specialization TEXT,
    license_number TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    profile_image TEXT,
    bio TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create patients table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    emergency_contact_name TEXT,
    emergency_contact_relationship TEXT,
    emergency_contact_phone TEXT,
    insurance_provider TEXT,
    insurance_policy_number TEXT,
    insurance_group_number TEXT,
    insurance_contact_number TEXT,
    allergies TEXT[],
    medications TEXT[],
    conditions TEXT[],
    surgeries TEXT[],
    primary_care_physician TEXT,
    wearable_apple_watch BOOLEAN DEFAULT false,
    wearable_fitbit BOOLEAN DEFAULT false,
    wearable_oura_ring BOOLEAN DEFAULT false,
    wearable_other TEXT[],
    notifications_email BOOLEAN DEFAULT false,
    notifications_sms BOOLEAN DEFAULT false,
    notifications_push BOOLEAN DEFAULT false,
    ai_insights_fitness BOOLEAN DEFAULT false,
    ai_insights_nutrition BOOLEAN DEFAULT false,
    ai_insights_vitals BOOLEAN DEFAULT false,
    ai_insights_mental_health BOOLEAN DEFAULT false,
    ai_insights_medication BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TIME NOT NULL,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    medication TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    refills INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create visits table
CREATE TABLE IF NOT EXISTS public.visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    type TEXT NOT NULL,
    notes TEXT,
    vitals JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_insights table
CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    priority TEXT DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create doctor_patients junction table
CREATE TABLE IF NOT EXISTS public.doctor_patients (
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (doctor_id, patient_id)
);

-- Create the get_patient_health_score function
CREATE OR REPLACE FUNCTION public.get_patient_health_score(patient_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    health_score JSONB;
BEGIN
    -- Calculate health score based on various factors
    SELECT jsonb_build_object(
        'score', 75, -- Default score
        'trend', 'stable',
        'factors', jsonb_build_array(
            jsonb_build_object('name', 'Activity Level', 'value', 80, 'impact', 'positive'),
            jsonb_build_object('name', 'Sleep Quality', 'value', 70, 'impact', 'neutral'),
            jsonb_build_object('name', 'Nutrition', 'value', 85, 'impact', 'positive')
        )
    ) INTO health_score;

    RETURN health_score;
END;
$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON public.prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON public.prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_visits_patient_id ON public.visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_visits_doctor_id ON public.visits(doctor_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_patient_id ON public.ai_insights(patient_id);
CREATE INDEX IF NOT EXISTS idx_doctor_patients_doctor_id ON public.doctor_patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_patients_patient_id ON public.doctor_patients(patient_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_patients ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Doctors can view their own data" ON public.doctors
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Patients can view their own data" ON public.patients
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Doctors can view their patients' data" ON public.patients
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.doctor_patients
            WHERE doctor_patients.doctor_id = auth.uid()
            AND doctor_patients.patient_id = patients.id
        )
    );

-- Add similar policies for other tables as needed 