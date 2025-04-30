import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // In development, always redirect to patient portal
    navigate('/patient');
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        <p>Redirecting to patient portal...</p>
      </div>
    </div>
  );
};

export default Index;
