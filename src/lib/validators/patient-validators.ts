
export const validatePatientForm = (formData: {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
}) => {
  const errors: Record<string, string> = {};
    
  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }
    
  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }
    
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  } else if (new Date(formData.dateOfBirth) > new Date()) {
    errors.dateOfBirth = "Date of birth cannot be in the future";
  }
    
  if (!formData.gender) {
    errors.gender = "Gender is required";
  }
    
  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
    
  return errors;
};
