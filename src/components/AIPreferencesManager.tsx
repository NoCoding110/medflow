import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Brain, Pill, Utensils, Bell, Eye } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface AIPreferences {
  fitness: {
    enabled: boolean;
    frequency: string;
    thresholds: {
      steps: number;
      activeMinutes: number;
      caloriesBurned: number;
    };
    notifications: {
      enabled: boolean;
      channels: string[];
    };
  };
  nutrition: {
    enabled: boolean;
    frequency: string;
    goals: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    notifications: {
      enabled: boolean;
      channels: string[];
    };
  };
  vitals: {
    enabled: boolean;
    frequency: string;
    thresholds: {
      heartRate: {
        min: number;
        max: number;
      };
      bloodPressure: {
        systolic: {
          min: number;
          max: number;
        };
        diastolic: {
          min: number;
          max: number;
        };
      };
      bloodOxygen: {
        min: number;
      };
    };
    notifications: {
      enabled: boolean;
      channels: string[];
    };
  };
  mentalHealth: {
    enabled: boolean;
    frequency: string;
    metrics: {
      stress: boolean;
      mood: boolean;
      sleep: boolean;
    };
    notifications: {
      enabled: boolean;
      channels: string[];
    };
  };
  medication: {
    enabled: boolean;
    frequency: string;
    reminders: boolean;
    interactions: boolean;
    adherence: boolean;
    notifications: {
      enabled: boolean;
      channels: string[];
    };
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    compactMode: boolean;
    showMetadata: boolean;
    showTimestamps: boolean;
  };
}

const AIPreferencesManager: React.FC = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<AIPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  const fetchPreferences = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('ai_insights')
        .select('preferences')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setPreferences(data.preferences);
      } else {
        // Create default preferences
        const defaultPreferences: AIPreferences = {
          fitness: {
            enabled: true,
            frequency: 'daily',
            thresholds: {
              steps: 5000,
              activeMinutes: 30,
              caloriesBurned: 2000
            },
            notifications: {
              enabled: true,
              channels: ['email', 'push']
            }
          },
          nutrition: {
            enabled: true,
            frequency: 'daily',
            goals: {
              calories: 2000,
              protein: 150,
              carbs: 250,
              fat: 70
            },
            notifications: {
              enabled: true,
              channels: ['email']
            }
          },
          vitals: {
            enabled: true,
            frequency: 'realtime',
            thresholds: {
              heartRate: { min: 60, max: 100 },
              bloodPressure: {
                systolic: { min: 90, max: 120 },
                diastolic: { min: 60, max: 80 }
              },
              bloodOxygen: { min: 95 }
            },
            notifications: {
              enabled: true,
              channels: ['email', 'push']
            }
          },
          mentalHealth: {
            enabled: true,
            frequency: 'daily',
            metrics: {
              stress: true,
              mood: true,
              sleep: true
            },
            notifications: {
              enabled: true,
              channels: ['email']
            }
          },
          medication: {
            enabled: true,
            frequency: 'realtime',
            reminders: true,
            interactions: true,
            adherence: true,
            notifications: {
              enabled: true,
              channels: ['email', 'push']
            }
          },
          display: {
            theme: 'system',
            compactMode: false,
            showMetadata: true,
            showTimestamps: true
          }
        };

        const { error: insertError } = await supabase
          .from('ai_insights')
          .insert([{ user_id: user.id, preferences: defaultPreferences }]);
        
        if (insertError) throw insertError;
        setPreferences(defaultPreferences);
      }
    } catch (error) {
      toast.error('Failed to load AI preferences');
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    if (!user || !preferences) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('ai_insights')
        .update({ preferences })
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success('AI preferences saved successfully');
    } catch (error) {
      toast.error('Failed to save AI preferences');
    } finally {
      setSaving(false);
    }
  };

  const updatePreference = (category: keyof AIPreferences, field: string, value: any) => {
    if (!preferences) return;
    
    setPreferences(prev => {
      if (!prev) return prev;
      const newPrefs = { ...prev };
      const categoryPrefs = newPrefs[category];
      
      if (typeof field === 'string' && field.includes('.')) {
        const [parent, child] = field.split('.');
        (categoryPrefs as any)[parent][child] = value;
      } else {
        (categoryPrefs as any)[field] = value;
      }
      
      return newPrefs;
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Preferences</CardTitle>
          <CardDescription>Loading preferences...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!preferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Preferences</CardTitle>
          <CardDescription>Failed to load preferences</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Preferences</CardTitle>
        <CardDescription>Customize your AI health insights and recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fitness Preferences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <Label className="text-lg font-semibold">Fitness Insights</Label>
            </div>
            <Switch
              checked={preferences.fitness.enabled}
              onCheckedChange={(checked) => updatePreference('fitness', 'enabled', checked)}
            />
          </div>
          {preferences.fitness.enabled && (
            <div className="pl-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Update Frequency</Label>
                  <Select
                    value={preferences.fitness.frequency}
                    onValueChange={(value) => updatePreference('fitness', 'frequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Daily Steps Goal</Label>
                  <Input
                    type="number"
                    value={preferences.fitness.thresholds.steps}
                    onChange={(e) => updatePreference('fitness', 'thresholds.steps', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label>Notifications</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={preferences.fitness.notifications.enabled}
                    onCheckedChange={(checked) => updatePreference('fitness', 'notifications.enabled', checked)}
                  />
                  <Label>Enable Notifications</Label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vitals Preferences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <Label className="text-lg font-semibold">Vitals Monitoring</Label>
            </div>
            <Switch
              checked={preferences.vitals.enabled}
              onCheckedChange={(checked) => updatePreference('vitals', 'enabled', checked)}
            />
          </div>
          {preferences.vitals.enabled && (
            <div className="pl-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Heart Rate Range (min)</Label>
                  <Input
                    type="number"
                    value={preferences.vitals.thresholds.heartRate.min}
                    onChange={(e) => updatePreference('vitals', 'thresholds.heartRate.min', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Heart Rate Range (max)</Label>
                  <Input
                    type="number"
                    value={preferences.vitals.thresholds.heartRate.max}
                    onChange={(e) => updatePreference('vitals', 'thresholds.heartRate.max', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label>Notifications</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={preferences.vitals.notifications.enabled}
                    onCheckedChange={(checked) => updatePreference('vitals', 'notifications.enabled', checked)}
                  />
                  <Label>Enable Notifications</Label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mental Health Preferences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <Label className="text-lg font-semibold">Mental Health Tracking</Label>
            </div>
            <Switch
              checked={preferences.mentalHealth.enabled}
              onCheckedChange={(checked) => updatePreference('mentalHealth', 'enabled', checked)}
            />
          </div>
          {preferences.mentalHealth.enabled && (
            <div className="pl-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Update Frequency</Label>
                  <Select
                    value={preferences.mentalHealth.frequency}
                    onValueChange={(value) => updatePreference('mentalHealth', 'frequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tracked Metrics</Label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={preferences.mentalHealth.metrics.stress}
                      onCheckedChange={(checked) => updatePreference('mentalHealth', 'metrics.stress', checked)}
                    />
                    <Label>Stress</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={preferences.mentalHealth.metrics.mood}
                      onCheckedChange={(checked) => updatePreference('mentalHealth', 'metrics.mood', checked)}
                    />
                    <Label>Mood</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={preferences.mentalHealth.metrics.sleep}
                      onCheckedChange={(checked) => updatePreference('mentalHealth', 'metrics.sleep', checked)}
                    />
                    <Label>Sleep</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label>Notifications</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={preferences.mentalHealth.notifications.enabled}
                    onCheckedChange={(checked) => updatePreference('mentalHealth', 'notifications.enabled', checked)}
                  />
                  <Label>Enable Notifications</Label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Medication Preferences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-orange-500" />
              <Label className="text-lg font-semibold">Medication Management</Label>
            </div>
            <Switch
              checked={preferences.medication.enabled}
              onCheckedChange={(checked) => updatePreference('medication', 'enabled', checked)}
            />
          </div>
          {preferences.medication.enabled && (
            <div className="pl-7 space-y-4">
              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={preferences.medication.reminders}
                      onCheckedChange={(checked) => updatePreference('medication', 'reminders', checked)}
                    />
                    <Label>Reminders</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={preferences.medication.interactions}
                      onCheckedChange={(checked) => updatePreference('medication', 'interactions', checked)}
                    />
                    <Label>Interaction Alerts</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={preferences.medication.adherence}
                      onCheckedChange={(checked) => updatePreference('medication', 'adherence', checked)}
                    />
                    <Label>Adherence Tracking</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label>Notifications</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={preferences.medication.notifications.enabled}
                    onCheckedChange={(checked) => updatePreference('medication', 'notifications.enabled', checked)}
                  />
                  <Label>Enable Notifications</Label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Display Preferences */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-gray-500" />
            <Label className="text-lg font-semibold">Display Settings</Label>
          </div>
          <div className="pl-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Theme</Label>
                <Select
                  value={preferences.display.theme}
                  onValueChange={(value) => updatePreference('display', 'theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={preferences.display.compactMode}
                  onCheckedChange={(checked) => updatePreference('display', 'compactMode', checked)}
                />
                <Label>Compact Mode</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={preferences.display.showMetadata}
                  onCheckedChange={(checked) => updatePreference('display', 'showMetadata', checked)}
                />
                <Label>Show Metadata</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={preferences.display.showTimestamps}
                  onCheckedChange={(checked) => updatePreference('display', 'showTimestamps', checked)}
                />
                <Label>Show Timestamps</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={savePreferences} disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPreferencesManager; 