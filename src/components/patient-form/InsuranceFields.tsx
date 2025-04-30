
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InsuranceFieldsProps {
  formData: {
    insuranceProvider: string;
    insuranceNumber: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InsuranceFields: React.FC<InsuranceFieldsProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="insuranceProvider">Insurance Provider</Label>
        <Input
          id="insuranceProvider"
          name="insuranceProvider"
          value={formData.insuranceProvider}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="insuranceNumber">Insurance Number</Label>
        <Input
          id="insuranceNumber"
          name="insuranceNumber"
          value={formData.insuranceNumber}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
