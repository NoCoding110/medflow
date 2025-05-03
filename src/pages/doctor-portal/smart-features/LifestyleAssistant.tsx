import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Utensils } from 'lucide-react';
import AIInsightsBox from '@/components/AIInsightsBox';

const LifestyleAssistant = () => {
  const recommendations = {
    diet: [
      "Recommended Mediterranean diet plan based on cholesterol levels",
      "Suggested reducing sodium intake to manage blood pressure",
      "Added more fiber-rich foods to help with digestive issues"
    ],
    exercise: [
      "30 minutes of moderate cardio, 3 times per week",
      "Light resistance training to maintain muscle mass",
      "Morning stretching routine for flexibility"
    ],
    mindfulness: [
      "10-minute daily meditation sessions",
      "Deep breathing exercises for stress management",
      "Regular sleep schedule optimization"
    ]
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Lifestyle Assistant</h1>
      <AIInsightsBox />
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Diet Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.diet.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Exercise Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.exercise.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Mindfulness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.mindfulness.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LifestyleAssistant;
