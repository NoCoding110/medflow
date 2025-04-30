
import React, { useState } from "react";
import { Mic, MicOff, Speaker, Volume2, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PatientVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recentCommands, setRecentCommands] = useState([
    { text: "Show my upcoming appointments", success: true },
    { text: "Check recent lab results", success: true },
    { text: "Refill my prescription", success: false },
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);

    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setRecentCommands([
          { text: "Show my health risk assessment", success: true },
          ...recentCommands
        ]);
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Voice Commands</h1>
      <p className="text-muted-foreground mb-6">
        Control your patient portal using voice commands
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Voice Assistant</CardTitle>
              <CardDescription>
                Speak commands to navigate the portal
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <button 
                onClick={toggleListening} 
                className={`flex h-24 w-24 items-center justify-center rounded-full transition-all ${
                  isListening 
                    ? "bg-red-100 text-red-600 animate-pulse" 
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {isListening ? (
                  <MicOff className="h-10 w-10" />
                ) : (
                  <Mic className="h-10 w-10" />
                )}
              </button>
              <p className="mt-4 text-sm font-medium">
                {isListening ? "Listening..." : "Tap to speak"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground text-center max-w-sm">
                {isListening 
                  ? "Speak clearly and wait for the response" 
                  : "Say commands like 'Show my appointments' or 'Check my prescriptions'"}
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="voice-enabled" 
                    checked={voiceEnabled}
                    onCheckedChange={setVoiceEnabled}
                  />
                  <Label htmlFor="voice-enabled">Voice commands enabled</Label>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Commands</CardTitle>
              <CardDescription>
                Your most recent voice commands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentCommands.map((command, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="flex-1">{command.text}</span>
                    {command.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Setup Voice Assistant</CardTitle>
              <CardDescription>
                Configure your voice assistant preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="speaker-volume">Assistant Voice Volume</Label>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">70%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  id="speaker-volume"
                  min="0"
                  max="100"
                  value="70"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2 pt-2">
                <Label>Voice Assistant Voice</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 border rounded-md p-3">
                    <input type="radio" name="voice" id="voice-1" defaultChecked />
                    <Label htmlFor="voice-1" className="flex items-center gap-2">
                      <Speaker className="h-4 w-4" />
                      <span>Female (Default)</span>
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 border rounded-md p-3">
                    <input type="radio" name="voice" id="voice-2" />
                    <Label htmlFor="voice-2" className="flex items-center gap-2">
                      <Speaker className="h-4 w-4" />
                      <span>Male</span>
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <h3 className="font-medium">Voice Response Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="response-voice" defaultChecked />
                    <Label htmlFor="response-voice">Speak responses aloud</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="confirmation-beep" defaultChecked />
                    <Label htmlFor="confirmation-beep">Confirmation sound when command recognized</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="background-listening" />
                    <Label htmlFor="background-listening">Always listen for wake phrase</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Voice Settings</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Voice Commands</CardTitle>
              <CardDescription>
                Examples of commands you can use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 border rounded-md">
                  <p className="font-medium">Navigation</p>
                  <ul className="text-sm text-muted-foreground mt-1">
                    <li>"Go to appointments"</li>
                    <li>"Show my prescriptions"</li>
                    <li>"Open messages"</li>
                  </ul>
                </div>
                <div className="p-2 border rounded-md">
                  <p className="font-medium">Actions</p>
                  <ul className="text-sm text-muted-foreground mt-1">
                    <li>"Schedule a new appointment"</li>
                    <li>"Request prescription refill"</li>
                    <li>"Send message to Dr. Johnson"</li>
                  </ul>
                </div>
                <div className="p-2 border rounded-md">
                  <p className="font-medium">Information</p>
                  <ul className="text-sm text-muted-foreground mt-1">
                    <li>"What's my next appointment?"</li>
                    <li>"Show my recent lab results"</li>
                    <li>"Read my health summary"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientVoice;
