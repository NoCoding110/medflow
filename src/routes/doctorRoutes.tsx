import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import {
  Dashboard,
  Patients,
  Appointments,
  PatientProfile,
  PatientNotes,
  NewPatientDialog,
  WellnessDashboard,
  VitalsTracker,
  NutritionTracker,
  FitnessTracking,
  MedicationAdherence,
  MentalHealthTracker,
  PreventiveCare,
  SmartVisitPrep,
  SymptomsTracker,
  PatientGoals,
  WellnessAlerts,
  DoctorAIAssistant,
  PredictiveAnalysis,
  GenerativeAI,
  ConversationalAI,
  AIPathologyAnalysis,
  CarePathwayMonitor,
  RealWorldDataPlatform,
  NeurologyModule,
  OncologyModule,
  CardiologyModule,
  PsychiatryModule,
  ECGAIAnalysis,
  SpecializedModules,
  SecureMessaging,
  PatientMessaging,
} from "@/pages/doctor-portal";

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

export const doctorRoutes = [
  <Route key="dashboard" path="/doctor" element={<Dashboard />} />,
  <Route key="patients" path="/doctor/patients" element={<Patients />} />,
  <Route key="patient-profile" path="/doctor/patients/:patientId" element={<PatientProfile />} />,
  <Route key="appointments" path="/doctor/appointments" element={<Appointments />} />,
  <Route key="wellness" path="/doctor/wellness" element={<WellnessDashboard />} />,
  <Route key="vitals" path="/doctor/vitals" element={<VitalsTracker />} />,
  <Route key="nutrition" path="/doctor/nutrition" element={<NutritionTracker />} />,
  <Route key="fitness" path="/doctor/fitness" element={<FitnessTracking />} />,
  <Route key="medication" path="/doctor/medication" element={<MedicationAdherence />} />,
  <Route key="mental-health" path="/doctor/mental-health" element={<MentalHealthTracker />} />,
  <Route key="preventive-care" path="/doctor/preventive-care" element={<PreventiveCare />} />,
  <Route key="visit-prep" path="/doctor/visit-prep" element={<SmartVisitPrep />} />,
  <Route key="symptoms" path="/doctor/symptoms" element={<SymptomsTracker />} />,
  <Route key="goals" path="/doctor/goals" element={<PatientGoals />} />,
  <Route key="alerts" path="/doctor/alerts" element={<WellnessAlerts />} />,
  <Route key="ai-assistant" path="/doctor/ai-assistant" element={<DoctorAIAssistant />} />,
  <Route key="predictive-analysis" path="/doctor/predictive-analysis" element={<PredictiveAnalysis />} />,
  <Route key="generative-ai" path="/doctor/generative-ai" element={<GenerativeAI />} />,
  <Route key="conversational-ai" path="/doctor/conversational-ai" element={<ConversationalAI />} />,
  <Route key="pathology-analysis" path="/doctor/pathology-analysis" element={<AIPathologyAnalysis />} />,
  <Route key="care-pathway" path="/doctor/care-pathway" element={<CarePathwayMonitor />} />,
  <Route key="real-world-data" path="/doctor/real-world-data" element={<RealWorldDataPlatform />} />,
  <Route key="neurology" path="/doctor/neurology" element={<NeurologyModule />} />,
  <Route key="oncology" path="/doctor/oncology" element={<OncologyModule />} />,
  <Route key="cardiology" path="/doctor/cardiology" element={<CardiologyModule />} />,
  <Route key="psychiatry" path="/doctor/psychiatry" element={<PsychiatryModule />} />,
  <Route key="ecg-analysis" path="/doctor/ecg-analysis" element={<ECGAIAnalysis />} />,
  <Route key="specialized-modules" path="/doctor/specialized-modules" element={<SpecializedModules />} />,
  <Route key="secure-messaging" path="/doctor/secure-messaging" element={<SecureMessaging />} />,
  <Route key="patient-messaging" path="/doctor/patient-messaging" element={<PatientMessaging />} />,
];
