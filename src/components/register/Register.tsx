"use client";
import { MotionDiv } from "../MotionDiv";
import Image from "next/image";
import logo from "@/assets/logo/Sg_logo.png";
import Link from "next/link";
import avatar1 from "@/assets/extraimages/avatar1.png";
import avatar2 from "@/assets/extraimages/avatar2.png";
import useRegister from "@/hooks/use-register";
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
            {isTeacher && (
              <>
                {/* Full Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full mt-1 px-3 py-2 border ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className={`w-full mt-1 px-3 py-2 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    className={`w-full mt-1 px-3 py-2 border ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>

                {/* Birth Year */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Birth Year
                  </label>
                  <input
                    type="number"
                    name="birthYear"
                    value={formData.birthYear || ""}
                    onChange={handleChange}
                    placeholder="e.g. 1995"
                    className={`w-full mt-1 px-3 py-2 border ${
                      errors.birthYear ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                  {errors.birthYear && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.birthYear}
                    </p>
                  )}
                </div>

                {/* Teaching Experience */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Teaching Experience
                  </label>
                  <textarea
                    name="teachingExperience"
                    value={formData.teachingExperience || ""}
                    onChange={handleChange}
                    placeholder="Describe your teaching experience"
                    className={`w-full mt-1 px-3 py-2 border ${
                      errors.teachingExperience
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-primary focus:border-primary resize-y`}
                  />
                  {errors.teachingExperience && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.teachingExperience}
                    </p>
                  )}
                </div>

                {/* Currently Studying */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Currently Studying
                  </label>
                  <select
                    name="currentlyStudying"
                    value={formData.currentlyStudying || ""}
                    onChange={handleChange}
                    className={`w-full mt-1 px-3 py-2 border ${
                      errors.currentlyStudying
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
                  >
                    <option value="">Select your current study field</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="master">Master</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.currentlyStudying && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.currentlyStudying}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Common Fields */}
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
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className={`w-full mt-1 px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full mt-1 px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-primary focus:border-primary`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <MotionDiv whileTap={{ scale: 0.97 }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-secondary disabled:opacity-70 transition focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </MotionDiv>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-secondary font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}
