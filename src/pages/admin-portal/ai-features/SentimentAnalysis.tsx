
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, Star, TrendingUp, RefreshCcw, BarChart2, 
  Search, PieChart, AlertTriangle, ThumbsUp, ThumbsDown, 
  Filter, MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

const SentimentAnalysis = () => {
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Sentiment Analysis</h1>
          <p className="text-muted-foreground">
            AI-powered analysis of patient feedback and satisfaction levels
          </p>
        </div>
        <Button className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Refresh Analysis
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Sentiment
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Satisfaction Score
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3/5</div>
            <p className="text-xs text-muted-foreground">
              Based on 1,254 reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Feedback Volume
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              Responses this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Issues
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">14</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Sentiment Trends</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Weekly</Button>
                <Button variant="outline" size="sm">Monthly</Button>
                <Button variant="outline" size="sm">Quarterly</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Sentiment Trend Visualization</p>
                <p className="text-xs text-muted-foreground">
                  Showing positive, neutral, and negative sentiment over time
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-lg font-bold text-green-600">62%</div>
                <div className="flex items-center justify-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5 text-green-600" />
                  <p className="text-xs">Positive</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-blue-600">24%</div>
                <div className="flex items-center justify-center gap-1">
                  <div className="h-3.5 w-3.5 text-blue-600">—</div>
                  <p className="text-xs">Neutral</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-red-600">14%</div>
                <div className="flex items-center justify-center gap-1">
                  <ThumbsDown className="h-3.5 w-3.5 text-red-600" />
                  <p className="text-xs">Negative</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Feedback Theme Distribution</p>
                <p className="text-xs text-muted-foreground">
                  Showing topic distribution across all feedback
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Staff friendliness</span>
                </div>
                <span className="text-sm font-medium">38%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Wait times</span>
                </div>
                <span className="text-sm font-medium">24%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm">Facility cleanliness</span>
                </div>
                <span className="text-sm font-medium">16%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Billing issues</span>
                </div>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Treatment quality</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Recent Patient Feedback</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search feedback..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
              <select className="rounded-md border bg-transparent px-3 py-1 h-9">
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1">
                    <ThumbsUp className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="font-medium">John Smith</span>
                </div>
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                "Dr. Wilson was extremely thorough and took the time to explain everything. The staff was very friendly and I barely had to wait."
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>May 3, 2024</span>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800">Positive</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Staff</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Dr. Wilson</span>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100 p-1">
                    <div className="h-3 w-3 text-blue-600">—</div>
                  </div>
                  <span className="font-medium">Sarah Johnson</span>
                </div>
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                "The doctor was good but I had to wait almost 40 minutes past my appointment time. Better scheduling would be appreciated."
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>May 2, 2024</span>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Neutral</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Wait Times</span>
                </div>
              </div>
            </div>
            <div className="rounded-md border bg-red-50 p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-red-100 p-1">
                    <ThumbsDown className="h-3 w-3 text-red-600" />
                  </div>
                  <span className="font-medium">Michael Chen</span>
                </div>
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                "I was charged for services that my insurance should have covered. When I called billing, they were not helpful at all. Very frustrating experience."
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>May 1, 2024</span>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-red-800">Negative</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Billing</span>
                  <Button size="sm" variant="outline" className="h-5 rounded-sm text-[10px]">
                    Flag for Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Provider Sentiment Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border border-dashed p-6 flex items-center justify-center">
              <div className="text-center">
                <BarChart2 className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Provider Score Comparison</p>
                <p className="text-xs text-muted-foreground">
                  Showing sentiment scores by provider
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Dr. Wilson</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "96%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Dr. Martinez</span>
                  <span className="font-medium">4.5/5</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Dr. Johnson</span>
                  <span className="font-medium">4.2/5</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "84%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Dr. Taylor</span>
                  <span className="font-medium">3.9/5</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Dr. Brown</span>
                  <span className="font-medium">3.6/5</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: "72%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Improvement Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h3 className="font-medium text-amber-800">Wait Time Issues</h3>
                </div>
                <p className="mt-1 text-sm text-amber-700">
                  24% of negative feedback mentions long wait times. Consider reviewing scheduling practices.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Recommendations
                </Button>
              </div>
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h3 className="font-medium text-amber-800">Billing Confusion</h3>
                </div>
                <p className="mt-1 text-sm text-amber-700">
                  12% of feedback mentions billing issues or confusion about charges.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Review Billing Process
                </Button>
              </div>
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h3 className="font-medium text-amber-800">Provider Variance</h3>
                </div>
                <p className="mt-1 text-sm text-amber-700">
                  Significant variance in satisfaction scores between providers. Consider peer mentoring.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Provider Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
