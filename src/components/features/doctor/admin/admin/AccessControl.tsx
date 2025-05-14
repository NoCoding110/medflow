import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, UserPlus, Shield } from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  role: "admin" | "doctor" | "nurse" | "staff";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "nurse" | "staff";
  status: "active" | "inactive";
}

const AccessControl = () => {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      name: "View patient records",
      description: "Access to view patient medical records",
      enabled: true,
      role: "doctor",
    },
    {
      id: "2",
      name: "Edit medical history",
      description: "Ability to modify patient medical history",
      enabled: true,
      role: "doctor",
    },
    {
      id: "3",
      name: "Manage appointments",
      description: "Schedule and manage patient appointments",
      enabled: true,
      role: "staff",
    },
    {
      id: "4",
      name: "Access lab results",
      description: "View and manage laboratory results",
      enabled: true,
      role: "doctor",
    },
    {
      id: "5",
      name: "Prescribe medications",
      description: "Authority to prescribe medications",
      enabled: true,
      role: "doctor",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Dr. John Smith",
      email: "john.smith@hospital.com",
      role: "doctor",
      status: "active",
    },
    {
      id: "2",
      name: "Nurse Sarah Johnson",
      email: "sarah.j@hospital.com",
      role: "nurse",
      status: "active",
    },
    {
      id: "3",
      name: "Admin Mike Brown",
      email: "mike.b@hospital.com",
      role: "admin",
      status: "active",
    },
  ]);

  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "staff",
    status: "active",
  });

  const [selectedRole, setSelectedRole] = useState<Permission["role"]>("doctor");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTogglePermission = (permissionId: string) => {
    setPermissions(permissions.map(permission =>
      permission.id === permissionId
        ? { ...permission, enabled: !permission.enabled }
        : permission
    ));
    const permission = permissions.find(p => p.id === permissionId);
    if (permission) {
      toast.success(`${permission.name} ${permission.enabled ? 'disabled' : 'enabled'}`);
    }
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...newUser,
    };

    setUsers([...users, user]);
    setIsNewUserDialogOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "staff",
      status: "active",
    });
    toast.success("User created successfully");
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
    const user = users.find(u => u.id === userId);
    if (user) {
      toast.success(`User ${user.status === "active" ? "deactivated" : "activated"}`);
    }
  };

  const filteredPermissions = permissions.filter(
    permission => permission.role === selectedRole
  );

  const filteredUsers = users.filter(
    user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
        <p className="text-muted-foreground mt-1">
          Manage access permissions and security settings
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Permission Settings</CardTitle>
              <Select value={selectedRole} onValueChange={(value: Permission["role"]) => setSelectedRole(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredPermissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between space-x-4 p-4 border rounded-lg"
                >
                  <div className="space-y-0.5">
                    <Label>{permission.name}</Label>
                    <p className="text-sm text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                  <Switch
                    checked={permission.enabled}
                    onCheckedChange={() => handleTogglePermission(permission.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <Button onClick={() => setIsNewUserDialogOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleToggleUserStatus(user.id)}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Enter user name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter user email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value: User["role"]) =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccessControl; 