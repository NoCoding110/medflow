
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Save } from "lucide-react";

const ClinicSettings = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinic Settings</h1>
          <p className="text-muted-foreground">
            Configure clinic operations and scheduling parameters
          </p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Monday - Friday</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="time" 
                      defaultValue="08:00" 
                      className="w-32" 
                    />
                    <span>to</span>
                    <Input 
                      type="time" 
                      defaultValue="17:00" 
                      className="w-32" 
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Saturday</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="time" 
                      defaultValue="09:00" 
                      className="w-32" 
                    />
                    <span>to</span>
                    <Input 
                      type="time" 
                      defaultValue="13:00" 
                      className="w-32" 
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Sunday</label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-muted p-3">
                <h3 className="mb-2 text-sm font-medium">Holiday Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">May 27, 2024</span>
                    </div>
                    <span className="text-sm">Memorial Day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">July 4, 2024</span>
                    </div>
                    <span className="text-sm">Independence Day</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Manage Holidays
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Appointment Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Default Appointment Duration</label>
                <div className="flex items-center gap-2">
                  <select className="rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="15">15 minutes</option>
                    <option value="20">20 minutes</option>
                    <option value="30" selected>30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Minimum Notice for Booking</label>
                <div className="flex items-center gap-2">
                  <select className="rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="0">No minimum</option>
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="4" selected>4 hours</option>
                    <option value="24">24 hours</option>
                  </select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Allow Online Booking</label>
                <div className="flex items-center gap-2">
                  <select className="rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="yes" selected>Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Maximum Days in Advance</label>
                <div className="flex items-center gap-2">
                  <Input type="number" defaultValue="90" className="w-32" />
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Location Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Clinic Name</label>
                <Input defaultValue="MedFlow Connect Medical Center" />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Address</label>
                <Input defaultValue="123 Healthcare Avenue" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">City</label>
                  <Input defaultValue="San Francisco" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">State</label>
                  <Input defaultValue="CA" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Zip Code</label>
                  <Input defaultValue="94103" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input defaultValue="United States" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input defaultValue="(415) 555-1234" />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="info@medflowconnect.com" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Departments & Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Family Medicine</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>8 providers • 12 services</p>
                </div>
              </div>
              
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pediatrics</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>4 providers • 8 services</p>
                </div>
              </div>
              
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Internal Medicine</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>6 providers • 15 services</p>
                </div>
              </div>
              
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Dermatology</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>2 providers • 6 services</p>
                </div>
              </div>
              
              <Button className="w-full">
                Add New Department
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicSettings;
