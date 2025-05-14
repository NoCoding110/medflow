import { Admin, Doctor, Patient, UUID } from './types';
import { addDays, format, subYears, subDays } from 'date-fns';

// Helper functions to create dates
const now = new Date();
const formatDate = (date: Date): string => format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
const pastDate = (years: number) => formatDate(subYears(now, years));
const futureDate = (days: number) => formatDate(addDays(now, days));
const recentPastDate = (days: number) => formatDate(subDays(now, days));

// Admins
export const admins: Admin[] = [
  {
    id: '1a2b3c4d-admin1',
    email: 'admin@medflow.com',
    firstName: 'System',
    lastName: 'Administrator',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'admin',
    phone: '555-123-4567',
    createdAt: pastDate(5),
    updatedAt: recentPastDate(30),
    active: true,
    department: 'IT',
    accessLevel: 'full',
    permissions: ['all'],
  },
  {
    id: '1a2b3c4d-admin2',
    email: 'clinic-admin@medflow.com',
    firstName: 'Clinic',
    lastName: 'Manager',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'admin',
    phone: '555-123-8901',
    createdAt: pastDate(3),
    updatedAt: recentPastDate(14),
    active: true,
    department: 'Operations',
    accessLevel: 'limited',
    permissions: ['users.read', 'users.create', 'appointments.all', 'billing.all'],
  },
  {
    id: '1a2b3c4d-admin3',
    email: 'reports@medflow.com',
    firstName: 'Data',
    lastName: 'Analyst',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: 'admin',
    phone: '555-123-2345',
    createdAt: pastDate(1),
    updatedAt: recentPastDate(5),
    active: true,
    department: 'Analytics',
    accessLevel: 'read-only',
    permissions: ['analytics.read', 'reports.generate'],
  }
];

// Doctors
export const doctors: Doctor[] = [
  {
    id: '1a2b3c4d-doctor1',
    email: 'dr.johnson@medflow.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    role: 'doctor',
    phone: '555-234-5678',
    createdAt: pastDate(4),
    updatedAt: recentPastDate(10),
    active: true,
    specialization: 'Cardiology',
    licenseNumber: 'MD12345',
    department: 'Cardiology',
    availableForTelehealth: true,
    qualifications: ['MD', 'Ph.D.', 'FACC'],
    languages: ['English', 'Spanish'],
    bio: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
    ratings: {
      overall: 4.8,
      count: 245
    }
  },
  {
    id: '1a2b3c4d-doctor2',
    email: 'dr.patel@medflow.com',
    firstName: 'Rahul',
    lastName: 'Patel',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    role: 'doctor',
    phone: '555-234-9012',
    createdAt: pastDate(3.5),
    updatedAt: recentPastDate(15),
    active: true,
    specialization: 'Neurology',
    licenseNumber: 'MD23456',
    department: 'Neurology',
    availableForTelehealth: true,
    qualifications: ['MD', 'FAAN'],
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Dr. Patel specializes in treatment of neurological disorders including migraines, epilepsy, and multiple sclerosis.',
    ratings: {
      overall: 4.7,
      count: 189
    }
  },
  {
    id: '1a2b3c4d-doctor3',
    email: 'dr.williams@medflow.com',
    firstName: 'James',
    lastName: 'Williams',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    role: 'doctor',
    phone: '555-234-3456',
    createdAt: pastDate(3),
    updatedAt: recentPastDate(8),
    active: true,
    specialization: 'Primary Care',
    licenseNumber: 'MD34567',
    department: 'Family Medicine',
    availableForTelehealth: true,
    qualifications: ['MD', 'FAAFP'],
    languages: ['English'],
    bio: 'Dr. Williams has been providing comprehensive family care for patients of all ages for over a decade.',
    ratings: {
      overall: 4.9,
      count: 312
    }
  },
  {
    id: '1a2b3c4d-doctor4',
    email: 'dr.kim@medflow.com',
    firstName: 'Joy',
    lastName: 'Kim',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    role: 'doctor',
    phone: '555-234-7890',
    createdAt: pastDate(2),
    updatedAt: recentPastDate(20),
    active: true,
    specialization: 'Pediatrics',
    licenseNumber: 'MD45678',
    department: 'Pediatrics',
    availableForTelehealth: true,
    qualifications: ['MD', 'FAAP'],
    languages: ['English', 'Korean'],
    bio: 'Dr. Kim is passionate about child health and development, with a special interest in childhood asthma management.',
    ratings: {
      overall: 4.9,
      count: 276
    }
  },
  {
    id: '1a2b3c4d-doctor5',
    email: 'dr.rodriguez@medflow.com',
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    role: 'doctor',
    phone: '555-234-1234',
    createdAt: pastDate(1.5),
    updatedAt: recentPastDate(12),
    active: true,
    specialization: 'Orthopedics',
    licenseNumber: 'MD56789',
    department: 'Orthopedics',
    availableForTelehealth: false,
    qualifications: ['MD', 'FAAOS'],
    languages: ['English', 'Spanish'],
    bio: 'Dr. Rodriguez specializes in sports medicine and joint replacement surgery.',
    ratings: {
      overall: 4.6,
      count: 157
    }
  }
];

// Patients
export const patients: Patient[] = [
  {
    id: '1a2b3c4d-patient1',
    email: 'michael.brown@example.com',
    firstName: 'Michael',
    lastName: 'Brown',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    role: 'patient',
    phone: '555-345-6789',
    createdAt: pastDate(2),
    updatedAt: recentPastDate(5),
    active: true,
    dateOfBirth: pastDate(45),
    gender: 'male',
    address: {
      street: '123 Oak Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Susan Brown',
      relationship: 'Wife',
      phone: '555-345-6780'
    },
    primaryDoctorId: '1a2b3c4d-doctor3',
    insuranceInfo: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS12345678',
      groupNumber: 'GRP987654',
      validFrom: pastDate(1),
      validUntil: futureDate(365),
      copay: 25,
      coverageDetails: 'Full coverage with $25 copay for primary care visits'
    },
    medicalHistory: {
      allergies: ['Penicillin'],
      chronicConditions: ['Hypertension'],
      medications: ['Lisinopril 10mg daily'],
      pastSurgeries: ['Appendectomy (2010)'],
      familyHistory: ['Father: Heart disease', 'Mother: Diabetes']
    },
    vitalStats: {
      date: recentPastDate(30),
      height: 180,
      weight: 85,
      bloodPressure: {
        systolic: 128,
        diastolic: 82
      },
      temperature: 36.6,
      heartRate: 72,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      bloodGlucose: 95
    }
  },
  {
    id: '1a2b3c4d-patient2',
    email: 'emily.davis@example.com',
    firstName: 'Emily',
    lastName: 'Davis',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    role: 'patient',
    phone: '555-345-9012',
    createdAt: pastDate(1.8),
    updatedAt: recentPastDate(3),
    active: true,
    dateOfBirth: pastDate(29),
    gender: 'female',
    address: {
      street: '456 Maple Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Robert Davis',
      relationship: 'Father',
      phone: '555-345-9013'
    },
    primaryDoctorId: '1a2b3c4d-doctor4',
    insuranceInfo: {
      provider: 'Aetna',
      policyNumber: 'AET87654321',
      groupNumber: 'GRP123456',
      validFrom: pastDate(0.5),
      validUntil: futureDate(350),
      copay: 20,
      coverageDetails: 'Full coverage with $20 copay'
    },
    medicalHistory: {
      allergies: ['Shellfish', 'Pollen'],
      chronicConditions: ['Asthma'],
      medications: ['Albuterol inhaler as needed'],
      pastSurgeries: [],
      familyHistory: ['Maternal grandmother: Breast cancer']
    },
    vitalStats: {
      date: recentPastDate(15),
      height: 165,
      weight: 62,
      bloodPressure: {
        systolic: 118,
        diastolic: 75
      },
      temperature: 36.5,
      heartRate: 68,
      respiratoryRate: 14,
      oxygenSaturation: 99,
      bloodGlucose: 90
    }
  },
  {
    id: '1a2b3c4d-patient3',
    email: 'david.wilson@example.com',
    firstName: 'David',
    lastName: 'Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    role: 'patient',
    phone: '555-345-3456',
    createdAt: pastDate(1.5),
    updatedAt: recentPastDate(10),
    active: true,
    dateOfBirth: pastDate(65),
    gender: 'male',
    address: {
      street: '789 Pine Lane',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Martha Wilson',
      relationship: 'Wife',
      phone: '555-345-3457'
    },
    primaryDoctorId: '1a2b3c4d-doctor1',
    insuranceInfo: {
      provider: 'Medicare',
      policyNumber: 'MED98765432',
      validFrom: pastDate(3),
      validUntil: futureDate(548),
      copay: 0,
      coverageDetails: 'Medicare Part A & B with Part D prescription coverage'
    },
    medicalHistory: {
      allergies: ['Sulfa drugs'],
      chronicConditions: ['Coronary Artery Disease', 'Type 2 Diabetes'],
      medications: ['Metformin 1000mg twice daily', 'Aspirin 81mg daily', 'Atorvastatin 20mg daily'],
      pastSurgeries: ['Coronary bypass (2015)', 'Knee replacement (2018)'],
      familyHistory: ['Father: Heart attack at 60', 'Brother: Type 2 Diabetes']
    },
    vitalStats: {
      date: recentPastDate(7),
      height: 175,
      weight: 88,
      bloodPressure: {
        systolic: 132,
        diastolic: 84
      },
      temperature: 36.7,
      heartRate: 76,
      respiratoryRate: 18,
      oxygenSaturation: 96,
      bloodGlucose: 126
    }
  },
  {
    id: '1a2b3c4d-patient4',
    email: 'sophia.martinez@example.com',
    firstName: 'Sophia',
    lastName: 'Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    role: 'patient',
    phone: '555-345-7890',
    createdAt: pastDate(1.2),
    updatedAt: recentPastDate(2),
    active: true,
    dateOfBirth: pastDate(35),
    gender: 'female',
    address: {
      street: '101 Cedar Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Luis Martinez',
      relationship: 'Husband',
      phone: '555-345-7891'
    },
    primaryDoctorId: '1a2b3c4d-doctor3',
    insuranceInfo: {
      provider: 'United Healthcare',
      policyNumber: 'UHC54321678',
      groupNumber: 'GRP456789',
      validFrom: pastDate(0.8),
      validUntil: futureDate(320),
      copay: 30,
      coverageDetails: 'Full coverage with $30 copay'
    },
    medicalHistory: {
      allergies: ['Latex'],
      chronicConditions: ['Migraine'],
      medications: ['Sumatriptan as needed'],
      pastSurgeries: ['Cesarean section (2019)'],
      familyHistory: ['Mother: Migraines', 'Maternal aunt: Breast cancer']
    },
    vitalStats: {
      date: recentPastDate(45),
      height: 162,
      weight: 58,
      bloodPressure: {
        systolic: 120,
        diastolic: 78
      },
      temperature: 36.4,
      heartRate: 70,
      respiratoryRate: 16,
      oxygenSaturation: 99,
      bloodGlucose: 88
    }
  },
  {
    id: '1a2b3c4d-patient5',
    email: 'robert.taylor@example.com',
    firstName: 'Robert',
    lastName: 'Taylor',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    role: 'patient',
    phone: '555-345-1234',
    createdAt: pastDate(1),
    updatedAt: recentPastDate(4),
    active: true,
    dateOfBirth: pastDate(52),
    gender: 'male',
    address: {
      street: '222 Elm Boulevard',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Patricia Taylor',
      relationship: 'Sister',
      phone: '555-345-1235'
    },
    primaryDoctorId: '1a2b3c4d-doctor5',
    insuranceInfo: {
      provider: 'Cigna',
      policyNumber: 'CIG13579246',
      groupNumber: 'GRP789012',
      validFrom: pastDate(1.5),
      validUntil: futureDate(395),
      copay: 35,
      coverageDetails: 'High deductible health plan'
    },
    medicalHistory: {
      allergies: [],
      chronicConditions: ['Osteoarthritis'],
      medications: ['Ibuprofen 800mg as needed', 'Glucosamine daily'],
      pastSurgeries: ['Meniscus repair (2016)'],
      familyHistory: ['Mother: Rheumatoid arthritis']
    },
    vitalStats: {
      date: recentPastDate(20),
      height: 183,
      weight: 95,
      bloodPressure: {
        systolic: 135,
        diastolic: 85
      },
      temperature: 36.5,
      heartRate: 74,
      respiratoryRate: 17,
      oxygenSaturation: 97,
      bloodGlucose: 105
    }
  }
];

// Utility functions for data access
export const getUserById = (id: UUID): Admin | Doctor | Patient | undefined => {
  return [...admins, ...doctors, ...patients].find(user => user.id === id);
};

export const getUsersByRole = (role: 'admin' | 'doctor' | 'patient'): (Admin | Doctor | Patient)[] => {
  switch (role) {
    case 'admin':
      return admins;
    case 'doctor':
      return doctors;
    case 'patient':
      return patients;
    default:
      return [];
  }
};

export const searchUsers = (query: string): (Admin | Doctor | Patient)[] => {
  const search = query.toLowerCase();
  return [...admins, ...doctors, ...patients].filter(user => {
    return (
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      (user.phone && user.phone.includes(query))
    );
  });
}; 