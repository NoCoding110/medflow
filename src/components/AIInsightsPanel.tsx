import React, { useEffect, useState } from 'react';
import { Sparkles, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/auth';

interface AIInsightsPanelProps {
  patient: { id: string; name: string };
  module: string;
  data: any;
}

interface Insight {
  id: string;
  type: 'trend' | 'recommendation' | 'risk' | 'alert';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
  created_at: string;
}

const ICONS = {
  critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
  high: <AlertTriangle className="h-5 w-5 text-orange-500" />,
  medium: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  low: <Info className="h-5 w-5 text-blue-500" />,
};

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ patient, module, data }) => {
  const { user } = useAuth();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !patient) return;
    fetchInsights();
  }, [user, patient, module, data]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: insightsData, error: insightsError } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('user_id', user?.id)
        .eq('module', module)
        .order('created_at', { ascending: false })
        .limit(5);

      if (insightsError) throw insightsError;
      setInsights(insightsData || []);
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
      setError('Failed to load AI insights');
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async () => {
    if (!user || !patient || !data) return;

    try {
      const insights: Partial<Insight>[] = [];

      switch (module) {
        case 'fitness':
          if (data.steps < 5000) {
            insights.push({
              type: 'recommendation',
              title: 'Low Activity Level',
              description: `You're below your daily step goal. Consider taking a short walk.`,
              severity: 'medium',
              metadata: { steps: data.steps, goal: 5000 }
            });
          }
          break;

        case 'vitals':
          if (data.heartRate > 100) {
            insights.push({
              type: 'alert',
              title: 'Elevated Heart Rate',
              description: `Your heart rate (${data.heartRate} bpm) is above normal range.`,
              severity: 'high',
              metadata: { heartRate: data.heartRate, normalRange: { min: 60, max: 100 } }
            });
          }
          break;

        case 'mentalHealth':
          if (data.stress > 70) {
            insights.push({
              type: 'risk',
              title: 'High Stress Level',
              description: 'Your stress levels are elevated. Consider practicing mindfulness.',
              severity: 'medium',
              metadata: { stressLevel: data.stress, threshold: 70 }
            });
          }
          break;

        case 'medication':
          if (data.nextDose) {
            insights.push({
              type: 'alert',
              title: 'Upcoming Medication',
              description: `Your next dose is due in ${data.nextDose} minutes.`,
              severity: 'low',
              metadata: { nextDose: data.nextDose, medicationName: data.medicationName }
            });
          }
          break;
      }

      if (insights.length > 0) {
        const { error: insertError } = await supabase
          .from('ai_insights')
          .insert(insights.map(insight => ({
            ...insight,
            user_id: user.id,
            module,
            patient_id: patient.id
          })));

        if (insertError) throw insertError;
        await fetchInsights();
      }
    } catch (error) {
      console.error('Failed to generate AI insights:', error);
      setError('Failed to generate AI insights');
    }
  };

  useEffect(() => {
    generateInsights();
  }, [module, data]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Insights
        </CardTitle>
        <CardDescription>Smart analysis and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <div>Loading AI insights...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <div className="space-y-4">
            {insights.length > 0 ? insights.map((insight) => (
              <div key={insight.id} className="p-4 border rounded-lg flex items-start gap-3 bg-muted">
                {ICONS[insight.severity] || ICONS.low}
                <div>
                  <h4 className="font-medium">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  {insight.metadata && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {Object.entries(insight.metadata).map(([key, value]) => (
                        <div key={key}>
                          {key}: {JSON.stringify(value)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-muted-foreground">No AI insights available.</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel; 