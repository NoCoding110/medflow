
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User } from 'lucide-react';

const PatientMessaging = () => {
  const messages = [
    {
      id: 1,
      patient: "John Smith",
      message: "When should I take the new medication?",
      type: "question",
      timestamp: "2h ago",
      status: "unread"
    },
    {
      id: 2,
      patient: "Emily Johnson",
      message: "Requesting prescription refill for Lisinopril",
      type: "refill",
      timestamp: "4h ago",
      status: "read"
    }
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Messages</h1>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <Card className="h-[calc(100vh-12rem)]">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {messages.map((msg) => (
                <Button
                  key={msg.id}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium">{msg.patient}</div>
                      <div className="text-xs text-muted-foreground">
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-[calc(100vh-12rem)] flex flex-col">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <User className="h-10 w-10 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{msg.patient}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {msg.type}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
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

export default PatientMessaging;
