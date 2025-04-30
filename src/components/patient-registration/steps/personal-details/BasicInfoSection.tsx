
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Calendar, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface BasicInfoSectionProps {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleGenderChange: (value: string) => void;
}

export const BasicInfoSection = ({ 
  firstName,
  lastName,
  dateOfBirth,
  gender,
  errors,
  handleInputChange,
  handleDateChange,
  handleGenderChange
}: BasicInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          First Name *
        </Label>
        <Input
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
          placeholder="John"
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
        <Label htmlFor="lastName" className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          Last Name *
        </Label>
        <Input
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
          placeholder="Doe"
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
        <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          Date of Birth *
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="dateOfBirth"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateOfBirth && "text-muted-foreground",
                errors.dateOfBirth && "border-red-500"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateOfBirth ? format(new Date(dateOfBirth), "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={dateOfBirth ? new Date(dateOfBirth) : undefined}
              onSelect={handleDateChange}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        {errors.dateOfBirth && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.dateOfBirth}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gender" className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          Gender *
        </Label>
        <Select
          value={gender}
          onValueChange={handleGenderChange}
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
