
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, FileImage, Phone, Shield } from "lucide-react";

interface InsuranceStepProps {
  formData: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    contactNumber: string;
    cardImage: File | null;
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const InsuranceStep = ({ 
  formData, 
  updateFormData, 
  onNext,
  onPrevious
}: InsuranceStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Skip validation for insurance as it's optional
  const handleNext = () => {
    onNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ cardImage: file });
      
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Cleanup function
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Insurance Information</h2>
        <p className="text-sm text-muted-foreground">
          This information is optional but helps us process your claims faster
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="provider" className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            Insurance Provider
          </Label>
          <Input
            id="provider"
            name="provider"
            value={formData.provider}
            onChange={handleInputChange}
            placeholder="Blue Cross, Aetna, etc."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="policyNumber">
              Policy Number
            </Label>
            <Input
              id="policyNumber"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleInputChange}
              placeholder="XXXXXXXXXXXX"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="groupNumber">
              Group Number
            </Label>
            <Input
              id="groupNumber"
              name="groupNumber"
              value={formData.groupNumber}
              onChange={handleInputChange}
              placeholder="XXXXXX"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactNumber" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            Insurance Contact Number
          </Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="(555) 555-5555"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardImage" className="flex items-center gap-2">
            <FileImage className="h-4 w-4 text-muted-foreground" />
            Upload Insurance Card Image
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="cardImage"
              name="cardImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="max-w-sm"
            />
            {previewUrl && (
              <div className="border rounded-md overflow-hidden w-24 h-16 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Insurance card preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Upload an image of the front of your insurance card (optional)
          </p>
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
