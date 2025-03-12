
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import SuperintendentLayout from "./components/layout/SuperintendentLayout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Tenants from "./pages/Tenants";
import Maintenance from "./pages/Maintenance";
import Communications from "./pages/Communications";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import MapView from "./pages/MapView";
import SuperintendentCalendar from "./pages/SuperintendentCalendar";
import SuperintendentMap from "./pages/SuperintendentMap";
import Calendar from "./pages/Calendar";
import SuperintendentDashboard from "./pages/SuperintendentDashboard";
import SuperintendentMyDay from "./pages/SuperintendentMyDay";
import TenantLayout from "./components/layout/TenantLayout";
import TenantLeasing from "./pages/tenant/TenantLeasing";
import TenantOperations from "./pages/tenant/TenantOperations";
import TenantMaintenance from "./pages/tenant/TenantMaintenance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Admin/Property Manager Routes */}
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/leads" element={<AppLayout><Leads /></AppLayout>} />
          <Route path="/applications" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/tenants" element={<AppLayout><Tenants /></AppLayout>} />
          <Route path="/rent" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/maintenance" element={<AppLayout><Maintenance /></AppLayout>} />
          <Route path="/calendar" element={<AppLayout><Calendar /></AppLayout>} />
          <Route path="/map" element={<AppLayout><MapView /></AppLayout>} />
          <Route path="/communications" element={<AppLayout><Communications /></AppLayout>} />
          <Route path="/reports" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          
          {/* Superintendent Routes */}
          <Route path="/super" element={<SuperintendentLayout><SuperintendentMyDay /></SuperintendentLayout>} />
          <Route path="/super/dashboard" element={<SuperintendentLayout><SuperintendentDashboard /></SuperintendentLayout>} />
          <Route path="/super/calendar" element={<SuperintendentLayout><SuperintendentCalendar /></SuperintendentLayout>} />
          <Route path="/super/map" element={<SuperintendentLayout><SuperintendentMap /></SuperintendentLayout>} />
          <Route path="/super/settings" element={<SuperintendentLayout><PlaceholderPage /></SuperintendentLayout>} />
          
          {/* Tenant Interface Routes */}
          <Route path="/tenant" element={<TenantLayout><TenantLeasing scenario="lead" /></TenantLayout>} />
          <Route path="/tenant/leasing/:scenario" element={<TenantLayout><TenantLeasing /></TenantLayout>} />
          <Route path="/tenant/leasing/application" element={<TenantLayout><TenantLeasing scenario="application" /></TenantLayout>} />
          <Route path="/tenant/leasing/signing" element={<TenantLayout><TenantLeasing scenario="signing" /></TenantLayout>} />
          <Route path="/tenant/leasing/premove" element={<TenantLayout><TenantLeasing scenario="premove" /></TenantLayout>} />
          <Route path="/tenant/leasing/onboarding" element={<TenantLayout><TenantLeasing scenario="onboarding" /></TenantLayout>} />
          
          <Route path="/tenant/operations/rent" element={<TenantLayout><TenantOperations scenario="rent" /></TenantLayout>} />
          <Route path="/tenant/operations/renewal" element={<TenantLayout><TenantOperations scenario="renewal" /></TenantLayout>} />
          <Route path="/tenant/operations/moveout-notice" element={<TenantLayout><TenantOperations scenario="moveout-notice" /></TenantLayout>} />
          <Route path="/tenant/operations/moveout-coordination" element={<TenantLayout><TenantOperations scenario="moveout-coordination" /></TenantLayout>} />
          
          <Route path="/tenant/maintenance/request" element={<TenantLayout><TenantMaintenance scenario="request" /></TenantLayout>} />
          <Route path="/tenant/maintenance/workorder" element={<TenantLayout><TenantMaintenance scenario="workorder" /></TenantLayout>} />
          <Route path="/tenant/maintenance/scheduling" element={<TenantLayout><TenantMaintenance scenario="scheduling" /></TenantLayout>} />
          <Route path="/tenant/maintenance/relationship" element={<TenantLayout><TenantMaintenance scenario="relationship" /></TenantLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
