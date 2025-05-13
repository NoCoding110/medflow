import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import DoctorPortal from "@/pages/doctor-portal/DoctorPortal";
import DoctorDashboard from "@/pages/doctor-portal/Dashboard";
import DoctorAppointments from "@/pages/doctor-portal/appointments/DoctorAppointments";
import DoctorPatients from "@/pages/doctor-portal/Patients";
import DoctorPrescriptions from "@/pages/doctor-portal/prescriptions/DoctorPrescriptions";
import DoctorBilling from "@/pages/doctor-portal/Billing";
import DoctorLab from "@/pages/doctor-portal/Lab";
import DoctorTelehealth from "@/pages/doctor-portal/telehealth/DoctorTelehealth";
import { SmartVisitPrep } from "@/pages/doctor-portal/smart-features/SmartVisitPrep";
import SmartDifferential from "@/pages/doctor-portal/smart-features/SmartDifferential";
import WellnessDashboard from "@/pages/doctor-portal/smart-features/WellnessDashboard";
import VitalsTracker from "@/pages/doctor-portal/smart-features/VitalsTracker";
import FitnessTracking from "@/pages/doctor-portal/smart-features/FitnessTracking";
import NutritionTracker from "@/pages/doctor-portal/smart-features/NutritionTracker";
import SymptomTracker from "@/pages/doctor-portal/smart-features/SymptomTracker";
import MedicationAdherence from "@/pages/doctor-portal/smart-features/MedicationAdherence";
import MentalHealthTracker from "@/pages/doctor-portal/smart-features/MentalHealthTracker";
import PreventiveCare from "@/pages/doctor-portal/smart-features/PreventiveCare";
import PatientGoals from "@/pages/doctor-portal/smart-features/PatientGoals";
import WellnessAlerts from "@/pages/doctor-portal/smart-features/WellnessAlerts";
import VisitComparison from "@/pages/doctor-portal/smart-features/VisitComparison";
import LifestyleAssistant from "@/pages/doctor-portal/smart-features/LifestyleAssistant";
import { PredictiveAnalysis } from "@/pages/doctor-portal/ai-features/PredictiveAnalysis";
import { ConversationalAI } from "@/pages/doctor-portal/ai-features/ConversationalAI";
import LabIntegration from "@/pages/doctor-portal/lab-integration/LabIntegration";
import NeurologyDashboard from "@/pages/doctor-portal/neurology/NeurologyDashboard";
import TreatmentMonitoring from "@/pages/doctor-portal/neurology/TreatmentMonitoring";
import CognitiveAssessment from "@/pages/doctor-portal/neurology/CognitiveAssessment";
import PatientMonitoring from "@/pages/doctor-portal/neurology/PatientMonitoring";
import TreatmentPlan from "@/pages/doctor-portal/neurology/TreatmentPlan";
import RemindersPage from "@/pages/doctor-portal/reminders/RemindersPage";

interface DoctorRouteProps {
  children: React.ReactNode;
}

export const DoctorRoute = ({ children }: DoctorRouteProps) => {
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

  if (user?.role !== 'doctor') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const doctorRoutes = {
  path: "/doctor",
  element: (
    <DoctorRoute>
      <DoctorPortal />
    </DoctorRoute>
  ),
  children: [
    { path: "", element: <DoctorDashboard /> },
    { path: "appointments", element: <DoctorAppointments /> },
    { path: "patients", element: <DoctorPatients /> },
    { path: "prescriptions", element: <DoctorPrescriptions /> },
    { path: "billing", element: <DoctorBilling /> },
    { path: "lab", element: <DoctorLab /> },
    { path: "telehealth", element: <DoctorTelehealth /> },
    { path: "smart-visit-prep", element: <SmartVisitPrep /> },
    { path: "smart-differential", element: <SmartDifferential /> },
    { path: "wellness-dashboard", element: <WellnessDashboard /> },
    { path: "vitals", element: <VitalsTracker /> },
    { path: "fitness", element: <FitnessTracking /> },
    { path: "nutrition", element: <NutritionTracker /> },
    { path: "symptoms", element: <SymptomTracker /> },
    { path: "medication-adherence", element: <MedicationAdherence /> },
    { path: "mental-health", element: <MentalHealthTracker /> },
    { path: "preventive-care", element: <PreventiveCare /> },
    { path: "patient-goals", element: <PatientGoals /> },
    { path: "wellness-alerts", element: <WellnessAlerts /> },
    { path: "visit-comparison", element: <VisitComparison /> },
    { path: "lifestyle", element: <LifestyleAssistant /> },
    { path: "predictive-analysis", element: <PredictiveAnalysis /> },
    { path: "conversational-ai", element: <ConversationalAI /> },
    { path: "lab-integration", element: <LabIntegration /> },
    { path: "neurology", element: <NeurologyDashboard /> },
    { path: "neurology/treatment-monitoring", element: <TreatmentMonitoring /> },
    { path: "neurology/cognitive-assessment", element: <CognitiveAssessment /> },
    { path: "neurology/patient-monitoring", element: <PatientMonitoring /> },
    { path: "neurology/treatment-plan", element: <TreatmentPlan /> },
    { path: "reminders", element: <RemindersPage /> },
  ],
};
