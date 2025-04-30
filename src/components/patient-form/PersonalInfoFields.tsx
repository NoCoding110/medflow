
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface PersonalInfoFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
  };
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  formData,
  errors,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={onInputChange}
          className={errors.firstName ? "border-red-500" : ""}
        />
        {errors.firstName && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.firstName}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={onInputChange}
          className={errors.lastName ? "border-red-500" : ""}
        />
        {errors.lastName && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.lastName}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={onInputChange}
          className={errors.dateOfBirth ? "border-red-500" : ""}
        />
        {errors.dateOfBirth && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.dateOfBirth}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender *</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => onSelectChange("gender", value)}
        >
          <SelectTrigger id="gender" className={errors.gender ? "border-red-500" : ""}>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.gender}</span>
          </div>
        )}
      </div>
    </div>
  );
};
