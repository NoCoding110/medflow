import React, { useState } from "react";
import HealthChallenges from "@/components/patient-portal/HealthChallenges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Check, Calendar as CalendarIcon } from "lucide-react";
import { handleActionWithToast } from "@/lib/portal-utils";
import { Progress } from "@/components/ui/progress";

const PatientChallenges = () => {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [challengeProgress, setChallengeProgress] = useState<{[key: string]: number}>({
    "walking": 45,
    "hydration": 80,
    "meditation": 20,
  });
  
  const handleJoinChallenge = async (challengeId: string) => {
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setActiveChallenge(challengeId);
      },
      "You've joined the challenge!",
      "Failed to join challenge"
    );
  };
  
  const handleTrackProgress = async (challengeId: string) => {
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setChallengeProgress(prev => ({
          ...prev,
          [challengeId]: Math.min(100, prev[challengeId] + 10)
        }));
      },
      "Progress tracked successfully!",
      "Failed to track progress"
    );
  };
  
  const handleCompleteChallenge = async (challengeId: string) => {
    if (challengeProgress[challengeId] < 100) {
      return handleActionWithToast(
        async () => {
          throw new Error("Challenge not completed yet");
        },
        "",
        "You need to reach 100% to complete this challenge"
      );
    }
    
    await handleActionWithToast(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setActiveChallenge(null);
        // Reset progress
        setChallengeProgress(prev => ({
          ...prev,
          [challengeId]: 0
        }));
      },
      "Congratulations! Challenge completed!",
      "Failed to complete challenge"
    );
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Health Challenges</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Active Challenges</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="bg-blue-50 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  <span>10,000 Steps Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{challengeProgress["walking"]}%</span>
                  </div>
                  <Progress value={challengeProgress["walking"]} className="h-2" />
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Ends in 5 days
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleTrackProgress("walking")}
                >
                  Track Progress
                </Button>
                <Button 
                  size="sm" 
                  variant={challengeProgress["walking"] === 100 ? "default" : "ghost"} 
                  onClick={() => handleCompleteChallenge("walking")}
                  disabled={challengeProgress["walking"] < 100}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Complete
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-green-50 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-green-600" />
                  <span>Hydration Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{challengeProgress["hydration"]}%</span>
                  </div>
                  <Progress value={challengeProgress["hydration"]} className="h-2" />
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Ends in 3 days
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleTrackProgress("hydration")}
                >
                  Track Progress
                </Button>
                <Button 
                  size="sm" 
                  variant={challengeProgress["hydration"] === 100 ? "default" : "ghost"} 
                  onClick={() => handleCompleteChallenge("hydration")}
                  disabled={challengeProgress["hydration"] < 100}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Complete
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <HealthChallenges onJoinChallenge={handleJoinChallenge} />
      </div>
    </div>
  );
};

export default PatientChallenges;
