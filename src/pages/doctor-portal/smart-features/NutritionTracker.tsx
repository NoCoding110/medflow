
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Apple, Coffee, Pizza } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const nutritionData = [
  {
    name: "Patient A",
    calories: 2100,
    protein: 75,
    carbs: 250,
    fats: 65,
  },
  {
    name: "Patient B",
    calories: 1800,
    protein: 90,
    carbs: 200,
    fats: 55,
  },
  {
    name: "Patient C",
    calories: 2400,
    protein: 100,
    carbs: 280,
    fats: 70,
  },
];

const mealDistributionData = [
  { name: "Breakfast", value: 25 },
  { name: "Lunch", value: 35 },
  { name: "Dinner", value: 30 },
  { name: "Snacks", value: 10 },
];

const NutritionTracker = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Nutrition Insights</h1>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Calories</CardTitle>
            <Apple className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,100</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein Intake</CardTitle>
            <Coffee className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85g</div>
            <p className="text-xs text-muted-foreground">Daily average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meal Compliance</CardTitle>
            <Pizza className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Following meal plans</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Macronutrient Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutritionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="protein" fill="#8884d8" name="Protein (g)" />
                  <Bar dataKey="carbs" fill="#82ca9d" name="Carbs (g)" />
                  <Bar dataKey="fats" fill="#ffc658" name="Fats (g)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meal Timing Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mealDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4f46e5" name="Percentage (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionTracker;
