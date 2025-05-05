import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes";
import { useVersionCheck } from './hooks/useVersionCheck';
import { TooltipProvider } from "@/components/ui/tooltip";
import PatientRegistration from './pages/patient/registration/PatientRegistration';
import { ensureDoctorSarahJohnson } from '@/lib/services/doctor-service';
import { useToast } from '@/components/ui/use-toast';

function App() {
  const { toast } = useToast();
  useVersionCheck();

  useEffect(() => {
    const initializeDoctorData = async () => {
      try {
        const doctor = await ensureDoctorSarahJohnson();
        if (!doctor) {
          throw new Error('Failed to initialize doctor data');
        }
        console.log('Dr. Sarah Johnson\'s data is ready:', doctor);
      } catch (error) {
        console.error('Error initializing doctor data:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize doctor data. Please contact support.',
          variant: 'destructive',
        });
      }
    };

    initializeDoctorData();
  }, [toast]);

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
