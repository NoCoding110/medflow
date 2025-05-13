import React from 'react';

interface AIInsightsPanelProps {
  insights?: string[];
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ insights }) => {
  return (
    <div className="border rounded-md p-4 bg-muted">
      <h2 className="font-semibold text-lg mb-2">AI Insights</h2>
      {insights && insights.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {insights.map((insight, idx) => (
            <li key={idx}>{insight}</li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No AI insights available.</p>
      )}
    </div>
  );
};

export default AIInsightsPanel; 