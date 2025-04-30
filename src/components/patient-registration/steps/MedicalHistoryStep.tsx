
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Stethoscope, Pill, User } from "lucide-react";

interface MedicalHistoryStepProps {
  formData: {
    allergies: string[];
    medications: string[];
    surgeries: string[];
    conditions: string[];
    primaryCarePhysician: string;
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const MedicalHistoryStep = ({ 
  formData, 
  updateFormData, 
  onNext,
  onPrevious
}: MedicalHistoryStepProps) => {
  // Skip validation for medical history as it's optional at signup
  const handleNext = () => {
    onNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'allergies' || name === 'medications' || name === 'surgeries' || name === 'conditions') {
      // Split by comma for array fields
      updateFormData({ [name]: value ? value.split(',').map(item => item.trim()) : [] });
    } else {
      updateFormData({ [name]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Medical History</h2>
        <p className="text-sm text-muted-foreground">
          This information helps us provide you with better care (optional)
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="allergies" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            Known Allergies
          </Label>
          <Textarea
            id="allergies"
            name="allergies"
            placeholder="List allergies separated by commas (e.g., Penicillin, Peanuts, Latex)"
            value={formData.allergies.join(', ')}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Please include all allergies including medications, foods, and environmental factors
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="medications" className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-muted-foreground" />
            Current Medications
          </Label>
          <Textarea
            id="medications"
            name="medications"
            placeholder="List medications with dosages separated by commas (e.g., Lisinopril 10mg, Metformin 500mg)"
            value={formData.medications.join(', ')}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="surgeries">
            Past Surgeries
          </Label>
          <Textarea
            id="surgeries"
            name="surgeries"
            placeholder="List surgeries with approximate dates separated by commas (e.g., Appendectomy 2018, Knee replacement 2020)"
            value={formData.surgeries.join(', ')}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="conditions">
            Existing Medical Conditions
          </Label>
          <Textarea
            id="conditions"
            name="conditions"
            placeholder="List medical conditions separated by commas (e.g., Diabetes, Hypertension, Asthma)"
            value={formData.conditions.join(', ')}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="primaryCarePhysician" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Primary Care Physician
          </Label>
          <Input
            id="primaryCarePhysician"
            name="primaryCarePhysician"
            placeholder="Dr. Name"
            value={formData.primaryCarePhysician}
            onChange={handleInputChange}
          />
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
