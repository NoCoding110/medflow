import { createTestDoctor, createTestDoctorWithSampleData, ensureTestDoctor } from './test-data';

// Example: Create a test doctor
export const createSarahJohnson = async () => {
  return createTestDoctor({
    email: 'sarah@medflow.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialization: 'Internal Medicine',
    licenseNumber: 'MD123456',
    phoneNumber: '+1 (555) 123-4567',
    profileImage: 'https://example.com/sarah-johnson.jpg'
  });
};

// Example: Create a test doctor with sample data
export const createSarahJohnsonWithSampleData = async () => {
  return createTestDoctorWithSampleData({
    email: 'sarah@medflow.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialization: 'Internal Medicine',
    licenseNumber: 'MD123456',
    phoneNumber: '+1 (555) 123-4567',
    profileImage: 'https://example.com/sarah-johnson.jpg'
  });
};

// Example: Ensure a test doctor exists
export const ensureSarahJohnson = async () => {
  return ensureTestDoctor({
    email: 'sarah@medflow.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialization: 'Internal Medicine',
    licenseNumber: 'MD123456',
    phoneNumber: '+1 (555) 123-4567',
    profileImage: 'https://example.com/sarah-johnson.jpg'
  });
};

// Example: Create another test doctor
export const createJohnSmith = async () => {
  return createTestDoctor({
    email: 'john@medflow.com',
    firstName: 'John',
    lastName: 'Smith',
    specialization: 'Cardiology',
    licenseNumber: 'MD789012',
    phoneNumber: '+1 (555) 987-6543',
    profileImage: 'https://example.com/john-smith.jpg'
  });
}; 