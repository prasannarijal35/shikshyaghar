"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "../MotionDiv";
import logo from "@/assets/logo/Sg_logo.png";
import avatar1 from "@/assets/extraimages/avatar1.png";
import useLogin from "@/hooks/use-login";

export default function Login() {
  const {
    formData,
    emailError,
    passwordError,
    loading,
    handleChange,
    handleSubmit,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MotionDiv className="flex items-center justify-center bg-gray-100 min-h-screen p-6">
      <MotionDiv className="bg-white shadow-xl rounded-3xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Banner */}
        <div className="flex-1 hidden md:flex flex-col justify-between px-8 py-10 bg-gradient-to-br from-primary to-secondary text-white rounded-l-3xl">
          <div>
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg min-h-[2.5rem]">
              Log in as a student or teacher and continue your learning journey.
            </p>
          </div>
          <MotionDiv>
            <Image
              src={avatar1}
              alt="avatar"
              width={400}
              height={400}
              className="object-contain"
            />
          </MotionDiv>
        </div>

        {/* Right Form */}
        <MotionDiv className="flex-1 px-8 py-10">
          <div className="flex justify-center mb-4">
            <Link href={"/"}>
              <Image src={logo} alt="logo" width={60} height={60} />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">
            Login to Your Account
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Access your dashboard as a student or teacher.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@domain.com"
                className={`w-full mt-1 px-3 py-2 border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className={`w-full mt-1 px-3 py-2 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md bg-primary text-white font-semibold hover:bg-secondary transition focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-secondary font-medium">
              Register here
            </Link>
          </p>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}
