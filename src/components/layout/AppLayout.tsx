import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { 
  Sun, Moon, Bell, ChevronDown, Menu, X, 
  Home, Users, Calendar, FileText, TestTube, Receipt, Pill, 
  Stethoscope, MessageSquare, Settings, Video, Files, Heart,
  Activity, BarChartHorizontal, Award, Thermometer, Brain,
  ClipboardList, Zap, Headphones, Sparkles, Globe, Database,
  FileBarChart, Microscope, BookOpen, User, FlaskConical,
  AlertTriangle, TrendingUp, FileSearch, ShieldCheck, Send,
  Briefcase, Building, Bell as BellIcon, BarChart, Bot,
  FilePlus, Truck, Gauge, UserCog, Wallet, HelpCircle,
  Network, LucideIcon
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/lib/auth";

// Sidebar configs for each role
const sidebarConfig = {
  admin: [
    { label: "Dashboard", icon: <Home />, path: "/admin" },
    { label: "User Management", icon: <Users />, path: "/admin/users" },
    { label: "Clinic Settings", icon: <Building />, path: "/admin/clinic-settings" },
    { label: "Billing Management", icon: <Receipt />, path: "/admin/billing" },
    { label: "Patient Onboarding", icon: <UserCog />, path: "/admin/patient-onboarding" },
    { label: "Notifications", icon: <BellIcon />, path: "/admin/notifications" },
    { 
      label: "AI Features", 
      icon: <Brain />, 
      path: "/admin/ai-features",
      children: [
        { label: "Smart Scheduling", icon: <Calendar />, path: "/admin/smart-scheduling" },
        { label: "Capacity Forecasting", icon: <TrendingUp />, path: "/admin/capacity-forecasting" },
        { label: "Billing Scrubber", icon: <FileSearch />, path: "/admin/billing-scrubber" },
        { label: "Lab/Pharmacy Integration", icon: <FlaskConical />, path: "/admin/lab-pharmacy" },
        { label: "No-Show Prediction", icon: <AlertTriangle />, path: "/admin/no-show-prediction" },
        { label: "Sentiment Analysis", icon: <MessageSquare />, path: "/admin/sentiment-analysis" },
        { label: "Patient Flow", icon: <Activity />, path: "/admin/patient-flow" },
        { label: "Real-World Data Platform", icon: <Database />, path: "/admin/real-world-data" },
      ] 
    },
    { label: "Analytics", icon: <BarChart />, path: "/admin/analytics" },
    { 
      label: "Admin Features", 
      icon: <Sparkles />, 
      path: "/admin/cool-features",
      children: [
        { label: "Staff Leaderboards", icon: <BarChartHorizontal />, path: "/admin/staff-leaderboards" },
        { label: "Admin Assistant", icon: <Bot />, path: "/admin/admin-assistant" },
        { label: "Clinic Mood", icon: <Gauge />, path: "/admin/clinic-mood" },
        { label: "Clinic Load Map", icon: <Globe />, path: "/admin/clinic-load-map" },
      ] 
    },
    { 
      label: "Pharmacy & Lab", 
      icon: <FlaskConical />, 
      path: "/admin/pharmacy-lab",
      children: [
        { label: "Pharmacy Monitoring", icon: <Pill />, path: "/admin/pharmacy-monitoring" },
        { label: "Smart Lab Routing", icon: <Send />, path: "/admin/lab-routing" },
        { label: "Lab Error Detection", icon: <AlertTriangle />, path: "/admin/lab-error-detection" },
        { label: "Home Sample Collection", icon: <Home />, path: "/admin/home-collection" },
      ] 
    },
    { 
      label: "Transportation", 
      icon: <Truck />, 
      path: "/admin/transportation",
      children: [
        { label: "Uber Integration", icon: <Network />, path: "/admin/uber" },
        { label: "Settings", icon: <Settings />, path: "/admin/settings" },
      ] 
    },
  ],
  
  doctor: [
    { label: "Dashboard", icon: <Home />, path: "/doctor" },
    { label: "Patients", icon: <Users />, path: "/doctor/patients" },
    { label: "Appointments", icon: <Calendar />, path: "/doctor/appointments" },
    { label: "Clinical Notes", icon: <FileText />, path: "/doctor/notes" },
    { label: "Lab Results", icon: <TestTube />, path: "/doctor/lab" },
    { label: "Billing", icon: <Receipt />, path: "/doctor/billing" },
    { label: "Prescriptions", icon: <Pill />, path: "/doctor/prescriptions" },
    { label: "Secure Messaging", icon: <MessageSquare />, path: "/doctor/secure-messaging" },
    { label: "Patient Messaging", icon: <MessageSquare />, path: "/doctor/patient-messaging" },
    { label: "Telehealth", icon: <Video />, path: "/doctor/telehealth" },
    
    { 
      label: "Health Tracking", 
      icon: <Activity />, 
      path: "/doctor/wellness",
      children: [
        { label: "Wellness Dashboard", icon: <Heart />, path: "/doctor/wellness" },
        { label: "Vitals Tracker", icon: <Thermometer />, path: "/doctor/vitals" },
        { label: "Nutrition Tracker", icon: <Apple />, path: "/doctor/nutrition" },
        { label: "Fitness Tracking", icon: <Activity />, path: "/doctor/fitness" },
        { label: "Medication Adherence", icon: <Pill />, path: "/doctor/medication" },
        { label: "Mental Health", icon: <Brain />, path: "/doctor/mental-health" },
        { label: "Preventive Care", icon: <ShieldCheck />, path: "/doctor/preventive-care" },
      ] 
    },
    
    { 
      label: "Smart Features", 
      icon: <Sparkles />, 
      path: "/doctor/smart-features",
      children: [
        { label: "Visit Preparation", icon: <ClipboardList />, path: "/doctor/visit-prep" },
        { label: "Symptoms Tracker", icon: <AlertTriangle />, path: "/doctor/symptoms" },
        { label: "Patient Goals", icon: <Award />, path: "/doctor/goals" },
        { label: "Wellness Alerts", icon: <Bell />, path: "/doctor/alerts" },
      ] 
    },
    
    { 
      label: "AI Features", 
      icon: <Brain />, 
      path: "/doctor/ai-features",
      children: [
        { label: "AI Assistant", icon: <Bot />, path: "/doctor/ai-assistant" },
        { label: "Predictive Analysis", icon: <FileBarChart />, path: "/doctor/predictive-analysis" },
        { label: "Generative AI", icon: <Zap />, path: "/doctor/generative-ai" },
        { label: "Conversational AI", icon: <MessageSquare />, path: "/doctor/conversational-ai" },
        { label: "Pathology Analysis", icon: <Microscope />, path: "/doctor/pathology-analysis" },
        { label: "Care Pathway Monitor", icon: <Activity />, path: "/doctor/care-pathway" },
        { label: "Real-World Data", icon: <Database />, path: "/doctor/real-world-data" },
      ] 
    },
    
    { 
      label: "Specialized Modules", 
      icon: <Stethoscope />, 
      path: "/doctor/specialized-modules",
      children: [
        { label: "Neurology", icon: <Brain />, path: "/doctor/neurology" },
        { label: "Oncology", icon: <FileText />, path: "/doctor/oncology" },
        { label: "Cardiology", icon: <Heart />, path: "/doctor/cardiology" },
        { label: "Psychiatry", icon: <BookOpen />, path: "/doctor/psychiatry" },
        { label: "ECG AI Analysis", icon: <Activity />, path: "/doctor/ecg-analysis" },
      ] 
    },
    
    { label: "Settings", icon: <Settings />, path: "/doctor/settings" },
  ],
  
  patient: [
    { label: "Dashboard", icon: <Home />, path: "/patient" },
    { label: "Book Appointment", icon: <Calendar />, path: "/patient/appointments" },
    { label: "Medical Records", icon: <Files />, path: "/patient/records" },
    { label: "Prescriptions", icon: <Pill />, path: "/patient/prescriptions" },
    { label: "Messages", icon: <MessageSquare />, path: "/patient/messages" },
    { label: "Billing", icon: <Receipt />, path: "/patient/billing" },
    { label: "Telehealth", icon: <Video />, path: "/patient/telehealth" },
    
    { 
      label: "Wellness", 
      icon: <Heart />, 
      path: "/patient/wellness",
      children: [
        { label: "Wellness Dashboard", icon: <Heart />, path: "/patient/wellness" },
        { label: "Exercise Tracking", icon: <Activity />, path: "/patient/exercise" },
        { label: "Nutrition", icon: <Apple />, path: "/patient/nutrition" },
        { label: "Health Tips", icon: <HelpCircle />, path: "/patient/health-tips" },
        { label: "Vitals Tracker", icon: <Thermometer />, path: "/patient/vitals" },
        { label: "Health Assistant", icon: <Bot />, path: "/patient/health-assistant" },
      ] 
    },
    
    { 
      label: "Programs", 
      icon: <Sparkles />, 
      path: "/patient/programs",
      children: [
        { label: "Health Challenges", icon: <Award />, path: "/patient/challenges" },
        { label: "Mental Health", icon: <Brain />, path: "/patient/mental-health" },
        { label: "Health Risks", icon: <AlertTriangle />, path: "/patient/risk-scores" },
        { label: "Leaderboard", icon: <BarChartHorizontal />, path: "/patient/leaderboard" },
      ] 
    },
    
    { 
      label: "Account", 
      icon: <User />, 
      path: "/patient/account",
      children: [
        { label: "Family Accounts", icon: <Users />, path: "/patient/family" },
        { label: "Voice Commands", icon: <Headphones />, path: "/patient/voice" },
        { label: "Settings", icon: <Settings />, path: "/patient/settings" },
      ] 
    },
  ],
};

// Define Apple icon as LucideIcon wasn't imported directly
function Apple(props: React.ComponentProps<LucideIcon>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 2.4 1 4.6 2.5 6.4.8 1 1.3 2.2 1.5 3.6h6c.2-1.4.7-2.6 1.5-3.6C18 13.6 19 11.4 19 9a7 7 0 0 0-7-7Z" />
      <path d="M10.7 21H13.3" />
    </svg>
  );
}

export default function AppLayout() {
  // Use the real auth instead of placeholder
  const { user, isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const savedMode = localStorage.getItem('theme-mode');
    // If saved preference exists, use it
    if (savedMode) {
      return savedMode === 'dark';
    }
    // Otherwise check user's system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme-mode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Safe fallback if user has no role
  const userRole = user?.role || 'patient';
  
  // User display name - using fallbacks for better UX
  const userName = user?.name || 'User';

  // User avatar - using fallback if not available
  const userAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`;

  // Theme classes
  const bg = darkMode ? "bg-[#0A192F] text-white" : "bg-[#FAFDFB] text-navy-900";
  const accent = darkMode ? "text-[#38BDF8]" : "text-[#7FB77E]";
  const sidebarBg = darkMode ? "bg-[#112240]" : "bg-white";
  const sidebarBorder = darkMode ? "border-[#22304A]" : "border-[#E5E7EB]";

  const renderSidebarItem = (item, index) => {
    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
    
    const baseClasses = clsx(
      "flex items-center gap-3 px-4 py-2 rounded-lg mb-1 font-medium transition-all",
      "hover:bg-[#F3F6F3] dark:hover:bg-[#22304A] hover:shadow-md",
      isActive ? "bg-[#F3F6F3] dark:bg-[#22304A]" : "",
      accent,
      "text-base",
      "focus:outline-none focus:ring-2 focus:ring-[#7FB77E] dark:focus:ring-[#38BDF8]",
      "cursor-pointer"
    );
    
    if (item.children) {
      // For groups with children
      return (
        <div key={index} className="mb-4">
          <div className={baseClasses} style={{ borderRadius: 12 }}>
            {item.icon}
            <span>{item.label}</span>
          </div>
          <div className="ml-8 space-y-1 mt-1">
            {item.children.map((child, childIndex) => (
              <Link
                key={childIndex}
                to={child.path}
                className={clsx(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                  "hover:bg-[#F3F6F3] dark:hover:bg-[#22304A]",
                  location.pathname === child.path ? "bg-[#F3F6F3] dark:bg-[#22304A] text-[#7FB77E] dark:text-[#38BDF8]" : "",
                )}
                style={{ borderRadius: 10 }}
              >
                {child.icon}
                <span>{child.label}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    }
    
    // For regular menu items
    return (
      <Link
        key={index}
        to={item.path}
        className={baseClasses}
        style={{ borderRadius: 12 }}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  return (
    <div className={clsx("min-h-screen flex flex-col font-sans transition-colors duration-300", bg)} style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-2 shadow-sm sticky top-0 z-30 bg-opacity-90 backdrop-blur-md" style={{ background: darkMode ? '#0A192F' : '#FAFDFB' }}>
        <div className="flex items-center gap-2">
          <button className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-[#22304A]" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className={accent} /> : <Menu className={accent} />}
          </button>
          <span className={clsx("font-bold text-lg tracking-tight", accent)}>MedFlow EHR</span>
        </div>
        <div className="flex-1 flex justify-center max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full px-4 py-2 bg-white dark:bg-[#112240] border border-gray-200 dark:border-[#22304A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7FB77E] dark:focus:ring-[#38BDF8] transition"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#22304A] transition"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className={accent} /> : <Moon className={accent} />}
          </button>
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#22304A] transition">
            <Bell className={accent} />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow">3</span>
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#22304A] transition"
              onClick={() => setProfileOpen((v) => !v)}
            >
              <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full border-2 border-[#7FB77E] dark:border-[#38BDF8] shadow" />
              <ChevronDown className={accent} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#112240] rounded-lg shadow-lg py-2 z-50 border border-gray-100 dark:border-[#22304A] animate-fade-in">
                <div className="px-4 py-2 font-semibold">{userName}</div>
                <hr className="my-1 border-gray-200 dark:border-[#22304A]" />
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#22304A]">View Profile</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#22304A]">Settings</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#22304A]">Help / Support</button>
                <hr className="my-1 border-gray-200 dark:border-[#22304A]" />
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-[#22304A]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Layout Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={clsx(
            "transition-all duration-300 z-20 flex flex-col h-full w-64 md:translate-x-0 fixed md:static top-0 left-0 shadow-lg md:shadow-none",
            sidebarBg,
            sidebarBorder,
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
          style={{ borderRightWidth: 1 }}
        >
          <nav className="flex-1 py-6 px-2 overflow-y-auto">
            {sidebarConfig[userRole] && sidebarConfig[userRole].map(renderSidebarItem)}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 md:p-8 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 