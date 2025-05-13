import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes";
import { useVersionCheck } from './hooks/useVersionCheck';
import { TooltipProvider } from "@/components/core/tooltip";
import { ensureTestDoctor } from '@/lib/utils/test-data';
import { useToast } from '@/components/core/use-toast';

function App() {
  const { toast } = useToast();
  useVersionCheck();

  useEffect(() => {
    const initializeDoctorData = async () => {
      try {
        const doctor = await ensureTestDoctor({
          email: 'sarah@medflow.com',
          first_name: 'Sarah',
          last_name: 'Johnson',
          specialization: 'Internal Medicine',
          license_number: 'MD123456',
          phone_number: '+1 (555) 123-4567',
          profile_image: 'https://example.com/sarah-johnson.jpg'
        });
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
