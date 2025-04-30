
import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { DoctorPortalSidebar } from "@/components/doctor-portal/DoctorPortalSidebar";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const DoctorPortal = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isAuthenticated && user?.role !== "doctor") {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only doctors can access the doctor portal.",
      });
      
      // Redirect to appropriate dashboard based on role
      if (user?.role === "patient") {
        navigate("/patient");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate, toast]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "doctor") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            Only doctors can access the doctor portal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <DoctorPortalSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorPortal;
