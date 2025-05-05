import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transcript } = req.body;
  if (!transcript) {
    return res.status(400).json({ error: 'Transcript is required' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    // Simulated response if no API key is set
    return res.status(200).json({
      summary: 'Simulated summary of the conversation.',
      diagnoses: ['Simulated diagnosis 1', 'Simulated diagnosis 2'],
      recommendations: ['Simulated recommendation 1', 'Simulated recommendation 2']
    });
  }

  try {
    const prompt = `You are a clinical assistant. Given the following doctor-patient conversation transcript, provide:
- A concise summary
- Possible diagnoses
- Recommendations for next steps

Transcript:
"""
${transcript}
"""`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful clinical assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 512,
        temperature: 0.3,
      }),
    });
    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || '';

    // Simple parsing (could be improved)
    const summaryMatch = aiText.match(/summary:(.*?)(diagnoses:|possible diagnoses:|recommendations:|$)/is);
    const diagnosesMatch = aiText.match(/diagnoses:(.*?)(recommendations:|$)/is);
    const recommendationsMatch = aiText.match(/recommendations:(.*)$/is);

    res.status(200).json({
      summary: summaryMatch ? summaryMatch[1].trim() : '',
      diagnoses: diagnosesMatch ? diagnosesMatch[1].trim().split(/\n|,|-/).map(s => s.trim()).filter(Boolean) : [],
      recommendations: recommendationsMatch ? recommendationsMatch[1].trim().split(/\n|,|-/).map(s => s.trim()).filter(Boolean) : [],
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI suggestions' });
  }
} 