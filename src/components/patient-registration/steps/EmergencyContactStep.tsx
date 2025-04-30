
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Phone, User } from "lucide-react";

interface EmergencyContactStepProps {
  formData: {
    name: string;
    relationship: string;
    phone: string;
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const EmergencyContactStep = ({ 
  formData, 
  updateFormData, 
  onNext,
  onPrevious
}: EmergencyContactStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.relationship.trim()) newErrors.relationship = "Relationship is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Emergency Contact</h2>
        <p className="text-sm text-muted-foreground">
          Who should we contact in case of an emergency?
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Jane Doe"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="relationship" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Relationship *
          </Label>
          <Input
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleInputChange}
            placeholder="Spouse, Parent, Child, etc."
            className={errors.relationship ? "border-red-500" : ""}
          />
          {errors.relationship && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.relationship}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergencyPhone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            Phone Number *
          </Label>
          <Input
            id="emergencyPhone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(555) 555-5555"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.phone}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button onClick={onPrevious} type="button" variant="outline">
          Previous
        </Button>
        <Button onClick={handleNext} type="button">
          Continue
        </Button>
      </div>
    </div>
  );
};
