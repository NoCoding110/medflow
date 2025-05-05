-- Add user_id column to ai_insights for RLS and user-specific queries
ALTER TABLE ai_insights
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE; 