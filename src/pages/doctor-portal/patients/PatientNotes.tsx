import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Plus, FilePlus } from "lucide-react";
import QuickNoteDialog from "../notes/QuickNoteDialog";
import NewNoteDialog from "../notes/NewNoteDialog";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";
import AudioRecorderComponent from '@/components/AudioRecorder';
import { toast } from "@/components/ui/use-toast";

const PatientNotes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patient, setPatient] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(false);
  const [isQuickNoteOpen, setIsQuickNoteOpen] = useState(false);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [noteError, setNoteError] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [transcribing, setTranscribing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)
        .single();
      setPatient(data);
      setLoading(false);
    };
    if (id) fetchPatient();
  }, [id]);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      // First get the doctor's ID from the doctors table
      const { data: doctorData, error: doctorError } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (doctorError) throw doctorError;
      if (!doctorData) throw new Error('Doctor profile not found');

      const { data, error } = await supabase
        .from('doctor_notes')
        .select('*')
        .eq('doctor_id', doctorData.id)
        .eq('patient_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch notes. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }, [id, user?.id, toast]);

  useEffect(() => {
    if (id) fetchNotes();
  }, [id, fetchNotes]);

  if (loading) return <div>Loading...</div>;
  if (!patient) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-800">Patient Not Found</h2>
          <p className="mt-2 text-navy-600">The requested patient could not be found.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/doctor/patients")}
          >
            Return to Patient List
          </Button>
        </div>
      </div>
    );
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuickNoteSubmit = async (data: any) => {
    setNoteError(null);
    try {
      const { error } = await supabase.from("patient_notes").insert({
        patient_id: patient.id,
        doctor_id: user?.id,
        doctor_name: user?.name || user?.email || "Unknown",
        title: data.title,
        content: data.content,
        type: data.type,
        created_at: new Date().toISOString()
      });
      if (error) throw error;
      // Refresh notes
      fetchNotes();
    } catch (err: any) {
      setNoteError(err.message || "Failed to add note");
    }
  };

  const handleNewNoteSubmit = async (data: any) => {
    setNoteError(null);
    try {
      const { error } = await supabase.from("patient_notes").insert({
        patient_id: patient.id,
        doctor_id: user?.id,
        doctor_name: user?.name || user?.email || "Unknown",
        title: data.title,
        content: `SUBJECTIVE:\n${data.subjective}\n\nOBJECTIVE:\n${data.objective}\n\nASSESSMENT:\n${data.assessment}\n\nPLAN:\n${data.plan}`,
        type: data.type,
        created_at: new Date().toISOString()
      });
      if (error) throw error;
      // Refresh notes
      fetchNotes();
    } catch (err: any) {
      setNoteError(err.message || "Failed to add note");
    }
  };

  const handleTranscribeAudio = async () => {
    if (!audioBlob) return;
    setTranscribing(true);
    setNoteError(null);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to transcribe audio');
      const data = await response.json();
      setTranscribedText(data.transcript || '');
      setTranscribing(false);
    } catch (err: any) {
      setNoteError('Failed to transcribe audio');
      setTranscribing(false);
    }
  };

  const handleGetAISuggestions = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiSuggestions(null);
    try {
      const response = await fetch('/api/ai-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcribedText }),
      });
      if (!response.ok) throw new Error('Failed to get AI suggestions');
      const data = await response.json();
      setAiSuggestions(data);
    } catch (err: any) {
      setAiError('Failed to get AI suggestions');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      // First get the doctor's ID from the doctors table
      const { data: doctorData, error: doctorError } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (doctorError) throw doctorError;
      if (!doctorData) throw new Error('Doctor profile not found');

      const { error } = await supabase
        .from('doctor_notes')
        .insert([
          {
            doctor_id: doctorData.id,
            patient_id: id,
            content: newNote,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setNewNote('');
      fetchNotes();
      toast({
        title: "Success",
        description: "Note added successfully.",
      });
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add note. Please try again later.",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(`/doctor/patients/${id}/profile`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patient Profile
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-navy-800">Clinical Notes</h1>
            <p className="text-navy-600">Patient: {patient.name}</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button 
              variant="outline"
              onClick={() => setIsQuickNoteOpen(true)}
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Quick Note
            </Button>
            <Button 
              onClick={() => setIsNewNoteOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Record Conversation (AI-powered)</CardTitle>
        </CardHeader>
        <CardContent>
          <AudioRecorderComponent onRecordingComplete={setAudioBlob} />
          {audioBlob && (
            <div className="mt-4 space-y-2">
              <Button onClick={handleTranscribeAudio} disabled={transcribing}>
                {transcribing ? 'Transcribing...' : 'Transcribe Audio'}
              </Button>
              {transcribedText && (
                <div className="mt-2 space-y-2">
                  <label className="block text-sm font-medium mb-1">Transcribed Text (editable)</label>
                  <textarea
                    className="w-full border rounded p-2"
                    rows={4}
                    value={transcribedText}
                    onChange={e => setTranscribedText(e.target.value)}
                  />
                  <Button onClick={handleGetAISuggestions} disabled={aiLoading || !transcribedText}>
                    {aiLoading ? 'Getting AI Suggestions...' : 'Get AI Suggestions'}
                  </Button>
                  {aiError && <div className="text-red-600 text-sm">{aiError}</div>}
                  {aiSuggestions && (
                    <div className="mt-4 p-3 border rounded bg-muted">
                      <div className="mb-2"><strong>Summary:</strong> {aiSuggestions.summary}</div>
                      <div className="mb-2"><strong>Possible Diagnoses:</strong> {aiSuggestions.diagnoses?.join(', ')}</div>
                      <div className="mb-2"><strong>Recommendations:</strong> {aiSuggestions.recommendations?.join(', ')}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>
                    {new Date(note.date).toLocaleDateString()} by {note.doctorName}
                  </CardDescription>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  note.type === 'Lab Review' ? 'bg-green-100 text-green-800' : 
                  'bg-purple-100 text-purple-800'
                }`}>
                  {note.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{note.content}</p>
            </CardContent>
          </Card>
        ))}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12 bg-navy-50/30 rounded-lg">
            <p className="text-navy-600">No notes found matching your search criteria.</p>
          </div>
        )}
      </div>

      <QuickNoteDialog
        open={isQuickNoteOpen}
        onClose={() => setIsQuickNoteOpen(false)}
        onSubmit={handleQuickNoteSubmit}
      />

      <NewNoteDialog
        open={isNewNoteOpen}
        onClose={() => setIsNewNoteOpen(false)}
        onSubmit={handleNewNoteSubmit}
        patients={[{ id: id!, name: patient.name }]}
      />
    </div>
  );
};

export default PatientNotes; 