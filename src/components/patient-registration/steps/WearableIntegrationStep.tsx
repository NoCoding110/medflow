import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Smartphone, Watch, Activity } from "lucide-react";

interface WearableIntegrationStepProps {
  formData: {
    wearableDevices: {
      appleWatch: boolean;
      fitbit: boolean;
      ouraRing: boolean;
      other: string[];
    };
    preferences: {
      notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
      };
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

export const WearableIntegrationStep = ({
  formData,
  updateFormData,
  onNext,
  onPrevious
}: WearableIntegrationStepProps) => {
  const [otherDevices, setOtherDevices] = useState("");

  const handleDeviceChange = (device: string, checked: boolean) => {
    updateFormData({
      wearableDevices: {
        ...formData.wearableDevices,
        [device]: checked
      }
    });
  };

  const handleNotificationChange = (type: string, checked: boolean) => {
    updateFormData({
      preferences: {
        ...formData.preferences,
        notifications: {
          ...formData.preferences.notifications,
          [type]: checked
        }
      }
    });
  };

  const handleAiInsightChange = (type: string, checked: boolean) => {
    updateFormData({
      preferences: {
        ...formData.preferences,
        aiInsights: {
          ...formData.preferences.aiInsights,
          [type]: checked
        }
      }
    });
  };

  const handleAddOtherDevice = () => {
    if (otherDevices.trim()) {
      updateFormData({
        wearableDevices: {
          ...formData.wearableDevices,
          other: [...formData.wearableDevices.other, otherDevices.trim()]
        }
      });
      setOtherDevices("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Wearable Device Integration</h2>
        <p className="text-sm text-muted-foreground">
          Connect your wearable devices to enable real-time health monitoring
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Watch className="h-4 w-4 text-muted-foreground" />
            Select Your Devices
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="appleWatch"
                checked={formData.wearableDevices.appleWatch}
                onCheckedChange={(checked) => handleDeviceChange("appleWatch", checked as boolean)}
              />
              <Label htmlFor="appleWatch">Apple Watch</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fitbit"
                checked={formData.wearableDevices.fitbit}
                onCheckedChange={(checked) => handleDeviceChange("fitbit", checked as boolean)}
              />
              <Label htmlFor="fitbit">Fitbit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ouraRing"
                checked={formData.wearableDevices.ouraRing}
                onCheckedChange={(checked) => handleDeviceChange("ouraRing", checked as boolean)}
              />
              <Label htmlFor="ouraRing">Oura Ring</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Other Devices</Label>
          <div className="flex gap-2">
            <Input
              value={otherDevices}
              onChange={(e) => setOtherDevices(e.target.value)}
              placeholder="Enter other device name"
            />
            <Button type="button" onClick={handleAddOtherDevice}>
              Add
            </Button>
          </div>
          {formData.wearableDevices.other.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.wearableDevices.other.map((device, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm"
                >
                  {device}
                  <button
                    type="button"
                    onClick={() => {
                      updateFormData({
                        wearableDevices: {
                          ...formData.wearableDevices,
                          other: formData.wearableDevices.other.filter((_, i) => i !== index)
                        }
                      });
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            Notification Preferences
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emailNotifications"
                checked={formData.preferences.notifications.email}
                onCheckedChange={(checked) => handleNotificationChange("email", checked as boolean)}
              />
              <Label htmlFor="emailNotifications">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="smsNotifications"
                checked={formData.preferences.notifications.sms}
                onCheckedChange={(checked) => handleNotificationChange("sms", checked as boolean)}
              />
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pushNotifications"
                checked={formData.preferences.notifications.push}
                onCheckedChange={(checked) => handleNotificationChange("push", checked as boolean)}
              />
              <Label htmlFor="pushNotifications">Push Notifications</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            AI Insights Preferences
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fitnessInsights"
                checked={formData.preferences.aiInsights.fitness}
                onCheckedChange={(checked) => handleAiInsightChange("fitness", checked as boolean)}
              />
              <Label htmlFor="fitnessInsights">Fitness Insights</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="nutritionInsights"
                checked={formData.preferences.aiInsights.nutrition}
                onCheckedChange={(checked) => handleAiInsightChange("nutrition", checked as boolean)}
              />
              <Label htmlFor="nutritionInsights">Nutrition Insights</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vitalsInsights"
                checked={formData.preferences.aiInsights.vitals}
                onCheckedChange={(checked) => handleAiInsightChange("vitals", checked as boolean)}
              />
              <Label htmlFor="vitalsInsights">Vitals Insights</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mentalHealthInsights"
                checked={formData.preferences.aiInsights.mentalHealth}
                onCheckedChange={(checked) => handleAiInsightChange("mentalHealth", checked as boolean)}
              />
              <Label htmlFor="mentalHealthInsights">Mental Health Insights</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medicationInsights"
                checked={formData.preferences.aiInsights.medication}
                onCheckedChange={(checked) => handleAiInsightChange("medication", checked as boolean)}
              />
              <Label htmlFor="medicationInsights">Medication Insights</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}; 