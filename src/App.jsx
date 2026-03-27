import { Route, Routes, Navigate } from "react-router";
import "./assets/css/global.css";
import LandingPage from "./pages/LandingPage";
import SignUpLogin from "./Pages/SignUpLogin/SignUpLogin";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import SellerLayout from "./Pages/SellerLayout/SellerLayout";
import Listing from "./Pages/SellerLayout/Listing/Listing";
import Orders from "./Pages/SellerLayout/Orders/Orders";
import Notifications from "./Pages/SellerLayout/Notifications/Notifications";
import SellerDashboard from "./Pages/SellerLayout/Dashboard/SellerDashboard";
import SellerSettings from "./Pages/SellerLayout/Settings/Settings";
import SellerMessages from "./Pages/SellerLayout/Messages/Messages";

// Buyer Layout Imports
import UserLayout from "./Pages/UserLayout/UserLayout";
import BuyerDashboard from "./Pages/UserLayout/Dashboard/Dashboard";
import BuyerListing from "./Pages/UserLayout/Listing/BuyerListing";
import BuyerMessages from "./Pages/UserLayout/Messages/Messages";
import BuyerSettings from "./Pages/UserLayout/Settings/Settings";
import BuyerNotifications from "./Pages/UserLayout/Notifications/Notifications";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignUpLogin />} />
          <Route path="/signup" element={<SignUpLogin />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected seller routes — redirect to / if not logged in */}
          <Route
            path="/seller"
            element={
              <ProtectedRoute>
                <SellerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="listing" element={<Listing />} />
            <Route path="orders" element={<Orders />} />
            <Route path="messages" element={<SellerMessages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<SellerSettings />} />
          </Route>

          {/* Protected buyer routes — redirect to / if not logged in */}
          <Route
            path="/buyer"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<BuyerDashboard />} />
            <Route path="listing" element={<BuyerListing />} />
            <Route path="messages" element={<BuyerMessages />} />
            <Route path="notifications" element={<BuyerNotifications />} />
            <Route path="settings" element={<BuyerSettings />} />
          </Route>

          {/* Catch-all: redirect unknown URLs to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
