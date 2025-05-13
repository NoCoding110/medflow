import React from 'react';
import { usePatient } from '@/hooks/usePatient';
import { usePatientHealthAssistant } from '@/hooks/usePatientHealthAssistant';
import { useAuth } from '@/hooks/useAuth';

export function PatientHealthAssistant() {
  const { patient, isLoading: isPatientLoading, error: patientError } = usePatient();
  const { healthAssistant, isLoading: isHealthAssistantLoading, error: healthAssistantError } = usePatientHealthAssistant();
  const { user, isLoading: isAuthLoading, error: authError } = useAuth();

  if (isPatientLoading || isHealthAssistantLoading || isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (patientError) {
    return <div>Error loading patient data: {patientError.message}</div>;
  }

  if (healthAssistantError) {
    return <div>Error loading health assistant data: {healthAssistantError.message}</div>;
  }

  if (authError) {
    return <div>Error loading auth data: {authError.message}</div>;
  }

  if (!user) {
    return <div>Please sign in to access your health assistant</div>;
  }

  if (!patient || !healthAssistant) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Health Assistant</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
            <p><strong>Allergies:</strong> {patient.allergies}</p>
            <p><strong>Medications:</strong> {patient.medications}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Health Status</h2>
        <p className="mb-2"><strong>Current Status:</strong> {healthAssistant.healthStatus}</p>
        <p className="mb-2"><strong>Last Interaction:</strong> {healthAssistant.lastInteraction}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
        <ul className="list-disc pl-5">
          {healthAssistant.recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
        <ul className="list-disc pl-5">
          {healthAssistant.nextSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <p>{healthAssistant.notes}</p>
      </div>
    </div>
  );
} 