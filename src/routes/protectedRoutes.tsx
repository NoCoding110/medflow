import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Dashboard from "@/pages/Dashboard";
import Patients from "@/pages/Patients";
import PatientProfile from "@/pages/PatientProfile";
import Appointments from "@/pages/Appointments";
import Documents from "@/pages/Documents";
import Settings from "@/pages/Settings";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/patients",
    element: (
      <ProtectedRoute>
        <Patients />
      </ProtectedRoute>
    ),
  },
  {
    path: "/patients/:patientId",
    element: (
      <ProtectedRoute>
        <PatientProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/appointments",
    element: (
      <ProtectedRoute>
        <Appointments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/documents",
    element: (
      <ProtectedRoute>
        <Documents />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
];
