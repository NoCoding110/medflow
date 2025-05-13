/** @jsxImportSource react */
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Search, Thermometer, Heart, Activity, Clock, User, Upload, Mic, BookOpen, FileText, Bell, Target, AlertTriangle, Phone, Calendar, Download, Save, RefreshCw, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { aiService, AIMessage, AIAnalysisResult, AIPathologyResult, AILiteratureResult } from "@/services/ai-service";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportData, importData, createBackup, restoreBackup, syncWithBackend } from '@/lib/data-management';
import { TestDataInitializer } from '@/components/TestDataInitializer';
import { debounce } from 'lodash';

interface HealthMetric {
  type: 'heartRate' | 'bloodPressure' | 'bloodSugar' | 'temperature';
  value: number;
  unit: string;
  timestamp: Date;
  status: 'normal' | 'warning' | 'critical';
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  nextDose: Date;
  notes?: string;
}

interface Symptom {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  notes?: string;
}

interface HealthGoal {
  title: string;
  target: string;
  progress: number;
  deadline: Date;
  status: 'in-progress' | 'completed' | 'at-risk';
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

const PatientHealthAssistant = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importFileInputRef = useRef<HTMLInputElement>(null);

  // Memoize the storage keys to prevent unnecessary re-renders
  const storageKeys = useMemo(() => ({
    MESSAGES: 'ai_messages',
    HEALTH_METRICS: 'health_metrics',
    MEDICATIONS: 'medications',
    SYMPTOMS: 'symptoms',
    HEALTH_GOALS: 'health_goals',
    EMERGENCY_CONTACTS: 'emergency_contacts',
  }), []);

  // Custom hook for localStorage state management
  const useLocalStorageState = <T,>(key: string, initialValue: T) => {
    const [state, setState] = useState<T>(() => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return initialValue;
      }
    });

    const setStateAndStorage = useCallback((value: T | ((prev: T) => T)) => {
      setState(prev => {
        const nextValue = value instanceof Function ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(nextValue));
        } catch (error) {
          console.error(`Error saving ${key} to localStorage:`, error);
        }
        return nextValue;
      });
    }, [key]);

    return [state, setStateAndStorage] as const;
  };

  // Initialize state with persisted data using the custom hook
  const [messages, setMessages] = useLocalStorageState<AIMessage[]>(storageKeys.MESSAGES, [{
    role: "assistant",
    content: "Hello! I'm your AI Health Assistant. How can I help you today?",
    timestamp: new Date(),
  }]);

  const [healthMetrics, setHealthMetrics] = useLocalStorageState<HealthMetric[]>(storageKeys.HEALTH_METRICS, []);
  const [medications, setMedications] = useLocalStorageState<Medication[]>(storageKeys.MEDICATIONS, []);
  const [symptoms, setSymptoms] = useLocalStorageState<Symptom[]>(storageKeys.SYMPTOMS, []);
  const [healthGoals, setHealthGoals] = useLocalStorageState<HealthGoal[]>(storageKeys.HEALTH_GOALS, []);
  const [emergencyContacts, setEmergencyContacts] = useLocalStorageState<EmergencyContact[]>(storageKeys.EMERGENCY_CONTACTS, []);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | AIPathologyResult | null>(null);
  const [literatureResults, setLiteratureResults] = useState<AILiteratureResult[]>([]);
  const [carePathway, setCarePathway] = useState<any>(null);
  
  // New state variables for enhanced features
  const [showAddMetric, setShowAddMetric] = useState(false);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Debounce tab changes to prevent rapid state updates
  const debouncedSetActiveTab = useMemo(
    () => debounce((tab: string) => setActiveTab(tab), 100),
    []
  );

  // Handle sending messages with optimistic updates
  const handleSendMessage = useCallback(async (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage: AIMessage = {
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    };

    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await aiService.sendMessage(messageToSend, 'patient-health');
      setMessages(prev => [...prev, response]);
    } catch (error) {
      // Revert optimistic update on error
      setMessages(prev => prev.filter(msg => msg !== userMessage));
      addToast({ type: 'error', title: 'Error', description: 'Failed to get response from AI assistant. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, setMessages, addToast]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleTabChange = useCallback((value: string) => {
    debouncedSetActiveTab(value);
  }, [debouncedSetActiveTab]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      let result;
      if (file.name.endsWith('.ecg')) {
        result = await aiService.analyzeECG(file);
      } else if (file.name.endsWith('.mri')) {
        result = await aiService.analyzeBrainMRI(file);
      } else {
        result = await aiService.analyzePathology(file);
      }
      setAnalysisResult(result);
      handleTabChange('analysis');
    } catch (error) {
      addToast({ type: 'error', title: 'Error', description: 'Failed to analyze the file. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [handleTabChange, addToast]);

  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      addToast({ type: 'error', title: 'Error', description: 'Voice input is not supported in your browser.' });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      handleSendMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      addToast({ type: 'error', title: 'Error', description: 'Failed to recognize speech. Please try again.' });
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleLiteratureSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await aiService.searchLiterature(query);
      setLiteratureResults(results);
      handleTabChange('literature');
    } catch (error) {
      addToast({ type: 'error', title: 'Error', description: 'Failed to search medical literature. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCarePathwayAnalysis = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const result = await aiService.analyzeCarePathway(user.id);
      setCarePathway(result);
      handleTabChange('care-pathway');
    } catch (error) {
      addToast({ type: 'error', title: 'Error', description: 'Failed to analyze care pathway. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // New handlers for enhanced features
  const handleAddHealthMetric = (metric: Omit<HealthMetric, 'status'>) => {
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    switch (metric.type) {
      case 'heartRate':
        if (metric.value < 60 || metric.value > 100) status = 'warning';
        if (metric.value < 50 || metric.value > 120) status = 'critical';
        break;
      case 'bloodPressure':
        const [systolic, diastolic] = metric.value.toString().split('/').map(Number);
        if (systolic > 140 || diastolic > 90) status = 'warning';
        if (systolic > 160 || diastolic > 100) status = 'critical';
        break;
      case 'bloodSugar':
        if (metric.value < 70 || metric.value > 180) status = 'warning';
        if (metric.value < 50 || metric.value > 250) status = 'critical';
        break;
      case 'temperature':
        if (metric.value > 37.5) status = 'warning';
        if (metric.value > 38.5) status = 'critical';
        break;
    }

    const newMetric: HealthMetric = {
      ...metric,
      status,
      timestamp: new Date(),
    };

    const updatedMetrics = [...healthMetrics, newMetric];
    setHealthMetrics(updatedMetrics);
    localStorage.setItem(storageKeys.HEALTH_METRICS, JSON.stringify(updatedMetrics));
    setShowAddMetric(false);

    if (status === 'critical') {
      addToast({ type: 'error', title: 'Critical Health Metric', description: `Your ${metric.type} reading is critical. Please consult a healthcare provider.` });
    }
  };

  const handleAddMedication = (medication: Medication) => {
    const updatedMeds = [...medications, medication];
    setMedications(updatedMeds);
    localStorage.setItem(storageKeys.MEDICATIONS, JSON.stringify(updatedMeds));
    setShowAddMedication(false);

    const timeUntilNextDose = medication.nextDose.getTime() - Date.now();
    if (timeUntilNextDose > 0) {
      setTimeout(() => {
        addToast({ type: 'success', title: 'Medication Reminder', description: `Time to take ${medication.name} (${medication.dosage})` });
      }, timeUntilNextDose);
    }
  };

  const handleAddSymptom = (symptom: Symptom) => {
    const updatedSymptoms = [...symptoms, symptom];
    setSymptoms(updatedSymptoms);
    localStorage.setItem(storageKeys.SYMPTOMS, JSON.stringify(updatedSymptoms));
    setShowAddSymptom(false);

    if (symptom.severity === 'severe') {
      addToast({ type: 'error', title: 'Severe Symptom Alert', description: `Your symptom "${symptom.name}" is severe. Please seek medical attention.` });
    }
  };

  const handleAddHealthGoal = (goal: Omit<HealthGoal, 'status'>) => {
    const newGoal: HealthGoal = {
      ...goal,
      status: 'in-progress',
    };

    const updatedGoals = [...healthGoals, newGoal];
    setHealthGoals(updatedGoals);
    localStorage.setItem(storageKeys.HEALTH_GOALS, JSON.stringify(updatedGoals));
    setShowAddGoal(false);
  };

  const handleAddEmergencyContact = (contact: EmergencyContact) => {
    const updatedContacts = contact.isPrimary
      ? emergencyContacts.map(c => ({ ...c, isPrimary: false })).concat(contact)
      : [...emergencyContacts, contact];
    
    setEmergencyContacts(updatedContacts);
    localStorage.setItem(storageKeys.EMERGENCY_CONTACTS, JSON.stringify(updatedContacts));
    setShowAddContact(false);
  };

  const handleUpdateGoalProgress = (goalIndex: number, progress: number) => {
    const updatedGoals = [...healthGoals];
    updatedGoals[goalIndex] = {
      ...updatedGoals[goalIndex],
      progress,
      status: progress >= 100 ? 'completed' : progress < 30 ? 'at-risk' : 'in-progress',
    };
    
    setHealthGoals(updatedGoals);
    localStorage.setItem(storageKeys.HEALTH_GOALS, JSON.stringify(updatedGoals));
  };

  // Effect to check for upcoming medication doses
  useEffect(() => {
    const checkMedications = () => {
      const now = new Date();
      medications.forEach(med => {
        const timeUntilNext = med.nextDose.getTime() - now.getTime();
        if (timeUntilNext > 0 && timeUntilNext <= 1800000) { // 30 minutes
          addToast({ type: 'success', title: 'Upcoming Medication', description: `${med.name} (${med.dosage}) is due in ${Math.round(timeUntilNext / 60000)} minutes` });
        }
      });
    };

    const interval = setInterval(checkMedications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [medications, addToast]);

  // Effect to clean up old health metrics (keep last 30 days)
  useEffect(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const updatedMetrics = healthMetrics.filter(
      metric => new Date(metric.timestamp) > thirtyDaysAgo
    );

    if (updatedMetrics.length !== healthMetrics.length) {
      setHealthMetrics(updatedMetrics);
      localStorage.setItem(storageKeys.HEALTH_METRICS, JSON.stringify(updatedMetrics));
    }
  }, [healthMetrics]);

  const suggestedQuestions = [
    "What does my blood pressure reading mean?",
    "When is my next appointment?",
    "How can I improve my sleep quality?",
    "What are my current medications?",
    "What should I eat to help lower my cholesterol?",
    "How many steps should I be taking daily?",
  ];

  const handleExportData = () => {
    exportData();
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importData(file);
    if (result.success) {
      addToast({ type: 'success', title: 'Success', description: 'Data imported successfully' });
      // Refresh the page to show imported data
      window.location.reload();
    } else {
      addToast({ type: 'error', title: 'Error', description: result.error || 'Failed to import data' });
    }
  };

  const handleCreateBackup = async () => {
    if (!user?.id) return;
    
    setIsBackingUp(true);
    const result = await createBackup(user.id);
    setIsBackingUp(false);

    if (result.success) {
      addToast({ type: 'success', title: 'Success', description: 'Backup created successfully' });
    } else {
      addToast({ type: 'error', title: 'Error', description: result.error || 'Failed to create backup' });
    }
  };

  const handleRestoreBackup = async (backupId: string) => {
    const result = await restoreBackup(backupId);
    if (result.success) {
      addToast({ type: 'success', title: 'Success', description: 'Backup restored successfully' });
      // Refresh the page to show restored data
      window.location.reload();
    } else {
      addToast({ type: 'error', title: 'Error', description: result.error || 'Failed to restore backup' });
    }
  };

  const handleSync = async () => {
    if (!user?.id) return;
    
    setIsSyncing(true);
    const result = await syncWithBackend(user.id);
    setIsSyncing(false);

    if (result.success) {
      addToast({ type: 'success', title: 'Success', description: 'Data synchronized successfully' });
      // Refresh the page to show synced data
      window.location.reload();
    } else {
      addToast({ type: 'error', title: 'Error', description: result.error || 'Failed to sync data' });
    }
  };

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Health Assistant</h1>
        <p className="text-muted-foreground">Get instant answers to your health questions, 24/7</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList>
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="analysis" className="gap-2">
                <Activity className="h-4 w-4" />
                Analysis
              </TabsTrigger>
              <TabsTrigger value="literature" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Literature
              </TabsTrigger>
              <TabsTrigger value="data" className="gap-2">
                <Save className="h-4 w-4" />
                Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 ${
                            message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                          }`}
                        >
                          <Avatar className={message.role === "assistant" ? "bg-blue-100" : "bg-green-100"}>
                            <AvatarFallback>
                              {message.role === "assistant" ? (
                                <Bot className="h-5 w-5 text-blue-700" />
                              ) : (
                                <User className="h-5 w-5 text-green-700" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-lg px-4 py-2 max-w-[80%] ${
                              message.role === "assistant"
                                ? "bg-blue-50 text-blue-900"
                                : "bg-green-50 text-green-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex gap-3">
                          <Avatar className="bg-blue-100">
                            <AvatarFallback>
                              <Bot className="h-5 w-5 text-blue-700" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg bg-blue-50 px-4 py-2">
                            <div className="flex gap-1">
                              <span className="animate-bounce">•</span>
                              <span className="animate-bounce delay-100">•</span>
                              <span className="animate-bounce delay-200">•</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      title="Upload medical file for analysis"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVoiceInput()}
                      disabled={isRecording}
                      title="Voice input"
                    >
                      <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
                    </Button>
                    <Input
                      placeholder="Type your health question here..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      disabled={isLoading}
                    />
                    <Button onClick={() => handleSendMessage()} disabled={isLoading || !inputMessage.trim()}>
                      Send
                    </Button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".ecg,.mri,.path"
                    onChange={handleFileUpload}
                  />
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Analysis Results</CardTitle>
                  <CardDescription>
                    Upload medical files for AI-powered analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analysisResult ? (
                    <div className="space-y-4">
                      <div className="rounded-lg bg-slate-50 p-4">
                        <h3 className="font-medium mb-2">Analysis Summary</h3>
                        <p className="text-sm">{analysisResult.summary}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Key Findings</h3>
                        {analysisResult.findings.map((finding, index) => (
                          <div
                            key={index}
                            className={`rounded-lg p-3 ${
                              finding.severity === "critical"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : finding.severity === "warning"
                                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                : "bg-green-50 text-green-700 border border-green-200"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {finding.severity === "critical" ? (
                                <AlertTriangle className="h-4 w-4" />
                              ) : finding.severity === "warning" ? (
                                <Bell className="h-4 w-4" />
                              ) : (
                                <Heart className="h-4 w-4" />
                              )}
                              <span className="font-medium">{finding.title}</span>
                            </div>
                            <p className="text-sm mt-1">{finding.description}</p>
                          </div>
                        ))}
                      </div>
                      {analysisResult.recommendations && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Recommendations</h3>
                          <ul className="space-y-1 text-sm">
                            {analysisResult.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-blue-600" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Upload a medical file</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Supported formats: .ecg, .mri, .path
                      </p>
                      <Button onClick={() => fileInputRef.current?.click()}>
                        Choose File
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="literature" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Literature Search</CardTitle>
                  <CardDescription>
                    Search through medical journals and publications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search medical literature..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLiteratureSearch(inputMessage)}
                      />
                      <Button
                        onClick={() => handleLiteratureSearch(inputMessage)}
                        disabled={isLoading || !inputMessage.trim()}
                      >
                        Search
                      </Button>
                    </div>
                    {literatureResults.length > 0 && (
                      <div className="space-y-4">
                        {literatureResults.map((result, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle className="text-lg">{result.title}</CardTitle>
                              <CardDescription>
                                {result.authors.join(", ")} • {result.journal} • {result.year}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">{result.abstract}</p>
                              <div className="mt-4 flex items-center gap-4">
                                <Badge variant="outline">
                                  Citations: {result.citations}
                                </Badge>
                                <Badge variant="outline">
                                  Relevance: {result.relevanceScore}%
                                </Badge>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="w-full" asChild>
                                <a href={result.url} target="_blank" rel="noopener noreferrer">
                                  Read Full Paper
                                </a>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>
                    Export, import, backup, and sync your health data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleExportData}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => importFileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Import Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleCreateBackup}
                        disabled={isBackingUp}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Create Backup
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleSync}
                        disabled={isSyncing}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync with Server
                      </Button>
                    </div>
                    <input
                      type="file"
                      ref={importFileInputRef}
                      className="hidden"
                      accept=".json"
                      onChange={handleImportData}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleSendMessage("What does my blood pressure reading mean?")}
                >
                  What does my blood pressure reading mean?
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleSendMessage("When is my next appointment?")}
                >
                  When is my next appointment?
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>Answer health questions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Interpret lab results</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Explain medical conditions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientHealthAssistant;
