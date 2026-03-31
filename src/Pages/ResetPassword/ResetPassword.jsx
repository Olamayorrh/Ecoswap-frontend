import { useState, useRef } from "react";
import styles from "./ResetPassword.module.css"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const ResetPassword = () => {
  const { token: encodedEmail } = useParams(); // Using the token param as email
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : "";
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = OTP, 2 = New Password
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 4) {
      // Proceed to set new password. Backend will verify OTP alongside password
      setStep(2);
    } else {
      alert("Please enter a 4-digit OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const enteredOtp = otp.join("");
      const API_URL = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";
      
      await axios.put(
        `${API_URL}/api/auth/reset-password/${encodeURIComponent(email)}`,
        { password: formData.password, otp: enteredOtp }
      );

      alert("Password updated successfully!");
      navigate("/signin");
    } catch (error) {
      alert(error.response?.data?.message || "Error occurred updating password. Invalid OTP or server error.");
    }
  };

  return (
    <div className={styles.parent}>
      {step === 1 ? (
        <form onSubmit={handleVerifyOtp} className={styles.parent__form}>
          <h2>Reset Password</h2>
          <p className={styles.subtitle}>Enter the four digit sent to your email</p>

          <div className={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={otpRefs[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={styles.otpInput}
              />
            ))}
          </div>

          <button type="submit" className={styles.submitBtn}>Reset Password</button>
          <p className={styles.resendText}>Didn't receive the code? <span className={styles.resendLink}>Resend</span></p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className={styles.parent__form}>
          <h2>Reset Password</h2>

          <div className={styles.form__inputGroup}>
            <label>New Password</label>
            <div className={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                className={styles.passwordInput}
                required
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
          </div>

          <div className={styles.form__inputGroup}>
            <label>Confirm Password</label>
            <div className={styles.passwordInputContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.passwordInput}
                required
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
