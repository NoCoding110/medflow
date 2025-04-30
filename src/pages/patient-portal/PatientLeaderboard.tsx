import React from "react";
import { BarChartHorizontal, Award, Medal, Trophy } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar?: string;
}

const PatientLeaderboard = () => {
  // Sample data for weekly leaderboard
  const weeklyLeaderboard: LeaderboardEntry[] = [
    { id: "l1", name: "Sarah M.", points: 1250, rank: 1 },
    { id: "l2", name: "John P.", points: 1120, rank: 2 },
    { id: "l3", name: "Alex T.", points: 980, rank: 3 },
    { id: "l4", name: "You", points: 860, rank: 4 },
    { id: "l5", name: "David R.", points: 750, rank: 5 },
    { id: "l6", name: "Maria C.", points: 720, rank: 6 },
    { id: "l7", name: "James W.", points: 690, rank: 7 },
    { id: "l8", name: "Lisa K.", points: 640, rank: 8 },
    { id: "l9", name: "Robert F.", points: 590, rank: 9 },
    { id: "l10", name: "Anna P.", points: 520, rank: 10 },
  ];

  // Sample data for monthly leaderboard
  const monthlyLeaderboard: LeaderboardEntry[] = [
    { id: "m1", name: "John P.", points: 5480, rank: 1 },
    { id: "m2", name: "Sarah M.", points: 5320, rank: 2 },
    { id: "m3", name: "You", points: 4150, rank: 3 },
    { id: "m4", name: "Alex T.", points: 3980, rank: 4 },
    { id: "m5", name: "Maria C.", points: 3720, rank: 5 },
  ];

  // Sample data for challenge leaderboard
  const challengeLeaderboard: LeaderboardEntry[] = [
    { id: "c1", name: "You", points: 2150, rank: 1 },
    { id: "c2", name: "David R.", points: 1950, rank: 2 },
    { id: "c3", name: "Lisa K.", points: 1800, rank: 3 },
    { id: "c4", name: "Sarah M.", points: 1650, rank: 4 },
    { id: "c5", name: "John P.", points: 1520, rank: 5 },
  ];

  const renderLeaderboardTable = (data: LeaderboardEntry[]) => (
    <div className="space-y-2">
      {data.map((entry) => (
        <div 
          key={entry.id} 
          className={`flex items-center justify-between p-3 rounded-md ${
            entry.name === "You" ? "bg-blue-50 font-medium" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${
              entry.rank === 1 ? "bg-yellow-100 text-yellow-700" :
              entry.rank === 2 ? "bg-gray-100 text-gray-700" :
              entry.rank === 3 ? "bg-amber-100 text-amber-700" :
              "bg-gray-50"
            }`}>
              {entry.rank}
            </span>
            <span>{entry.name}</span>
            {entry.rank <= 3 && (
              <span>
                {entry.rank === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                {entry.rank === 2 && <Medal className="h-4 w-4 text-gray-500" />}
                {entry.rank === 3 && <Medal className="h-4 w-4 text-amber-700" />}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <BarChartHorizontal className="h-4 w-4 text-blue-500" />
            <span>{entry.points} pts</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="px-4 py-6 md:container md:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Health Challenges</h1>
        <Badge variant="outline" className="font-normal">Spring 2025</Badge>
      </div>
      
      <div className="grid gap-4 md:gap-6 md:grid-cols-3 mb-6 md:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your Total Points
            </CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,150</div>
            <p className="text-xs text-muted-foreground">
              +860 points this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Rank
            </CardTitle>
            <Trophy className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#3</div>
            <p className="text-xs text-muted-foreground">
              Top 10% of participants
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Challenge
            </CardTitle>
            <Medal className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#1</div>
            <p className="text-xs text-muted-foreground">
              10k Steps Challenge
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="challenge">Challenge</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Standings</CardTitle>
              <CardDescription>
                Points earned from April 20-27, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderLeaderboardTable(weeklyLeaderboard)}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Complete Leaderboard</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Standings</CardTitle>
              <CardDescription>
                Points earned in April 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderLeaderboardTable(monthlyLeaderboard)}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Complete Leaderboard</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenge">
          <Card>
            <CardHeader>
              <CardTitle>10k Steps Challenge</CardTitle>
              <CardDescription>
                April 15-30, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderLeaderboardTable(challengeLeaderboard)}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="default" className="w-full">Join Next Challenge</Button>
              <Button variant="outline" className="w-full">View Challenge History</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientLeaderboard;
