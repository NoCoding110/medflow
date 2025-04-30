
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Send, Paperclip, MoreVertical } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { handleActionWithToast, formatDateTime } from "@/lib/portal-utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const PatientMessages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messageText, setMessageText] = useState("");
  const [newMessageRecipient, setNewMessageRecipient] = useState("");
  const [newMessageSubject, setNewMessageSubject] = useState("");
  const [newMessageContent, setNewMessageContent] = useState("");
  
  const [conversations, setConversations] = useState([
    {
      id: "1",
      contact: {
        name: "Dr. Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "Primary Care Physician"
      },
      lastMessage: {
        text: "Your lab results look normal. We'll discuss at your next appointment.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isUnread: true
      },
      subject: "Lab Results Review",
      messages: [
        {
          id: "1-1",
          sender: "patient",
          text: "Hello Dr. Johnson, have my lab results come back yet?",
          timestamp: new Date(Date.now() - 1000 * 60 * 90) // 90 minutes ago
        },
        {
          id: "1-2",
          sender: "doctor",
          text: "Yes, they just came in. I've reviewed them and everything looks normal. We can go over the details at your appointment next week.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60) // 60 minutes ago
        },
        {
          id: "1-3",
          sender: "patient",
          text: "That's great news! I was worried about my cholesterol levels.",
          timestamp: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
        },
        {
          id: "1-4",
          sender: "doctor",
          text: "Your lab results look normal. We'll discuss at your next appointment.",
          timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
        }
      ]
    },
    {
      id: "2",
      contact: {
        name: "Nurse Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        role: "Registered Nurse"
      },
      lastMessage: {
        text: "Your prescription refill has been sent to your pharmacy.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        isUnread: false
      },
      subject: "Prescription Refill Request",
      messages: [
        {
          id: "2-1",
          sender: "patient",
          text: "Hi Nurse Wilson, I need a refill for my blood pressure medication.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
        },
        {
          id: "2-2",
          sender: "nurse",
          text: "I'll process that right away. Which pharmacy would you like it sent to?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.5) // 4.5 hours ago
        },
        {
          id: "2-3",
          sender: "patient",
          text: "Please send it to the CVS on Main Street, thank you!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
        },
        {
          id: "2-4",
          sender: "nurse",
          text: "Your prescription refill has been sent to your pharmacy.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
        }
      ]
    },
    {
      id: "3",
      contact: {
        name: "Admin Support",
        avatar: "",
        role: "Administrative Staff"
      },
      lastMessage: {
        text: "Your appointment has been rescheduled to Thursday at 2:00 PM.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
        isUnread: false
      },
      subject: "Appointment Rescheduling",
      messages: [
        {
          id: "3-1",
          sender: "admin",
          text: "Hello, we need to reschedule your appointment for next week due to a scheduling conflict.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26) // 26 hours ago
        },
        {
          id: "3-2",
          sender: "patient",
          text: "That's fine. What options do I have?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25) // 25 hours ago
        },
        {
          id: "3-3",
          sender: "admin",
          text: "We have openings on Thursday at 2:00 PM or Friday at 9:00 AM.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5) // 24.5 hours ago
        },
        {
          id: "3-4",
          sender: "patient",
          text: "Thursday at 2:00 PM works for me.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.2) // 24.2 hours ago
        },
        {
          id: "3-5",
          sender: "admin",
          text: "Your appointment has been rescheduled to Thursday at 2:00 PM.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 24 hours ago
        }
      ]
    }
  ]);
  
  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation);
    
    // Mark as read
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversation.id 
        ? { 
            ...conv, 
            lastMessage: { 
              ...conv.lastMessage, 
              isUnread: false 
            } 
          }
        : conv
      )
    );
  };
  
  const handleSendMessage = async () => {
    if (!selectedConversation || !messageText.trim()) return;
    
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newMessage = {
          id: `${selectedConversation.id}-${selectedConversation.messages.length + 1}`,
          sender: "patient",
          text: messageText.trim(),
          timestamp: new Date()
        };
        
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === selectedConversation.id 
            ? { 
                ...conv,
                lastMessage: {
                  text: newMessage.text,
                  timestamp: newMessage.timestamp,
                  isUnread: false
                },
                messages: [...conv.messages, newMessage]
              }
            : conv
          )
        );
        
        setMessageText("");
        
        // Simulate response after a delay (only for demo purposes)
        setTimeout(() => {
          const responseMessage = {
            id: `${selectedConversation.id}-${selectedConversation.messages.length + 2}`,
            sender: selectedConversation.contact.role === "Primary Care Physician" ? "doctor" : 
                   selectedConversation.contact.role === "Registered Nurse" ? "nurse" : "admin",
            text: "Thanks for your message. I'll get back to you soon.",
            timestamp: new Date()
          };
          
          setConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === selectedConversation.id 
              ? { 
                  ...conv,
                  lastMessage: {
                    text: responseMessage.text,
                    timestamp: responseMessage.timestamp,
                    isUnread: true
                  },
                  messages: [...conv.messages, newMessage, responseMessage]
                }
              : conv
            )
          );
          
          setSelectedConversation(prev => ({
            ...prev,
            messages: [...prev.messages, newMessage, responseMessage],
            lastMessage: {
              text: responseMessage.text,
              timestamp: responseMessage.timestamp,
              isUnread: false
            }
          }));
        }, 5000);
      },
      "Message sent successfully",
      "Failed to send message"
    );
  };
  
  const handleCreateNewMessage = async () => {
    if (!newMessageRecipient.trim() || !newMessageContent.trim()) return;
    
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newConversation = {
          id: `${conversations.length + 1}`,
          contact: {
            name: newMessageRecipient,
            avatar: "",
            role: "Healthcare Provider"
          },
          subject: newMessageSubject || "New Conversation",
          lastMessage: {
            text: newMessageContent,
            timestamp: new Date(),
            isUnread: false
          },
          messages: [
            {
              id: `${conversations.length + 1}-1`,
              sender: "patient",
              text: newMessageContent,
              timestamp: new Date()
            }
          ]
        };
        
        setConversations(prev => [newConversation, ...prev]);
        setNewMessageOpen(false);
        setNewMessageRecipient("");
        setNewMessageSubject("");
        setNewMessageContent("");
        
        // Select the new conversation
        setSelectedConversation(newConversation);
      },
      "Message sent successfully",
      "Failed to send message"
    );
  };
  
  const handleDeleteConversation = async (conversationId: string) => {
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setConversations(prev => prev.filter(conv => conv.id !== conversationId));
        
        if (selectedConversation && selectedConversation.id === conversationId) {
          setSelectedConversation(null);
        }
      },
      "Conversation deleted successfully",
      "Failed to delete conversation"
    );
  };
  
  const filteredConversations = conversations.filter(conv => 
    conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const unreadCount = conversations.filter(conv => conv.lastMessage.isUnread).length;

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <div className="md:col-span-1 border rounded-lg bg-white overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Inbox</h2>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {unreadCount} Unread
              </Badge>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="icon" onClick={() => setNewMessageOpen(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex-1 overflow-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-medium">No messages found</h3>
                <p className="text-sm text-gray-500 mt-1">Try a different search term</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                  } ${conversation.lastMessage.isUnread ? 'bg-blue-50/50' : ''}`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.contact.avatar} />
                      <AvatarFallback>
                        {conversation.contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium truncate">
                          {conversation.contact.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDateTime(conversation.lastMessage.timestamp).includes('at') 
                            ? formatDateTime(conversation.lastMessage.timestamp).split(' at ')[0]
                            : formatDateTime(conversation.lastMessage.timestamp)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 font-medium truncate">{conversation.subject}</div>
                      <div className="text-sm text-gray-500 truncate">{conversation.lastMessage.text}</div>
                    </div>
                  </div>
                  {conversation.lastMessage.isUnread && (
                    <div className="flex justify-end mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="md:col-span-2 border rounded-lg bg-white overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.contact.avatar} />
                    <AvatarFallback>
                      {selectedConversation.contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.contact.name}</h3>
                    <p className="text-sm text-gray-500">{selectedConversation.contact.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDeleteConversation(selectedConversation.id)}>
                      Delete Conversation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="p-4 flex-1 overflow-auto">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Badge variant="outline" className="bg-gray-100 text-gray-600">
                      {selectedConversation.subject}
                    </Badge>
                  </div>
                  
                  {selectedConversation.messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === 'patient'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs mt-1 text-right text-gray-500">
                          {formatDateTime(message.timestamp).split(' at ')[1]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="flex-1 min-h-[80px]"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send Message
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Conversation Selected</h2>
              <p className="text-gray-500 mb-6 max-w-md">
                Select a conversation from the list or start a new one by clicking the + button.
              </p>
              <Button onClick={() => setNewMessageOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                New Message
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* New Message Dialog */}
      <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>
              Send a secure message to your healthcare provider.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Select or enter recipient name"
                value={newMessageRecipient}
                onChange={(e) => setNewMessageRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter a subject"
                value={newMessageSubject}
                onChange={(e) => setNewMessageSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-[120px]"
                value={newMessageContent}
                onChange={(e) => setNewMessageContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex items-center">
            <Button variant="outline" onClick={() => setNewMessageOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateNewMessage}
              disabled={!newMessageRecipient.trim() || !newMessageContent.trim()}
            >
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientMessages;

// Helper component for the label
const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
    {children}
  </label>
);

// Helper component for MessageSquare to satisfy Lucide import requirements
const MessageSquare = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
