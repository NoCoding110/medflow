import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, Brain, Heart, Pill, Utensils } from "lucide-react";

interface AIInsightsStepProps {
  formData: {
    preferences: {
      aiInsights: {
        fitness: boolean;
        nutrition: boolean;
        vitals: boolean;
        mentalHealth: boolean;
        medication: boolean;
      };
    };
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const AIInsightsStep = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}: AIInsightsStepProps) => {
  const handleAiInsightChange = (type: string, checked: boolean) => {
    updateFormData({
      preferences: {
        ...formData.preferences,
        aiInsights: {
          ...formData.preferences.aiInsights,
          [type]: checked,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">AI Insights Preferences</h2>
        <p className="text-sm text-muted-foreground">
          Choose which types of AI-powered health insights you'd like to receive
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
          <Activity className="h-5 w-5 text-blue-500 mt-1" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fitnessInsights"
                checked={formData.preferences.aiInsights.fitness}
                onCheckedChange={(checked) =>
                  handleAiInsightChange("fitness", checked as boolean)
                }
              />
              <Label htmlFor="fitnessInsights" className="font-medium">
                Fitness Insights
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Get personalized recommendations for workouts, activity levels, and recovery based on your wearable data
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
          <Utensils className="h-5 w-5 text-green-500 mt-1" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="nutritionInsights"
                checked={formData.preferences.aiInsights.nutrition}
                onCheckedChange={(checked) =>
                  handleAiInsightChange("nutrition", checked as boolean)
                }
              />
              <Label htmlFor="nutritionInsights" className="font-medium">
                Nutrition Insights
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Receive dietary suggestions and meal planning advice based on your health goals and activity levels
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
          <Heart className="h-5 w-5 text-red-500 mt-1" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vitalsInsights"
                checked={formData.preferences.aiInsights.vitals}
                onCheckedChange={(checked) =>
                  handleAiInsightChange("vitals", checked as boolean)
                }
              />
              <Label htmlFor="vitalsInsights" className="font-medium">
                Vitals Insights
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Get alerts and trends analysis for your heart rate, blood pressure, and other vital signs
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
          <Brain className="h-5 w-5 text-purple-500 mt-1" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mentalHealthInsights"
                checked={formData.preferences.aiInsights.mentalHealth}
                onCheckedChange={(checked) =>
                  handleAiInsightChange("mentalHealth", checked as boolean)
                }
              />
              <Label htmlFor="mentalHealthInsights" className="font-medium">
                Mental Health Insights
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Receive mood tracking analysis and stress management recommendations based on your patterns
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
          <Pill className="h-5 w-5 text-orange-500 mt-1" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medicationInsights"
                checked={formData.preferences.aiInsights.medication}
                onCheckedChange={(checked) =>
                  handleAiInsightChange("medication", checked as boolean)
                }
              />
              <Label htmlFor="medicationInsights" className="font-medium">
                Medication Insights
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Get reminders and effectiveness analysis for your medications and treatments
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
}; 