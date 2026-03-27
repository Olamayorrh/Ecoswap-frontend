import { createContext, useState, useCallback } from "react";
import axios from "axios";

export const userContext = createContext();

const Context = ({ children }) => {
  const [page, setPage] = useState("Login");
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpToggle = () => {
    setPage("Sign Up");
  };

  const handleLoginToggle = () => {
    setPage("Login");
  };

  const registerUser = async (data, reset, navigate) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("role", data.role);
      formData.append("password", data.password);

      // Send selected verification method
      formData.append("sellerAuthMethod", data.authMethod);

      // If upload selected
      if (data.authMethod === "upload" && data.businessDoc?.length > 0) {
        formData.append("verificationDocument", data.businessDoc[0]);
      }

      // If NIN selected
      if (data.authMethod === "nin" && data.idNumber) {
        formData.append("ninNumber", data.idNumber);
      }

      console.log("=== FRONTEND REGISTRATION PAYLOAD ===");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`);
      }
      console.log("=====================================");

      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
        { timeout: 10000 } // adding a timeout to fail fast if backend hangs
      );

      // Normalize response: ensure userInfo always has a `user` object with fullname
      const rawData = response.data;
      const normalizedUser = rawData.user
        ? rawData.user
        : { fullname: rawData.fullname || data.fullname, email: rawData.email || data.email, role: rawData.role || data.role };
      const newUserData = { ...rawData, user: normalizedUser, isFirstLogin: true };
      setUserInfo(newUserData);
      
      alert("Registration Successful!");
      if (reset) reset();
      
      // Auto-login routing
      if (data.role.toLowerCase() === "buyer") {
        navigate("/buyer/dashboard");
      } else {
        navigate("/seller/dashboard");
      }
      
    } catch (error) {
      console.log("Register Error:", error);
      alert(error.response?.data?.message || "Registration failed. Server may have timed out.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (data, navigate) => {
    setIsLoading(true);
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      console.log("=== FRONTEND LOGIN PAYLOAD ===");
      console.log(payload);
      console.log("==============================");

      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        payload,
        { timeout: 10000 }
      );

      // Normalize response: ensure userInfo always has a `user` object with fullname
      const rawLogin = response.data;
      const normalizedLoginUser = rawLogin.user
        ? rawLogin.user
        : { fullname: rawLogin.fullname || "", email: rawLogin.email || data.email, role: rawLogin.role || "" };
      const userData = { ...rawLogin, user: normalizedLoginUser, isFirstLogin: false };
      setUserInfo(userData);
      alert("Login Successful!");

      // Role-based routing
      if (userData.user?.role?.toLowerCase() === "buyer") {
        navigate("/buyer/dashboard");
      } else {
        navigate("/seller/dashboard");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Login failed. Server may have timed out.");
    } finally {
      setIsLoading(false);
    }
  };

  const publishListing = async (formData) => {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      const response = await axios.post(`${API_URL}/api/waste/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Listing Error:", error.response?.data || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all listings with optional filters
  const fetchListings = async (filters = {}) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== "" && val !== null) {
          params.append(key, val);
        }
      });
      const queryStr = params.toString();
      const response = await axios.get(`${API_URL}/api/waste/listings${queryStr ? `?${queryStr}` : ""}`);
      return response.data;
    } catch (error) {
      console.error("Fetch Listings Error:", error.response?.data || error.message);
      throw error;
    }
  };

  const analyzeWasteImage = async (file) => {
    setIsLoading(true);
    try {
      // TODO: Re-enable auth guard when backend enforces token on waste routes:
      // if (!userInfo?.token) throw new Error("Authentication required.");

      const formData = new FormData();
      formData.append("image", file);

      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      const response = await axios.post(`${API_URL}/api/waste/analyze-image`, formData, {
        headers: {
          // TODO: Add Authorization header when backend enforces it:
          // 'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error("AI Analysis Error:", error.response?.data || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Logout: clears session and redirects to landing page ─────────────
  const logout = useCallback(() => {
    setUserInfo(null);
    // Hard navigate so all component state is cleared
    window.location.href = '/';
  }, []);

  return (
    <userContext.Provider value={{
      page,
      userInfo,
      isLoading,
      setUserInfo,
      handleLoginToggle,
      handleSignUpToggle,
      registerUser,
      loginUser,
      publishListing,
      fetchListings,
      analyzeWasteImage,
      logout,
    }}>
      {children}
    </userContext.Provider>
  );
};

export default Context;
