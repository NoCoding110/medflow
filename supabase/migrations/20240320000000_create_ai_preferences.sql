-- Create ai_preferences table
CREATE TABLE IF NOT EXISTS ai_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    preferences JSONB NOT NULL DEFAULT '{
        "fitness": {
            "enabled": true,
            "frequency": "daily",
            "thresholds": {
                "steps": 5000,
                "activeMinutes": 30,
                "caloriesBurned": 2000
            }
        },
        "nutrition": {
            "enabled": true,
            "frequency": "daily",
            "goals": {
                "calories": 2000,
                "protein": 150,
                "carbs": 250,
                "fat": 70
            }
        },
        "vitals": {
            "enabled": true,
            "frequency": "realtime",
            "thresholds": {
                "heartRate": {
                    "min": 60,
                    "max": 100
                },
                "bloodPressure": {
                    "systolic": {
                        "min": 90,
                        "max": 120
                    },
                    "diastolic": {
                        "min": 60,
                        "max": 80
                    }
                },
                "bloodOxygen": {
                    "min": 95
                }
            }
        },
        "mentalHealth": {
            "enabled": true,
            "frequency": "daily",
            "metrics": {
                "stress": true,
                "mood": true,
                "sleep": true
            }
        },
        "medication": {
            "enabled": true,
            "frequency": "realtime",
            "reminders": true,
            "interactions": true,
            "adherence": true
        }
    }'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE ai_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own AI preferences"
    ON ai_preferences FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI preferences"
    ON ai_preferences FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI preferences"
    ON ai_preferences FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_ai_preferences_updated_at
    BEFORE UPDATE ON ai_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 