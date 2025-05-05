import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, FileText, Pill, Activity, Phone } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import QuickNoteDialog from '../notes/QuickNoteDialog';
import AudioRecorderComponent from '@/components/AudioRecorder';
import { toast } from "@/components/ui/use-toast";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<any[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteForm, setNoteForm] = useState({ title: '', content: '', type: 'Progress' });
  const [noteSubmitting, setNoteSubmitting] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);
  const { user } = useAuth();
  const [isQuickNoteOpen, setIsQuickNoteOpen] = useState(false);
  const [isVoiceNoteOpen, setIsVoiceNoteOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatientData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Get the doctor's ID from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user?.id)
        .eq('role', 'doctor')
        .single();

      if (userError) throw userError;
      if (!userData) throw new Error('Doctor profile not found');

      const { data, error } = await supabase
        .from('patients')
        .select(`
          *,
          users (
            id,
            email,
            first_name,
            last_name
          )
        `)
        .eq('doctor_id', userData.id)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Patient not found');

      setPatient({
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.users?.email || '',
        phone: data.phone,
        address: data.address,
        dateOfBirth: data.date_of_birth,
        gender: data.gender,
        bloodType: data.blood_type,
        height: data.height,
        weight: data.weight,
        allergies: data.allergies || [],
        medications: data.medications || [],
        conditions: data.conditions || [],
        lastVisit: data.last_visit,
        nextAppointment: data.next_appointment
      });
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setError('Failed to fetch patient data. Please try again later.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch patient data. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id, id, toast]);

  useEffect(() => {
    if (id) fetchPatientData();
  }, [id, fetchPatientData]);

  useEffect(() => {
    const fetchNotes = async () => {
      setNotesLoading(true);
      const { data, error } = await supabase
        .from("patient_notes")
        .select("*")
        .eq("patient_id", id)
        .order("created_at", { ascending: false });
      if (!error) setNotes(data || []);
      setNotesLoading(false);
    };
    if (id) fetchNotes();
  }, [id]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNoteForm({ ...noteForm, [e.target.name]: e.target.value });
  };

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoteSubmitting(true);
    setNoteError(null);
    const doctor_id = user?.id;
    const doctor_name = user?.name || user?.email || "Unknown";
    const { error } = await supabase.from("patient_notes").insert({
      patient_id: id,
      doctor_id,
      doctor_name,
      title: noteForm.title,
      content: noteForm.content,
      type: noteForm.type,
      created_at: new Date().toISOString()
    });
    if (error) {
      setNoteError(error.message || "Failed to add note");
    } else {
      setNoteForm({ title: '', content: '', type: 'Progress' });
      // Refresh notes
      const { data } = await supabase
        .from("patient_notes")
        .select("*")
        .eq("patient_id", id)
        .order("created_at", { ascending: false });
      setNotes(data || []);
    }
    setNoteSubmitting(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!patient) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-800">Patient Not Found</h2>
          <p className="mt-2 text-navy-600">The requested patient profile could not be found.</p>
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

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/doctor/patients")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patient List
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-navy-800">{patient.firstName} {patient.lastName}</h1>
            <p className="text-navy-600">Patient ID: {patient.id}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/doctor/patients/${id}/notes`)}
            >
              <FileText className="mr-2 h-4 w-4" />
              View Notes
            </Button>
            <Button
              onClick={() => navigate(`/doctor/appointments/new?patientId=${id}`)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-navy-600">Date of Birth</p>
              <p className="font-medium">{patient.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-navy-600">Gender</p>
              <p className="font-medium">{patient.gender}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-navy-600">Phone</p>
            <p className="font-medium">{patient.phone}</p>
          </div>
          <div>
            <p className="text-sm text-navy-600">Email</p>
            <p className="font-medium">{patient.email}</p>
          </div>
          <div>
            <p className="text-sm text-navy-600">Address</p>
            <p className="font-medium">{patient.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Note Options */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => setIsQuickNoteOpen(true)}>
              Quick Note
            </Button>
            <Button onClick={() => setIsVoiceNoteOpen(true)} variant="secondary">
              AI-Powered Voice Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Note Dialog */}
      <QuickNoteDialog
        open={isQuickNoteOpen}
        onClose={() => setIsQuickNoteOpen(false)}
        onSubmit={async (data: any) => {
          // Implement quick note submission logic here (similar to handleQuickNoteSubmit)
          // Optionally refresh notes after submission
          setIsQuickNoteOpen(false);
        }}
      />

      {/* AI-Powered Voice Note Dialog */}
      {isVoiceNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsVoiceNoteOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">AI-Powered Voice Note</h2>
            {/* You can reuse the AudioRecorderComponent and AI workflow here, or extract it to a separate component for reuse */}
            <AudioRecorderComponent onRecordingComplete={() => {}} />
            {/* TODO: Add the rest of the AI workflow UI here, or extract from PatientNotes */}
          </div>
        </div>
      )}

      {/* Notes List */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Clinical Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {notesLoading ? (
            <div>Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="text-muted-foreground">No notes for this patient yet.</div>
          ) : (
            <div className="space-y-4">
              {notes.map(note => (
                <div key={note.id} className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{note.title}</div>
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-xs">{note.type}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {new Date(note.created_at).toLocaleDateString()} by {note.doctor_name}
                  </div>
                  <div className="mt-2 whitespace-pre-line text-sm">{note.content}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile; 