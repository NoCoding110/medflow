import { v4 as uuidv4 } from 'uuid';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff' | 'patient';
  status: 'active' | 'inactive' | 'pending';
  department?: string;
  lastLogin?: string;
  createdAt: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  departments: string[];
  staff: string[];
  settings: {
    appointmentDuration: number;
    maxAppointmentsPerDay: number;
    allowOnlineBooking: boolean;
    requireInsurance: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'appointment' | 'system' | 'alert' | 'reminder';
  title: string;
  message: string;
  recipient: string;
  status: 'unread' | 'read';
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Analytics {
  totalPatients: number;
  activePatients: number;
  totalAppointments: number;
  upcomingAppointments: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageRating: number;
  departmentStats: {
    [key: string]: {
      patients: number;
      appointments: number;
      revenue: number;
    };
  };
}

export interface BillingSettings {
  id: string;
  clinicId: string;
  insuranceProviders: string[];
  paymentMethods: string[];
  taxRate: number;
  lateFeePercentage: number;
  gracePeriod: number;
  autoBill: boolean;
  invoiceTemplate: string;
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: 'u1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@medflow.com',
    role: 'admin',
    status: 'active',
    department: 'Administration',
    lastLogin: '2024-03-20T09:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'u2',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@medflow.com',
    role: 'doctor',
    status: 'active',
    department: 'Cardiology',
    lastLogin: '2024-03-20T08:30:00Z',
    createdAt: '2024-01-15T00:00:00Z'
  }
];

export const mockClinics: Clinic[] = [
  {
    id: 'c1',
    name: 'MedFlow Main Clinic',
    address: '123 Medical Center Dr, Healthcare City, HC 12345',
    phone: '555-0001',
    email: 'main@medflow.com',
    hours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '10:00-14:00',
      sunday: 'Closed'
    },
    departments: ['Cardiology', 'Neurology', 'Pediatrics'],
    staff: ['u1', 'u2'],
    settings: {
      appointmentDuration: 30,
      maxAppointmentsPerDay: 20,
      allowOnlineBooking: true,
      requireInsurance: true
    }
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on March 25th, 2024 from 2 AM to 4 AM EST',
    recipient: 'all',
    status: 'unread',
    createdAt: '2024-03-19T10:00:00Z',
    priority: 'medium'
  },
  {
    id: 'n2',
    type: 'alert',
    title: 'High Patient Volume',
    message: 'Cardiology department is experiencing high patient volume',
    recipient: 'doctors',
    status: 'unread',
    createdAt: '2024-03-20T08:00:00Z',
    priority: 'high'
  }
];

export const mockAnalytics: Analytics = {
  totalPatients: 1500,
  activePatients: 1200,
  totalAppointments: 4500,
  upcomingAppointments: 150,
  totalRevenue: 1500000,
  monthlyRevenue: 125000,
  averageRating: 4.8,
  departmentStats: {
    Cardiology: {
      patients: 500,
      appointments: 1500,
      revenue: 500000
    },
    Neurology: {
      patients: 300,
      appointments: 900,
      revenue: 300000
    },
    Pediatrics: {
      patients: 700,
      appointments: 2100,
      revenue: 700000
    }
  }
};

export const mockBillingSettings: BillingSettings = {
  id: 'bs1',
  clinicId: 'c1',
  insuranceProviders: ['Aetna', 'Blue Cross', 'UnitedHealthcare'],
  paymentMethods: ['Credit Card', 'Debit Card', 'Insurance', 'Cash'],
  taxRate: 7.5,
  lateFeePercentage: 5,
  gracePeriod: 15,
  autoBill: true,
  invoiceTemplate: 'standard'
};

// Helper functions
export const getUsersByRole = (role: string) => {
  return mockUsers.filter(user => user.role === role);
};

export const getClinicSettings = (clinicId: string) => {
  return mockClinics.find(clinic => clinic.id === clinicId)?.settings;
};

export const getNotificationsByType = (type: string) => {
  return mockNotifications.filter(notification => notification.type === type);
};

export const getDepartmentStats = (department: string) => {
  return mockAnalytics.departmentStats[department];
};

export const getBillingSettings = (clinicId: string) => {
  return mockBillingSettings.clinicId === clinicId ? mockBillingSettings : null;
}; 