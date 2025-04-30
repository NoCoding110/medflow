
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { patientRoutes } from "@/routes/patientRoutes";
import { doctorRoutes } from "@/routes/doctorRoutes";
import { adminRoutes } from "@/routes/adminRoutes";
import NewPatient from "./pages/NewPatient";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/patients/new" element={<NewPatient />} />
            {protectedRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            {/* Patient routes */}
            <Route path={patientRoutes.path} element={patientRoutes.element}>
              {patientRoutes.children.map((childRoute) => (
                <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
              ))}
            </Route>
            {/* Doctor routes */}
            <Route path={doctorRoutes.path} element={doctorRoutes.element}>
              {doctorRoutes.children.map((childRoute) => (
                <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
              ))}
            </Route>
            {/* Admin routes */}
            <Route path={adminRoutes.path} element={adminRoutes.element}>
              {adminRoutes.children.map((childRoute) => (
                <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
              ))}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
