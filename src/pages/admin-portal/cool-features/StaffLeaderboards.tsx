
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Clock, ThumbsUp, CheckSquare, Trophy } from "lucide-react";

const StaffLeaderboards = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('monthly');
  
  // Mock data for staff leaderboards
  const staffPerformance = [
    { 
      id: 1, 
      name: "Dr. Sarah Johnson", 
      role: "Doctor",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      patientsHelped: 124,
      satisfaction: 98,
      documentation: 95,
      waitTime: 12
    },
    { 
      id: 2, 
      name: "Dr. Michael Chen", 
      role: "Doctor",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      patientsHelped: 116,
      satisfaction: 96,
      documentation: 98,
      waitTime: 14
    },
    { 
      id: 3, 
      name: "Nurse Emma Wilson", 
      role: "Nurse",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      patientsHelped: 95,
      satisfaction: 99,
      documentation: 97,
      waitTime: 10
    },
    { 
      id: 4, 
      name: "Dr. James Smith", 
      role: "Doctor",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      patientsHelped: 108,
      satisfaction: 94,
      documentation: 92,
      waitTime: 15
    },
    { 
      id: 5, 
      name: "Nurse Maria Garcia", 
      role: "Nurse",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      patientsHelped: 87,
      satisfaction: 96,
      documentation: 99,
      waitTime: 11
    },
  ];
  
  // Sort by different metrics
  const sortedByPatients = [...staffPerformance].sort((a, b) => b.patientsHelped - a.patientsHelped);
  const sortedBySatisfaction = [...staffPerformance].sort((a, b) => b.satisfaction - a.satisfaction);
  const sortedByDocumentation = [...staffPerformance].sort((a, b) => b.documentation - a.documentation);
  const sortedByWaitTime = [...staffPerformance].sort((a, b) => a.waitTime - b.waitTime);

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Leaderboards</h1>
          <p className="text-muted-foreground">
            Celebrate top performers and encourage friendly competition
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={timeframe === 'weekly' ? 'default' : 'outline'} 
            onClick={() => setTimeframe('weekly')}
          >
            Weekly
          </Button>
          <Button 
            variant={timeframe === 'monthly' ? 'default' : 'outline'} 
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Top Performers - {timeframe === 'weekly' ? 'This Week' : 'This Month'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <div className="relative mb-4">
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                      1
                    </div>
                    <img
                      src={sortedByPatients[0].avatar}
                      alt={sortedByPatients[0].name}
                      className="h-24 w-24 rounded-full border-4 border-amber-300"
                    />
                  </div>
                  <h3 className="font-medium">{sortedByPatients[0].name}</h3>
                  <p className="text-sm text-muted-foreground">{sortedByPatients[0].role}</p>
                </div>
                <div className="mt-2 rounded-md bg-amber-100 px-4 py-2 text-center">
                  <div className="text-lg font-bold text-amber-800">
                    {sortedByPatients[0].patientsHelped}
                  </div>
                  <div className="text-xs text-amber-800">
                    Patients Helped
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <div className="relative mb-4">
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                      1
                    </div>
                    <img
                      src={sortedBySatisfaction[0].avatar}
                      alt={sortedBySatisfaction[0].name}
                      className="h-24 w-24 rounded-full border-4 border-amber-300"
                    />
                  </div>
                  <h3 className="font-medium">{sortedBySatisfaction[0].name}</h3>
                  <p className="text-sm text-muted-foreground">{sortedBySatisfaction[0].role}</p>
                </div>
                <div className="mt-2 rounded-md bg-amber-100 px-4 py-2 text-center">
                  <div className="text-lg font-bold text-amber-800">
                    {sortedBySatisfaction[0].satisfaction}%
                  </div>
                  <div className="text-xs text-amber-800">
                    Patient Satisfaction
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <div className="relative mb-4">
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                      1
                    </div>
                    <img
                      src={sortedByWaitTime[0].avatar}
                      alt={sortedByWaitTime[0].name}
                      className="h-24 w-24 rounded-full border-4 border-amber-300"
                    />
                  </div>
                  <h3 className="font-medium">{sortedByWaitTime[0].name}</h3>
                  <p className="text-sm text-muted-foreground">{sortedByWaitTime[0].role}</p>
                </div>
                <div className="mt-2 rounded-md bg-amber-100 px-4 py-2 text-center">
                  <div className="text-lg font-bold text-amber-800">
                    {sortedByWaitTime[0].waitTime} min
                  </div>
                  <div className="text-xs text-amber-800">
                    Average Wait Time
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-500" />
              Most Patients Helped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedByPatients.slice(0, 5).map((staff, index) => (
                <div key={staff.id} className="flex items-center gap-4">
                  <div 
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      index === 0 
                        ? 'bg-amber-500 text-white' 
                        : index === 1 
                        ? 'bg-gray-300 text-gray-800'
                        : index === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } font-bold`}
                  >
                    {index + 1}
                  </div>
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{staff.name}</div>
                    <div className="text-xs text-muted-foreground">{staff.role}</div>
                  </div>
                  <div className="ml-auto text-lg font-bold">
                    {staff.patientsHelped}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              Highest Patient Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedBySatisfaction.slice(0, 5).map((staff, index) => (
                <div key={staff.id} className="flex items-center gap-4">
                  <div 
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      index === 0 
                        ? 'bg-amber-500 text-white' 
                        : index === 1 
                        ? 'bg-gray-300 text-gray-800'
                        : index === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } font-bold`}
                  >
                    {index + 1}
                  </div>
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{staff.name}</div>
                    <div className="text-xs text-muted-foreground">{staff.role}</div>
                  </div>
                  <div className="ml-auto text-lg font-bold">
                    {staff.satisfaction}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-purple-500" />
              Best Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedByDocumentation.slice(0, 5).map((staff, index) => (
                <div key={staff.id} className="flex items-center gap-4">
                  <div 
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      index === 0 
                        ? 'bg-amber-500 text-white' 
                        : index === 1 
                        ? 'bg-gray-300 text-gray-800'
                        : index === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } font-bold`}
                  >
                    {index + 1}
                  </div>
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{staff.name}</div>
                    <div className="text-xs text-muted-foreground">{staff.role}</div>
                  </div>
                  <div className="ml-auto text-lg font-bold">
                    {staff.documentation}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Shortest Wait Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedByWaitTime.slice(0, 5).map((staff, index) => (
                <div key={staff.id} className="flex items-center gap-4">
                  <div 
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      index === 0 
                        ? 'bg-amber-500 text-white' 
                        : index === 1 
                        ? 'bg-gray-300 text-gray-800'
                        : index === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } font-bold`}
                  >
                    {index + 1}
                  </div>
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{staff.name}</div>
                    <div className="text-xs text-muted-foreground">{staff.role}</div>
                  </div>
                  <div className="ml-auto text-lg font-bold">
                    {staff.waitTime} min
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Staff Achievement Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-md border p-4 text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Trophy className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="font-medium">Top Performer</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Highest overall score
              </p>
            </div>
            
            <div className="rounded-md border p-4 text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="font-medium">Patient Champion</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Most patients helped
              </p>
            </div>
            
            <div className="rounded-md border p-4 text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <ThumbsUp className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-medium">Satisfaction Star</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Highest patient reviews
              </p>
            </div>
            
            <div className="rounded-md border p-4 text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-medium">Speed Demon</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Shortest wait times
              </p>
            </div>
          </div>
          
          <div className="mt-6 rounded-md border-2 border-dashed border-muted p-6 text-center">
            <h3 className="font-medium">Monthly Rewards Program</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Top performers receive recognition and prizes each month.
              <br />
              Next reward distribution: May 31, 2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffLeaderboards;
