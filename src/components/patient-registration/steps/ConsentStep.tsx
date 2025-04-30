
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle, ShieldAlert, ShieldCheck } from "lucide-react";

interface ConsentStepProps {
  formData: {
    treatment: boolean;
    hipaa: boolean;
    marketing: boolean;
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ConsentStep = ({ 
  formData, 
  updateFormData, 
  onNext,
  onPrevious
}: ConsentStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.treatment) {
      newErrors.treatment = "You must consent to treatment to continue";
    }
    
    if (!formData.hipaa) {
      newErrors.hipaa = "You must acknowledge the HIPAA Notice to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckedChange = (name: string, checked: boolean) => {
    updateFormData({ [name]: checked });
    
    // Clear error when checking
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
        <h2 className="text-xl font-semibold mb-2">Consent and Acknowledgments</h2>
        <p className="text-sm text-muted-foreground">
          Please review and accept the following terms
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="p-4 border rounded-md bg-blue-50">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="treatment" 
                checked={formData.treatment} 
                onCheckedChange={(checked) => handleCheckedChange('treatment', !!checked)}
              />
              <Label 
                htmlFor="treatment" 
                className={`leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium ${errors.treatment ? 'text-red-500' : ''}`}
              >
                Consent to Treatment *
              </Label>
            </div>
            
            <div className="pl-6 text-sm text-muted-foreground">
              <p>
                I voluntarily consent to receive medical and healthcare services provided by MedFlow Connect's doctors, 
                nurses, and other healthcare professionals. I understand that I may refuse specific treatments.
              </p>
            </div>
            
            {errors.treatment && (
              <div className="flex items-center gap-1 text-sm text-red-500 pl-6">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.treatment}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border rounded-md bg-blue-50">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hipaa" 
                checked={formData.hipaa} 
                onCheckedChange={(checked) => handleCheckedChange('hipaa', !!checked)}
              />
              <Label 
                htmlFor="hipaa" 
                className={`leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium ${errors.hipaa ? 'text-red-500' : ''}`}
              >
                <span className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-blue-600" />
                  Acknowledgment of HIPAA Notice of Privacy Practices *
                </span>
              </Label>
            </div>
            
            <div className="pl-6 text-sm text-muted-foreground">
              <p>
                I acknowledge that I have received a copy of the Notice of Privacy Practices, 
                which explains how my health information will be used and disclosed.
              </p>
            </div>
            
            {errors.hipaa && (
              <div className="flex items-center gap-1 text-sm text-red-500 pl-6">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.hipaa}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border rounded-md">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="marketing" 
                checked={formData.marketing} 
                onCheckedChange={(checked) => handleCheckedChange('marketing', !!checked)}
              />
              <Label 
                htmlFor="marketing" 
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Marketing Communications (Optional)
              </Label>
            </div>
            
            <div className="pl-6 text-sm text-muted-foreground">
              <p>
                I agree to receive educational materials, appointment reminders, and other information 
                about services, health news, and promotions from MedFlow Connect.
              </p>
            </div>
          </div>
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
