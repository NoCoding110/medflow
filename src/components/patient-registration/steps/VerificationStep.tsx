
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface VerificationStepProps {
  formData: any;
  onPrevious: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const VerificationStep = ({ 
  formData, 
  onPrevious,
  onSubmit
}: VerificationStepProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true,
    emergency: false,
    insurance: false,
    medical: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Verify Your Information</h2>
        <p className="text-sm text-muted-foreground">
          Please review all your information before submitting
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Personal Details Section */}
        <div className="border rounded-md overflow-hidden">
          <div 
            className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('personal')}
          >
            <h3 className="font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              Personal Details
            </h3>
            {expandedSections.personal ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </div>
          
          {expandedSections.personal && (
            <div className="p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Full Name:</div>
                <div>{formData.firstName} {formData.lastName}</div>
                
                <div className="text-muted-foreground">Date of Birth:</div>
                <div>{new Date(formData.dateOfBirth).toLocaleDateString()}</div>
                
                <div className="text-muted-foreground">Gender:</div>
                <div>{formData.gender}</div>
                
                <div className="text-muted-foreground">Phone Number:</div>
                <div>{formData.phone}</div>
                
                <div className="text-muted-foreground">Email:</div>
                <div>{formData.email}</div>
                
                <div className="text-muted-foreground">Address:</div>
                <div>{formData.address.street}, {formData.address.city}, {formData.address.state} {formData.address.zip}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Emergency Contact Section */}
        <div className="border rounded-md overflow-hidden">
          <div 
            className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('emergency')}
          >
            <h3 className="font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              Emergency Contact
            </h3>
            {expandedSections.emergency ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </div>
          
          {expandedSections.emergency && (
            <div className="p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Name:</div>
                <div>{formData.emergencyContact.name}</div>
                
                <div className="text-muted-foreground">Relationship:</div>
                <div>{formData.emergencyContact.relationship}</div>
                
                <div className="text-muted-foreground">Phone Number:</div>
                <div>{formData.emergencyContact.phone}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Insurance Section */}
        <div className="border rounded-md overflow-hidden">
          <div 
            className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('insurance')}
          >
            <h3 className="font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              Insurance Information
            </h3>
            {expandedSections.insurance ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </div>
          
          {expandedSections.insurance && (
            <div className="p-4 space-y-2">
              {formData.insurance.provider ? (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Insurance Provider:</div>
                  <div>{formData.insurance.provider}</div>
                  
                  <div className="text-muted-foreground">Policy Number:</div>
                  <div>{formData.insurance.policyNumber}</div>
                  
                  <div className="text-muted-foreground">Group Number:</div>
                  <div>{formData.insurance.groupNumber}</div>
                  
                  <div className="text-muted-foreground">Contact Number:</div>
                  <div>{formData.insurance.contactNumber}</div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No insurance information provided</p>
              )}
              
              {formData.insurance.cardImage && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Insurance Card Image Uploaded</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Medical History Section */}
        <div className="border rounded-md overflow-hidden">
          <div 
            className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('medical')}
          >
            <h3 className="font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              Medical History
            </h3>
            {expandedSections.medical ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </div>
          
          {expandedSections.medical && (
            <div className="p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Allergies:</div>
                <div>
                  {formData.medicalHistory.allergies.length > 0 
                    ? formData.medicalHistory.allergies.join(', ') 
                    : 'None provided'}
                </div>
                
                <div className="text-muted-foreground">Current Medications:</div>
                <div>
                  {formData.medicalHistory.medications.length > 0 
                    ? formData.medicalHistory.medications.join(', ') 
                    : 'None provided'}
                </div>
                
                <div className="text-muted-foreground">Past Surgeries:</div>
                <div>
                  {formData.medicalHistory.surgeries.length > 0 
                    ? formData.medicalHistory.surgeries.join(', ') 
                    : 'None provided'}
                </div>
                
                <div className="text-muted-foreground">Existing Medical Conditions:</div>
                <div>
                  {formData.medicalHistory.conditions.length > 0 
                    ? formData.medicalHistory.conditions.join(', ') 
                    : 'None provided'}
                </div>
                
                <div className="text-muted-foreground">Primary Care Physician:</div>
                <div>
                  {formData.medicalHistory.primaryCarePhysician || 'None provided'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border rounded-md bg-green-50 mt-6">
        <p className="font-medium flex items-center mb-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
          Ready to Submit
        </p>
        <p className="text-sm">
          By clicking "Complete Registration" below, you confirm that all provided information 
          is accurate to the best of your knowledge.
        </p>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button onClick={onPrevious} type="button" variant="outline">
          Previous
        </Button>
        <Button onClick={onSubmit} type="submit">
          Complete Registration
        </Button>
      </div>
    </div>
  );
};
