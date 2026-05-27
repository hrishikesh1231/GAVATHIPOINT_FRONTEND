import React, {
  useState,
  useEffect,
} from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import axios from "axios";

const Signup = () => {

  const [loading, setLoading] =
    useState(false);

  const [otpLoading,
    setOtpLoading] =
    useState(false);

  const [verifyLoading,
    setVerifyLoading] =
    useState(false);

  const [otpSent,
    setOtpSent] =
    useState(false);

  const [emailVerified,
    setEmailVerified] =
    useState(false);

  const [showVerifyBtn,
    setShowVerifyBtn] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [timer, setTimer] =
    useState(60);

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      confirmPassword: "",

    });

  // ======================================
  // EMAIL VALIDATION
  // ======================================

  useEffect(() => {

    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(formData.email);

    setShowVerifyBtn(validEmail);

  }, [formData.email]);

  // ======================================
  // OTP TIMER
  // ======================================

  useEffect(() => {

    let interval;

    if (otpSent && timer > 0) {

      interval = setInterval(() => {

        setTimer((prev) => prev - 1);

      }, 1000);

    }

    return () => clearInterval(interval);

  }, [otpSent, timer]);

  // ======================================
  // HANDLE INPUT CHANGE
  // ======================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // ======================================
  // SEND OTP
  // ======================================

  const sendOTP = async () => {

    try {

      setOtpLoading(true);

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/v1/auth/send-otp`,

          {
            email: formData.email,
          }

        );

      toast.success(

        "OTP sent successfully 📩",

        {
          style: {
            borderRadius: "14px",
            background: "#14532d",
            color: "#fff",
          },
        }

      );

      setOtpSent(true);

      setTimer(60);

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to send OTP",

        {
          style: {
            borderRadius: "14px",
            background: "#dc2626",
            color: "#fff",
          },
        }

      );

    } finally {

      setOtpLoading(false);

    }

  };

  // ======================================
  // VERIFY OTP
  // ======================================

  const verifyOTP = async () => {

    try {

      setVerifyLoading(true);

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/v1/auth/verify-otp`,

          {

            email: formData.email,
            otp,

          }

        );

      toast.success(

        "Email verified successfully ✅",

        {
          style: {
            borderRadius: "14px",
            background: "#14532d",
            color: "#fff",
          },
        }

      );

      setEmailVerified(true);

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "OTP Verification Failed",

        {
          style: {
            borderRadius: "14px",
            background: "#dc2626",
            color: "#fff",
          },
        }

      );

    } finally {

      setVerifyLoading(false);

    }

  };

  // ======================================
  // HANDLE SIGNUP
  // ======================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // EMAIL VERIFY CHECK
    if (!emailVerified) {

      toast.error(

        "Please verify email first",

        {
          style: {
            borderRadius: "14px",
            background: "#dc2626",
            color: "#fff",
          },
        }

      );

      return;

    }

    // PASSWORD MATCH
    if (

      formData.password !==
      formData.confirmPassword

    ) {

      toast.error(

        "Passwords do not match ❌",

        {
          style: {
            borderRadius: "14px",
            background: "#dc2626",
            color: "#fff",
          },
        }

      );

      return;

    }

    try {

      setLoading(true);

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`,

          {

            name: formData.name,
            email: formData.email,
            password: formData.password,

          }

        );

      toast.success(

        "Account created successfully 🎉",

        {
          style: {
            borderRadius: "14px",
            background: "#14532d",
            color: "#fff",
          },
        }

      );

    localStorage.setItem(
      "gavathi_token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

      setTimeout(() => {

        window.location.href = "/";

      }, 1500);

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Signup Failed ❌",

        {
          style: {
            borderRadius: "14px",
            background: "#dc2626",
            color: "#fff",
          },
        }

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 flex items-center justify-center px-4 py-24">

      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-green-100"

      >

        {/* TITLE */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-extrabold text-[#14532d]">

            Join GAVATHI 🌾

          </h1>

          <p className="text-gray-500 mt-2">

            Create your account

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}

          <div className="relative">

            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input

              type="text"

              name="name"

              placeholder="Full Name"

              value={formData.name}

              onChange={handleChange}

              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"

              required

            />

          </div>

          {/* EMAIL */}

          <div className="relative">

            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input

              type="email"

              name="email"

              placeholder="Email Address"

              value={formData.email}

              onChange={handleChange}

              className="w-full pl-12 pr-32 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"

              required

            />

            {

              showVerifyBtn &&
              !emailVerified && (

                <button

                  type="button"

                  onClick={sendOTP}

                  disabled={otpLoading}

                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-semibold"

                >

                  {

                    otpLoading
                      ? "Sending..."
                      : "Verify"

                  }

                </button>

              )

            }

            {

              emailVerified && (

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-700 font-semibold">

                  <FaCheckCircle />

                  Verified

                </div>

              )

            }

          </div>

          {/* OTP FIELD */}

          {

            otpSent &&
            !emailVerified && (

              <div className="space-y-3">

                <input

                  type="text"

                  placeholder="Enter OTP"

                  value={otp}

                  onChange={(e) =>
                    setOtp(e.target.value)
                  }

                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"

                />

                <button

                  type="button"

                  onClick={verifyOTP}

                  disabled={verifyLoading}

                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold"

                >

                  {

                    verifyLoading
                      ? "Verifying..."
                      : "Verify OTP"

                  }

                </button>

                {

                  timer > 0 ? (

                    <p className="text-sm text-center text-gray-500">

                      Resend OTP in {timer}s

                    </p>

                  ) : (

                    <button

                      type="button"

                      onClick={sendOTP}

                      className="text-green-700 font-semibold w-full text-center"

                    >

                      Resend OTP

                    </button>

                  )

                }

              </div>

            )

          }

          {/* PASSWORD */}

          <div className="relative">

            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input

              type="password"

              name="password"

              placeholder="Password"

              value={formData.password}

              onChange={handleChange}

              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"

              required

            />

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="relative">

            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input

              type="password"

              name="confirmPassword"

              placeholder="Confirm Password"

              value={formData.confirmPassword}

              onChange={handleChange}

              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600"

              required

            />

          </div>

          {/* BUTTON */}

          <motion.button

            whileHover={{
              scale: loading ? 1 : 1.03,
            }}

            whileTap={{
              scale: loading ? 1 : 0.96,
            }}

            type="submit"

            disabled={loading}

            className="w-full bg-[#14532d] hover:bg-green-800 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all"

          >

            {

              loading
                ? "Creating Account..."
                : "Create Account"

            }

          </motion.button>

        </form>

        {/* FOOTER */}

        <div className="mt-8 text-center text-gray-500">

          Already have an account?{" "}

          <Link

            to="/login"

            className="text-[#14532d] font-semibold hover:underline"

          >

            Login

          </Link>

        </div>

      </motion.div>

    </div>

  );

};

export default Signup;