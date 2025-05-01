import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SecuritySettings = () => {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account security preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-0.5">
                <Label>Enable 2FA</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch />
            </div>
            <Button variant="outline">Configure 2FA</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-0.5">
                  <Label>Auto Logout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after period of inactivity
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-0.5">
                  <Label>Remember Device</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay logged in on this device
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            <Button variant="outline">View Active Sessions</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings; 