// Core Features
export { default as Dashboard } from './core/dashboard/Dashboard';
export { default as Patients } from './core/patients/Patients';
export { default as Appointments } from './core/appointments/DoctorAppointments';
export { default as Lab } from './lab-integration/Lab';
export { default as Billing } from './billing/Billing';

// Patient Components
export { default as PatientProfile } from './core/patients/PatientProfile';
export { default as PatientNotes } from './core/patients/PatientNotes';
export { default as NewPatientDialog } from './core/patients/NewPatientDialog';

// Health Tracking
export { default as VitalsTracker } from './health-tracking/vitals/VitalsTracker';
export { default as NutritionTracker } from './health-tracking/nutrition/NutritionTracker';
export { default as FitnessTracking } from './health-tracking/fitness/FitnessTracking';
export { default as MedicationAdherence } from './health-tracking/medication/MedicationAdherence';

// AI Features
export { default as DoctorAIAssistant } from './ai-features/assistant/DoctorAIAssistant';
export { PredictiveAnalysis } from './ai-features/analysis/PredictiveAnalysis';
export { default as CarePathwayMonitor } from './ai-features/monitoring/CarePathwayMonitor';
export { default as SpecializedModules } from './ai-features/specialized/SpecializedModules';

// Collaboration
export { default as SecureMessaging } from './collaboration/SecureMessaging';
export { default as PatientMessaging } from './collaboration/PatientMessaging';
export { default as Telehealth } from './telehealth/DoctorTelehealth';

// Feature Modules
export * from './neurology';
export * from './documents'; 