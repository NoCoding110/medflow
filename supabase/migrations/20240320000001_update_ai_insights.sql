-- Update ai_insights table structure
ALTER TABLE ai_insights
ADD COLUMN IF NOT EXISTS module VARCHAR(50),
ADD COLUMN IF NOT EXISTS preferences JSONB,
ADD COLUMN IF NOT EXISTS severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
ADD COLUMN IF NOT EXISTS type VARCHAR(50) CHECK (type IN ('trend', 'recommendation', 'risk', 'alert')),
ADD COLUMN IF NOT EXISTS metadata JSONB;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_ai_insights_module ON ai_insights(module);
CREATE INDEX IF NOT EXISTS idx_ai_insights_severity ON ai_insights(severity);
CREATE INDEX IF NOT EXISTS idx_ai_insights_type ON ai_insights(type);

-- Add RLS policies
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own AI insights"
    ON ai_insights FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI insights"
    ON ai_insights FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI insights"
    ON ai_insights FOR UPDATE
    USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ai_insights_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_ai_insights_updated_at
    BEFORE UPDATE ON ai_insights
    FOR EACH ROW
    EXECUTE FUNCTION update_ai_insights_updated_at(); 