import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, FileText, Pill, Activity, Phone } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    // TODO: Replace with real doctor info from auth context
    const doctor_id = "doctor-1";
    const doctor_name = "Dr. Sarah Johnson";
    const { error } = await supabase.from("patient_notes").insert({
      patient_id: id,
      doctor_id,
      doctor_name,
      title: noteForm.title,
      content: noteForm.content,
      type: noteForm.type,
    });
    if (error) {
      setNoteError("Failed to add note");
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
            <h1 className="text-3xl font-bold tracking-tight text-navy-800">{patient.first_name} {patient.last_name}</h1>
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
              <p className="font-medium">{patient.date_of_birth}</p>
            </div>
            <div>
              <p className="text-sm text-navy-600">Gender</p>
              <p className="font-medium">{patient.gender}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-navy-600">Phone</p>
            <p className="font-medium">{patient.phone_number}</p>
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

      {/* Add Note Form */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNoteSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input name="title" value={noteForm.title} onChange={handleNoteChange} required disabled={noteSubmitting} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select name="type" value={noteForm.type} onChange={handleNoteChange} className="w-full border rounded-md p-2" disabled={noteSubmitting}>
                <option value="Progress">Progress</option>
                <option value="Lab">Lab</option>
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <Textarea name="content" value={noteForm.content} onChange={handleNoteChange} required disabled={noteSubmitting} />
            </div>
            {noteError && <div className="text-red-600 text-sm">{noteError}</div>}
            <Button type="submit" disabled={noteSubmitting}>
              {noteSubmitting ? 'Saving...' : 'Add Note'}
            </Button>
          </form>
        </CardContent>
      </Card>

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