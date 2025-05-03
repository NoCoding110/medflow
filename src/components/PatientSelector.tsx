import React, { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User } from 'lucide-react';

export interface Patient {
  id: string;
  name: string;
  status: 'stable' | 'monitoring' | 'urgent' | string;
  lastActivity: string;
  image?: string;
}

interface PatientSelectorProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onSelect: (patientId: string) => void;
  className?: string;
}

const STATUS_COLORS: Record<string, string> = {
  stable: 'bg-green-100 text-green-800',
  monitoring: 'bg-yellow-100 text-yellow-800',
  urgent: 'bg-red-100 text-red-800',
};

export const PatientSelector: React.FC<PatientSelectorProps> = ({ patients, selectedPatientId, onSelect, className }) => {
  const [search, setSearch] = useState('');

  const filteredPatients = useMemo(() =>
    patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [patients, search]
  );

  return (
    <div className={`w-full md:w-72 border-r bg-white p-4 ${className || ''}`}> 
      <div className="mb-4">
        <Input
          placeholder="Search patients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="space-y-2">
          {filteredPatients.map(patient => (
            <div
              key={patient.id}
              className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors ${selectedPatientId === patient.id ? 'bg-accent border-primary' : ''}`}
              onClick={() => onSelect(patient.id)}
            >
              <Avatar>
                {patient.image ? (
                  <AvatarImage src={patient.image} />
                ) : (
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{patient.name}</span>
                  <Badge className={STATUS_COLORS[patient.status] || 'bg-gray-100 text-gray-800'}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground truncate">{patient.lastActivity}</div>
              </div>
            </div>
          ))}
          {filteredPatients.length === 0 && (
            <div className="text-muted-foreground text-center py-8">No patients found.</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PatientSelector; 