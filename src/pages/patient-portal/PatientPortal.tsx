import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import PatientPortalSidebar from "@/components/patient-portal/PatientPortalSidebar";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const PatientPortal = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isAuthenticated && user?.role !== "patient") {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only patients can access the patient portal.",
      });
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate, toast]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "patient") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            Only patients can access the patient portal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <PatientPortalSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientPortal;
