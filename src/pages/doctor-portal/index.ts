// Main Pages
export { default as Dashboard } from './Dashboard';
export { default as Patients } from './Patients';
export { default as Appointments } from './appointments/DoctorAppointments';
export { default as Lab } from './lab-integration/LabIntegration';
export { default as Billing } from './billing/DoctorBilling';
export { default as DoctorNotes } from './notes/DoctorNotes';
export { default as Telehealth } from './telehealth/DoctorTelehealth';

// Smart Features
export { default as WellnessDashboard } from './smart-features/WellnessDashboard';
export { default as VitalsTracker } from './smart-features/VitalsTracker';
export { default as NutritionTracker } from './smart-features/NutritionTracker';
export { default as FitnessTracking } from './smart-features/FitnessTracking';
export { default as MedicationAdherence } from './smart-features/MedicationAdherence';
export { default as MentalHealthTracker } from './smart-features/MentalHealthTracker';
export { default as PreventiveCare } from './smart-features/PreventiveCare';
export { SmartVisitPrep } from './smart-features/SmartVisitPrep';
export { default as SymptomsTracker } from './smart-features/SymptomsTracker';
export { default as PatientGoals } from './smart-features/PatientGoals';
export { default as WellnessAlerts } from './smart-features/WellnessAlerts';

// AI Features
export { PredictiveAnalysis } from './ai-features/PredictiveAnalysis';
export { GenerativeAI } from './ai-features/GenerativeAI';
export { ConversationalAI } from './ai-features/ConversationalAI';
export { default as DoctorAIAssistant } from './ai-features/DoctorAIAssistant';
export { default as AIFeatures } from './ai-features/AIFeatures';
export { default as AIPathologyAnalysis } from './ai-features/AIPathologyAnalysis';
export { default as CarePathwayMonitor } from './ai-features/CarePathwayMonitor';
export { default as RealWorldDataPlatform } from './ai-features/RealWorldDataPlatform';

// Specialized AI Modules
export { default as NeurologyModule } from './ai-features/NeurologyModule';
export { default as OncologyModule } from './ai-features/OncologyModule';
export { default as CardiologyModule } from './ai-features/CardiologyModule';
export { default as PsychiatryModule } from './ai-features/PsychiatryModule';
export { default as ECGAIAnalysis } from './ai-features/ECGAIAnalysis';
export { default as SpecializedModules } from './ai-features/SpecializedModules';

// Collaboration
export { default as SecureMessaging } from './collaboration/SecureMessaging';
export { default as PatientMessaging } from './collaboration/PatientMessaging';
export { default as DoctorMessages } from './collaboration/DoctorMessages';

// Feature Modules
export * from './neurology';
export * from './documents';

// Patient Components
export { default as PatientProfile } from './patients/PatientProfile';
export { default as PatientNotes } from './patients/PatientNotes';
export { default as NewPatientDialog } from './patients/NewPatientDialog'; 