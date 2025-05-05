import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { patientRoutes } from "@/routes/patientRoutes";
import { doctorRoutes } from "@/routes/doctorRoutes";
import { adminRoutes } from "@/routes/adminRoutes";
import NewPatient from "./pages/NewPatient";
import PatientRegistration from "./pages/patient/registration/PatientRegistration";
import Appointments from './pages/doctor-portal/appointments/Appointments';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patients/new" element={<NewPatient />} />
      <Route path="/patient/register" element={<PatientRegistration />} />
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
      <Route path={doctorRoutes.path} element={doctorRoutes.element}>
        {doctorRoutes.children.map((childRoute) => (
          <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
        ))}
        <Route path="/appointments" element={<Appointments />} />
      </Route>
      {/* Admin routes */}
      <Route path={adminRoutes.path} element={adminRoutes.element}>
        {adminRoutes.children.map((childRoute) => (
          <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 