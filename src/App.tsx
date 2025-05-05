import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes";
import { useVersionCheck } from './hooks/useVersionCheck';
import { TooltipProvider } from "@/components/ui/tooltip";
import PatientRegistration from './pages/patient/registration/PatientRegistration';

function App() {
  useVersionCheck();
  return (
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
