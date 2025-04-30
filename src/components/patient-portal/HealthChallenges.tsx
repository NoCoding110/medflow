
import React from "react";
import { CustomHealthChallenges } from "./CustomHealthChallenges";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface HealthChallengesProps {
  onJoinChallenge?: (challengeId: string) => Promise<void>;
}

export const HealthChallenges = ({ onJoinChallenge }: HealthChallengesProps) => {
  // Create a default implementation if none is provided
  const { mutate: defaultJoinChallenge } = useApiMutation(
    async (challengeId: string) => {
      // Simulate API call to join a challenge
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, challengeId };
    }
  );

  const handleJoinChallenge = async (challengeId: string): Promise<void> => {
    if (onJoinChallenge) {
      await onJoinChallenge(challengeId);
      return;
    }
    
    await defaultJoinChallenge(challengeId, {
      successMessage: "You've joined the challenge successfully!",
      errorMessage: "Failed to join the challenge. Please try again."
    });
    
    // Return void explicitly
    return;
  };
  
  return <CustomHealthChallenges onJoinChallenge={handleJoinChallenge} />;
};
