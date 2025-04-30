
import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="w-full">
      <div className="hidden sm:flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div 
              key={index} 
              className="flex flex-col items-center relative flex-1"
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full 
                ${isCompleted ? 'bg-primary text-white' : isActive ? 'bg-primary/20 border-2 border-primary' : 'bg-gray-200'}
                transition-colors duration-200
              `}>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className={`
                mt-2 text-xs font-medium
                ${isCompleted || isActive ? 'text-primary' : 'text-gray-500'}
              `}>
                {step}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute w-full h-0.5 top-4 -right-1/2">
                  <div className={`
                    h-full ${isCompleted ? 'bg-primary' : 'bg-gray-200'}
                    transition-colors duration-200
                  `}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Mobile view - just show current step name and number */}
      <div className="sm:hidden flex items-center justify-center">
        <div className="bg-primary/10 px-4 py-2 rounded-full">
          <span className="font-medium">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </span>
        </div>
      </div>
    </div>
  );
};
