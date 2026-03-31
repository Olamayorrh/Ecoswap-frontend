import React, { useContext, useState } from "react";
import { userContext } from "../../context/Context";
import styles from "../SignUpLogin/SignUpLogin.module.css";

import icon from "../../assets/images/Icon.svg";
import Appname from "../../assets/images/Name.svg";
import logo1 from "../../assets/images/image.png";
import { CiUser } from "react-icons/ci";
import pic1 from "../../assets/images/guy1.svg";
import pic2 from "../../assets/images/guy2.svg";
import pic3 from "../../assets/images/guy3.svg";
import image1 from "../../assets/images/googleImage.svg";
import image2 from "../../assets/images/microsoftImage.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";

const SignUpLogin = () => {
  const {
    page,
    handleLoginToggle,
    handleSignUpToggle,
    registerUser,
    loginUser,
    isLoading,
  } = useContext(userContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (location.pathname === "/signin") {
      handleLoginToggle();
    } else if (location.pathname === "/signup") {
      handleSignUpToggle();
    }
  }, [location.pathname]);

  const agents = [
    {
      img: <CiUser color="white" size={22} />,
      name: "Sarah Jekins",
      status: "Verified Member",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliq commodo consequat.",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "Buyer", authMethod: "" },
  });

  const selectedRole = watch("role");
  const authMethod = watch("authMethod");
  const selectedFile = watch("businessDoc");

  const submitCall = async (data) => {
    await registerUser(data, reset, navigate);
  };

  const loginCall = async (data) => {
    await loginUser(data, navigate);
  };

  const isLogin = page === "Login";

  return (
    <div className={styles.container}>
      {/* Main card — reverse layout on Login */}
      <main className={isLogin ? styles.cardLogin : styles.card}>

        {/* ── GREEN LEFT/RIGHT PANEL ── */}
        <section className={isLogin ? styles.card__carbonLogin : styles.card__carbon}>
          <header>
            <img src={logo1} alt="logo" className={styles.card__logoimg1} />
            <h2>CARBON NEUTRAL PLATFORM</h2>
          </header>

          <div className={styles.card__value}>
            <h1>Turn Waste Into Value</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </p>
          </div>

          <div className={styles.card__feedback}>
            {agents.map((val, index) => (
              <div key={index} className={styles.feedback__feed}>
                <div className={styles.feedback__header}>
                  <div className={styles.feedback__img}>{val.img}</div>
                  <div className={styles.feedback__detail}>
                    <h4>{val.name}</h4>
                    <p>{val.status}</p>
                  </div>
                </div>
                <p className={styles.feedback__body}>{val.body}</p>
              </div>
            ))}
          </div>

          {!isLogin && (
            <div className={styles.card__trustees}>
              <div className={styles.trustees__images}>
                <img src={pic1} alt="user" className={styles.trustees__imagg} />
                <img src={pic2} alt="user" className={styles.trustees__imagg} />
                <img src={pic3} alt="user" className={styles.trustees__imagg} />
              </div>
              <p>Trusted by sustainable advocates globally</p>
            </div>
          )}
        </section>

        {/* ── WHITE FORM PANEL ── */}
        <section className={isLogin ? styles.card__formLogin : styles.card__form}>
          {/* Logo */}
          <div className={styles.form__logo}>
            <img src={icon} alt="App icon" className={styles.form__icon} />
            <img src={Appname} alt="EcoSwap" className={styles.form__Appname} />
          </div>

          {/* Heading */}
          <div className={styles.form__account}>
            <div className={styles.form__community}>
              {isLogin ? (
                <h2 className={styles.community__welcome}>Welcome Back</h2>
              ) : (
                <h2>Create your account</h2>
              )}
              <p>Join the latest community of Green Revolution</p>
            </div>

            {/* Login / Sign Up tab switcher */}
            <div className={styles.form__button}>
              <button
                className={isLogin ? styles.active__btn : styles.inactive__btn}
                onClick={() => { navigate("/signin"); reset(); }}
              >
                Login
              </button>
              <button
                className={!isLogin ? styles.active__btn : styles.inactive__btn}
                onClick={() => { navigate("/signup"); reset(); }}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* ── FORM ── */}
          <div className={styles.form__parent}>
            <form
              onSubmit={
                isLogin
                  ? handleSubmit(loginCall)
                  : handleSubmit(submitCall)
              }
            >
              {/* ── SIGN UP ONLY FIELDS ── */}
              {!isLogin && (
                <>
                  {/* Buyer / Seller radio selection */}
                  <div className={styles.form__roleSelection}>
                    <div className={styles.roleOptions}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          value="Buyer"
                          {...register("role")}
                          className={styles.radioInput}
                        />
                        Buyer
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          value="Seller"
                          {...register("role")}
                          className={styles.radioInput}
                        />
                        Seller
                      </label>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className={styles.form__child}>
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      type="text"
                      id="fullname"
                      placeholder="Sarah Jenkins"
                      {...register("fullname", {
                        required: "Full name is required",
                        validate: (v) =>
                          v.trim().split(" ").length >= 2 ||
                          "Enter first and last name",
                      })}
                    />
                    {errors.fullname && (
                      <span className={styles.form__error}>
                        {errors.fullname.message}
                      </span>
                    )}
                  </div>

                  {/* Seller verification — only shows when Seller is selected */}
                  {selectedRole === "Seller" && (
                    <div className={styles.form__child}>
                      <label htmlFor="sellerAuthMethod">
                        Seller Verification Method
                      </label>
                      <select
                        id="sellerAuthMethod"
                        className={styles.selectInput}
                        {...register("authMethod")}
                      >
                        <option value="" disabled>
                          Select Verification Method
                        </option>
                        <option value="upload">Business Document</option>
                        <option value="nin">National ID (NIN)</option>
                      </select>

                      {/* Business Document Upload */}
                      {authMethod === "upload" && (
                        <div
                          className={styles.fileUploadContainer}
                          style={{ marginTop: "1.2rem" }}
                        >
                          <div className={styles.fileInputWrapper}>
                            <input
                              type="file"
                              id="businessDoc"
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              {...register("businessDoc", {
                                required: "Business document is required",
                              })}
                              className={styles.fileInput}
                            />
                            <div className={styles.fileCover}>
                              {selectedFile && selectedFile.length > 0
                                ? selectedFile[0].name
                                : "Click to upload or drag file here"}
                            </div>
                          </div>
                          {errors.businessDoc && (
                            <span className={styles.form__error}>
                              {errors.businessDoc.message}
                            </span>
                          )}
                        </div>
                      )}

                      {/* NIN input */}
                      {authMethod === "nin" && (
                        <div style={{ marginTop: "1.2rem" }}>
                          <input
                            type="text"
                            placeholder="Enter National ID Number (NIN)"
                            {...register("idNumber", {
                              required: "NIN is required",
                            })}
                            className={styles.idInput}
                          />
                          {errors.idNumber && (
                            <span className={styles.form__error}>
                              {errors.idNumber.message}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Email */}
              <div className={styles.form__child}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="name@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className={styles.form__error}>
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className={styles.form__child}>
                <div className={styles.form__password}>
                  <label htmlFor="password">Password</label>
                  <div className={styles.passwordInputContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="***************"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                          message:
                            "Min 8 chars, uppercase, lowercase, number & special char",
                        },
                      })}
                      className={styles.passwordInput}
                    />
                    <span
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <span className={styles.form__error}>
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Remember me + Forgot Password */}
                <div className={styles.form__check}>
                  <div className={styles.checkbox}>
                    <input type="checkbox" id="remember" defaultChecked />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  {isLogin && (
                    <span
                      className={styles.forgotPass}
                      onClick={() => navigate("/forgotPassword")}
                    >
                      Forgot Password?
                    </span>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className={styles.form__submit}
                disabled={isLoading}
              >
                {isLoading
                  ? isLogin
                    ? "Proceeding..."
                    : "Signing Up..."
                  : isLogin
                  ? "Proceed"
                  : "Sign Up"}
              </button>

              {/* Terms — Sign Up only */}
              {!isLogin && (
                <div className={styles.form__agreement}>
                  <input type="checkbox" id="agreement" defaultChecked />
                  <label htmlFor="agreement">
                    I agree to the Terms Services and Privacy Policy
                  </label>
                </div>
              )}

              {/* Social login */}
              <div className={styles.form__alternateSign}>
                <p>{isLogin ? "Or continue with" : "Or signup with"}</p>
                <div className={styles.alternateSign__button}>
                  <button type="button" disabled={isLoading}>
                    <img
                      src={image1}
                      alt="Google"
                      className={styles.alternateSign__logo}
                    />
                    <span className={styles.alternateSign__desc}>Google</span>
                  </button>
                  <button type="button" disabled={isLoading}>
                    <img
                      src={image2}
                      alt="Microsoft"
                      className={styles.alternateSign__logo}
                    />
                    <span className={styles.alternateSign__desc}>Microsoft</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUpLogin;
