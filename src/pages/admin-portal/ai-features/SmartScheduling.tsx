
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, UserCheck, Clock, AlertTriangle } from "lucide-react";

const SmartScheduling = () => {
  const [view, setView] = useState<'map' | 'list'>('map');
  
  // Mock data for available providers
  const availableProviders = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Family Medicine", status: "Available", location: "Main Clinic", distance: "On-site" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Internal Medicine", status: "Busy", location: "Main Clinic", distance: "On-site" },
    { id: 3, name: "Dr. Emily Lee", specialty: "Pediatrics", status: "Available", location: "South Branch", distance: "4.2 miles" },
    { id: 4, name: "Dr. Robert Wilson", specialty: "Cardiology", status: "Available", location: "North Branch", distance: "2.8 miles" },
    { id: 5, name: "Dr. James Smith", specialty: "Dermatology", status: "Offline", location: "Main Clinic", distance: "On-site" },
  ];

  // Mock data for suggested times
  const suggestedTimes = [
    { day: "Monday", date: "May 5", slots: [{ time: "9:00 AM", demand: "High" }, { time: "2:00 PM", demand: "Medium" }] },
    { day: "Tuesday", date: "May 6", slots: [{ time: "8:00 AM", demand: "High" }, { time: "3:30 PM", demand: "High" }] },
    { day: "Wednesday", date: "May 7", slots: [{ time: "10:30 AM", demand: "Medium" }, { time: "1:00 PM", demand: "Low" }] },
  ];
  
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Scheduling Assistant</h1>
          <p className="text-muted-foreground">
            AI-powered scheduling optimization for providers and patients
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Update Schedule
          </Button>
          <Button className="gap-2">
            <UserCheck className="h-4 w-4" />
            Optimize Coverage
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Available Providers</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={view === 'map' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setView('map')}
                >
                  Map View
                </Button>
                <Button 
                  variant={view === 'list' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setView('list')}
                >
                  List View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {view === 'map' ? (
              <div className="aspect-video rounded-md bg-muted flex items-center justify-center p-6 relative">
                <div className="absolute inset-0 opacity-70">
                  {/* This would be a real map in production */}
                  <div className="h-full w-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,11,0/600x400?access_token=YOUR_MAPBOX_TOKEN')] bg-cover bg-center"></div>
                </div>
                
                {/* Provider indicators */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-8 w-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white font-bold">
                    SJ
                  </div>
                </div>
                <div className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-8 w-8 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-white font-bold">
                    MC
                  </div>
                </div>
                <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-8 w-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white font-bold">
                    EL
                  </div>
                </div>
                <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-8 w-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white font-bold">
                    RW
                  </div>
                </div>
                
                {/* Legend overlay */}
                <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-md shadow">
                  <h3 className="text-xs font-medium mb-2">Provider Status</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span>Busy</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                    <span>Offline</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full">
                  <thead className="border-b text-xs font-medium text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left">Provider</th>
                      <th className="px-4 py-3 text-left">Specialty</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Location</th>
                      <th className="px-4 py-3 text-left">Distance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {availableProviders.map((provider) => (
                      <tr key={provider.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 font-medium">{provider.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{provider.specialty}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                            provider.status === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : provider.status === 'Busy'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {provider.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{provider.location}</td>
                        <td className="px-4 py-3">{provider.distance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Suggested Extra Shifts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Based on forecasted patient demand, these time slots need additional provider coverage.
            </p>
            <div className="space-y-4">
              {suggestedTimes.map((day, idx) => (
                <div key={idx} className="rounded-md border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{day.day}, {day.date}</h3>
                  </div>
                  <div className="space-y-2">
                    {day.slots.map((slot, slotIdx) => (
                      <div key={slotIdx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{slot.time}</span>
                          {slot.demand === 'High' && (
                            <span className="flex items-center text-xs text-red-600">
                              <AlertTriangle className="h-3 w-3 mr-1" /> High demand
                            </span>
                          )}
                        </div>
                        <Button variant="outline" size="sm">Add</Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Patient Scheduling Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-md border p-4">
              <div>
                <h3 className="font-medium mb-2">Peak Hours Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Monday and Wednesday mornings show highest demand. Consider adding extra capacity.
                </p>
              </div>
              <div className="mt-4 h-[100px] bg-gradient-to-r from-sky-100 to-blue-200 rounded-md"></div>
            </div>
            <div className="flex flex-col justify-between rounded-md border p-4">
              <div>
                <h3 className="font-medium mb-2">Wait Time Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Current average wait time: 24 minutes. AI suggests redistributing appointments.
                </p>
              </div>
              <div className="mt-4 h-[100px] bg-gradient-to-r from-amber-50 to-amber-200 rounded-md"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartScheduling;
