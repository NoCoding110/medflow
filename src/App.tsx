import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes";
import { useVersionCheck } from './hooks/useVersionCheck';

function App() {
  useVersionCheck();
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
