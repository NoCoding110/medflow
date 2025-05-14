import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { patientRoutes } from "@/routes/patientRoutes";
import { doctorRoutes } from "@/routes/doctorRoutes";
import { adminRoutes } from "@/routes/adminRoutes";
import PatientRegistration from "./pages/patient-portal/registration";
import AppLayout from "./components/layout/AppLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient/register" element={<PatientRegistration />} />
      
      {/* Protected routes with AppLayout */}
      <Route element={<AppLayout />}>
        {/* Legacy protected routes */}
        {protectedRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        
        {/* Patient routes */}
        <Route path={patientRoutes.path} element={patientRoutes.element}>
          {patientRoutes.children.map((childRoute) => (
            <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
          ))}
        </Route>
        
        {/* Doctor routes */}
        {doctorRoutes}
        
        {/* Admin routes */}
        <Route path={adminRoutes.path} element={adminRoutes.element}>
          {adminRoutes.children.map((childRoute) => (
            <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
          ))}
        </Route>
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 