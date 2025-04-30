
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Thermometer, AlertTriangle, TrendingUp, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";

const PharmacyMonitoring = () => {
  const [inventoryFilter, setInventoryFilter] = useState("");
  
  // Mock data for inventory
  const inventoryItems = [
    { id: 1, name: "Amoxicillin 500mg", category: "Antibiotic", stock: 120, threshold: 50, status: "Good" },
    { id: 2, name: "Lisinopril 10mg", category: "Blood Pressure", stock: 85, threshold: 40, status: "Good" },
    { id: 3, name: "Albuterol Inhaler", category: "Respiratory", stock: 3, threshold: 10, status: "Critical" },
    { id: 4, name: "Metformin 500mg", category: "Diabetes", stock: 200, threshold: 80, status: "Good" },
    { id: 5, name: "Prednisone 5mg", category: "Anti-Inflammatory", stock: 15, threshold: 20, status: "Low" },
    { id: 6, name: "Ibuprofen 800mg", category: "Pain Relief", stock: 45, threshold: 50, status: "Low" },
    { id: 7, name: "Levothyroxine 50mcg", category: "Thyroid", stock: 70, threshold: 30, status: "Good" },
    { id: 8, name: "Fluticasone Nasal Spray", category: "Allergy", stock: 8, threshold: 12, status: "Low" },
  ];
  
  // Filter items based on search
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(inventoryFilter.toLowerCase()) ||
    item.category.toLowerCase().includes(inventoryFilter.toLowerCase())
  );
  
  // Count items by status
  const criticalCount = inventoryItems.filter(item => item.status === "Critical").length;
  const lowCount = inventoryItems.filter(item => item.status === "Low").length;
  
  // Mock seasonal prediction data
  const seasonalPredictions = [
    { month: "May", category: "Allergy Medications", trend: "Increasing", reason: "Spring season peak" },
    { month: "June", category: "Antibiotics", trend: "Stable", reason: "Normal demand" },
    { month: "July", category: "Sunscreens", trend: "Increasing", reason: "Summer activities" },
    { month: "August", category: "Cold Medications", trend: "Decreasing", reason: "Off-season" },
  ];

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pharmacy Stock Monitoring</h1>
          <p className="text-muted-foreground">
            Intelligent inventory management and predictive ordering
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Order History
          </Button>
          <Button className="gap-2">
            <Pill className="h-4 w-4" />
            Place Order
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory Items
            </CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {new Set(inventoryItems.map(item => item.category)).size} categories
            </p>
          </CardContent>
        </Card>
        <Card className={criticalCount > 0 ? "border-red-200 bg-red-50" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${criticalCount > 0 ? "text-red-800" : ""}`}>
              Critical Stock Alert
            </CardTitle>
            <AlertTriangle className={`h-4 w-4 ${criticalCount > 0 ? "text-red-800" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${criticalCount > 0 ? "text-red-800" : ""}`}>
              {criticalCount} items
            </div>
            <p className={`text-xs ${criticalCount > 0 ? "text-red-800" : "text-muted-foreground"}`}>
              {criticalCount > 0 ? "Require immediate attention" : "No critical items"}
            </p>
          </CardContent>
        </Card>
        <Card className={lowCount > 0 ? "border-amber-200 bg-amber-50" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${lowCount > 0 ? "text-amber-800" : ""}`}>
              Low Stock Alert
            </CardTitle>
            <Thermometer className={`h-4 w-4 ${lowCount > 0 ? "text-amber-800" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${lowCount > 0 ? "text-amber-800" : ""}`}>
              {lowCount} items
            </div>
            <p className={`text-xs ${lowCount > 0 ? "text-amber-800" : "text-muted-foreground"}`}>
              {lowCount > 0 ? "Consider reordering soon" : "No low stock items"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Inventory Status</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medications..."
                className="pl-8"
                value={inventoryFilter}
                onChange={(e) => setInventoryFilter(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="border-b bg-muted/50 text-xs font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Medication</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-right">Current Stock</th>
                  <th className="px-4 py-3 text-right">Threshold</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-right">{item.stock}</td>
                    <td className="px-4 py-3 text-right">{item.threshold}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        item.status === 'Good' 
                          ? 'bg-green-100 text-green-800' 
                          : item.status === 'Low'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">Reorder</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              AI-powered predictions based on historical data and seasonal trends.
            </p>
            <div className="rounded-md border">
              <table className="w-full">
                <thead className="border-b bg-muted/50 text-xs font-medium">
                  <tr>
                    <th className="px-4 py-3 text-left">Month</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Trend</th>
                    <th className="px-4 py-3 text-left">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {seasonalPredictions.map((prediction, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{prediction.month}</td>
                      <td className="px-4 py-3">{prediction.category}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center">
                          {prediction.trend === "Increasing" && <TrendingUp className="mr-1 h-4 w-4 text-green-500" />}
                          {prediction.trend === "Decreasing" && <TrendingUp className="mr-1 h-4 w-4 text-red-500 transform rotate-180" />}
                          {prediction.trend}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{prediction.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Automated Order Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-red-900">Critical: Order Now</h3>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">Order</Button>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-red-800">
                  <li>• Albuterol Inhaler (3 in stock, 10 needed)</li>
                </ul>
              </div>
              
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-amber-900">Low Stock: Order Soon</h3>
                  <Button size="sm" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-100">
                    Order
                  </Button>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-amber-800">
                  <li>• Prednisone 5mg (15 in stock, 20 needed)</li>
                  <li>• Ibuprofen 800mg (45 in stock, 50 needed)</li>
                  <li>• Fluticasone Nasal Spray (8 in stock, 12 needed)</li>
                </ul>
              </div>
              
              <div className="rounded-md border p-3">
                <h3 className="font-medium">Upcoming Needs (Next 30 Days)</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on usage patterns, consider ordering these medications within the next 30 days.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyMonitoring;
