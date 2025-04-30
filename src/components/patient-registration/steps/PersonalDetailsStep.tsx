
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BasicInfoSection } from "./personal-details/BasicInfoSection";
import { ContactSection } from "./personal-details/ContactSection";
import { AddressSection } from "./personal-details/AddressSection";
import { format } from "date-fns";

interface PersonalDetailsStepProps {
  formData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
}

export const PersonalDetailsStep = ({ formData, updateFormData, onNext }: PersonalDetailsStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.address.street.trim()) newErrors.street = "Street is required";
    if (!formData.address.city.trim()) newErrors.city = "City is required";
    if (!formData.address.state.trim()) newErrors.state = "State is required";
    if (!formData.address.zip.trim()) newErrors.zip = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (formData[parent as keyof typeof formData] && 
          typeof formData[parent as keyof typeof formData] === 'object') {
        updateFormData({
          [parent]: {
            ...formData[parent as keyof typeof formData] as object,
            [child]: value
          }
        });
      }
    } else {
      updateFormData({ [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleGenderChange = (value: string) => {
    updateFormData({ gender: value });
    if (errors.gender) {
      setErrors({ ...errors, gender: '' });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      updateFormData({ dateOfBirth: format(date, "yyyy-MM-dd") });
      if (errors.dateOfBirth) {
        setErrors({ ...errors, dateOfBirth: '' });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
        <p className="text-sm text-muted-foreground">Please provide your basic information</p>
      </div>
      
      <BasicInfoSection
        firstName={formData.firstName}
        lastName={formData.lastName}
        dateOfBirth={formData.dateOfBirth}
        gender={formData.gender}
        errors={errors}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleGenderChange={handleGenderChange}
      />
      
      <ContactSection
        phone={formData.phone}
        email={formData.email}
        errors={errors}
        handleInputChange={handleInputChange}
      />
      
      <AddressSection
        address={formData.address}
        errors={errors}
        handleInputChange={handleInputChange}
      />
      
      <div className="pt-4 flex justify-end">
        <Button onClick={handleNext} type="button">
          Continue
        </Button>
      </div>
    </div>
  );
};
