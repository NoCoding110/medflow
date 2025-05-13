import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PatientHealthAssistant } from './PatientHealthAssistant';
import { usePatient } from '@/hooks/usePatient';
import { usePatientHealthAssistant } from '@/hooks/usePatientHealthAssistant';
import { useAuth } from '@/hooks/useAuth';

// Mock the hooks
jest.mock('@/hooks/usePatient');
jest.mock('@/hooks/usePatientHealthAssistant');
jest.mock('@/hooks/useAuth');

describe('PatientHealthAssistant', () => {
  const mockPatient = {
    id: '1',
    name: 'John Doe',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    medicalHistory: 'Some medical history',
    allergies: 'No known allergies',
    medications: 'Current medications',
    lastVisit: '2024-01-01',
    nextAppointment: '2024-02-01',
    insurance: {
      provider: 'Test Insurance',
      policyNumber: '123456',
      groupNumber: '789012',
      coverageDetails: 'Full coverage'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '123-456-7890'
    }
  };

  const mockHealthAssistant = {
    id: '1',
    patientId: '1',
    lastInteraction: '2024-01-01',
    healthStatus: 'Good',
    recommendations: ['Exercise regularly', 'Eat healthy'],
    nextSteps: ['Schedule follow-up', 'Get blood work done'],
    notes: 'Patient is doing well'
  };

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    role: 'patient'
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock usePatient hook
    (usePatient as jest.Mock).mockReturnValue({
      patient: mockPatient,
      isLoading: false,
      error: null
    });

    // Mock usePatientHealthAssistant hook
    (usePatientHealthAssistant as jest.Mock).mockReturnValue({
      healthAssistant: mockHealthAssistant,
      isLoading: false,
      error: null,
      updateHealthAssistant: jest.fn()
    });

    // Mock useAuth hook
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null
    });
  });

  it('renders loading state when patient data is loading', () => {
    (usePatient as jest.Mock).mockReturnValue({
      patient: null,
      isLoading: true,
      error: null
    });

    render(<PatientHealthAssistant />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state when there is an error loading patient data', () => {
    (usePatient as jest.Mock).mockReturnValue({
      patient: null,
      isLoading: false,
      error: new Error('Failed to load patient data')
    });

    render(<PatientHealthAssistant />);
    expect(screen.getByText(/error loading patient data/i)).toBeInTheDocument();
  });

  it('renders loading state when health assistant data is loading', () => {
    (usePatientHealthAssistant as jest.Mock).mockReturnValue({
      healthAssistant: null,
      isLoading: true,
      error: null,
      updateHealthAssistant: jest.fn()
    });

    render(<PatientHealthAssistant />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state when there is an error loading health assistant data', () => {
    (usePatientHealthAssistant as jest.Mock).mockReturnValue({
      healthAssistant: null,
      isLoading: false,
      error: new Error('Failed to load health assistant data'),
      updateHealthAssistant: jest.fn()
    });

    render(<PatientHealthAssistant />);
    expect(screen.getByText(/error loading health assistant data/i)).toBeInTheDocument();
  });

  it('renders loading state when auth data is loading', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
      error: null
    });

    render(<PatientHealthAssistant />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state when there is an error loading auth data', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      error: new Error('Failed to load auth data')
    });

    render(<PatientHealthAssistant />);
    expect(screen.getByText(/error loading auth data/i)).toBeInTheDocument();
  });

  it('renders authentication required message when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      error: null
    });

    render(<PatientHealthAssistant />);
    expect(screen.getByText(/please sign in to access your health assistant/i)).toBeInTheDocument();
  });

  it('renders patient health assistant data when all data is loaded', async () => {
    render(<PatientHealthAssistant />);

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Check if patient information is displayed
    expect(screen.getByText(mockPatient.name)).toBeInTheDocument();
    expect(screen.getByText(mockPatient.medicalHistory)).toBeInTheDocument();
    expect(screen.getByText(mockPatient.allergies)).toBeInTheDocument();
    expect(screen.getByText(mockPatient.medications)).toBeInTheDocument();

    // Check if health assistant information is displayed
    expect(screen.getByText(mockHealthAssistant.healthStatus)).toBeInTheDocument();
    mockHealthAssistant.recommendations.forEach(recommendation => {
      expect(screen.getByText(recommendation)).toBeInTheDocument();
    });
    mockHealthAssistant.nextSteps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
    expect(screen.getByText(mockHealthAssistant.notes)).toBeInTheDocument();
  });
}); 