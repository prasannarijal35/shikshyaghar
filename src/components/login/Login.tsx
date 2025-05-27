"use client";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "@/assets/logo/Sg_logo.png";
import avatar1 from "@/assets/extraimages/avatar1.png";
import Link from "next/link";
import useLogin from "@/hooks/use-login";
import { MotionDiv } from "../MotionDiv";

export default function Login() {
  const {
    email,
    password,
    role,
    loading,
    emailError,
    passwordError,
    handleChange,
    handleSubmit,
    validateEmail,
    validatePassword,
  } = useLogin();

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
        <div className="flex-1 hidden md:flex flex-col justify-between px-8 py-10 bg-gradient-to-br from-primary to-white text-white rounded-l-3xl">
          <div>
            <h1 className="text-3xl font-bold mb-4">Welcome to ShikshyaGhar</h1>
            <p className="text-lg min-h-[2.5rem]">
              <Typewriter
                words={[
                  "A platform connecting students with the right teachers.",
                  "Find your ideal tutor near you.",
                  "Empowering education, one student at a time.",
                  "Learn from top-rated teachers online or offline.",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={30}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </p>
          </div>
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
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
          <h2 className="text-2xl font-bold text-center">
            Login to Your Account
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Access your dashboard as a student or teacher.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Role selector */}
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={handleChange}
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={handleChange}
                />
                Teacher
              </label>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onBlur={validateEmail}
                onFocus={validateEmail}
                onChange={handleChange}
                placeholder="e.g. john@domain.com"
                className={`w-full mt-1 px-3 py-2 border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none`}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onBlur={validatePassword}
                onFocus={validatePassword}
                onChange={handleChange}
                placeholder="Your password"
                className={`w-full mt-1 px-3 py-2 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none`}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-primary">
                Forgot password?
              </Link>
            </div>

            <MotionDiv whileTap={{ scale: 0.97 }}>
              <button
                type="submit"
                className="w-full py-2 rounded-md bg-primary text-white font-semibold hover:bg-secondary transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </MotionDiv>
          </form>

          <div className="my-6 flex items-center gap-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex gap-4">
            <MotionDiv whileTap={{ scale: 0.97 }} className="w-full">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md">
                <FcGoogle className="text-lg" />
                Google
              </button>
            </MotionDiv>
            <MotionDiv whileTap={{ scale: 0.97 }} className="w-full">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md">
                <FaFacebook className="text-blue-600 text-lg" />
                Facebook
              </button>
            </MotionDiv>
          </div>

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
