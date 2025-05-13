import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-navy-800">
            MedFlow
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="#features" className="text-sm text-navy-600 hover:text-navy-800">
              Features
            </Link>
            <Link to="#pricing" className="text-sm text-navy-600 hover:text-navy-800">
              Pricing
            </Link>
            <Link to="#about" className="text-sm text-navy-600 hover:text-navy-800">
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/patient/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 