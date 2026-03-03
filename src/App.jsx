import { Route, Routes, Navigate } from "react-router";
import "./assets/css/global.css";
import LandingPage from "./pages/LandingPage.jsx";

import SignUpLogin from "./pages/SignUpLogin/SignUpLogin.jsx"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import SellerLayout from "./pages/SellerLayout/SellerLayout.jsx";
import Listing from "./pages/SellerLayout/Listing/Listing.jsx";
import Orders from "./pages/SellerLayout/Orders/Orders.jsx";
import Notifications from "./pages/SellerLayout/Notifications/Notifications.jsx";
import SellerDashboard from "./pages/SellerLayout/Dashboard/SellerDashboard.jsx";
import SellerSettings from "./pages/SellerLayout/Settings/Settings.jsx";
import SellerMessages from "./pages/SellerLayout/Messages/Messages.jsx";

// Buyer Layout Imports
import UserLayout from "./pages/UserLayout/UserLayout.jsx";
import BuyerDashboard from "./pages/UserLayout/Dashboard/Dashboard.jsx";
import BuyerMessages from "./pages/UserLayout/Messages/Messages.jsx";
import BuyerSettings from "./pages/UserLayout/Settings/Settings.jsx";
import BuyerNotifications from "./pages/UserLayout/Notifications/Notifications.jsx";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignUpLogin />} />
          <Route path="/signup" element={<SignUpLogin />} />
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/reset-password/:token" element={<ResetPassword />}></Route>

          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="listing" element={<Listing />} />
            <Route path="orders" element={<Orders />} />
            <Route path="messages" element={<SellerMessages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<SellerSettings />} />
          </Route>

          {/* New Buyer Routes */}
          <Route path="/buyer" element={<UserLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<BuyerDashboard />} />
            <Route path="listing" element={<Listing />} />
            <Route path="orders" element={<Orders />} />
            <Route path="messages" element={<BuyerMessages />} />
            <Route path="notifications" element={<BuyerNotifications />} />
            <Route path="settings" element={<BuyerSettings />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
