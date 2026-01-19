import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import WhatsAppChat from "./components/WhatsAppChat";
import SocialSidebar from "./components/SocialSidebar";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import OnlineConsultation from "./pages/OnlineConsultation";
import LabTests from "./pages/LabTests";
import MedicalTravel from "./pages/MedicalTravel";
import HealingJourney from "./pages/HealingJourney";
import LegalSupport from "./pages/LegalSupport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";

// User Pages
import MyAccount from "./pages/MyAccount";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminServices from "./pages/admin/Services";
import AdminOrders from "./pages/admin/Orders";
import AdminPayments from "./pages/admin/Payments";
import AdminNotifications from "./pages/admin/Notifications";
import AdminSettings from "./pages/admin/Settings";

function AppRoutes() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/consultation" component={OnlineConsultation} />
      <Route path="/lab-tests" component={LabTests} />
      <Route path="/medical-travel" component={MedicalTravel} />
      <Route path="/healing-journey" component={HealingJourney} />
      <Route path="/legal-support" component={LegalSupport} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/terms" component={Terms} />

      {/* User Routes */}
      <Route path="/account" component={MyAccount} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/services" component={AdminServices} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/payments" component={AdminPayments} />
      <Route path="/admin/notifications" component={AdminNotifications} />
      <Route path="/admin/settings" component={AdminSettings} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <WhatsAppChat />
            <SocialSidebar />
            <Router hook={useHashLocation}>
              <AuthProvider>
                <ScrollToTop />
                <AppRoutes />
              </AuthProvider>
            </Router>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
