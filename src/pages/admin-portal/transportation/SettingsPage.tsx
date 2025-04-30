
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, MapPin, Clock, Users } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transportation Settings</h1>
          <p className="text-muted-foreground">Configure transportation service parameters</p>
        </div>
        <Button className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Coverage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Maximum Coverage Radius</label>
              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="range" 
                  min="5" 
                  max="30" 
                  defaultValue="15" 
                  className="w-full" 
                />
                <span className="text-sm font-medium">15 miles</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Preferred Providers</label>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-2 bg-accent/50 px-3 py-1 rounded-full">
                  <span className="text-sm">Uber</span>
                  <button className="text-xs text-red-500">×</button>
                </div>
                <div className="flex items-center gap-2 bg-accent/50 px-3 py-1 rounded-full">
                  <span className="text-sm">Lyft</span>
                  <button className="text-xs text-red-500">×</button>
                </div>
                <button className="text-xs text-primary">+ Add Provider</button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Transportation Eligibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Elderly Patients (65+)</span>
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Disabled Patients</span>
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Low-Income Patients</span>
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">All Patients</span>
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Scheduling Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Minimum Advance Notice</label>
                <select className="mt-2 w-full border rounded p-2 bg-background">
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option selected>4 hours</option>
                  <option>24 hours</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Default Pickup Window</label>
                <select className="mt-2 w-full border rounded p-2 bg-background">
                  <option>10 minutes</option>
                  <option selected>15 minutes</option>
                  <option>20 minutes</option>
                  <option>30 minutes</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Auto-Schedule</label>
                <select className="mt-2 w-full border rounded p-2 bg-background">
                  <option selected>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
