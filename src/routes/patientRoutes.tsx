
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import PatientPortal from "@/pages/patient-portal/PatientPortal";
import PatientDashboard from "@/pages/patient-portal/PatientDashboard";
import PatientAppointments from "@/pages/patient-portal/PatientAppointments";
import PatientRecords from "@/pages/patient-portal/PatientRecords";
import PatientPrescriptions from "@/pages/patient-portal/PatientPrescriptions";
import PatientMessages from "@/pages/patient-portal/PatientMessages";
import PatientBilling from "@/pages/patient-portal/PatientBilling";
import PatientSettings from "@/pages/patient-portal/PatientSettings";
import PatientChallenges from "@/pages/patient-portal/PatientChallenges";
import PatientMentalHealth from "@/pages/patient-portal/PatientMentalHealth";
import PatientTelehealth from "@/pages/patient-portal/PatientTelehealth";
import PatientRiskScores from "@/pages/patient-portal/PatientRiskScores";
import PatientLeaderboard from "@/pages/patient-portal/PatientLeaderboard";
import PatientFamily from "@/pages/patient-portal/PatientFamily";
import PatientVoice from "@/pages/patient-portal/PatientVoice";
import PatientWellness from "@/pages/patient-portal/wellness/PatientWellness";
import PatientExercise from "@/pages/patient-portal/wellness/PatientExercise";
import PatientNutrition from "@/pages/patient-portal/wellness/PatientNutrition";
import PatientHealthTips from "@/pages/patient-portal/wellness/PatientHealthTips";
import PatientVitalsTracker from "@/pages/patient-portal/wellness/PatientVitalsTracker";
import PatientHealthAssistant from "@/pages/patient-portal/wellness/PatientHealthAssistant";

interface PatientRouteProps {
  children: React.ReactNode;
}

export const PatientRoute = ({ children }: PatientRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

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

  if (user?.role !== 'patient') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const patientRoutes = {
  path: "/patient",
  element: (
    <PatientRoute>
      <PatientPortal />
    </PatientRoute>
  ),
  children: [
    { path: "", element: <PatientDashboard /> },
    { path: "appointments", element: <PatientAppointments /> },
    { path: "records", element: <PatientRecords /> },
    { path: "prescriptions", element: <PatientPrescriptions /> },
    { path: "messages", element: <PatientMessages /> },
    { path: "billing", element: <PatientBilling /> },
    { path: "settings", element: <PatientSettings /> },
    { path: "challenges", element: <PatientChallenges /> },
    { path: "mental-health", element: <PatientMentalHealth /> },
    { path: "telehealth", element: <PatientTelehealth /> },
    { path: "risk-scores", element: <PatientRiskScores /> },
    { path: "leaderboard", element: <PatientLeaderboard /> },
    { path: "family", element: <PatientFamily /> },
    { path: "voice", element: <PatientVoice /> },
    { path: "wellness", element: <PatientWellness /> },
    { path: "exercise", element: <PatientExercise /> },
    { path: "nutrition", element: <PatientNutrition /> },
    { path: "health-tips", element: <PatientHealthTips /> },
    { path: "vitals", element: <PatientVitalsTracker /> },
    { path: "health-assistant", element: <PatientHealthAssistant /> },
  ],
};
