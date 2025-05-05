import React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Button } from '@/components/ui/button';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const AudioRecorderComponent: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  // react-audio-voice-recorder handles recording UI and logic
  return (
    <div className="space-y-2">
      <AudioRecorder
        onRecordingComplete={(audio) => onRecordingComplete(audio)}
        audioTrackConstraints={{ noiseSuppression: true, echoCancellation: true }}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
      />
    </div>
  );
};

export default AudioRecorderComponent; 