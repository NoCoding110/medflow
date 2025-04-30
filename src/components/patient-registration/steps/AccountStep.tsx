
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Eye, EyeOff, Lock, User } from "lucide-react";

interface AccountStepProps {
  formData: {
    username: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  };
  email: string;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const AccountStep = ({ 
  formData, 
  email,
  updateFormData, 
  onNext,
  onPrevious
}: AccountStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    updateFormData({
      [name]: type === 'checkbox' ? checked : value
    });
    
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
        <h2 className="text-xl font-semibold mb-2">Create Your Account</h2>
        <p className="text-sm text-muted-foreground">
          Set up your login details for the patient portal
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Username *
          </Label>
          <Input
            id="username"
            name="username"
            value={formData.username || email}
            onChange={handleInputChange}
            placeholder="johndoe"
            className={errors.username ? "border-red-500" : ""}
          />
          {!errors.username && (
            <p className="text-xs text-muted-foreground mt-1">
              You can use your email address as your username
            </p>
          )}
          {errors.username && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.username}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            Password *
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={errors.password ? "border-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              tabIndex={-1}
            >
              {showPassword ? 
                <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                <Eye className="h-4 w-4 text-muted-foreground" />
              }
            </button>
          </div>
          {!errors.password && (
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 8 characters
            </p>
          )}
          {errors.password && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.password}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            Confirm Password *
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              tabIndex={-1}
            >
              {showConfirmPassword ? 
                <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                <Eye className="h-4 w-4 text-muted-foreground" />
              }
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.confirmPassword}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="acceptTerms" 
              checked={formData.acceptTerms} 
              onCheckedChange={(checked) => {
                updateFormData({ acceptTerms: !!checked });
                if (errors.acceptTerms) {
                  setErrors({ ...errors, acceptTerms: '' });
                }
              }}
            />
            <Label 
              htmlFor="acceptTerms" 
              className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.acceptTerms ? 'text-red-500' : ''}`}
            >
              I accept the <a href="#" className="text-primary underline">Terms of Use</a> and <a href="#" className="text-primary underline">Privacy Policy</a> *
            </Label>
          </div>
          {errors.acceptTerms && (
            <div className="flex items-center gap-1 text-sm text-red-500 pl-6">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.acceptTerms}</span>
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
