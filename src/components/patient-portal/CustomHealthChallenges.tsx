
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, Timer, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HealthChallengesProps {
  onJoinChallenge?: (challengeId: string) => Promise<void>;
}

export const CustomHealthChallenges = ({ onJoinChallenge }: HealthChallengesProps) => {
  const challenges = [
    {
      id: "meditation",
      title: "Daily Meditation",
      description: "Meditate for 10 minutes daily to reduce stress and improve focus.",
      participants: 423,
      duration: "4 weeks",
      category: "Mental Health",
      difficulty: "Beginner",
      reward: "250 points",
      icon: <Timer className="h-5 w-5 text-purple-500" />,
      color: "purple"
    },
    {
      id: "nutrition",
      title: "Plant-Based Week",
      description: "Try a plant-based diet for one week to explore new foods and reduce environmental impact.",
      participants: 156,
      duration: "1 week",
      category: "Nutrition",
      difficulty: "Intermediate",
      reward: "350 points",
      icon: <Activity className="h-5 w-5 text-green-500" />,
      color: "green"
    },
    {
      id: "sleep",
      title: "Sleep Improvement",
      description: "Establish a consistent sleep schedule to improve quality of rest and overall health.",
      participants: 289,
      duration: "3 weeks",
      category: "Wellness",
      difficulty: "Beginner",
      reward: "300 points",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      color: "blue"
    }
  ];

  const handleJoin = async (challengeId: string) => {
    if (onJoinChallenge) {
      await onJoinChallenge(challengeId);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Featured Challenges</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden">
            <CardHeader className={`bg-${challenge.color === "purple" ? "purple" : challenge.color === "green" ? "green" : "blue"}-50 pb-4`}>
              <div className="flex justify-between items-start">
                <div className={`h-10 w-10 rounded-full bg-${challenge.color === "purple" ? "purple" : challenge.color === "green" ? "green" : "blue"}-100 flex items-center justify-center`}>
                  {challenge.icon}
                </div>
                <Badge variant="outline" className="bg-white">
                  {challenge.difficulty}
                </Badge>
              </div>
              <CardTitle className="mt-2">{challenge.title}</CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{challenge.participants} participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{challenge.duration}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Reward: {challenge.reward}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button 
                className="w-full" 
                onClick={() => handleJoin(challenge.id)}
              >
                Join Challenge
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
