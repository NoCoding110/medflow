import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { LayoutDashboard, Calendar, Users, Video, TestTube2, MessageSquare, Settings } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/doctor", icon: LayoutDashboard },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Telehealth", href: "/doctor/telehealth", icon: Video },
  { name: "Lab Integration", href: "/doctor/lab-integration", icon: TestTube2 },
  { name: "Messages", href: "/doctor/messages", icon: MessageSquare },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
];

const DoctorPortal = () => {
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isAuthenticated && user?.role !== "doctor") {
      addToast({
        type: "error",
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
  }, [isAuthenticated, user, navigate, addToast]);

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
    <div className="flex flex-1 flex-col overflow-hidden">
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorPortal;
