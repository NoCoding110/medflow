import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Calendar,
  Users,
  Settings,
  Camera,
  Activity,
  Wifi,
  Server,
  PhoneOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import {
  createClient,
  createLocalTracks,
  joinChannel,
  leaveChannel,
  publishTracks,
  unpublishTracks,
} from "@/lib/agora";

import type {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

import { getTelehealthSessions } from "@/lib/services/mockDoctorService";
import { mockPatients } from "@/lib/mock/doctorMockData";

interface SystemStatus {
  camera: boolean;
  microphone: boolean;
  networkSpeed: number;
  serverStatus: "Online" | "Offline";
}

interface Session {
  id: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string;
  duration: number;
  platform: string;
  meetingLink: string;
}

const DoctorTelehealth = () => {
  // Video call states
  const [isInCall, setIsInCall] = useState(false);
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack | null, ICameraVideoTrack | null]>([null, null]);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  
  // System status
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    camera: false,
    microphone: false,
    networkSpeed: 0,
    serverStatus: "Offline",
  });

  // Today's sessions
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // Active patients in waiting room
  const [activePatients] = useState([
    { id: mockPatients[0].id, name: `${mockPatients[0].firstName} ${mockPatients[0].lastName}`, waitTime: "2 min" },
    { id: mockPatients[1].id, name: `${mockPatients[1].firstName} ${mockPatients[1].lastName}`, waitTime: "5 min" },
  ]);

  const agoraClient = useRef(createClient());

  useEffect(() => {
    // Load telehealth sessions
    const loadSessions = async () => {
      try {
        const data = await getTelehealthSessions();
        setSessions(data);
      } catch (error) {
        console.error("Error loading telehealth sessions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSessions();

    // Check system status
    checkSystemStatus();
    
    // Set up event listeners for remote users
    agoraClient.current.on("user-published", async (user, mediaType) => {
      await agoraClient.current.subscribe(user, mediaType);
      setRemoteUsers(prev => [...prev, user]);
    });

    agoraClient.current.on("user-unpublished", (user) => {
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
    });

    // Cleanup
    return () => {
      localTracks[0]?.close();
      localTracks[1]?.close();
      leaveChannel(agoraClient.current);
    };
  }, []);

  const checkSystemStatus = async () => {
    try {
      // Check camera
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(device => device.kind === 'videoinput');
      const hasMicrophone = devices.some(device => device.kind === 'audioinput');

      // Check network speed (simplified)
      const networkSpeed = (navigator as any).connection?.downlink || 0;

      setSystemStatus({
        camera: hasCamera,
        microphone: hasMicrophone,
        networkSpeed: networkSpeed,
        serverStatus: "Online",
      });
    } catch (error) {
      console.error("Error checking system status:", error);
      toast.error("Failed to check system status");
    }
  };

  const startCall = async (sessionId: string) => {
    try {
      const [audioTrack, videoTrack] = await createLocalTracks();
      setLocalTracks([audioTrack, videoTrack]);

      // Join the channel
      await joinChannel(agoraClient.current, sessionId);
      await publishTracks(agoraClient.current, [audioTrack, videoTrack]);

      // Play local video track
      videoTrack.play("local-video");

      setIsInCall(true);
      toast.success("Successfully joined the call");
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error("Failed to start call");
    }
  };

  const endCall = async () => {
    try {
      if (localTracks[0]) {
        localTracks[0].close();
      }
      if (localTracks[1]) {
        localTracks[1].close();
      }
      await leaveChannel(agoraClient.current);
      setIsInCall(false);
      setLocalTracks([null, null]);
      setRemoteUsers([]);
      toast.success("Call ended successfully");
    } catch (error) {
      console.error("Error ending call:", error);
      toast.error("Failed to end call");
    }
  };

  const toggleVideo = async () => {
    if (localTracks[1]) {
      await localTracks[1].setEnabled(!isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = async () => {
    if (localTracks[0]) {
      await localTracks[0].setEnabled(!isAudioEnabled);
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy-800">Telehealth Platform</h1>
          <p className="text-muted-foreground mt-1">Manage your virtual consultations</p>
        </div>
        <Button 
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => !isInCall && startCall("test-channel")}
        >
          <Video className="mr-2 h-5 w-5" />
          Start New Session
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Main content area */}
        <div className="md:col-span-8 space-y-6">
          {/* Video call area */}
          <Card className="aspect-video bg-navy-900 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {isInCall ? (
                <div className="relative w-full h-full">
                  {/* Remote video */}
                  <div className="absolute inset-0" id="remote-video">
                    {remoteUsers.length === 0 && (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                          <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Waiting for patient to join...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Local video (picture-in-picture) */}
                  <div className="absolute bottom-4 right-4 w-48 aspect-video bg-navy-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                    <div id="local-video" className="w-full h-full"></div>
                  </div>

                  {/* Call controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-navy-800/80 px-6 py-3 rounded-full">
                    <Button
                      variant="ghost"
                      size="default"
                      className={`rounded-full ${!isAudioEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
                      onClick={toggleAudio}
                    >
                      {isAudioEnabled ? (
                        <Mic className="h-5 w-5 text-white" />
                      ) : (
                        <MicOff className="h-5 w-5 text-white" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="default"
                      className={`rounded-full ${!isVideoEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
                      onClick={toggleVideo}
                    >
                      {isVideoEnabled ? (
                        <Video className="h-5 w-5 text-white" />
                      ) : (
                        <VideoOff className="h-5 w-5 text-white" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="default"
                      className="rounded-full bg-red-500 hover:bg-red-600"
                      onClick={endCall}
                    >
                      <PhoneOff className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <Video className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Start a new session or join an existing one</p>
                </div>
              )}
            </div>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">System Status</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={systemStatus.serverStatus === "Online" ? "default" : "destructive"}>
                  {systemStatus.serverStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Camera</span>
                    <Badge variant={systemStatus.camera ? "default" : "destructive"}>
                      {systemStatus.camera ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Microphone</span>
                    <Badge variant={systemStatus.microphone ? "default" : "destructive"}>
                      {systemStatus.microphone ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Network Speed</span>
                    <Badge variant={systemStatus.networkSpeed > 2 ? "default" : "destructive"}>
                      {systemStatus.networkSpeed} Mbps
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 space-y-6">
          {/* Today's Sessions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Today's Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-navy-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading sessions...</div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => {
                    const patient = mockPatients.find(p => p.id === session.patientId);
                    return (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-navy-100 hover:bg-navy-50 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient'}</p>
                          <p className="text-sm text-navy-600">
                            {session.time} · {session.duration} min · {session.type}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startCall(session.id)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                        >
                          Join
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Patients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Waiting Room</CardTitle>
              <Users className="h-4 w-4 text-navy-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activePatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-navy-100 hover:bg-navy-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-navy-600">Waiting: {patient.waitTime}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startCall(patient.id)}
                      className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                    >
                      Admit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Quick Settings</CardTitle>
              <Settings className="h-4 w-4 text-navy-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Video Quality</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Audio Device</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue placeholder="Select device" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Microphone</SelectItem>
                      <SelectItem value="headset">Headset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorTelehealth;
