// Legacy exports (to be phased out as migration to new structure completes)
export { mockDb } from './db';

// New mock data structure exports
// Shared data accessible across different user roles
export * from './shared/types';
export { 
  admins, 
  doctors, 
  patients, 
  getUserById, 
  getUsersByRole, 
  searchUsers 
} from './shared/users';

export { 
  appointments, 
  getTodayAppointments, 
  getAppointmentById, 
  getAppointmentsByPatientId, 
  getAppointmentsByDoctorId, 
  getUpcomingAppointmentsByPatientId, 
  getUpcomingAppointmentsByDoctorId, 
  getPastAppointmentsByPatientId, 
  getPastAppointmentsByDoctorId 
} from './shared/appointments';

export { 
  medicalRecords, 
  getMedicalRecordById, 
  getMedicalRecordsByPatientId, 
  getMedicalRecordsByDoctorId, 
  getMedicalRecordsByType, 
  getRelatedRecords 
} from './shared/medicalRecords';

export {
  labReports,
  getLabReportById,
  getLabReportsByPatientId,
  getLabReportsByDoctorId,
  getRecentLabReports
} from './shared/labReports';

// Doctor-specific data and utilities
export { 
  getDoctorMetrics, 
  getDoctorActivity, 
  getDoctorTasks, 
  getDoctorDashboardData 
} from './doctor/dashboard';

export { 
  getMyPatients, 
  getPatientDetail, 
  getPatientStatistics 
} from './doctor/myPatients'; 