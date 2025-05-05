import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Plus, FilePlus } from "lucide-react";
import QuickNoteDialog from "../notes/QuickNoteDialog";
import NewNoteDialog from "../notes/NewNoteDialog";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

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
      const { data: newNotes } = await supabase
        .from("patient_notes")
        .select("*")
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: false });
      setNotes(newNotes || []);
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
      const { data: newNotes } = await supabase
        .from("patient_notes")
        .select("*")
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: false });
      setNotes(newNotes || []);
    } catch (err: any) {
      setNoteError(err.message || "Failed to add note");
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