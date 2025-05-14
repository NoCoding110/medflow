# Mock Data Migration Guide

## Overview

This document outlines the plan for migrating the application from the old scattered mock data files to the new structured approach. The new mock data structure follows a more organized pattern with clear separation between shared data and role-specific data.

## New Structure

```
src/lib/mock/
├── index.ts                  # Main export file for all mock data
├── shared/                   # Cross-role data accessible by all portals
│   ├── types.ts              # Type definitions for all entities
│   ├── users.ts              # User data (admins, doctors, patients)
│   ├── appointments.ts       # Appointment data and utilities
│   ├── medicalRecords.ts     # Medical records and utilities
│   ├── labReports.ts         # Lab reports and utilities
│   └── ... (other shared data)
├── doctor/                   # Doctor-specific data and utilities
│   ├── dashboard.ts          # Doctor dashboard data
│   ├── myPatients.ts         # Patient data from doctor perspective
│   └── ... (other doctor-specific data)
├── patient/                  # Patient-specific data and utilities
│   └── ... (patient-specific data)
└── admin/                    # Admin-specific data and utilities
    └── ... (admin-specific data)
```

## Migration Strategy

1. **Identify and Map**: Map each old mock data file to the new structure
2. **Incremental Migration**: Update components one-by-one to use the new structure
3. **Gradual Deletion**: Remove old mock data files once all their usages have been migrated

## Migration Progress

### Completed Migrations

- Created type definitions in `src/lib/mock/shared/types.ts`
- Implemented shared data repositories:
  - User data in `src/lib/mock/shared/users.ts`
  - Appointment data in `src/lib/mock/shared/appointments.ts`
  - Medical records in `src/lib/mock/shared/medicalRecords.ts`
  - Lab reports in `src/lib/mock/shared/labReports.ts`
- Implemented doctor-specific repositories:
  - Dashboard data in `src/lib/mock/doctor/dashboard.ts`
  - Patient data in `src/lib/mock/doctor/myPatients.ts`
- Updated the main index file to properly export all data

### Components Migrated

- `src/components/features/doctor/telehealth/DoctorTelehealth.tsx`

### Pending Migrations

#### Components to Update

- `src/components/features/doctor/lab/Lab.tsx` 
- `src/components/features/doctor/billing/Billing.tsx`
- `src/components/features/doctor/health-tracking/vitals/VitalsTracker.tsx`
- `src/pages/doctor-portal/Dashboard.tsx`
- `src/pages/doctor-portal/Patients.tsx`

#### Services to Update

- `src/lib/services/mockDoctorService.ts` should be refactored to use the new structure

#### Old Files to Phase Out

The following files will be phased out once all components are migrated:

- `src/lib/mock/doctorMockData.ts`
- `src/lib/mock/healthMockData.ts`
- `src/lib/mock/aiMockData.ts`
- `src/lib/mock/messagingMockData.ts`
- `src/lib/mock/patientMockData.ts`

## How to Migrate a Component

1. Identify the mock data used by the component
2. Import the relevant data and utilities from the new structure
3. Update the component to use the new imports
4. Test the component to ensure it works correctly
5. Mark the component as migrated in this document

### Example Migration

Old way:
```typescript
import { mockPatients } from "@/lib/mock/doctorMockData";
```

New way:
```typescript
import { patients } from "@/lib/mock/shared/users";
// or
import { patients } from "@/lib/mock"; // Using the main index.ts exports
```

## Benefits of New Structure

1. **Clear Organization**: Data is organized by shared vs. role-specific
2. **Type Safety**: Comprehensive TypeScript interfaces for all entities
3. **Consistent Relationships**: Data relationships are maintained across all files
4. **Ready for API Migration**: Structure mimics what would be returned by a real API
5. **Utility Functions**: Each module provides convenient access functions 