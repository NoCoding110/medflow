
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smile, Frown, Meh, Activity, RefreshCcw, User,
  Calendar, TrendingDown, TrendingUp, MessageCircle
} from "lucide-react";

const ClinicMood = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinic Mood Board</h1>
          <p className="text-muted-foreground">
            Anonymous staff mood tracking and burnout prevention
          </p>
        </div>
        <Button className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Overall Mood
            </CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">3.8/5</div>
              <Smile className="ml-2 h-6 w-6 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑0.3</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Staff Participation
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">
              21 out of 25 staff members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Burnout Risk
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">Low</div>
            <p className="text-xs text-muted-foreground">
              2 staff members showing early signs
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Today's Mood Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 justify-center md:justify-between py-4">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Smile className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-2xl font-bold">10</div>
              <div className="text-xs text-muted-foreground">Positive</div>
              <div className="mt-1 text-sm font-medium text-green-600">48%</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Meh className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-muted-foreground">Neutral</div>
              <div className="mt-1 text-sm font-medium text-blue-600">38%</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Frown className="h-8 w-8 text-amber-500" />
              </div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-muted-foreground">Negative</div>
              <div className="mt-1 text-sm font-medium text-amber-600">14%</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-4 w-full rounded-full bg-muted overflow-hidden flex">
              <div className="h-4 bg-green-500" style={{ width: "48%" }}></div>
              <div className="h-4 bg-blue-500" style={{ width: "38%" }}></div>
              <div className="h-4 bg-amber-500" style={{ width: "14%" }}></div>
            </div>
            <div className="mt-2 text-center text-sm text-muted-foreground">
              Overall mood trends remain positive with a slight improvement from last week
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Physicians</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">4.1/5</span>
                    <Smile className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "82%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Nursing</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">3.8/5</span>
                    <Smile className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "76%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Front Desk</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">3.5/5</span>
                    <Meh className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Lab Technicians</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">4.0/5</span>
                    <Smile className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Billing & Coding</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">3.2/5</span>
                    <Meh className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "64%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Mood Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <Activity className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Mood Trend Visualization</p>
                <p className="text-xs text-muted-foreground">
                  Showing weekly mood averages over the past month
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">This Week</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">3.8/5</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Last Week</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">3.5/5</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Two Weeks Ago</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">3.6/5</span>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Three Weeks Ago</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">3.9/5</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Anonymous Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1">
                      <Smile className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Nursing Department</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Today, 9:45 AM</span>
                </div>
                <p className="text-sm">
                  "The new scheduling system is making our jobs so much easier. Thank you for implementing our suggestions!"
                </p>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-100 p-1">
                      <Meh className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Front Desk</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Today, 11:20 AM</span>
                </div>
                <p className="text-sm">
                  "Patient volume at check-in is still challenging during peak hours. Could we get additional support from 9-11 AM?"
                </p>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-amber-100 p-1">
                      <Frown className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-sm font-medium">Billing Department</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Yesterday, 3:15 PM</span>
                </div>
                <p className="text-sm">
                  "The recent software update has slowed down our claims processing. We're feeling the pressure to meet deadlines."
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <MessageCircle className="mr-2 h-4 w-4" />
              Submit Anonymous Feedback
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellness Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <h3 className="font-medium text-amber-900">Billing Department Attention Needed</h3>
                <p className="mt-1 text-sm text-amber-700">
                  The billing team's mood scores have decreased by 0.4 points in the past week. Consider scheduling a check-in meeting to address concerns about the recent software update.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Schedule Check-in
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Front Desk Support</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Consider adjusting staffing levels during peak hours (9-11 AM) to reduce stress on front desk personnel.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Review Staffing Plan
                </Button>
              </div>
              <div className="rounded-md border border-green-200 bg-green-50 p-4">
                <h3 className="font-medium text-green-900">Positive Feedback Loop</h3>
                <p className="mt-1 text-sm text-green-700">
                  The nursing team has responded very positively to the new scheduling system. Consider highlighting this win in the next all-staff meeting.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Add to Meeting Agenda
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Wellness Program Reminder</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Don't forget to promote the upcoming meditation and stress management workshop scheduled for next week.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Send Reminder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicMood;
