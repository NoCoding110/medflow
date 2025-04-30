
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import AdminPortal from "@/pages/admin-portal/AdminPortal";
import AdminDashboard from "@/pages/admin-portal/AdminDashboard";
import UserManagement from "@/pages/admin-portal/UserManagement";
import ClinicSettings from "@/pages/admin-portal/ClinicSettings";
import BillingManagement from "@/pages/admin-portal/BillingManagement";
import PatientOnboarding from "@/pages/admin-portal/PatientOnboarding";
import NotificationSettings from "@/pages/admin-portal/NotificationSettings";
import SmartScheduling from "@/pages/admin-portal/ai-features/SmartScheduling";
import CapacityForecasting from "@/pages/admin-portal/ai-features/CapacityForecasting";
import BillingScrubber from "@/pages/admin-portal/ai-features/BillingScrubber";
import LabPharmacyIntegration from "@/pages/admin-portal/ai-features/LabPharmacyIntegration";
import NoShowPrediction from "@/pages/admin-portal/ai-features/NoShowPrediction";
import SentimentAnalysis from "@/pages/admin-portal/ai-features/SentimentAnalysis";
import PatientFlow from "@/pages/admin-portal/ai-features/PatientFlow";
import RealWorldDataPlatform from "@/pages/admin-portal/ai-features/RealWorldDataPlatform";
import Analytics from "@/pages/admin-portal/analytics/Analytics";
import StaffLeaderboards from "@/pages/admin-portal/cool-features/StaffLeaderboards";
import AdminAssistant from "@/pages/admin-portal/cool-features/AdminAssistant";
import ClinicMood from "@/pages/admin-portal/cool-features/ClinicMood";
import ClinicLoadMap from "@/pages/admin-portal/cool-features/ClinicLoadMap";
import PharmacyMonitoring from "@/pages/admin-portal/pharmacy-lab/PharmacyMonitoring";
import SmartLabRouting from "@/pages/admin-portal/pharmacy-lab/SmartLabRouting";
import LabErrorDetection from "@/pages/admin-portal/pharmacy-lab/LabErrorDetection";
import HomeSampleCollection from "@/pages/admin-portal/pharmacy-lab/HomeSampleCollection";
import UberIntegration from "@/pages/admin-portal/transportation/UberIntegration";
import SettingsPage from "@/pages/admin-portal/transportation/SettingsPage";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-50">
        <div className="text-center">
          <div className="mb-4 h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-lightblue-400"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const adminRoutes = {
  path: "/admin",
  element: (
    <AdminGuard>
      <AdminPortal />
    </AdminGuard>
  ),
  children: [
    { path: "", element: <AdminDashboard /> },
    { path: "users", element: <UserManagement /> },
    { path: "clinic-settings", element: <ClinicSettings /> },
    { path: "billing", element: <BillingManagement /> },
    { path: "patient-onboarding", element: <PatientOnboarding /> },
    { path: "notifications", element: <NotificationSettings /> },
    { path: "smart-scheduling", element: <SmartScheduling /> },
    { path: "capacity-forecasting", element: <CapacityForecasting /> },
    { path: "billing-scrubber", element: <BillingScrubber /> },
    { path: "lab-pharmacy", element: <LabPharmacyIntegration /> },
    { path: "no-show-prediction", element: <NoShowPrediction /> },
    { path: "sentiment-analysis", element: <SentimentAnalysis /> },
    { path: "patient-flow", element: <PatientFlow /> },
    { path: "real-world-data", element: <RealWorldDataPlatform /> },
    { path: "analytics", element: <Analytics /> },
    { path: "staff-leaderboards", element: <StaffLeaderboards /> },
    { path: "admin-assistant", element: <AdminAssistant /> },
    { path: "clinic-mood", element: <ClinicMood /> },
    { path: "clinic-load-map", element: <ClinicLoadMap /> },
    { path: "pharmacy-monitoring", element: <PharmacyMonitoring /> },
    { path: "lab-routing", element: <SmartLabRouting /> },
    { path: "lab-error-detection", element: <LabErrorDetection /> },
    { path: "home-collection", element: <HomeSampleCollection /> },
    { path: "uber", element: <UberIntegration /> },
    { path: "settings", element: <SettingsPage /> },
  ],
};
