import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { createPatient } from "@/lib/services/patient-service";
import { seedTestData } from "@/lib/services/test-data-generator";

export interface PatientRegistrationFormData {
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
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    contactNumber: string;
    cardImage: null | File;
  };
  medicalHistory: {
    allergies: string[];
    medications: string[];
    surgeries: string[];
    conditions: string[];
    primaryCarePhysician: string;
  };
  account: {
    username: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  };
  consent: {
    treatment: boolean;
    hipaa: boolean;
    marketing: boolean;
    wearableData: boolean;
    aiInsights: boolean;
    telehealth: boolean;
  };
  wearableDevices: {
    appleWatch: boolean;
    fitbit: boolean;
    ouraRing: boolean;
    other: string[];
  };
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    aiInsights: {
      fitness: boolean;
      nutrition: boolean;
      vitals: boolean;
      mentalHealth: boolean;
      medication: boolean;
    };
  };
}

export const usePatientRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PatientRegistrationFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: ""
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: ""
    },
    insurance: {
      provider: "",
      policyNumber: "",
      groupNumber: "",
      contactNumber: "",
      cardImage: null
    },
    medicalHistory: {
      allergies: [],
      medications: [],
      surgeries: [],
      conditions: [],
      primaryCarePhysician: ""
    },
    account: {
      username: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    },
    consent: {
      treatment: false,
      hipaa: false,
      marketing: false,
      wearableData: false,
      aiInsights: false,
      telehealth: false
    },
    wearableDevices: {
      appleWatch: false,
      fitbit: false,
      ouraRing: false,
      other: []
    },
    preferences: {
      notifications: {
        email: false,
        sms: false,
        push: false
      },
      aiInsights: {
        fitness: false,
        nutrition: false,
        vitals: false,
        mentalHealth: false,
        medication: false
      }
    }
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const updateFormData = (section: string, data: Record<string, any>) => {
    setFormData(prev => {
      const sectionData = prev[section as keyof typeof prev];
      if (sectionData && typeof sectionData === 'object') {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            ...data
          }
        };
      }
      return prev;
    });
  };

  const updatePersonalData = (data: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => {
      const next = prev + 1;
      window.scrollTo(0, 0);
      return next;
    });
  };

  const handlePrevious = () => {
    setCurrentStep(prev => {
      const next = prev - 1;
      window.scrollTo(0, 0);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const patient = await createPatient({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as "Male" | "Female" | "Other" | "Prefer not to say",
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address.street}, ${formData.address.city}, ${formData.address.state} ${formData.address.zip}`,
      });

      // Generate test data for the new patient
      await seedTestData(patient.id);
      
      toast({
        title: "Registration Complete",
        description: "Your patient account has been created successfully.",
        variant: "default",
      });
      
      navigate("/patients");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    currentStep,
    formData,
    updateFormData,
    updatePersonalData,
    handleNext,
    handlePrevious,
    handleSubmit
  };
};
