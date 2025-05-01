import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Clock, User, FileText } from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "view" | "create" | "modify" | "delete";
  details: {
    resource: string;
    description: string;
    metadata: Record<string, string>;
  };
}

const AuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      action: "Patient Record Access",
      user: "Dr. Smith",
      timestamp: "2024-04-26 10:30 AM",
      type: "view",
      details: {
        resource: "Patient Records",
        description: "Accessed medical history for patient #12345",
        metadata: {
          "IP Address": "192.168.1.100",
          "Browser": "Chrome",
          "Location": "Main Office",
        },
      },
    },
    {
      id: "2",
      action: "Prescription Created",
      user: "Dr. Johnson",
      timestamp: "2024-04-26 09:45 AM",
      type: "create",
      details: {
        resource: "Prescriptions",
        description: "Created new prescription for patient #67890",
        metadata: {
          "IP Address": "192.168.1.101",
          "Browser": "Firefox",
          "Location": "Emergency Ward",
        },
      },
    },
    {
      id: "3",
      action: "Lab Results Modified",
      user: "Dr. Williams",
      timestamp: "2024-04-26 09:15 AM",
      type: "modify",
      details: {
        resource: "Lab Results",
        description: "Updated blood test results for patient #34567",
        metadata: {
          "IP Address": "192.168.1.102",
          "Browser": "Safari",
          "Location": "Lab Room",
        },
      },
    },
    {
      id: "4",
      action: "Patient Record Deleted",
      user: "Dr. Brown",
      timestamp: "2024-04-26 09:00 AM",
      type: "delete",
      details: {
        resource: "Patient Records",
        description: "Removed duplicate record for patient #89012",
        metadata: {
          "IP Address": "192.168.1.103",
          "Browser": "Edge",
          "Location": "Records Room",
        },
      },
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filterLogs = (logs: AuditLog[]) => {
    return logs.filter((log) => {
      const matchesSearch =
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === "all" || log.type === selectedType;

      const matchesTimeframe = (() => {
        if (selectedTimeframe === "all") return true;
        const logDate = new Date(log.timestamp);
        const now = new Date();
        switch (selectedTimeframe) {
          case "today":
            return logDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now.setDate(now.getDate() - 7));
            return logDate >= weekAgo;
          case "month":
            const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
            return logDate >= monthAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesType && matchesTimeframe;
    });
  };

  const getTypeColor = (type: AuditLog["type"]) => {
    switch (type) {
      case "view":
        return "bg-blue-100 text-blue-800";
      case "create":
        return "bg-green-100 text-green-800";
      case "modify":
        return "bg-yellow-100 text-yellow-800";
      case "delete":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const filteredLogs = filterLogs(auditLogs);

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground mt-1">
          Track and monitor system activities
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="modify">Modify</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger>
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
              setSelectedTimeframe("all");
            }}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer"
                onClick={() => setSelectedLog(log)}
              >
                <div className="space-y-1">
                  <p className="font-medium">{log.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {log.details.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {log.user}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {log.timestamp}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={getTypeColor(log.type)}
                >
                  {log.type}
                </Badge>
              </div>
            ))}
            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No audit logs found matching the current filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-6">
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Action</h3>
                  <p>{selectedLog.action}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Description</h3>
                  <p>{selectedLog.details.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">User</h3>
                    <p>{selectedLog.user}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Timestamp</h3>
                    <p>{selectedLog.timestamp}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Resource</h3>
                  <p>{selectedLog.details.resource}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Additional Information</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedLog.details.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditLogs; 