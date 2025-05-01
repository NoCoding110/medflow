import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { QrCode, Copy, LogOut, Shield, Key } from "lucide-react";

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const SecuritySettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isAutoLogoutEnabled, setIsAutoLogoutEnabled] = useState(true);
  const [isRememberDeviceEnabled, setIsRememberDeviceEnabled] = useState(false);
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [isSessionsDialogOpen, setIsSessionsDialogOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [sessions] = useState<Session[]>([
    {
      id: "1",
      device: "Windows PC",
      browser: "Chrome",
      location: "New York, USA",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "iPhone 13",
      browser: "Safari",
      location: "Boston, USA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "MacBook Pro",
      browser: "Firefox",
      location: "Chicago, USA",
      lastActive: "1 day ago",
      current: false,
    },
  ]);

  const handle2FAToggle = (enabled: boolean) => {
    if (enabled) {
      setIs2FADialogOpen(true);
    } else {
      setIs2FAEnabled(false);
      toast.success("Two-factor authentication disabled");
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("ABCD-EFGH-IJKL-MNOP");
    toast.success("Backup code copied to clipboard");
  };

  const handleEnable2FA = () => {
    setIs2FAEnabled(true);
    setIs2FADialogOpen(false);
    toast.success("Two-factor authentication enabled successfully");
  };

  const handlePasswordChange = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangingPassword(false);
    toast.success("Password updated successfully");
  };

  const handleTerminateSession = (sessionId: string) => {
    if (sessions.find(s => s.id === sessionId)?.current) {
      toast.error("Cannot terminate current session");
      return;
    }
    toast.success("Session terminated successfully");
  };

  const handleAutoLogoutToggle = (enabled: boolean) => {
    setIsAutoLogoutEnabled(enabled);
    toast.success(`Auto logout ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleRememberDeviceToggle = (enabled: boolean) => {
    setIsRememberDeviceEnabled(enabled);
    toast.success(`Remember device ${enabled ? 'enabled' : 'disabled'}`);
  };

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
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-0.5">
                <Label>Enable 2FA</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={is2FAEnabled}
                onCheckedChange={handle2FAToggle}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setIs2FADialogOpen(true)}
              disabled={!is2FAEnabled}
            >
              Configure 2FA
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Password Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isChangingPassword ? (
              <Button onClick={() => setIsChangingPassword(true)}>
                Change Password
              </Button>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handlePasswordChange}>Update Password</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordForm({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
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
                <Switch
                  checked={isAutoLogoutEnabled}
                  onCheckedChange={handleAutoLogoutToggle}
                />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-0.5">
                  <Label>Remember Device</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay logged in on this device
                  </p>
                </div>
                <Switch
                  checked={isRememberDeviceEnabled}
                  onCheckedChange={handleRememberDeviceToggle}
                />
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsSessionsDialogOpen(true)}>
              View Active Sessions
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="bg-black p-4 rounded-lg">
                <QrCode className="h-32 w-32 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Backup Code</Label>
              <div className="flex items-center space-x-2">
                <Input value="ABCD-EFGH-IJKL-MNOP" readOnly />
                <Button size="icon" variant="outline" onClick={handleCopyCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Save this backup code in a secure location. You'll need it if you lose access to your authenticator app.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIs2FADialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnable2FA}>Enable 2FA</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSessionsDialogOpen} onOpenChange={setIsSessionsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Active Sessions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{session.device}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{session.browser}</span>
                    <span>•</span>
                    <span>{session.location}</span>
                    <span>•</span>
                    <span>{session.lastActive}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session.id)}
                  disabled={session.current}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {session.current ? "Current Session" : "Terminate"}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecuritySettings; 