
import React from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfoFields } from "./patient-form/PersonalInfoFields";
import { ContactFields } from "./patient-form/ContactFields";
import { InsuranceFields } from "./patient-form/InsuranceFields";
import { usePatientForm } from "@/hooks/use-patient-form";

interface PatientFormProps {
  onSubmit?: (patient: any) => void;
  onCancel?: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, onCancel }) => {
  const {
    formData,
    errors,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = usePatientForm({ onSubmit, onCancel });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PersonalInfoFields
          formData={formData}
          errors={errors}
          onInputChange={handleChange}
          onSelectChange={handleSelectChange}
        />

        <ContactFields
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />

        <InsuranceFields
          formData={formData}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save Patient</Button>
      </div>
    </form>
  );
};

export default PatientForm;
