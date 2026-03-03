import { Route, Routes, Navigate } from "react-router";
import "./assets/css/global.css";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpLogin from "./Pages/SignUpLogin/SignUpLogin.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword/ResetPassword.jsx";
import SellerLayout from "./Pages/SellerLayout/SellerLayout.jsx";
import Listing from "./Pages/SellerLayout/Listing/Listing.jsx";
import Orders from "./Pages/SellerLayout/Orders/Orders.jsx";
import Notifications from "./Pages/SellerLayout/Notifications/Notifications.jsx";
import SellerDashboard from "./Pages/SellerLayout/Dashboard/SellerDashboard.jsx";
import SellerSettings from "./Pages/SellerLayout/Settings/Settings.jsx";
import SellerMessages from "./Pages/SellerLayout/Messages/Messages.jsx";

// Buyer Layout Imports
import UserLayout from "./Pages/UserLayout/UserLayout.jsx";
import BuyerDashboard from "./Pages/UserLayout/Dashboard/Dashboard.jsx";
import BuyerMessages from "./Pages/UserLayout/Messages/Messages.jsx";
import BuyerSettings from "./Pages/UserLayout/Settings/Settings.jsx";
import BuyerNotifications from "./Pages/UserLayout/Notifications/Notifications.jsx";

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
