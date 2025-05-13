// Core Features
export { default as Dashboard } from './Dashboard';
export { default as Patients } from './patients/DoctorPatients';
export { default as Appointments } from './appointments/DoctorAppointments';
export { default as Lab } from './lab-integration/Lab';
export { default as Billing } from './billing/Billing';

// Patient Components
export { default as PatientProfile } from './patients/PatientProfile';
export { default as PatientNotes } from './patients/PatientNotes';
export { default as NewPatientDialog } from './patients/NewPatientDialog';

// Health Tracking
export { default as VitalsTracker } from './health-tracking/vitals/VitalsTracker';
export { default as NutritionTracker } from './health-tracking/nutrition/NutritionTracker';
export { default as FitnessTracking } from './health-tracking/fitness/FitnessTracking';
export { default as MedicationAdherence } from './health-tracking/medication/MedicationAdherence';

// AI Features
export { default as DoctorAIAssistant } from './ai-features/assistant/DoctorAIAssistant';
export { default as PredictiveAnalysis } from './ai-features/analysis/PredictiveAnalysis';
export { default as CarePathwayMonitor } from './ai-features/monitoring/CarePathwayMonitor';
export { default as SpecializedModules } from './ai-features/specialized/SpecializedModules';

// Collaboration
export { default as SecureMessaging } from './collaboration/SecureMessaging';
export { default as PatientMessaging } from './collaboration/PatientMessaging';
export { default as Telehealth } from './telehealth/DoctorTelehealth';

// Feature Modules
export * from './neurology';
export * from './documents';
export { default as WellnessDashboard } from './smart-features/WellnessDashboard';
export { default as MentalHealthTracker } from './smart-features/MentalHealthTracker';
export { default as PreventiveCare } from './smart-features/PreventiveCare';
export { default as SmartVisitPrep } from './smart-features/SmartVisitPrep';
export { default as SymptomsTracker } from './smart-features/SymptomsTracker';
export { default as PatientGoals } from './smart-features/PatientGoals';
export { default as WellnessAlerts } from './smart-features/WellnessAlerts';
export { default as GenerativeAI } from './ai-features/GenerativeAI';
export { default as ConversationalAI } from './ai-features/ConversationalAI';
export { default as AIPathologyAnalysis } from './ai-features/AIPathologyAnalysis';
export { default as RealWorldDataPlatform } from './ai-features/RealWorldDataPlatform';
export { default as NeurologyModule } from './ai-features/NeurologyModule';
export { default as OncologyModule } from './ai-features/OncologyModule';
export { default as CardiologyModule } from './ai-features/CardiologyModule';
export { default as PsychiatryModule } from './ai-features/PsychiatryModule';
export { default as ECGAIAnalysis } from './ai-features/ECGAIAnalysis'; 