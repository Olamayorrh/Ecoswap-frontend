import { useState } from "react";
import styles from "./ForgotPassword.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        formData
      );

      setIsSuccess(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send reset code. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className={styles.container__formCard}>
          <h2>Reset Password</h2>
          <div className={styles.form__inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="@ name@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>Send Reset Link</button>
        </form>
      ) : (
        <div className={styles.container__formCard}>
          <h2>Reset Password</h2>

          <div className={styles.successMessage}>
            <p className={styles.successText}>If an account exists with {formData.email}, you will receive a password reset link.</p>
          </div>

          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => navigate("/")}
          >
            Go Back to Login
          </button>

          <button
            type="button"
            className={styles.simulateBtn}
            onClick={() => navigate(`/reset-password/${encodeURIComponent(formData.email)}`)}
            style={{ marginTop: "1rem", backgroundColor: "#f0f0f0", color: "#333", border: "1px solid #ccc" }}
          >
            Enter OTP &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
