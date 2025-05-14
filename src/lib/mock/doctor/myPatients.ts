import { Patient, UUID } from '../shared/types';
import { patients } from '../shared/users';
import { getMedicalRecordsByPatientId } from '../shared/medicalRecords';
import { getAppointmentsByPatientId } from '../shared/appointments';
import { subMonths, subYears, format, isWithinInterval, subDays } from 'date-fns';

// Get patients assigned to a specific doctor
export const getMyPatients = (doctorId: UUID): Patient[] => {
  // In a real app, this would filter based on a proper relationship.
  // For mock data, we'll use the primaryDoctorId field and also 
  // return some patients without a primary doctor
  return patients.filter(patient => 
    patient.primaryDoctorId === doctorId || 
    !patient.primaryDoctorId // Some patients without assigned doctor
  );
};

// Get a single patient by ID with additional doctor-specific info
export const getPatientDetail = (patientId: UUID, doctorId: UUID) => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return null;
  
  // Additional information that a doctor would want to see
  return {
    ...patient,
    medicalRecords: getMedicalRecordsByPatientId(patientId),
    recentAppointments: getAppointmentsByPatientId(patientId)
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
      .slice(0, 5),
    // Patient compliance metrics
    compliance: {
      medicationAdherence: Math.random() * 0.2 + 0.8, // 80-100% adherence
      appointmentAttendance: Math.random() * 0.15 + 0.85, // 85-100% attendance
      followUpCompletion: Math.random() * 0.3 + 0.7, // 70-100% follow-up completion
      lastCheckupDate: format(subMonths(new Date(), Math.floor(Math.random() * 6)), "yyyy-MM-dd'T'HH:mm:ss.sss'Z'")
    },
    // Risk factors and alerts
    riskProfile: {
      overallRisk: Math.random() * 0.5, // 0-50% risk
      heartDiseaseRisk: patient.medicalHistory?.familyHistory?.some(h => h.includes('Heart')) ? 
        Math.random() * 0.4 + 0.2 : Math.random() * 0.2, // 20-60% or 0-20%
      diabetesRisk: patient.medicalHistory?.familyHistory?.some(h => h.includes('Diabetes')) ? 
        Math.random() * 0.4 + 0.2 : Math.random() * 0.2, // 20-60% or 0-20%
      cancerRisk: patient.medicalHistory?.familyHistory?.some(h => h.includes('cancer')) ? 
        Math.random() * 0.3 + 0.1 : Math.random() * 0.1, // 10-40% or 0-10%
      alerts: generatePatientAlerts(patient)
    },
    // Treatment response tracking
    treatmentResponse: {
      currentMedications: patient.medicalHistory?.medications || [],
      medicationEffectiveness: Math.random() * 0.3 + 0.7, // 70-100% effective
      sideEffectsReported: Math.random() < 0.3, // 30% chance of side effects
      treatmentAdherence: Math.random() * 0.2 + 0.8 // 80-100% adherence
    }
  };
};

// Generate patient alerts based on their profile data
const generatePatientAlerts = (patient: Patient) => {
  const alerts = [];
  const now = new Date();
  
  // Check for overdue checkup (if it's been more than 1 year)
  const lastCheckupDate = new Date(patient.vitalStats?.date || '');
  if (isWithinInterval(lastCheckupDate, { 
    start: subYears(now, 100), // Just a large value to ensure we capture old dates
    end: subYears(now, 1) 
  })) {
    alerts.push({
      type: 'checkup',
      severity: 'medium',
      message: 'Annual checkup overdue',
      daysOverdue: Math.floor((now.getTime() - subYears(now, 1).getTime()) / (1000 * 60 * 60 * 24))
    });
  }
  
  // Check for high blood pressure
  if (patient.vitalStats?.bloodPressure?.systolic && patient.vitalStats.bloodPressure.systolic > 140) {
    alerts.push({
      type: 'vitals',
      severity: 'high',
      message: 'Elevated blood pressure detected',
      value: `${patient.vitalStats.bloodPressure.systolic}/${patient.vitalStats.bloodPressure.diastolic}`
    });
  }
  
  // Check for elevated blood glucose
  if (patient.vitalStats?.bloodGlucose && patient.vitalStats.bloodGlucose > 110) {
    alerts.push({
      type: 'vitals',
      severity: patient.vitalStats.bloodGlucose > 125 ? 'high' : 'medium',
      message: 'Elevated blood glucose detected',
      value: `${patient.vitalStats.bloodGlucose} mg/dL`
    });
  }
  
  // Check for patients with chronic conditions
  if (patient.medicalHistory?.chronicConditions?.length) {
    alerts.push({
      type: 'condition',
      severity: 'info',
      message: 'Has chronic condition(s)',
      conditions: patient.medicalHistory.chronicConditions.join(', ')
    });
  }
  
  // Check for medication alerts (just a random example)
  if (patient.medicalHistory?.medications?.length && Math.random() < 0.3) {
    alerts.push({
      type: 'medication',
      severity: 'medium',
      message: 'Potential medication interaction detected',
      medications: patient.medicalHistory.medications.slice(0, 2).join(' and ')
    });
  }
  
  // Add allergies as alert
  if (patient.medicalHistory?.allergies?.length) {
    alerts.push({
      type: 'allergy',
      severity: 'high',
      message: 'Has documented allergies',
      allergies: patient.medicalHistory.allergies.join(', ')
    });
  }
  
  return alerts;
};

// Get statistics about assigned patients for doctor dashboard
export const getPatientStatistics = (doctorId: UUID) => {
  const myPatients = getMyPatients(doctorId);
  const now = new Date();
  
  // Calculate patient age distribution
  const ages = myPatients.map(patient => {
    const birthDate = new Date(patient.dateOfBirth);
    const age = now.getFullYear() - birthDate.getFullYear();
    return age;
  });
  
  const ageGroups = {
    under18: ages.filter(age => age < 18).length,
    age18to35: ages.filter(age => age >= 18 && age <= 35).length,
    age36to50: ages.filter(age => age >= 36 && age <= 50).length,
    age51to65: ages.filter(age => age >= 51 && age <= 65).length,
    over65: ages.filter(age => age > 65).length
  };
  
  // Calculate gender distribution
  const genderDistribution = {
    male: myPatients.filter(p => p.gender === 'male').length,
    female: myPatients.filter(p => p.gender === 'female').length,
    other: myPatients.filter(p => p.gender === 'other' || p.gender === 'prefer-not-to-say').length
  };
  
  // Calculate chronic condition prevalence
  const conditionCounts: Record<string, number> = {};
  myPatients.forEach(patient => {
    patient.medicalHistory?.chronicConditions?.forEach(condition => {
      conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
    });
  });
  
  // Sort conditions by frequency
  const topConditions = Object.entries(conditionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([condition, count]) => ({
      condition,
      count,
      percentage: (count / myPatients.length) * 100
    }));
  
  // Calculate new vs. established patients
  const threeMonthsAgo = subMonths(now, 3);
  const newPatients = myPatients.filter(p => new Date(p.createdAt) >= threeMonthsAgo).length;
  const establishedPatients = myPatients.length - newPatients;
  
  return {
    totalPatients: myPatients.length,
    ageDistribution: ageGroups,
    genderDistribution,
    topChronicConditions: topConditions,
    newVsEstablished: {
      new: newPatients,
      established: establishedPatients,
      newPercentage: (newPatients / myPatients.length) * 100
    },
    highRiskPatients: Math.floor(myPatients.length * 0.15), // 15% of patients considered high risk
    patientsOverdueForCheckup: Math.floor(myPatients.length * 0.2) // 20% overdue
  };
}; 