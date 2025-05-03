import React, { useEffect, useState } from 'react';
import { Sparkles, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface AIInsightsPanelProps {
  patient: { id: string; name: string };
  module: string; // e.g., 'vitals', 'fitness', etc.
  data: any; // The relevant data for the module
}

type Insight = {
  type: 'critical' | 'warning' | 'info' | 'normal';
  title: string;
  description: string;
};

const ICONS = {
  critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  normal: <CheckCircle2 className="h-5 w-5 text-green-500" />,
};

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ patient, module, data }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!patient || !data) return;
    setLoading(true);
    setError(null);

    // Compose a context-aware prompt
    const prompt = `You are a medical AI assistant. Analyze the following ${module} data for patient ${patient.name} and provide 3 actionable insights. Data: ${JSON.stringify(data)}`;

    fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
      .then(res => res.json())
      .then(res => {
        // Expecting res.result to be an array of insights, or parse as needed
        setInsights(res.result || []);
      })
      .catch(() => setError('Failed to load AI insights.'))
      .finally(() => setLoading(false));
  }, [patient, module, data]);

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
            {insights.length > 0 ? insights.map((insight, idx) => (
              <div key={idx} className="p-4 border rounded-lg flex items-start gap-3 bg-muted">
                {ICONS[insight.type] || ICONS.info}
                <div>
                  <h4 className="font-medium">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
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