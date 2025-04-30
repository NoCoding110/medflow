import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Send, Bot, Loader2, FileText, Mic, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'symptom' | 'treatment' | 'general';
}

export const ConversationalAI = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatType, setChatType] = useState<'general' | 'symptom' | 'treatment'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      type: chatType
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock responses based on chat type
      const mockResponses = {
        general: "I'm here to help with your medical questions. What would you like to know?",
        symptom: "Based on your symptoms, I recommend consulting a healthcare provider. However, here are some general guidelines:\n\n1. Rest and stay hydrated\n2. Monitor your symptoms\n3. Keep track of any changes",
        treatment: "For your condition, here are some evidence-based treatment options:\n\n1. Primary treatment: [Treatment A]\n2. Alternative options: [Treatment B]\n3. Lifestyle modifications: [Recommendations]"
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponses[chatType],
        role: 'assistant',
        timestamp: new Date(),
        type: chatType
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      toast({
        title: "File Uploaded",
        description: "Processing your medical document..."
      });
    }
  };

  const handleVoiceInput = () => {
    // Simulate voice input
    toast({
      title: "Voice Input",
      description: "Starting voice recognition..."
    });
  };

  const suggestedQuestions = {
    general: [
      "What are the common symptoms of [condition]?",
      "How can I improve my overall health?",
      "What are the latest medical guidelines for [condition]?"
    ],
    symptom: [
      "What could be causing my [symptom]?",
      "When should I seek emergency care for [symptom]?",
      "What are the warning signs I should watch for?"
    ],
    treatment: [
      "What are the side effects of [treatment]?",
      "How long until I see results from [treatment]?",
      "Are there any natural alternatives to [treatment]?"
    ]
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Medical Assistant</CardTitle>
          <CardDescription>
            Get instant medical guidance and information from our AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button
              variant={chatType === 'general' ? 'default' : 'outline'}
              onClick={() => setChatType('general')}
            >
              General
            </Button>
            <Button
              variant={chatType === 'symptom' ? 'default' : 'outline'}
              onClick={() => setChatType('symptom')}
            >
              Symptom Analysis
            </Button>
            <Button
              variant={chatType === 'treatment' ? 'default' : 'outline'}
              onClick={() => setChatType('treatment')}
            >
              Treatment Guidance
            </Button>
          </div>

          <div className="border rounded-lg p-4 h-[400px] overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar>
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'assistant'
                      ? 'bg-muted'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {message.role === 'assistant' ? 'Medical Assistant' : 'You'}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {message.type}
                    </Badge>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                title="Upload medical document"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceInput}
                title="Voice input"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggested Questions</CardTitle>
          <CardDescription>
            Click on a question to start the conversation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {suggestedQuestions[chatType].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setInput(question);
                  handleSendMessage();
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 