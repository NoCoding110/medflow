
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { LogIn, UserPlus } from "lucide-react";

const Navigation = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="none"
              className="h-7 w-7"
            >
              <circle cx="50" cy="50" r="45" fill="#001f2d" />
              <path d="M50 20C40.5 20 33 25 25 35C33 45 40.5 50 50 50C59.5 50 67 45 75 35C67 25 59.5 20 50 20Z" stroke="#9bd1f2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M25 65C33 75 40.5 80 50 80C59.5 80 67 75 75 65L65 50L75 35" stroke="#9bd1f2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="50" cy="50" r="10" stroke="#ffb56b" strokeWidth="5" />
            </svg>
          </div>
          <div>
            <span className="font-display text-xl font-bold text-navy-800">MedFlow Connect</span>
            <div className="text-xs text-navy-600">Advanced Healthcare Platform</div>
          </div>
        </div>
        <nav className="hidden space-x-6 md:flex">
          <a href="#features" className="text-navy-600 font-medium hover:text-lightblue-600 transition-colors">
            Features
          </a>
          <a href="#benefits" className="text-navy-600 font-medium hover:text-lightblue-600 transition-colors">
            Benefits
          </a>
          <a href="#compliance" className="text-navy-600 font-medium hover:text-lightblue-600 transition-colors">
            Compliance
          </a>
        </nav>
        <div className="flex gap-3">
          {isAuthenticated ? (
            <Button variant="outline" className="bg-lightblue-500 text-white hover:bg-lightblue-600 hover:text-white" asChild>
              <Link to={user?.role === 'patient' ? "/patient" : "/dashboard"}>
                {user?.role === 'patient' ? 'Patient Portal' : 'Dashboard'}
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="outline" className="border-navy-300 text-navy-700 hover:bg-navy-50" asChild>
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Log in
                </Link>
              </Button>
              <Button className="bg-orange-400 text-navy-800 hover:bg-orange-500" asChild>
                <Link to="/patients/new" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
