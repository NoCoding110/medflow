
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { FileText, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Documents = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground">
              Manage and view patient documents and medical records
            </p>
          </div>
          <Button className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10 w-full md:w-[300px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Empty state when no documents */}
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="hover:bg-accent/50 cursor-pointer transition-colors">
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">
                    {["Medical Report", "Lab Results", "Prescription", "Discharge Summary", "Referral Letter", "Consent Form"][i % 6]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-1">
                    Patient: {["John Doe", "Jane Smith", "Robert Johnson", "Emily Wilson", "Michael Brown", "Sarah Davis"][i % 6]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Added: {["Apr 24, 2025", "Apr 22, 2025", "Apr 20, 2025", "Apr 18, 2025", "Apr 15, 2025", "Apr 10, 2025"][i % 6]}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
