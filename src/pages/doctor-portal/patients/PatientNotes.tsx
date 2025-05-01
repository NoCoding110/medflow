import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Plus, FilePlus } from "lucide-react";
import QuickNoteDialog from "../notes/QuickNoteDialog";
import NewNoteDialog from "../notes/NewNoteDialog";

// Mock function to get patient data
const getPatientById = (id: string) => {
  const patients = [
    {
      id: "1",
      name: "John Smith",
    },
    // Add more patients as needed
  ];
  return patients.find(p => p.id === id);
};

// Mock function to get patient notes
const getPatientNotes = (patientId: string) => {
  const notes = [
    {
      id: "1",
      patientId: "1",
      date: "2025-04-14",
      type: "Progress Note",
      title: "Follow-up Appointment",
      content: "Patient reports improved symptoms. Blood pressure: 120/80. Continue current medications.",
      doctorName: "Dr. Sarah Johnson"
    },
    {
      id: "2",
      patientId: "1",
      date: "2025-03-15",
      type: "Lab Review",
      title: "Blood Work Results",
      content: "Comprehensive metabolic panel reviewed. All values within normal range.",
      doctorName: "Dr. Sarah Johnson"
    },
    // Add more notes as needed
  ];
  return notes.filter(note => note.patientId === patientId);
};

const PatientNotes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isQuickNoteOpen, setIsQuickNoteOpen] = useState(false);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [notes, setNotes] = useState(getPatientNotes(id!));
  
  const patient = getPatientById(id!);

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
    const newNote = {
      id: (notes.length + 1).toString(),
      patientId: id!,
      date: new Date().toISOString().split('T')[0],
      type: data.type,
      title: data.title,
      content: data.content,
      doctorName: "Dr. Sarah Johnson"
    };

    setNotes(prev => [newNote, ...prev]);
  };

  const handleNewNoteSubmit = async (data: any) => {
    const newNote = {
      id: (notes.length + 1).toString(),
      patientId: id!,
      date: new Date().toISOString().split('T')[0],
      type: data.type,
      title: data.title,
      content: `SUBJECTIVE:\n${data.subjective}\n\nOBJECTIVE:\n${data.objective}\n\nASSESSMENT:\n${data.assessment}\n\nPLAN:\n${data.plan}`,
      doctorName: "Dr. Sarah Johnson"
    };

    setNotes(prev => [newNote, ...prev]);
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