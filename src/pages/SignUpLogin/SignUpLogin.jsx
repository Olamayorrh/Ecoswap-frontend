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
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router";

const SignUpLogin = () => {
  const { page, handleLoginToggle, handleSignUpToggle, registerUser, loginUser, isLoading } =
    useContext(userContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleForgotPassword = () => {
    navigate("/forgotPassword"); // 
  };

  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (location.pathname === '/signin') {
      handleLoginToggle();
    } else if (location.pathname === '/signup') {
      handleSignUpToggle();
      if (location.state?.role) {
        // Fallback or explicit routing logic if needed
      }
    }
  }, [location.pathname, handleLoginToggle, handleSignUpToggle, location.state]);

  const agents = [
    {
      img: <CiUser color="black" size={20} />,
      name: "Sarah Jekins",
      status: "Verified Member",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, temporibus quia necessitatibus hic odio dolorum fuga porro natus deserunt, quisquam, libero est! Voluptas itaque repudiandae rerum nam perferendis consequatur dignissimos. Lorem ipsum dolor, sit amet ",
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

  return (
    <>
      <div className={styles.container}>
        <main className={page === "Login" ? styles.cardLeft : styles.cardRight}>
          <section
            className={
              page === "Login" ? styles.card__carbonLogin : styles.card__carbon
            }
          >
            <header>
              <img src={logo1} alt="logo" className={styles.card__logoimg1} />
              <h2>CARBON NEUTRAL PLATFORM</h2>
            </header>

            <div className={styles.card__value}>
              <h1>Turn Waste Into Value</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla,
                temporibus quia necessitatibus hic odio dolorum fuga porro natus
                deserunt, quisquam, libero est! Voluptas itaque repudiandae
                rerum nam perferendis consequatur dignissimos. Vel tempora culpa
                provident reiciendis perferendis praesentium magnam animi, illo
                suscipit, in omnis blanditiis earum minus velit! Quas in
                architecto nam labore reprehenderit magni, quasi saepe neque ad
                ratione natus?
              </p>
            </div>

            <div className={styles.card__feedback}>
              {agents.map((val, index) => (
                <div key={index} className={styles.feedback__feed}>
                  <div className={styles.feedback__header}>
                    <div className={styles.feedback__img}>{val.img}</div>
                    <div className={styles.feedback__detail}>
                      <h1>{val.name}</h1>
                      <p>{val.status}</p>
                    </div>
                  </div>
                  <p className={styles.feedback__body}>{val.body}</p>
                </div>
              ))}
            </div>

            {page === "Login" ? (
              <></>
            ) : (
              <div className={styles.card__trustees}>
                <div className={styles.trustees__images}>
                  <img
                    src={pic1}
                    alt="picture"
                    className={styles.trustees__imagg}
                  />
                  <img
                    src={pic2}
                    alt="picture"
                    className={styles.trustees__imagg}
                  />
                  <img
                    src={pic3}
                    alt="picture"
                    className={styles.trustees__imagg}
                  />
                </div>
                <p>Trusted by sustainable advocates globally</p>
              </div>
            )}
          </section>

          <section
            className={
              page === "Login" ? styles.card__formLogin : styles.card__form
            }
          >
            <div className={styles.form__logo}>
              <img src={icon} alt="Applogo" className={styles.form__icon} />
              <img
                src={Appname}
                alt="AppName"
                className={styles.form__Appname}
              />
            </div>
            <div className={styles.form__account}>
              <div className={styles.form__community}>
                {page === "Login" ? (
                  <h1 className={styles.community__welcome}>Welcome Back</h1>
                ) : (
                  <h1>Create your account</h1>
                )}
                <p>Join the latest community of Green Revolution</p>
              </div>

              <div className={styles.form__button}>
                <button
                  className={
                    page === "Login" ? styles.active__btn : styles.inactive__btn
                  }
                  onClick={() => {
                    navigate("/signin");
                    reset();
                  }}
                >
                  Login
                </button>

                <button
                  className={
                    page === "Sign Up"
                      ? styles.active__btn
                      : styles.inactive__btn
                  }
                  onClick={() => {
                    navigate("/signup");
                    reset();
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div
              className={
                page === "Login"
                  ? styles.form__parentLogin
                  : styles.form__parent
              }
            >
              <form
                onSubmit={
                  page === "Login"
                    ? handleSubmit(loginCall)
                    : handleSubmit(submitCall)
                }
              >
                {page === "Login" ? (
                  <></>
                ) : (
                  <>
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

                    <div className={styles.form__child}>
                      <label htmlFor="fullname">Full Name</label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        {...register("fullname", {
                          required: "Full name is required",
                          validate: (value) =>
                            value.trim().split(" ").length >= 2 ||
                            "Enter first and last name",
                        })}
                        placeholder="Sarah Jenkins"
                      />
                      {errors.fullname && (
                        <div className={styles.form__error}>
                          {errors.fullname.message}
                        </div>
                      )}
                    </div>

                    {selectedRole === "Seller" && (
                      <div className={styles.form__child}>
                        <label htmlFor="sellerAuthMethod">Verification Method</label>
                        <select 
                          id="sellerAuthMethod"
                          className={styles.passwordInput}
                          {...register("authMethod")}
                        >
                          <option value="" disabled>Select Verification Method</option>
                          <option value="upload">Business Document</option>
                          <option value="nin">National ID (NIN)</option>
                        </select>

                        {authMethod === "upload" && (
                          <div className={styles.fileUploadContainer} style={{marginTop: '15px'}}>
                            <div className={styles.fileInputWrapper}>
                              <input
                                type="file"
                                id="businessDoc"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                                {...register("businessDoc", {
                                  required: "Business Document is required",
                                })}
                                className={styles.fileInput}
                              />
                              <div className={styles.fileCover}>
                                {selectedFile && selectedFile.length > 0 
                                  ? selectedFile[0].name 
                                  : "Click to choose a file or drag it here"}
                              </div>
                            </div>
                            {errors.businessDoc && (
                              <div className={styles.form__error}>
                                {errors.businessDoc.message}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {authMethod === "nin" && (
                          <div className={styles.fileUploadContainer} style={{marginTop: '15px'}}>
                            <label htmlFor="idNumber">National ID Number (NIN)</label>
                            <input
                              type="text"
                              placeholder="National ID Number"
                              {...register("idNumber", {
                                required: "NIN is required"
                              })}
                              className={styles.idInput}
                            />
                            {errors.idNumber && (
                              <div className={styles.form__error}>
                                {errors.idNumber.message}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                <div className={styles.form__child}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="name@email.com"
                  />
                  {errors.email && (
                    <div className={styles.form__error}>
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className={styles.form__child}>
                  <div className={styles.form__password}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.passwordInputContainer}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                            message:
                              "Min 8 chars, uppercase, lowercase, number & special char",
                          },
                        })}
                        placeholder="***************"
                        className={styles.passwordInput}
                      />
                      <span
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                      </span>
                    </div>
                    {errors.password && (
                      <div className={styles.form__error}>
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className={styles.form__check}>
                    <div className={styles.checkbox}>
                      <input type="checkbox" id="remember" defaultChecked={true} />
                      <label htmlFor="remember">Remember me</label>
                    </div>
                    {page === "Login" ? (
                      <div
                        className={styles.forgotPass}
                        onClick={handleForgotPassword}
                      >
                        Forgot Password?
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                {page == "Login" ? (
                  <button type="submit" className={styles.form__submit} disabled={isLoading}>
                    {isLoading ? "Proceeding..." : "Proceed"}
                  </button>
                ) : (
                  <>
                    <button type="submit" className={styles.form__submit} disabled={isLoading}>
                      {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <div className={styles.form__agreement}>
                      <input type="checkbox" id="agreement" defaultChecked={true} />
                      <label htmlFor="agreement">
                        I agree to the Terms Services and Privacy Policy
                      </label>
                    </div>
                  </>
                )}

                <div className={styles.form__alternateSign}>
                  <p>Or signup with</p>
                  <div className={styles.alternateSign__button}>
                    <button type="button" disabled={isLoading}>
                      <img
                        src={image1}
                        alt="googleLogo"
                        className={styles.alternateSign__logo}
                      />{" "}
                      <span className={styles.alternateSign__desc}>Google</span>
                    </button>
                    <button type="button" disabled={isLoading}>
                      <img
                        src={image2}
                        alt="microsoftLogo"
                        className={styles.alternateSign__logo}
                      />
                      <span className={styles.alternateSign__desc}>
                        Microsoft
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div></div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SignUpLogin;
