import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingUp, Activity, FileText, Bell } from "lucide-react";

export interface Alert {
  id: string;
  type: 'lab' | 'medication' | 'message' | 'insight';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  details: {
    patientName: string;
    patientId: string;
    data?: {
      labResults?: {
        test: string;
        value: string;
        normalRange: string;
        status: string;
        date: string;
      }[];
      medications?: {
        current: string;
        interacting: string;
        severity: string;
        recommendation: string;
      };
      symptoms?: {
        reported: string[];
        severity: string;
        duration: string;
        notes: string;
      };
      trends?: {
        metric: string;
        current: string;
        previous: string;
        change: string;
        dates: string[];
        values: number[];
      };
    };
  };
}

interface AlertDialogProps {
  alert: Alert | null;
  open: boolean;
  onClose: () => void;
  onAction: (action: string, alert: Alert) => void;
}

const AlertDialog = ({ alert, open, onClose, onAction }: AlertDialogProps) => {
  if (!alert) return null;

  const renderDetails = () => {
    switch (alert.type) {
      case 'lab':
        return (
          <div className="space-y-4">
            {alert.details.data?.labResults?.map((result, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{result.test}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Value</p>
                    <p className="font-medium">{result.value}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Normal Range</p>
                    <p className="font-medium">{result.normalRange}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className={`font-medium ${
                      result.status === 'Abnormal' ? 'text-red-600' : 'text-green-600'
                    }`}>{result.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-medium">{result.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'medication':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Current Medication</p>
                <p className="font-medium">{alert.details.data?.medications?.current}</p>
              </div>
              <div>
                <p className="text-gray-600">Interacting With</p>
                <p className="font-medium">{alert.details.data?.medications?.interacting}</p>
              </div>
              <div>
                <p className="text-gray-600">Severity</p>
                <p className="font-medium text-red-600">
                  {alert.details.data?.medications?.severity}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Recommendation</p>
                <p className="font-medium">
                  {alert.details.data?.medications?.recommendation}
                </p>
              </div>
            </div>
          </div>
        );

      case 'message':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Reported Symptoms</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {alert.details.data?.symptoms?.reported.map((symptom, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-600">Severity</p>
                <p className="font-medium">{alert.details.data?.symptoms?.severity}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">{alert.details.data?.symptoms?.duration}</p>
              </div>
              <div>
                <p className="text-gray-600">Additional Notes</p>
                <p className="font-medium">{alert.details.data?.symptoms?.notes}</p>
              </div>
            </div>
          </div>
        );

      case 'insight':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600">Metric</p>
                  <p className="font-medium">{alert.details.data?.trends?.metric}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Current</p>
                    <p className="font-medium">{alert.details.data?.trends?.current}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Previous</p>
                    <p className="font-medium">{alert.details.data?.trends?.previous}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">Change</p>
                  <p className="font-medium text-yellow-600">
                    {alert.details.data?.trends?.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderActions = () => {
    switch (alert.type) {
      case 'lab':
        return (
          <>
            <Button
              onClick={() => onAction('review', alert)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Review Full Results
            </Button>
            <Button
              onClick={() => onAction('order', alert)}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Order Follow-up
            </Button>
          </>
        );

      case 'medication':
        return (
          <>
            <Button
              onClick={() => onAction('adjust', alert)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Adjust Medication
            </Button>
            <Button
              onClick={() => onAction('consult', alert)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Consult Pharmacy
            </Button>
          </>
        );

      case 'message':
        return (
          <>
            <Button
              onClick={() => onAction('contact', alert)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Contact Patient
            </Button>
            <Button
              onClick={() => onAction('schedule', alert)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Schedule Visit
            </Button>
          </>
        );

      case 'insight':
        return (
          <Button
            onClick={() => onAction('review', alert)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Review Trend Data
          </Button>
        );
    }
  };

  const getIcon = () => {
    switch (alert.type) {
      case 'lab':
        return <FileText className="h-6 w-6 text-red-600" />;
      case 'medication':
        return <AlertCircle className="h-6 w-6 text-red-600" />;
      case 'message':
        return <Bell className="h-6 w-6 text-yellow-600" />;
      case 'insight':
        return <TrendingUp className="h-6 w-6 text-purple-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <DialogTitle>{alert.title}</DialogTitle>
              <DialogDescription>
                Patient: {alert.details.patientName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-lg mb-4">{alert.description}</p>
          {renderDetails()}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          {renderActions()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog; 