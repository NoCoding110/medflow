
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, MapPin } from "lucide-react";

interface AddressSectionProps {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressSection = ({ address, errors, handleInputChange }: AddressSectionProps) => {
  return (
    <div className="border-t pt-4 mt-6">
      <h3 className="text-lg font-medium mb-4">Address Information</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="street" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Street Address *
          </Label>
          <Input
            id="street"
            name="address.street"
            value={address.street}
            onChange={handleInputChange}
            placeholder="123 Main St"
            className={errors.street ? "border-red-500" : ""}
          />
          {errors.street && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.street}</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              name="address.city"
              value={address.city}
              onChange={handleInputChange}
              placeholder="Anytown"
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && (
              <div className="flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.city}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              name="address.state"
              value={address.state}
              onChange={handleInputChange}
              placeholder="CA"
              className={errors.state ? "border-red-500" : ""}
            />
            {errors.state && (
              <div className="flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.state}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code *</Label>
            <Input
              id="zip"
              name="address.zip"
              value={address.zip}
              onChange={handleInputChange}
              placeholder="12345"
              className={errors.zip ? "border-red-500" : ""}
            />
            {errors.zip && (
              <div className="flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.zip}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
