import React, { useState, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/core/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/core/card";
import { Input } from "@/components/core/input";
import { Label } from "@/components/core/label";
import { useToast } from "@/components/core/use-toast";
import { useAuth } from "@/lib/auth";
import { Stethoscope, User, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, user, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect based on user role if authenticated
  if (isAuthenticated && user) {
    if (user.role === 'patient') {
      return <Navigate to="/patient" replace />;
    } else if (user.role === 'doctor') {
      return <Navigate to="/doctor" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both email and password.",
      });
      return;
    }
    
    try {
      await login(email, password);
      // Navigate will happen automatically due to the isAuthenticated check above
    } catch (err) {
      // Error is handled in the auth context
    }
  };

  // Demo login handlers
  const handleDemoLogin = async (role: 'doctor' | 'admin' | 'patient') => {
    try {
      let demoCredentials = {
        email: '',
        password: ''
      };
      
      if (role === 'doctor') {
        demoCredentials = { email: 'sarah@medflow.com', password: 'password123' };
      } else if (role === 'admin') {
        demoCredentials = { email: 'admin@medflow.com', password: 'admin123' };
      } else if (role === 'patient') {
        demoCredentials = { email: 'patient@medflow.com', password: 'patient123' };
      }
      
      await login(demoCredentials.email, demoCredentials.password);
      // Navigation will happen automatically from the isAuthenticated check
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Demo Login Failed",
        description: "Could not log in with demo credentials.",
      });
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-clinical-light p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-clinical">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">MedFlow Connect</h1>
        <p className="text-muted-foreground">Electronic Health Record System</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-semibold">Sign in to your account</h2>
          <p className="text-sm text-muted-foreground">
            Please enter your credentials to access the EHR system
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@medflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-clinical hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-clinical hover:bg-clinical-dark"
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {/* Demo Login Section */}
      <div className="mt-8 w-full max-w-md">
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gradient-to-r from-blue-50 to-clinical-light px-2 text-gray-500">
              QUICK DEMO LOGIN
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Button 
            variant="outline"
            className="flex items-center justify-center gap-2 border-gray-300 bg-white py-6 text-gray-700 transition-colors hover:bg-gray-100"
            onClick={() => handleDemoLogin('doctor')}
          >
            <Stethoscope className="h-4 w-4" />
            Doctor
          </Button>
          <Button 
            variant="outline"
            className="flex items-center justify-center gap-2 border-gray-300 bg-white py-6 text-gray-700 transition-colors hover:bg-gray-100"
            onClick={() => handleDemoLogin('admin')}
          >
            <Shield className="h-4 w-4" />
            Admin
          </Button>
          <Button 
            variant="outline"
            className="flex items-center justify-center gap-2 border-gray-300 bg-white py-6 text-gray-700 transition-colors hover:bg-gray-100"
            onClick={() => handleDemoLogin('patient')}
          >
            <User className="h-4 w-4" />
            Patient
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
