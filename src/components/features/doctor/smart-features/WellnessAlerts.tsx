import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, TrendingDown, TrendingUp } from 'lucide-react';
import { PatientSelector } from '@/components/PatientSelector';
import AIInsightsPanel from '@/components/AIInsightsPanel';

const mockPatients = [
  { id: '1', name: 'Emma Wilson', age: 32 },
  { id: '2', name: 'James Anderson', age: 45 }
];

const WellnessAlerts = () => {
  const [selectedPatient, setSelectedPatient] = React.useState(mockPatients[0]);
  const alerts = [
    {
      id: 1,
      type: 'critical',
      message: "Patient BMI increased by 5% in the last 3 months",
      metric: "BMI",
      change: "+5%",
      timestamp: "2h ago",
      patientId: '1',
    },
    {
      id: 2,
      type: 'warning',
      message: "Mood scores showing declining trend over 2 months",
      metric: "Mood Score",
      change: "-20%",
      timestamp: "1d ago",
      patientId: '2',
    },
    {
      id: 3,
      type: 'info',
      message: "Blood pressure readings consistently above target range",
      metric: "Blood Pressure",
      change: "140/90",
      timestamp: "2d ago",
      patientId: '1',
    }
  ];
  const filteredAlerts = alerts.filter(a => a.patientId === selectedPatient.id);

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Patient Selector */}
        <PatientSelector
          patients={mockPatients.map(p => ({
            id: p.id,
            name: p.name,
            status: 'active',
            lastActivity: '',
            image: undefined,
          }))}
          selectedPatientId={selectedPatient?.id || null}
          onSelect={id => setSelectedPatient(mockPatients.find(p => p.id === id) || mockPatients[0])}
        />
        {/* Alerts Dashboard */}
        <div className="space-y-6">
          <AIInsightsPanel
            patient={{ id: selectedPatient.id, name: selectedPatient.name }}
            module="wellness-alerts"
            data={{ alerts: filteredAlerts }}
          />
          <h1 className="text-3xl font-bold tracking-tight mb-6">Wellness Alerts</h1>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {alert.type === 'critical' && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    {alert.type === 'warning' && (
                      <TrendingDown className="h-5 w-5 text-yellow-500" />
                    )}
                    {alert.type === 'info' && (
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                    )}
                    {alert.message}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Metric:</span>
                      <span className="ml-2 font-medium">{alert.metric}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Change:</span>
                      <span className="ml-2 font-medium">{alert.change}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessAlerts;
