
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Paperclip, Send, User } from 'lucide-react';

const SecureMessaging = () => {
  // Sample messages - in a real app this would come from your backend
  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      role: "Cardiologist",
      message: "Patient showing improved response to new medication regimen.",
      timestamp: "10:30 AM",
      hasAttachment: true
    },
    {
      id: 2,
      sender: "Nurse Williams",
      role: "Head Nurse",
      message: "Blood work results are in for Room 302. Values within normal range.",
      timestamp: "11:15 AM",
      hasAttachment: false
    }
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Secure Messaging</h1>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <Card className="h-[calc(100vh-12rem)]">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Dr. Smith</div>
                    <div className="text-xs text-muted-foreground">Neurologist</div>
                  </div>
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Nurse Williams</div>
                    <div className="text-xs text-muted-foreground">Head Nurse</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[calc(100vh-12rem)] flex flex-col">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                  <User className="h-10 w-10 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground ml-2">{message.role}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="mt-1">{message.message}</p>
                    {message.hasAttachment && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Paperclip className="h-4 w-4" />
                        <span>patient_report.pdf</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecureMessaging;
