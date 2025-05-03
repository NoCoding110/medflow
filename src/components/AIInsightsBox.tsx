import React, { useState } from 'react';

const AIInsightsBox: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskAI = async () => {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result);
      }
    } catch (err: any) {
      setError('Failed to get AI response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 p-4 border rounded bg-muted">
      <h3 className="font-semibold mb-2">AI Insights</h3>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ask the AI for insights..."
        />
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handleAskAI}
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {result && <div className="bg-white p-2 rounded border mt-2"><strong>AI:</strong> {result}</div>}
    </div>
  );
};

export default AIInsightsBox; 