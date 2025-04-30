import { HealthMetric, Medication, Symptom, HealthGoal, EmergencyContact } from '@/types/health';

export const testPatients = [
  {
    id: 'P001',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: new Date('2024-02-15'),
    nextAppointment: new Date('2024-03-15'),
    healthMetrics: [
      {
        type: 'bloodPressure',
        value: 145,
        unit: 'mmHg',
        timestamp: new Date('2024-02-20T10:00:00'),
        status: 'warning'
      },
      {
        type: 'bloodSugar',
        value: 180,
        unit: 'mg/dL',
        timestamp: new Date('2024-02-20T08:00:00'),
        status: 'warning'
      },
      {
        type: 'heartRate',
        value: 85,
        unit: 'bpm',
        timestamp: new Date('2024-02-20T09:00:00'),
        status: 'normal'
      }
    ] as HealthMetric[],
    medications: [
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        nextDose: new Date('2024-02-21T08:00:00'),
        notes: 'Take with meals'
      },
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        nextDose: new Date('2024-02-21T07:00:00'),
        notes: 'Take in the morning'
      }
    ] as Medication[],
    symptoms: [
      {
        name: 'Headache',
        severity: 'mild',
        duration: '2 hours',
        notes: 'Occasional tension headache'
      },
      {
        name: 'Fatigue',
        severity: 'moderate',
        duration: '3 days',
        notes: 'Worse in the afternoon'
      }
    ] as Symptom[],
    healthGoals: [
      {
        title: 'Blood Pressure Control',
        target: 'Maintain BP below 140/90',
        progress: 75,
        deadline: new Date('2024-06-01'),
        status: 'in-progress'
      },
      {
        title: 'Daily Exercise',
        target: '30 minutes walking daily',
        progress: 60,
        deadline: new Date('2024-04-01'),
        status: 'in-progress'
      }
    ] as HealthGoal[],
    emergencyContacts: [
      {
        name: 'Sarah Smith',
        relationship: 'Spouse',
        phone: '+1-555-0123',
        isPrimary: true
      },
      {
        name: 'Dr. Michael Johnson',
        relationship: 'Primary Care Physician',
        phone: '+1-555-0124',
        isPrimary: false
      }
    ] as EmergencyContact[]
  },
  {
    id: 'P002',
    name: 'Emily Johnson',
    age: 32,
    gender: 'Female',
    conditions: ['Asthma', 'Seasonal Allergies'],
    lastVisit: new Date('2024-02-10'),
    nextAppointment: new Date('2024-03-10'),
    healthMetrics: [
      {
        type: 'temperature',
        value: 37.2,
        unit: '°C',
        timestamp: new Date('2024-02-20T14:00:00'),
        status: 'normal'
      },
      {
        type: 'heartRate',
        value: 72,
        unit: 'bpm',
        timestamp: new Date('2024-02-20T14:00:00'),
        status: 'normal'
      }
    ] as HealthMetric[],
    medications: [
      {
        name: 'Albuterol',
        dosage: '90mcg',
        frequency: 'As needed',
        nextDose: new Date('2024-02-21T00:00:00'),
        notes: 'Use before exercise'
      },
      {
        name: 'Fluticasone',
        dosage: '220mcg',
        frequency: 'Twice daily',
        nextDose: new Date('2024-02-21T08:00:00'),
        notes: 'Inhaled corticosteroid'
      }
    ] as Medication[],
    symptoms: [
      {
        name: 'Shortness of Breath',
        severity: 'moderate',
        duration: '1 hour',
        notes: 'Triggered by exercise'
      }
    ] as Symptom[],
    healthGoals: [
      {
        title: 'Asthma Control',
        target: 'Reduce rescue inhaler use to once per week',
        progress: 80,
        deadline: new Date('2024-05-01'),
        status: 'in-progress'
      }
    ] as HealthGoal[],
    emergencyContacts: [
      {
        name: 'David Johnson',
        relationship: 'Spouse',
        phone: '+1-555-0125',
        isPrimary: true
      }
    ] as EmergencyContact[]
  },
  {
    id: 'P003',
    name: 'Robert Chen',
    age: 58,
    gender: 'Male',
    conditions: ['Arthritis', 'High Cholesterol'],
    lastVisit: new Date('2024-02-05'),
    nextAppointment: new Date('2024-03-05'),
    healthMetrics: [
      {
        type: 'bloodPressure',
        value: 138,
        unit: 'mmHg',
        timestamp: new Date('2024-02-20T11:00:00'),
        status: 'normal'
      },
      {
        type: 'heartRate',
        value: 68,
        unit: 'bpm',
        timestamp: new Date('2024-02-20T11:00:00'),
        status: 'normal'
      }
    ] as HealthMetric[],
    medications: [
      {
        name: 'Atorvastatin',
        dosage: '40mg',
        frequency: 'Once daily',
        nextDose: new Date('2024-02-21T20:00:00'),
        notes: 'Take with dinner'
      },
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed',
        nextDose: new Date('2024-02-21T00:00:00'),
        notes: 'For joint pain'
      }
    ] as Medication[],
    symptoms: [
      {
        name: 'Joint Pain',
        severity: 'moderate',
        duration: '2 weeks',
        notes: 'Worse in right knee'
      }
    ] as Symptom[],
    healthGoals: [
      {
        title: 'Cholesterol Management',
        target: 'LDL below 100 mg/dL',
        progress: 90,
        deadline: new Date('2024-04-01'),
        status: 'in-progress'
      },
      {
        title: 'Physical Activity',
        target: '30 minutes of low-impact exercise daily',
        progress: 40,
        deadline: new Date('2024-05-01'),
        status: 'at-risk'
      }
    ] as HealthGoal[],
    emergencyContacts: [
      {
        name: 'Lisa Chen',
        relationship: 'Daughter',
        phone: '+1-555-0126',
        isPrimary: true
      }
    ] as EmergencyContact[]
  }
];

// Function to load test data into localStorage
export const loadTestData = (patientId: string) => {
  const patient = testPatients.find(p => p.id === patientId);
  if (!patient) return;

  localStorage.setItem('health_metrics', JSON.stringify(patient.healthMetrics));
  localStorage.setItem('medications', JSON.stringify(patient.medications));
  localStorage.setItem('symptoms', JSON.stringify(patient.symptoms));
  localStorage.setItem('health_goals', JSON.stringify(patient.healthGoals));
  localStorage.setItem('emergency_contacts', JSON.stringify(patient.emergencyContacts));
};

// Function to get all test patients
export const getAllTestPatients = () => testPatients;

// Function to get a specific test patient
export const getTestPatient = (patientId: string) => {
  return testPatients.find(p => p.id === patientId);
}; 