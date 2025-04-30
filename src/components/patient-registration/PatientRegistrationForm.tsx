
import { StepIndicator } from "./StepIndicator";
import { StepRenderer } from "./StepRenderer";
import { usePatientRegistration } from "@/hooks/use-patient-registration";

const steps = [
  "Personal Details",
  "Emergency Contact",
  "Insurance",
  "Medical History",
  "Account",
  "Consent",
  "Verification"
];

export const PatientRegistrationForm = () => {
  const {
    currentStep,
    formData,
    updateFormData,
    updatePersonalData,
    handleNext,
    handlePrevious,
    handleSubmit
  } = usePatientRegistration();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 border">
        <form onSubmit={(e) => e.preventDefault()}>
          <StepRenderer
            currentStep={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            updatePersonalData={updatePersonalData}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
