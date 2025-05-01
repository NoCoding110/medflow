import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import DoctorPortal from "@/pages/doctor-portal/DoctorPortal";
import DoctorDashboard from "@/pages/doctor-portal/DoctorDashboard";
import DoctorPatients from "@/pages/doctor-portal/patients/DoctorPatients";
import DoctorNotes from "@/pages/doctor-portal/notes/DoctorNotes";
import DoctorAppointments from "@/pages/doctor-portal/appointments/DoctorAppointments";
import DoctorPrescriptions from "@/pages/doctor-portal/prescriptions/DoctorPrescriptions";
import DoctorBilling from "@/pages/doctor-portal/billing/DoctorBilling";
import DoctorLab from "@/pages/doctor-portal/lab/DoctorLab";
import DoctorTelehealth from "@/pages/doctor-portal/telehealth/DoctorTelehealth";
import SmartVisitPrep from "@/pages/doctor-portal/smart-features/SmartVisitPrep";
import SmartDifferential from "@/pages/doctor-portal/smart-features/SmartDifferential";
import LifestyleAssistant from "@/pages/doctor-portal/smart-features/LifestyleAssistant";
import WellnessAlerts from "@/pages/doctor-portal/smart-features/WellnessAlerts";
import VisitComparison from "@/pages/doctor-portal/smart-features/VisitComparison";
import SecureMessaging from "@/pages/doctor-portal/collaboration/SecureMessaging";
import PatientMessaging from "@/pages/doctor-portal/collaboration/PatientMessaging";
import TaskManagement from "@/pages/doctor-portal/admin/TaskManagement";
import AccessControl from "@/pages/doctor-portal/admin/AccessControl";
import AuditLogs from "@/pages/doctor-portal/admin/AuditLogs";
import SecuritySettings from "@/pages/doctor-portal/admin/SecuritySettings";
import WellnessDashboard from "@/pages/doctor-portal/smart-features/WellnessDashboard";
import VitalsTracker from "@/pages/doctor-portal/smart-features/VitalsTracker";
import FitnessTracking from "@/pages/doctor-portal/smart-features/FitnessTracking";
import NutritionTracker from "@/pages/doctor-portal/smart-features/NutritionTracker";
import SymptomTracker from "@/pages/doctor-portal/smart-features/SymptomTracker";
import PatientProfile from "@/pages/doctor-portal/patients/PatientProfile";
import PatientNotes from "@/pages/doctor-portal/patients/PatientNotes";
import MedicationAdherence from "@/pages/doctor-portal/smart-features/MedicationAdherence";
import MentalHealthTracker from "@/pages/doctor-portal/smart-features/MentalHealthTracker";
import PreventiveCare from "@/pages/doctor-portal/smart-features/PreventiveCare";
import PatientGoals from "@/pages/doctor-portal/smart-features/PatientGoals";
import DoctorAIAssistant from "@/pages/doctor-portal/ai-features/DoctorAIAssistant";
import AIPathologyAnalysis from "@/pages/doctor-portal/ai-features/AIPathologyAnalysis";
import CarePathwayMonitor from "@/pages/doctor-portal/ai-features/CarePathwayMonitor";
import SpecializedModules from "@/pages/doctor-portal/ai-features/SpecializedModules";
import NeurologyModule from "@/pages/doctor-portal/ai-features/NeurologyModule";
import CardiologyModule from "@/pages/doctor-portal/ai-features/CardiologyModule";
import PsychiatryModule from "@/pages/doctor-portal/ai-features/PsychiatryModule";
import ECGAIAnalysis from "@/pages/doctor-portal/ai-features/ECGAIAnalysis";
import RealWorldDataPlatform from "@/pages/doctor-portal/ai-features/RealWorldDataPlatform";
import { GenerativeAI } from "@/pages/doctor-portal/ai-features/GenerativeAI";
import { PredictiveAnalysis } from "@/pages/doctor-portal/ai-features/PredictiveAnalysis";
import { ConversationalAI } from "@/pages/doctor-portal/ai-features/ConversationalAI";
import DoctorMessages from "@/pages/doctor-portal/messages/DoctorMessages";
import DoctorSettings from "@/pages/doctor-portal/settings/DoctorSettings";
import LabIntegration from "@/pages/doctor-portal/lab-integration/LabIntegration";

interface DoctorRouteProps {
  children: React.ReactNode;
}

export const DoctorRoute = ({ children }: DoctorRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-50">
        <div className="text-center">
          <div className="mb-4 h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-lightblue-400"></div>
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
    { path: "patients", element: <DoctorPatients /> },
    { path: "patients/:id/profile", element: <PatientProfile /> },
    { path: "patients/:id/notes", element: <PatientNotes /> },
    { path: "notes", element: <DoctorNotes /> },
    { path: "appointments", element: <DoctorAppointments /> },
    { path: "appointments/new", element: <DoctorAppointments /> },
    { path: "prescriptions", element: <DoctorPrescriptions /> },
    { path: "billing", element: <DoctorBilling /> },
    { path: "lab", element: <DoctorLab /> },
    { path: "telehealth", element: <DoctorTelehealth /> },
    { path: "smart/visit-prep", element: <SmartVisitPrep /> },
    { path: "smart/differential", element: <SmartDifferential /> },
    { path: "smart/lifestyle", element: <LifestyleAssistant /> },
    { path: "smart/wellness-alerts", element: <WellnessAlerts /> },
    { path: "smart/visit-comparison", element: <VisitComparison /> },
    { path: "collaboration/secure-messaging", element: <SecureMessaging /> },
    { path: "collaboration/patient-messaging", element: <PatientMessaging /> },
    { path: "admin/task-management", element: <TaskManagement /> },
    { path: "admin/access-control", element: <AccessControl /> },
    { path: "admin/audit-logs", element: <AuditLogs /> },
    { path: "admin/security", element: <SecuritySettings /> },
    { path: "wellness/dashboard", element: <WellnessDashboard /> },
    { path: "wellness/vitals", element: <VitalsTracker /> },
    { path: "wellness/fitness", element: <FitnessTracking /> },
    { path: "wellness/nutrition", element: <NutritionTracker /> },
    { path: "wellness/symptoms", element: <SymptomTracker /> },
    { path: "medication-adherence", element: <MedicationAdherence /> },
    { path: "mental-health", element: <MentalHealthTracker /> },
    { path: "preventive-care", element: <PreventiveCare /> },
    { path: "goals", element: <PatientGoals /> },
    { path: "ai-assistant", element: <DoctorAIAssistant /> },
    
    // Specialized AI features
    { path: "pathology-analysis", element: <AIPathologyAnalysis /> },
    { path: "care-pathway-monitor", element: <CarePathwayMonitor /> },
    { path: "specialized-modules", element: <SpecializedModules /> },
    { path: "neurology-module", element: <NeurologyModule /> },
    { path: "cardiology-module", element: <CardiologyModule /> },
    { path: "psychiatry-module", element: <PsychiatryModule /> },
    { path: "ecg-analysis", element: <ECGAIAnalysis /> },
    { path: "real-world-data", element: <RealWorldDataPlatform /> },

    // New AI features
    { path: "generative-ai", element: <GenerativeAI /> },
    { path: "predictive-analysis", element: <PredictiveAnalysis /> },
    { path: "conversational-ai", element: <ConversationalAI /> },
    { path: "messages", element: <DoctorMessages /> },
    { path: "settings", element: <DoctorSettings /> },
    { path: "lab-integration", element: <LabIntegration /> },
  ],
};
