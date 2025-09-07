"use client";

import { MotionDiv } from "../MotionDiv";
import Image from "next/image";
import logo from "@/assets/logo/Sg_logo.png";
import Link from "next/link";
import avatar1 from "@/assets/extraimages/avatar1.png";
import avatar2 from "@/assets/extraimages/avatar2.png";
import useRegister from "@/hooks/use-teacherRegister";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const { formData, errors, loading, handleChange, handleSubmit } =
    useRegister();
  const isTeacher = formData.role === "teacher";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center bg-gray-100 min-h-screen p-6"
    >
      <MotionDiv
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white shadow-xl rounded-3xl flex w-full max-w-5xl overflow-hidden"
      >
        {/* Left Banner */}
        <div className="flex-1 hidden md:flex flex-col justify-between px-8 py-10 bg-gradient-to-br from-primary to-secondary text-white rounded-l-3xl">
          <div>
            <h1 className="text-3xl font-bold mb-4">Join ShikshyaGhar</h1>
            <p className="text-lg min-h-[2.5rem]">
              Create your account as a student or teacher and start learning or
              teaching!
            </p>
          </div>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={isTeacher ? avatar2 : avatar1}
              alt="avatar"
              width={400}
              height={400}
              className="object-contain"
            />
          </MotionDiv>
        </div>

        {/* Right Form */}
        <MotionDiv
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 px-8 py-10"
        >
          <div className="flex justify-center mb-4">
            <Link href={"/"}>
              <Image src={logo} alt="logo" width={60} height={60} />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">
            Register Your Account
          </h2>

          {/* Role selection */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-8 mb-6 text-sm"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
              />
              Student
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={formData.role === "teacher"}
                onChange={handleChange}
              />
              Teacher
            </label>
          </MotionDiv>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={`w-full mt-1 px-3 py-2 border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

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
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                placeholder="Enter password"
                className={`w-full mt-1 px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full mt-1 px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-sm text-center text-gray-500 mt-3">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium">
                Login
              </Link>
            </p>
          </form>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}
