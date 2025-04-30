
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UserPlus, Pencil, Trash2, Shield, Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const UserManagement = () => {
  // Mock user data
  const users = [
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah@medflow.com", role: "Doctor", status: "Active" },
    { id: 2, name: "Dr. Michael Chen", email: "michael@medflow.com", role: "Doctor", status: "Active" },
    { id: 3, name: "Nurse Emma Wilson", email: "emma@medflow.com", role: "Nurse", status: "Active" },
    { id: 4, name: "Admin Alex Taylor", email: "admin@medflow.com", role: "Admin", status: "Active" },
    { id: 5, name: "John Smith", email: "john@medflow.com", role: "Patient", status: "Active" },
    { id: 6, name: "Receptionist Rachel Green", email: "rachel@medflow.com", role: "Staff", status: "Inactive" },
  ];

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage user accounts and access controls
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Role-Based Access Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-md border border-green-200 bg-green-50 p-4 text-center">
              <Shield className="mb-2 h-6 w-6 text-green-500 mx-auto" />
              <h3 className="font-medium">Admin</h3>
              <p className="text-xs text-muted-foreground">Full system access</p>
            </div>
            <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-center">
              <Shield className="mb-2 h-6 w-6 text-blue-500 mx-auto" />
              <h3 className="font-medium">Doctor</h3>
              <p className="text-xs text-muted-foreground">Clinical access</p>
            </div>
            <div className="rounded-md border border-purple-200 bg-purple-50 p-4 text-center">
              <Shield className="mb-2 h-6 w-6 text-purple-500 mx-auto" />
              <h3 className="font-medium">Nurse</h3>
              <p className="text-xs text-muted-foreground">Limited clinical access</p>
            </div>
            <div className="rounded-md border border-orange-200 bg-orange-50 p-4 text-center">
              <Shield className="mb-2 h-6 w-6 text-orange-500 mx-auto" />
              <h3 className="font-medium">Staff</h3>
              <p className="text-xs text-muted-foreground">Admin tasks only</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4">
            Configure Role Permissions
          </Button>
        </CardContent>
      </Card>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>
      
      <Card>
        <div className="rounded-md">
          <table className="w-full">
            <thead className="border-b text-xs font-medium text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                      user.role === 'Admin' 
                        ? 'bg-green-100 text-green-800' 
                        : user.role === 'Doctor' 
                        ? 'bg-blue-100 text-blue-800'
                        : user.role === 'Nurse'
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'Staff'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;
