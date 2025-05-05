import { PersonalDetailsStep } from "./steps/PersonalDetailsStep";
import { EmergencyContactStep } from "./steps/EmergencyContactStep";
import { InsuranceStep } from "./steps/InsuranceStep";
import { MedicalHistoryStep } from "./steps/MedicalHistoryStep";
import { WearableIntegrationStep } from "./steps/WearableIntegrationStep";
import { AccountStep } from "./steps/AccountStep";
import { ConsentStep } from "./steps/ConsentStep";
import { VerificationStep } from "./steps/VerificationStep";
import { PatientRegistrationFormData } from "@/hooks/use-patient-registration";

interface StepRendererProps {
  currentStep: number;
  formData: PatientRegistrationFormData;
  updateFormData: (section: string, data: Record<string, any>) => void;
  updatePersonalData: (data: Record<string, any>) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const StepRenderer = ({
  currentStep,
  formData,
  updateFormData,
  updatePersonalData,
  handleNext,
  handlePrevious,
  handleSubmit
}: StepRendererProps) => {
  switch (currentStep) {
    case 0:
      return (
        <PersonalDetailsStep 
          formData={formData} 
          updateFormData={updatePersonalData}
          onNext={handleNext}
        />
      );
    case 1:
      return (
        <EmergencyContactStep 
          formData={formData.emergencyContact} 
          updateFormData={(data) => updateFormData("emergencyContact", data)} 
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      );
    case 2:
      return (
        <InsuranceStep 
          formData={formData.insurance} 
          updateFormData={(data) => updateFormData("insurance", data)} 
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      );
    case 3:
      return (
        <MedicalHistoryStep 
          formData={formData.medicalHistory} 
          updateFormData={(data) => updateFormData("medicalHistory", data)} 
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      );
    case 4:
      return (
        <WearableIntegrationStep
          formData={{
            wearableDevices: formData.wearableDevices,
            preferences: formData.preferences
          }}
          updateFormData={(data) => updateFormData("wearableDevices", data)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      );
    case 5:
      return (
        <AccountStep 
          formData={formData.account} 
          email={formData.email}
          updateFormData={(data) => updateFormData("account", data)} 
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      );
    case 6:
      return (
        <ConsentStep 
          formData={formData.consent} 
          updateFormData={(data) => updateFormData("consent", data)} 
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      );
    case 7:
      return (
        <VerificationStep 
          formData={formData} 
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      );
    default:
      return null;
  }
};
