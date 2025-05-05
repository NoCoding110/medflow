import type { VercelRequest, VercelResponse } from '@vercel/node';

// Helper to parse multipart/form-data (for audio upload)
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse the incoming form data
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Failed to parse form data' });
    }
    const audioFile = files.audio as formidable.File;
    if (!audioFile) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    // TODO: Call your transcription provider here
    // Example: send audioFile.filepath to OpenAI Whisper, AssemblyAI, Deepgram, etc.
    // For now, just return a simulated transcription
    // You can use fs.readFileSync(audioFile.filepath) to get the audio buffer

    // Simulated response
    return res.status(200).json({ transcript: 'Simulated transcription of the uploaded audio.' });
  });
} 