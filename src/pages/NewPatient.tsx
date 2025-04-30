
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PatientRegistrationForm from "@/components/patient-registration/PatientRegistrationForm";

const NewPatient = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="mb-2" asChild>
            <Link to="/" className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <div className="text-center mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clinical mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Patient Registration</h1>
            <p className="text-muted-foreground">
              Create your patient account to access MedFlow Connect services
            </p>
          </div>
        </div>

        <PatientRegistrationForm />
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in instead</Link></p>
          <p className="mt-4">For demo purposes, you can use: <strong>patient@medflow.com / patient123</strong></p>
        </div>
      </div>
    </div>
  );
};

export default NewPatient;
