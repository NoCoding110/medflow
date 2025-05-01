import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Bot,
  MessageSquare,
  Brain,
  Search,
  FileText,
  Activity,
  Database,
  FileBarChart,
  Mic,
  Camera,
  Upload,
  Loader2,
  ChevronRight,
  Zap,
  AlertCircle,
  BookOpen,
  Stethoscope,
  LineChart
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type: 'text' | 'image' | 'lab' | 'analysis';
  confidence?: number;
  sources?: string[];
  suggestions?: string[];
  analysis?: {
    sentiment?: string;
    urgency?: string;
    medicalTerms?: string[];
    possibleConditions?: Array<{ condition: string; probability: number }>;
  };
}

interface Analysis {
  type: string;
  value: number;
  label: string;
  trend?: 'up' | 'down' | 'stable';
}

const DoctorAIAssistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeContext, setActiveContext] = useState<string[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  
  // Simulated medical knowledge base
  const knowledgeBase = {
    conditions: new Set(['Type 2 Diabetes', 'Hypertension', 'Asthma']),
    medications: new Set(['Metformin', 'Lisinopril', 'Albuterol']),
    procedures: new Set(['ECG', 'Blood Test', 'X-Ray']),
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate real-time processing with multiple stages
  const processInput = async (text: string) => {
    setIsProcessing(true);
    setConfidenceScore(0);

    try {
      // Stage 1: Initial Analysis
      await simulateProgress(20);
      const medicalTerms = extractMedicalTerms(text);
      
      // Stage 2: Context Building
      await simulateProgress(40);
      const relevantContext = buildContext(medicalTerms);
      setActiveContext(relevantContext);

      // Stage 3: Deep Analysis
      await simulateProgress(60);
      const analysis = await performAnalysis(text, relevantContext);

      // Stage 4: Response Generation
      await simulateProgress(80);
      const response = generateResponse(analysis);

      // Stage 5: Confidence Scoring
      await simulateProgress(100);
      const confidence = calculateConfidence(analysis);
      setConfidenceScore(confidence);

      return {
        content: response,
        analysis: {
          medicalTerms,
          possibleConditions: generatePossibleConditions(medicalTerms),
          urgency: determineUrgency(text),
          sentiment: analyzeSentiment(text)
        },
        confidence,
        sources: generateSources(),
        suggestions: generateSuggestions(medicalTerms)
      };
    } catch (error) {
      console.error('Error processing input:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateProgress = (target: number) => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setConfidenceScore(current => {
          if (current >= target) {
            clearInterval(interval);
            resolve();
            return target;
          }
          return current + 1;
        });
      }, 20);
    });
  };

  const extractMedicalTerms = (text: string): string[] => {
    const terms: string[] = [];
    const words = text.toLowerCase().split(' ');
    
    words.forEach(word => {
      if (knowledgeBase.conditions.has(word) ||
          knowledgeBase.medications.has(word) ||
          knowledgeBase.procedures.has(word)) {
        terms.push(word);
      }
    });
    
    return terms;
  };

  const buildContext = (terms: string[]): string[] => {
    // Simulate context building based on medical terms
    return terms.map(term => `Context for ${term}`);
  };

  const performAnalysis = async (text: string, context: string[]) => {
    // Simulate deep analysis
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      text,
      context,
      score: Math.random() * 100
    };
  };

  const generateResponse = (analysis: any): string => {
    // Simulate response generation
    return "Based on the analysis, here's what I found...";
  };

  const calculateConfidence = (analysis: any): number => {
    return Math.min(Math.random() * 100 + 50, 100);
  };

  const generatePossibleConditions = (terms: string[]): Array<{ condition: string; probability: number }> => {
    return terms.map(term => ({
      condition: term,
      probability: Math.random() * 100
    }));
  };

  const determineUrgency = (text: string): string => {
    // Simulate urgency detection
    return ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];
  };

  const analyzeSentiment = (text: string): string => {
    // Simulate sentiment analysis
    return ['Neutral', 'Concerned', 'Urgent'][Math.floor(Math.random() * 3)];
  };

  const generateSources = (): string[] => {
    return [
      'PubMed ID: 12345678',
      'Clinical Guidelines 2024',
      'Medical Journal Reference'
    ];
  };

  const generateSuggestions = (terms: string[]): string[] => {
    return [
      'Would you like to see recent studies about this condition?',
      'Should I analyze related lab results?',
      'Would you like to compare with similar cases?'
    ];
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await processInput(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        timestamp: new Date(),
        type: 'text',
        confidence: response.confidence,
        sources: response.sources,
        suggestions: response.suggestions,
        analysis: response.analysis
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update analyses based on the response
      setAnalyses(prev => [
        ...prev,
        {
          type: 'confidence',
          value: response.confidence,
          label: 'Response Confidence'
        }
      ]);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your request. Please try again."
      });
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
    toast({
      title: isListening ? "Voice Input Stopped" : "Listening...",
      description: isListening ? "Processing your voice input" : "Speak now..."
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Implement image processing logic here
      toast({
        title: "Image Uploaded",
        description: "Processing medical image..."
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Medical Assistant</h1>
          <p className="text-muted-foreground">Advanced medical analysis and decision support system</p>
        </div>
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Medical Conversation
              </CardTitle>
              <CardDescription>
                Interact with the AI assistant for medical analysis and insights
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'assistant' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === 'assistant'
                            ? 'bg-muted'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {message.role === 'assistant' && (
                            <Bot className="h-4 w-4" />
                          )}
                          <span className="font-medium">
                            {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                          </span>
                          {message.confidence && (
                            <Badge variant="outline">
                              {message.confidence.toFixed(0)}% confidence
                            </Badge>
                          )}
                        </div>
                        
                        <p className="mb-2">{message.content}</p>
                        
                        {message.analysis && (
                          <div className="mt-2 space-y-2">
                            {message.analysis.medicalTerms && (
                              <div className="flex flex-wrap gap-1">
                                {message.analysis.medicalTerms.map((term, i) => (
                                  <Badge key={i} variant="secondary">{term}</Badge>
                                ))}
                              </div>
                            )}
                            
                            {message.analysis.possibleConditions && (
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Possible Conditions:</p>
                                {message.analysis.possibleConditions.map((condition, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <Progress value={condition.probability} className="h-2" />
                                    <span className="text-sm">{condition.condition}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {message.sources && (
                          <div className="mt-2 text-sm">
                            <p className="font-medium">Sources:</p>
                            <ul className="list-disc list-inside">
                              {message.sources.map((source, i) => (
                                <li key={i}>{source}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {message.suggestions && (
                          <div className="mt-2 space-y-1">
                            {message.suggestions.map((suggestion, i) => (
                              <Button
                                key={i}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-left"
                              >
                                <ChevronRight className="h-4 w-4 mr-2" />
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="flex items-center gap-2 w-full">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceInput}
                  className={isListening ? 'bg-red-100' : ''}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Input
                  placeholder="Ask me anything about medical conditions, treatments, or analyze patient data..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isProcessing}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !input.trim()}
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MessageSquare className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Analysis Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Processing Confidence</span>
                    <span className="text-sm">{confidenceScore}%</span>
                  </div>
                  <Progress value={confidenceScore} className="h-2" />
                </div>

                <div className="space-y-2">
                  {activeContext.map((context, i) => (
                    <Badge key={i} variant="outline" className="mr-2">
                      {context}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-md p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Active Analysis</span>
                    </div>
                    <span className="text-2xl font-bold">{analyses.length}</span>
                  </div>
                  
                  <div className="border rounded-md p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Critical Findings</span>
                    </div>
                    <span className="text-2xl font-bold">0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  <span className="text-sm font-medium">Medical References</span>
                </div>
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span className="text-sm font-medium">Clinical Guidelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="text-sm font-medium">Case Studies</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorAIAssistant;
