
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Plus, FilePlus } from "lucide-react";

// Sample note templates
const noteTemplates = [
  { id: "1", name: "General Checkup", specialty: "Primary Care", fields: ["Chief Complaint", "History", "Physical Examination", "Assessment", "Plan"] },
  { id: "2", name: "Follow-up Visit", specialty: "Primary Care", fields: ["Progress", "Current Symptoms", "Medications", "Plan"] },
  { id: "3", name: "Cardiology Assessment", specialty: "Cardiology", fields: ["Cardiovascular History", "Exam Findings", "EKG Results", "Assessment", "Treatment Plan"] },
  { id: "4", name: "Dermatology Exam", specialty: "Dermatology", fields: ["Skin Findings", "Biopsy Results", "Diagnosis", "Treatment"] },
  { id: "5", name: "Mental Health Session", specialty: "Psychiatry", fields: ["Mood", "Sleep", "Medication Response", "Therapy Notes", "Plan"] },
];

// Sample recent notes
const recentNotes = [
  { id: "1", patientName: "John Smith", patientId: "12345", date: "2025-04-26", type: "Progress Note", title: "Follow-up Appointment" },
  { id: "2", patientName: "Emily Johnson", patientId: "23456", date: "2025-04-26", type: "Initial Assessment", title: "New Patient Visit" },
  { id: "3", patientName: "Michael Brown", patientId: "34567", date: "2025-04-25", type: "Progress Note", title: "Medication Review" },
  { id: "4", patientName: "Sarah Davis", patientId: "45678", date: "2025-04-25", type: "Lab Review", title: "Blood Work Results" },
  { id: "5", patientName: "Robert Wilson", patientId: "56789", date: "2025-04-24", type: "Progress Note", title: "Chronic Condition Management" },
];

const DoctorNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  
  const filteredNotes = recentNotes.filter(note => 
    note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTemplate = noteTemplates.find(template => template.id === selectedTemplateId);

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Clinical Documentation</h1>
        <div className="flex space-x-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FilePlus className="mr-2 h-4 w-4" /> Quick Note
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> New Note
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent Notes</TabsTrigger>
          <TabsTrigger value="templates">Note Templates</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Clinical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search notes by patient name or content..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="bg-muted/50 p-3 grid grid-cols-12 gap-3 font-medium">
                  <div className="col-span-3">Patient</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-4">Title</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {filteredNotes.map((note) => (
                  <div key={note.id} className="p-3 grid grid-cols-12 gap-3 items-center border-t">
                    <div className="col-span-3">
                      <div className="font-medium">{note.patientName}</div>
                      <div className="text-xs text-muted-foreground">ID: {note.patientId}</div>
                    </div>
                    <div className="col-span-2">{new Date(note.date).toLocaleDateString()}</div>
                    <div className="col-span-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        note.type === 'Initial Assessment' ? 'bg-blue-100 text-blue-800' : 
                        note.type === 'Lab Review' ? 'bg-green-100 text-green-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {note.type}
                      </span>
                    </div>
                    <div className="col-span-4">{note.title}</div>
                    <div className="col-span-1">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredNotes.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No notes found matching your search criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Note Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {noteTemplates.map((template) => (
                      <div 
                        key={template.id} 
                        className={`p-3 rounded-md cursor-pointer ${
                          selectedTemplateId === template.id ? 'bg-purple-100 border border-purple-300' : 'hover:bg-muted'
                        }`}
                        onClick={() => setSelectedTemplateId(template.id)}
                      >
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">Specialty: {template.specialty}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    {selectedTemplate ? selectedTemplate.name : "Template Preview"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTemplate ? (
                    <div className="space-y-4">
                      {selectedTemplate.fields.map((field, index) => (
                        <div key={index} className="space-y-2">
                          <label className="font-medium">{field}</label>
                          <textarea 
                            className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background" 
                            placeholder={`Enter ${field.toLowerCase()} details...`}
                          ></textarea>
                        </div>
                      ))}
                      <div className="pt-4">
                        <Button className="bg-purple-600 hover:bg-purple-700 mr-2">Save Template</Button>
                        <Button variant="outline">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Select a template from the left to preview and use it</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Draft Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-muted-foreground">You have no saved drafts.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorNotes;
