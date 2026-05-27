import React, { useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import axios from "axios";

const Login = () => {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      email: "",
      password: "",

    });

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
  // HANDLE LOGIN
  // ======================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,

          formData

        );

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem(

        "gavathi_token",

        response.data.token

      );

      // SAVE USER
      localStorage.setItem(

        "gavathi_user",

        JSON.stringify(
          response.data.user
        )

      );

      // SUCCESS TOAST
      toast.success(

        `Welcome back ${response.data.user.name} 🌿`,

        {
          style: {
            borderRadius: "14px",
            background: "#14532d",
            color: "#fff",
            padding: "14px",
          },
        }

      );

      // CLEAR FORM
      setFormData({

        email: "",
        password: "",

      });

      // REDIRECT USER
      setTimeout(() => {

        window.location.href = "/";

      }, 1500);

    } catch (error) {

      console.log(error);

      // ERROR TOAST
      toast.error(

        error.response?.data?.message ||

        "Login Failed ❌",

        {
          style: {
            borderRadius: "14px",
            background: "#dc2626",
            color: "#fff",
            padding: "14px",
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

          <motion.h1

            initial={{
              opacity: 0,
              scale: 0.8,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            transition={{
              delay: 0.2,
            }}

            className="text-4xl font-extrabold text-[#14532d]"

          >

            Welcome Back 🌾

          </motion.h1>

          <p className="text-gray-500 mt-2">

            Login to your GAVATHI account

          </p>

        </div>

        {/* DEMO CREDENTIALS */}

        <div className="bg-yellow-50 border border-yellow-300 border-l-4 border-l-yellow-500 rounded-2xl p-4 mb-6 shadow-sm">

          <h3 className="text-yellow-800 font-bold text-sm mb-2">

            Demo Seller Account (Admin)

          </h3>

          <div className="space-y-1 text-sm text-gray-700">

            <p>

              <span className="font-semibold">

                Email:

              </span>{" "}

              hrishigaonkar4@gmail.com

            </p>

            <p>

              <span className="font-semibold">

                Password:

              </span>{" "}

              hrishi123

            </p>

          </div>

        </div>

        {/* FORM */}

        <form

          onSubmit={handleSubmit}

          className="space-y-6"

        >

          {/* EMAIL */}

          <div className="relative">

            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input

              type="email"

              name="email"

              placeholder="Enter your email"

              value={formData.email}

              onChange={handleChange}

              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"

              required

            />

          </div>

          {/* PASSWORD */}

          <div className="relative">

            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input

              type="password"

              name="password"

              placeholder="Enter your password"

              value={formData.password}

              onChange={handleChange}

              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"

              required

            />

          </div>

          {/* BUTTON */}

          <motion.button

            whileHover={{
              scale: loading
                ? 1
                : 1.03,
            }}

            whileTap={{
              scale: loading
                ? 1
                : 0.95,
            }}

            disabled={loading}

            type="submit"

            className="w-full bg-[#14532d] hover:bg-green-800 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 disabled:opacity-70"

          >

            {

              loading

                ? "Logging In..."

                : "Login"

            }

          </motion.button>

        </form>

        {/* FOOTER */}

        <div className="mt-8 text-center text-gray-500">

          Don’t have an account?{" "}

          <Link

            to="/signup"

            className="text-[#14532d] font-semibold hover:underline"

          >

            Sign Up

          </Link>

        </div>

      </motion.div>

    </div>

  );

};

export default Login;