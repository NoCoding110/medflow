
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, ChevronRight, Search, InfoIcon, FileText, Calendar, CreditCard, AlertTriangle } from "lucide-react";

const AdminAssistant = () => {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([
    { role: "assistant", content: "Hello! I'm your MedFlow Admin Assistant. How can I help you today?" }
  ]);

  // In a real app, this would call an AI service
  const handleSendQuery = () => {
    if (!query.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: "user", content: query }]);
    
    // Generate mock response based on query
    let response = "I'm processing your request...";
    if (query.toLowerCase().includes("unpaid invoices") || query.toLowerCase().includes("invoice")) {
      response = "I found 12 unpaid invoices older than 30 days. The total amount due is $8,450. Would you like to see the detailed list?";
    } else if (query.toLowerCase().includes("appointments") || query.toLowerCase().includes("cancelled")) {
      response = "Yesterday, 5 appointments were cancelled: 3 by patients and 2 by providers due to scheduling conflicts. Would you like me to show you options for rebooking these patients?";
    } else if (query.toLowerCase().includes("staff") || query.toLowerCase().includes("doctors")) {
      response = "Currently there are 8 doctors, 12 nurses, and 15 support staff scheduled for today. Dr. Johnson called in sick and needs coverage for 6 appointments.";
    } else {
      response = "I'm not sure I understand your query. Could you rephrase it or try asking about unpaid invoices, appointments, or staff scheduling?";
    }
    
    // Add assistant response after a short delay to simulate processing
    setTimeout(() => {
      setConversation(prev => [...prev, { role: "assistant", content: response }]);
    }, 700);
    
    setQuery("");
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendQuery();
    }
  };

  // Suggested queries
  const suggestedQueries = [
    "Show me unpaid invoices over 30 days",
    "List appointments cancelled yesterday",
    "How many doctors are available today?",
    "Generate monthly revenue report"
  ];

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin AI Assistant</h1>
          <p className="text-muted-foreground">
            Your intelligent assistant for clinic management
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-primary" />
                MedFlow Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "assistant"
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask anything about your clinic..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={handleSendQuery} type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQueries.map((query, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="w-full justify-between text-left"
                    onClick={() => {
                      setQuery(query);
                      // Auto-send after a short delay
                      setTimeout(() => handleSendQuery(), 100);
                    }}
                  >
                    <span>{query}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                  <Search className="h-5 w-5 mb-1" />
                  <span className="text-xs">Search</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                  <InfoIcon className="h-5 w-5 mb-1" />
                  <span className="text-xs">Reports</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs">Documents</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs">Calendar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Alert Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-md border border-red-100 bg-red-50 p-2 text-sm text-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span>3 providers understaffed today</span>
                </div>
                <div className="flex items-center gap-2 rounded-md border border-amber-100 bg-amber-50 p-2 text-sm text-amber-800">
                  <CreditCard className="h-4 w-4" />
                  <span>12 claims pending approval</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAssistant;
