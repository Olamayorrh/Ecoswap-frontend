import { createContext, useState } from "react";
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

      // Flag that this is their first login
      const newUserData = { ...response.data, isFirstLogin: true };
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

      const userData = { ...response.data, isFirstLogin: false };
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
      if (!userInfo?.token) {
        throw new Error("Authentication required. Please login again.");
      }

      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      const response = await axios.post(`${API_URL}/api/waste/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert("Listing published successfully!");
      return response.data;
    } catch (error) {
      console.error("Listing Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to publish listing.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeWasteImage = async (file) => {
    setIsLoading(true);
    try {
      if (!userInfo?.token) {
        throw new Error("Authentication required. Please login again.");
      }

      const formData = new FormData();
      formData.append("image", file);

      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      const response = await axios.post(`${API_URL}/api/waste/analyze-image`, formData, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
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
      analyzeWasteImage
    }}>
      {children}
    </userContext.Provider>
  );
};

export default Context;
