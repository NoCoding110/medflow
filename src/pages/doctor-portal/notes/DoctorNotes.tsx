import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Plus, FilePlus, Brain, AlertCircle, BarChart2, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickNoteDialog from "./QuickNoteDialog";
import NewNoteDialog from "./NewNoteDialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Sample note templates
const noteTemplates = [
  { id: "1", name: "General Checkup", specialty: "Primary Care", fields: ["Chief Complaint", "History", "Physical Examination", "Assessment", "Plan"] },
  { id: "2", name: "Follow-up Visit", specialty: "Primary Care", fields: ["Progress", "Current Symptoms", "Medications", "Plan"] },
  { id: "3", name: "Cardiology Assessment", specialty: "Cardiology", fields: ["Cardiovascular History", "Exam Findings", "EKG Results", "Assessment", "Treatment Plan"] },
  { id: "4", name: "Dermatology Exam", specialty: "Dermatology", fields: ["Skin Findings", "Biopsy Results", "Diagnosis", "Treatment"] },
  { id: "5", name: "Mental Health Session", specialty: "Psychiatry", fields: ["Mood", "Sleep", "Medication Response", "Therapy Notes", "Plan"] },
];

// Sample patients data
const patients = [
  { id: "P1001", name: "John Smith" },
  { id: "P1002", name: "Emily Johnson" },
  { id: "P1003", name: "Michael Brown" },
  { id: "P1004", name: "Sarah Davis" },
  { id: "P1005", name: "Robert Wilson" },
];

interface Note {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  type: string;
  title: string;
  content: string;
  doctorName: string;
}

interface Analytics {
  total: number;
  recent: number;
  drafts: number;
  trends: {
    notes: 'up' | 'down';
    drafts: 'up' | 'down';
  };
}

interface AIInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  patientName?: string;
}

interface Alert {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  patientName?: string;
}

const DoctorNotes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isQuickNoteOpen, setIsQuickNoteOpen] = useState(false);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState({
    notes: false,
    analytics: false,
    insights: false,
    alerts: false
  });
  
  // Fetch notes
  const fetchNotes = useCallback(async () => {
    setLoading(l => ({ ...l, notes: true }));
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      const res = await fetch(`/api/notes?${params.toString()}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch notes');
      setNotes(await res.json());
    } catch (error) {
      toast.error('Failed to load notes');
    } finally {
      setLoading(l => ({ ...l, notes: false }));
    }
  }, [searchTerm]);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    setLoading(l => ({ ...l, analytics: true }));
    try {
      const res = await fetch('/api/notes/analytics', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch analytics');
      setAnalytics(await res.json());
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(l => ({ ...l, analytics: false }));
    }
  }, []);

  // Fetch AI insights
  const fetchAiInsights = useCallback(async () => {
    setLoading(l => ({ ...l, insights: true }));
    try {
      const res = await fetch('/api/notes/insights/ai', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch AI insights');
      setAiInsights(await res.json());
    } catch (error) {
      toast.error('Failed to load AI insights');
    } finally {
      setLoading(l => ({ ...l, insights: false }));
    }
  }, []);

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    setLoading(l => ({ ...l, alerts: true }));
    try {
      const res = await fetch('/api/notes/alerts', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch alerts');
      setAlerts(await res.json());
    } catch (error) {
      toast.error('Failed to load alerts');
    } finally {
      setLoading(l => ({ ...l, alerts: false }));
    }
  }, []);

  useEffect(() => {
    fetchNotes();
    fetchAnalytics();
    fetchAiInsights();
    fetchAlerts();
  }, [fetchNotes, fetchAnalytics, fetchAiInsights, fetchAlerts]);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  const selectedTemplate = noteTemplates.find(template => template.id === selectedTemplateId);

  const handleQuickNoteSubmit = async (data: any) => {
    // In a real app, this would POST to the backend
    const newNote = {
      id: (notes.length + 1).toString(),
      patientName: "Quick Note",
      patientId: "N/A",
      date: new Date().toISOString().split('T')[0],
      type: data.type,
      title: data.title,
      content: data.content,
      doctorName: "Dr. Sarah Johnson"
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleNewNoteSubmit = async (data: any) => {
    // In a real app, this would POST to the backend
    const newNote = {
      id: (notes.length + 1).toString(),
      patientName: data.patientName,
      patientId: data.patientId,
      date: new Date().toISOString().split('T')[0],
      type: data.type,
      title: data.title,
      content: `SUBJECTIVE:\n${data.subjective}\n\nOBJECTIVE:\n${data.objective}\n\nASSESSMENT:\n${data.assessment}\n\nPLAN:\n${data.plan}`,
      doctorName: "Dr. Sarah Johnson"
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleViewNote = (noteId: string) => {
    toast.info("Viewing note details - This would open the full note view");
  };

  const handleSaveTemplate = async () => {
    if (!selectedTemplate) return;
    toast.success("Template saved successfully");
    setSelectedTemplateId(null);
  };

  return (
    <div className="container py-8">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-purple-600" />
              Total Notes
            </CardTitle>
            <CardDescription>Total clinical notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.total || 0}</div>
              <Badge variant="outline" className="text-purple-600">
                {analytics?.trends.notes === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-purple-600" />
              Recent
            </CardTitle>
            <CardDescription>Notes in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.recent || 0}</div>
              <Badge variant="outline">Recent</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-purple-600" />
              Drafts
            </CardTitle>
            <CardDescription>Unfinished notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{analytics?.drafts || 0}</div>
              <Badge variant={analytics?.trends.drafts === 'up' ? 'default' : 'destructive'}>
                {analytics?.trends.drafts === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-600" />
              AI Insights
            </CardTitle>
            <CardDescription>Smart documentation recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full ${
                      insight.severity === 'high' ? 'bg-red-100 text-red-700' :
                      insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    } flex items-center justify-center`}>
                      <Brain className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      {insight.patientName && (
                        <Badge variant="outline" className="mt-2">
                          {insight.patientName}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-purple-600" />
              Critical Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    } flex items-center justify-center`}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      {alert.patientName && (
                        <Badge variant="outline" className="mt-2">
                          {alert.patientName}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-navy-800">Clinical Documentation</h1>
          <div className="w-16 h-1 bg-lightblue-400 rounded-full"></div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setIsQuickNoteOpen(true)}
          >
            <FilePlus className="mr-2 h-4 w-4" /> Quick Note
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setIsNewNoteOpen(true)}
          >
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
                  <div 
                    key={note.id} 
                    className="p-3 grid grid-cols-12 gap-3 items-center border-t hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleViewNote(note.id)}
                  >
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
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewNote(note.id);
                        }}
                      >
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
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
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
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white mr-2"
                          onClick={handleSaveTemplate}
                        >
                          Save Template
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setSelectedTemplateId(null)}
                        >
                          Cancel
                        </Button>
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

      <QuickNoteDialog
        open={isQuickNoteOpen}
        onClose={() => setIsQuickNoteOpen(false)}
        onSubmit={handleQuickNoteSubmit}
      />

      <NewNoteDialog
        open={isNewNoteOpen}
        onClose={() => setIsNewNoteOpen(false)}
        onSubmit={handleNewNoteSubmit}
        patients={patients}
      />
    </div>
  );
};

export default DoctorNotes;
