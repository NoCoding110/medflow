import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Dashboard from "@/pages/doctor-portal/Dashboard";
import Patients from "@/pages/doctor-portal/Patients";
import PatientProfile from "@/pages/doctor-portal/patients/PatientProfile";
import Appointments from "@/pages/doctor-portal/Appointments";
import Documents from "@/pages/doctor-portal/Records";
import Settings from "@/pages/doctor-portal/Settings";
import {
  NeurologyDashboard,
  TreatmentMonitoring,
  CognitiveAssessment,
  PatientMonitoring,
  TreatmentPlan
} from "@/pages/doctor-portal/neurology";

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
  {
    path: "/neurology",
    element: (
      <ProtectedRoute>
        <NeurologyDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/neurology/treatment-monitoring",
    element: (
      <ProtectedRoute>
        <TreatmentMonitoring />
      </ProtectedRoute>
    ),
  },
  {
    path: "/neurology/cognitive-assessment",
    element: (
      <ProtectedRoute>
        <CognitiveAssessment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/neurology/patient-monitoring",
    element: (
      <ProtectedRoute>
        <PatientMonitoring />
      </ProtectedRoute>
    ),
  },
  {
    path: "/neurology/treatment-plan",
    element: (
      <ProtectedRoute>
        <TreatmentPlan />
      </ProtectedRoute>
    ),
  },
];
