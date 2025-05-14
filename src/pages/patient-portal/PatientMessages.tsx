import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Clock, User, Globe, List, FileText, AlertCircle, Clipboard, X, Plus, Star, StarOff, Check, LockIcon, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for conversations
interface Message {
  id: string;
  sender: "patient" | "provider";
  content: string;
  timestamp: string;
  read: boolean;
  attachment?: {
    name: string;
    type: string;
    url: string;
  };
}

interface Conversation {
  id: string;
  provider: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    department?: string;
  };
  messages: Message[];
  lastMessageTime: string;
  unreadCount: number;
  status: "active" | "completed";
  starred?: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    provider: {
      id: "p1",
      name: "Dr. Sarah Johnson",
      role: "Primary Care Physician",
      avatar: "https://example.com/doctor-avatar.jpg",
      department: "Internal Medicine"
    },
    messages: [
      {
        id: "m1",
        sender: "provider",
        content: "Hello! How can I help you today?",
        timestamp: "2023-10-22T09:30:00",
        read: true
      },
      {
        id: "m2",
        sender: "patient",
        content: "I've been experiencing some headaches lately and wanted to discuss my options.",
        timestamp: "2023-10-22T09:35:00",
        read: true
      },
      {
        id: "m3",
        sender: "provider",
        content: "I'm sorry to hear that. Can you tell me more about the frequency and intensity of these headaches?",
        timestamp: "2023-10-22T09:40:00",
        read: true
      },
      {
        id: "m4",
        sender: "patient",
        content: "They've been occurring about 3 times a week, usually in the afternoon. The pain is moderate and located around my temples.",
        timestamp: "2023-10-22T09:45:00",
        read: true
      },
      {
        id: "m5",
        sender: "provider",
        content: "Thank you for that information. I'd like to review your recent medical history and possibly schedule you for a check-up. In the meantime, are you taking any medications for the pain?",
        timestamp: "2023-10-22T09:50:00",
        read: false
      }
    ],
    lastMessageTime: "2023-10-22T09:50:00",
    unreadCount: 1,
    status: "active"
  },
  {
    id: "2",
    provider: {
      id: "p2",
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      department: "Cardiology"
    },
    messages: [
      {
        id: "m6",
        sender: "provider",
        content: "I've reviewed your recent test results. Your cholesterol levels have improved since your last visit.",
        timestamp: "2023-10-20T14:15:00",
        read: true,
        attachment: {
          name: "Cholesterol_Results.pdf",
          type: "pdf",
          url: "/documents/cholesterol-results.pdf"
        }
      },
      {
        id: "m7",
        sender: "patient",
        content: "That's great news! I've been following the diet plan you recommended.",
        timestamp: "2023-10-20T14:20:00",
        read: true
      },
      {
        id: "m8",
        sender: "provider",
        content: "Excellent work. Let's continue with the current plan and schedule a follow-up in 3 months.",
        timestamp: "2023-10-20T14:25:00",
        read: true
      }
    ],
    lastMessageTime: "2023-10-20T14:25:00",
    unreadCount: 0,
    status: "active",
    starred: true
  },
  {
    id: "3",
    provider: {
      id: "p3",
      name: "Dr. Emily Rodriguez",
      role: "Dermatologist",
      department: "Dermatology"
    },
    messages: [
      {
        id: "m9",
        sender: "patient",
        content: "I've noticed a new mole on my back that seems to have changed shape recently.",
        timestamp: "2023-10-15T11:05:00",
        read: true,
        attachment: {
          name: "Mole_Photo.jpg",
          type: "image",
          url: "/documents/mole-photo.jpg"
        }
      },
      {
        id: "m10",
        sender: "provider",
        content: "Thank you for sharing the photo. Based on what I can see, we should examine this in person. Please schedule an appointment at your earliest convenience.",
        timestamp: "2023-10-15T11:30:00",
        read: true
      },
      {
        id: "m11",
        sender: "patient",
        content: "I've booked an appointment for next Tuesday at 2 PM.",
        timestamp: "2023-10-15T11:45:00",
        read: true
      },
      {
        id: "m12",
        sender: "provider",
        content: "Perfect. I'll see you then. In the meantime, keep an eye on it and let me know if you notice any significant changes.",
        timestamp: "2023-10-15T12:00:00",
        read: true
      }
    ],
    lastMessageTime: "2023-10-15T12:00:00",
    unreadCount: 0,
    status: "completed"
  }
];

// Mock data for provider directory
const mockProviders = [
  {
    id: "p1",
    name: "Dr. Sarah Johnson",
    role: "Primary Care Physician",
    department: "Internal Medicine",
    available: true
  },
  {
    id: "p2",
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    department: "Cardiology",
    available: true
  },
  {
    id: "p3",
    name: "Dr. Emily Rodriguez",
    role: "Dermatologist",
    department: "Dermatology",
    available: false
  },
  {
    id: "p4",
    name: "Dr. James Wilson",
    role: "Orthopedic Surgeon",
    department: "Orthopedics",
    available: true
  },
  {
    id: "p5",
    name: "Dr. Lisa Park",
    role: "Neurologist",
    department: "Neurology",
    available: true
  },
  {
    id: "p6",
    name: "Dr. Robert Thompson",
    role: "Gastroenterologist",
    department: "Gastroenterology",
    available: true
  }
];

// Component to display a conversation in the sidebar
const ConversationItem = ({ 
  conversation, 
  isActive, 
  onClick,
  onStarToggle
}: { 
  conversation: Conversation; 
  isActive: boolean; 
  onClick: () => void;
  onStarToggle: (id: string, starred: boolean) => void;
}) => {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  
  return (
    <div 
      className={`p-3 border-b cursor-pointer hover:bg-muted/50 ${isActive ? 'bg-muted/70' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={conversation.provider.avatar} alt={conversation.provider.name} />
          <AvatarFallback>{conversation.provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="font-medium truncate">{conversation.provider.name}</div>
            <div className="flex items-center space-x-1">
              {conversation.starred && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
              <span className="text-xs text-muted-foreground">
                {format(new Date(conversation.lastMessageTime), 'MMM d')}
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground truncate">{conversation.provider.role}</div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm truncate">
              {lastMessage.sender === 'provider' ? '' : 'You: '}
              {lastMessage.content}
            </p>
            {conversation.unreadCount > 0 && (
              <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div 
        className="flex mt-2 justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6"
          onClick={() => onStarToggle(conversation.id, !conversation.starred)}
        >
          {conversation.starred ? (
            <StarOff className="h-4 w-4" />
          ) : (
            <Star className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

// Component to display a message in the conversation
const MessageBubble = ({ message, providerName }: { message: Message; providerName: string }) => {
  const isProvider = message.sender === 'provider';
  
  return (
    <div className={`mb-4 flex ${isProvider ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] ${isProvider ? 'bg-muted' : 'bg-primary text-primary-foreground'} rounded-lg p-3`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium">
            {isProvider ? providerName : 'You'}
          </span>
          <span className="text-xs opacity-70">
            {format(new Date(message.timestamp), 'h:mm a')}
          </span>
        </div>
        <p className="text-sm">{message.content}</p>
        {message.attachment && (
          <div className="mt-2 p-2 bg-background/50 rounded border flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            <span className="text-xs">{message.attachment.name}</span>
            <Button variant="ghost" size="sm" className="ml-auto h-6 p-1">
              <Clipboard className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component
export default function PatientMessages() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation]);
  
  useEffect(() => {
    // Set the first conversation as active by default
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [conversations, activeConversation]);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    conv => 
      conv.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.provider.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    const updatedMessage: Message = {
      id: `m${Date.now()}`,
      sender: "patient",
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: true
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, updatedMessage],
          lastMessageTime: updatedMessage.timestamp,
          unreadCount: 0 // Reset unread count for the active conversation
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation({
      ...activeConversation,
      messages: [...activeConversation.messages, updatedMessage],
      lastMessageTime: updatedMessage.timestamp,
      unreadCount: 0
    });
    setNewMessage("");
  };
  
  // Function to handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    // Mark all messages as read
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation(
      updatedConversations.find(conv => conv.id === conversation.id) || null
    );
  };
  
  // Function to start a new conversation
  const handleStartNewConversation = () => {
    if (!selectedProvider || !messageSubject.trim()) return;
    
    const provider = mockProviders.find(p => p.id === selectedProvider);
    if (!provider) return;
    
    const newConv: Conversation = {
      id: `conv${Date.now()}`,
      provider: {
        id: provider.id,
        name: provider.name,
        role: provider.role,
        department: provider.department
      },
      messages: [
        {
          id: `m${Date.now()}`,
          sender: "patient",
          content: messageSubject.trim(),
          timestamp: new Date().toISOString(),
          read: true
        }
      ],
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      status: "active"
    };
    
    setConversations([newConv, ...conversations]);
    setActiveConversation(newConv);
    setShowNewMessageDialog(false);
    setSelectedProvider("");
    setMessageSubject("");
  };
  
  // Function to toggle starred status of a conversation
  const handleStarToggle = (conversationId: string, starred: boolean) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, starred };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    if (activeConversation && activeConversation.id === conversationId) {
      setActiveConversation({ ...activeConversation, starred });
    }
  };
  
  return (
    <div className="h-[calc(100vh-13rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Secure Messages</h1>
        <p className="text-muted-foreground">
          Communicate securely with your healthcare providers
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row h-full border rounded-lg shadow-sm overflow-hidden">
        {/* Left sidebar with conversations */}
        <div className="w-full md:w-80 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription>
                      Start a new conversation with a healthcare provider
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Select Provider</Label>
                      <Select
                        value={selectedProvider}
                        onValueChange={setSelectedProvider}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockProviders.map(provider => (
                            <SelectItem
                              key={provider.id}
                              value={provider.id}
                              disabled={!provider.available}
                            >
                              <div className="flex items-center">
                                <span>{provider.name}</span>
                                {!provider.available && (
                                  <Badge variant="outline" className="ml-2">Unavailable</Badge>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Message</Label>
                      <Textarea
                        id="subject"
                        placeholder="Briefly describe your question or concern"
                        value={messageSubject}
                        onChange={(e) => setMessageSubject(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>Cancel</Button>
                    <Button onClick={handleStartNewConversation}>Send Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Tabs defaultValue="all" className="mt-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(conversation => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={activeConversation?.id === conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    onStarToggle={handleStarToggle}
                  />
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>No conversations found</p>
                  <Button 
                    variant="link" 
                    onClick={() => setShowNewMessageDialog(true)}
                    className="mt-2"
                  >
                    Start a new conversation
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Right side with messages */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={activeConversation.provider.avatar} alt={activeConversation.provider.name} />
                    <AvatarFallback>{activeConversation.provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{activeConversation.provider.name}</div>
                    <div className="text-xs text-muted-foreground">{activeConversation.provider.role}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>View Provider Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Schedule Appointment</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <AlertCircle className="mr-2 h-4 w-4" />
                        <span>Report Issue</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Message list */}
              <ScrollArea className="flex-1 p-4">
                {activeConversation.messages.map(message => (
                  <MessageBubble 
                    key={message.id} 
                    message={message} 
                    providerName={activeConversation.provider.name} 
                  />
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-3 border-t">
                <div className="flex items-end space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="flex-1 min-h-[80px]"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <LockIcon className="mr-1 h-4 w-4" />
                    <span>Your messages are private and securely encrypted</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <MessageSquare className="h-16 w-16 mb-4 text-muted-foreground opacity-30" />
              <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a conversation from the list or start a new one
              </p>
              <Button onClick={() => setShowNewMessageDialog(true)}>
                Start New Conversation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
