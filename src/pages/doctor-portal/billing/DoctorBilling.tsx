
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, FileText, DollarSign, Calendar } from "lucide-react";

const DoctorBilling = () => {
  const billingStats = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+12%",
      icon: <DollarSign className="h-4 w-4 text-blue-600" />,
    },
    {
      title: "Pending Claims",
      value: "23",
      change: "-5",
      icon: <FileText className="h-4 w-4 text-yellow-600" />,
    },
    {
      title: "Upcoming Payments",
      value: "$3,240",
      change: "Due in 7 days",
      icon: <Calendar className="h-4 w-4 text-green-600" />,
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Billing & Invoicing</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {billingStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { patient: "John Doe", amount: "$150", date: "2025-04-25", status: "Paid" },
                { patient: "Jane Smith", amount: "$200", date: "2025-04-24", status: "Pending" },
                { patient: "Bob Wilson", amount: "$175", date: "2025-04-23", status: "Paid" },
              ].map((transaction) => (
                <div key={transaction.date} className="flex items-center justify-between p-2 border-b">
                  <div>
                    <div className="font-medium">{transaction.patient}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{transaction.amount}</div>
                    <div className={`text-sm ${
                      transaction.status === "Paid" ? "text-green-600" : "text-yellow-600"
                    }`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Monthly revenue trends
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorBilling;
