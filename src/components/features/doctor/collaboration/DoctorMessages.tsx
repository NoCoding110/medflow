import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from "lucide-react";

const DoctorMessages = () => {
  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      message: "Patient lab results are ready for review",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      sender: "Nurse Mike",
      message: "New patient appointment request",
      time: "9:45 AM",
      unread: false,
    },
    {
      id: 3,
      sender: "Dr. Robert Chen",
      message: "Updated treatment protocol for patient #12345",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Communicate with staff and manage patient inquiries
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-10" placeholder="Search messages..." />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start justify-between p-4 rounded-lg border cursor-pointer hover:bg-accent"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{msg.sender}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {msg.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{msg.time}</p>
                    </div>
                    {msg.unread && (
                      <Badge className="bg-blue-100 text-blue-800">New</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Dr. Sarah Johnson</CardTitle>
              <p className="text-sm text-muted-foreground">Online</p>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="h-[400px] border rounded-lg mb-4"></div>
              <div className="flex gap-4">
                <Input placeholder="Type your message..." />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorMessages; 