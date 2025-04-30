
import { useState } from "react";
import { Patient } from "@/lib/data";
import { validatePatientForm } from "@/lib/validators/patient-validators";
import { useToast } from "@/components/ui/use-toast";
import { createPatient } from "@/lib/data";

interface UsePatientFormProps {
  onSubmit?: (patient: Patient) => void;
  onCancel?: () => void;
}

export const usePatientForm = ({ onSubmit, onCancel }: UsePatientFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    insuranceProvider: "",
    insuranceNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validatePatientForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) return;
    
    try {
      const gender = formData.gender as "Male" | "Female" | "Other" | "Prefer not to say";
      
      const newPatient = createPatient({
        ...formData,
        gender,
        medicalHistory: {
          conditions: [],
          surgeries: [],
          familyHistory: [],
          immunizations: [],
        },
        allergies: [],
        medications: [],
      });
      
      toast({
        title: "Success",
        description: "Patient record created successfully",
        variant: "default",
      });
      
      if (onSubmit) {
        onSubmit(newPatient);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create patient record",
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
};
