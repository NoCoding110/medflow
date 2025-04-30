import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Users, X } from "lucide-react";

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'nurse' | 'system' | 'patient';
  additionalInfo?: {
    patientName?: string;
    roomNumber?: string;
    labResults?: Array<{
      id: string;
      name: string;
      status: string;
      date: string;
    }>;
    prescriptionDetails?: {
      medication: string;
      lastFilled: string;
      quantity: string;
    };
  };
}

interface MessageDialogProps {
  message: Message | null;
  open: boolean;
  onClose: () => void;
  onAction: (action: string, message: Message) => void;
}

const MessageDialog = ({ message, open, onClose, onAction }: MessageDialogProps) => {
  if (!message) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'nurse':
        return <MessageSquare className="h-6 w-6 text-blue-600" />;
      case 'system':
        return <FileText className="h-6 w-6 text-blue-600" />;
      case 'patient':
        return <Users className="h-6 w-6 text-blue-600" />;
      default:
        return <MessageSquare className="h-6 w-6 text-blue-600" />;
    }
  };

  const renderAdditionalContent = () => {
    switch (message.type) {
      case 'nurse':
        return (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Room: {message.additionalInfo?.roomNumber}</p>
          </div>
        );
      case 'system':
        return (
          <div className="mt-4 space-y-3">
            {message.additionalInfo?.labResults?.map((result) => (
              <div key={result.id} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">{result.name}</p>
                <p className="text-sm text-gray-600">Status: {result.status}</p>
                <p className="text-sm text-gray-600">Date: {result.date}</p>
              </div>
            ))}
          </div>
        );
      case 'patient':
        return (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Patient: {message.additionalInfo?.patientName}</p>
            {message.additionalInfo?.prescriptionDetails && (
              <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">Prescription Details:</p>
                <p className="text-sm text-gray-600">
                  Medication: {message.additionalInfo.prescriptionDetails.medication}
                </p>
                <p className="text-sm text-gray-600">
                  Last Filled: {message.additionalInfo.prescriptionDetails.lastFilled}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {message.additionalInfo.prescriptionDetails.quantity}
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderActions = () => {
    switch (message.type) {
      case 'nurse':
        return (
          <Button
            onClick={() => onAction('acknowledge', message)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Acknowledge
          </Button>
        );
      case 'system':
        return (
          <Button
            onClick={() => onAction('review', message)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Review Results
          </Button>
        );
      case 'patient':
        return (
          <div className="space-x-2">
            <Button
              onClick={() => onAction('approve', message)}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Approve Refill
            </Button>
            <Button
              onClick={() => onAction('deny', message)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Deny
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon(message.type)}
            <div>
              <DialogTitle>{message.sender}</DialogTitle>
              <DialogDescription className="text-gray-600">
                {new Date(message.timestamp).toLocaleString()}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-lg">{message.content}</p>
          {renderAdditionalContent()}
        </div>
        <div className="mt-6 flex justify-end">
          {renderActions()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog; 