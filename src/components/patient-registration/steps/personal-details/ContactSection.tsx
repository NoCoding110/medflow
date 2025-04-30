
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Mail, Phone } from "lucide-react";

interface ContactSectionProps {
  phone: string;
  email: string;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactSection = ({ phone, email, errors, handleInputChange }: ContactSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          Phone Number *
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
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
      
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          Email *
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="johndoe@example.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};
