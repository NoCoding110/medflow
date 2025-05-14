import { Navigate, Route, Outlet } from "react-router-dom";
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

export const doctorRoutes = (
  <Route path="/doctor" element={<DoctorRoute><Outlet /></DoctorRoute>}>
    <Route index element={<Dashboard />} />
    <Route path="patients" element={<Patients />} />
    <Route path="patients/:patientId" element={<PatientProfile />} />
    <Route path="appointments" element={<Appointments />} />
    <Route path="wellness" element={<WellnessDashboard />} />
    <Route path="vitals" element={<VitalsTracker />} />
    <Route path="nutrition" element={<NutritionTracker />} />
    <Route path="fitness" element={<FitnessTracking />} />
    <Route path="medication" element={<MedicationAdherence />} />
    <Route path="mental-health" element={<MentalHealthTracker />} />
    <Route path="preventive-care" element={<PreventiveCare />} />
    <Route path="visit-prep" element={<SmartVisitPrep />} />
    <Route path="symptoms" element={<SymptomsTracker />} />
    <Route path="goals" element={<PatientGoals />} />
    <Route path="alerts" element={<WellnessAlerts />} />
    <Route path="ai-assistant" element={<DoctorAIAssistant />} />
    <Route path="predictive-analysis" element={<PredictiveAnalysis />} />
    <Route path="generative-ai" element={<GenerativeAI />} />
    <Route path="conversational-ai" element={<ConversationalAI />} />
    <Route path="pathology-analysis" element={<AIPathologyAnalysis />} />
    <Route path="care-pathway" element={<CarePathwayMonitor />} />
    <Route path="real-world-data" element={<RealWorldDataPlatform />} />
    <Route path="neurology" element={<NeurologyModule />} />
    <Route path="oncology" element={<OncologyModule />} />
    <Route path="cardiology" element={<CardiologyModule />} />
    <Route path="psychiatry" element={<PsychiatryModule />} />
    <Route path="ecg-analysis" element={<ECGAIAnalysis />} />
    <Route path="specialized-modules" element={<SpecializedModules />} />
    <Route path="secure-messaging" element={<SecureMessaging />} />
    <Route path="patient-messaging" element={<PatientMessaging />} />
  </Route>
);
