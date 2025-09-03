"use client";
import React from "react";
import {
  Users,
  Target,
  Shield,
  BookOpen,
  Award,
  Lightbulb,
  Star,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import HeroImage from "@/assets/about-us/About_us.png";

export default function AboutUs() {
  const coreValues = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      text: "Empowerment through education",
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: "Accessibility and inclusion for all learners",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      text: "Innovation in teaching and learning",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Transparency and trust in all interactions",
    },
  ];

  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Expert Teachers",
      description:
        "Connect with qualified and experienced educators from various fields.",
      gradient: "var(--color-primary)",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Flexible Learning",
      description:
        "Learn at your own pace with personalized coaching sessions.",
      gradient: "var(--color-secondary)",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Proven Results",
      description:
        "Track your progress and achieve your academic goals effectively.",
      gradient:
        "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
      }}
    >
      {/* Hero Section with Wave Background */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 animate-pulse"
            style={{ backgroundColor: "var(--color-primary)" }}
          ></div>
          <div
            className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-10 animate-pulse"
            style={{ backgroundColor: "var(--color-secondary)" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <div
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    opacity: 0.9,
                  }}
                >
                  ✨ Welcome to Shikshya Ghar
                </div>

                <h1 className="text-6xl font-bold leading-tight">
                  <span style={{ color: "var(--color-foreground)" }}>
                    Transforming
                  </span>
                  <br />
                  <span
                    className="bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                    }}
                  >
                    Education
                  </span>
                  <br />
                  <span style={{ color: "var(--color-foreground)" }}>
                    Together
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  We are committed to building a platform that empowers students
                  and teachers to connect, grow, and thrive in their educational
                  journey.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="p-4 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary), var(--color-primary)dd)`,
                    color: "white",
                  }}
                >
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Students</div>
                </div>
                <div
                  className="p-4 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, var(--color-secondary), var(--color-secondary)dd)`,
                    color: "white",
                  }}
                >
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Teachers</div>
                </div>
                <div
                  className="p-4 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                    color: "white",
                  }}
                >
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm opacity-90">Success</div>
                </div>
              </div>

              <button
                className="inline-flex items-center px-8 py-4 rounded-xl font-semibold text-white text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
                style={{
                  background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                }}
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative">
                {/* Main Image Container */}
                <div
                  className="rounded-3xl p-8 shadow-2xl transform hover:rotate-1 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary)15, var(--color-secondary)15)`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="w-full h-96 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${HeroImage.src})`, // use .src for Next.js imported image
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {/* <Users className="w-32 h-32 text-white opacity-80" /> */}

                    {/* Floating Elements */}
                    <div
                      className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center animate-bounce"
                      style={{
                        backgroundColor: "white",
                        color: "var(--color-primary)",
                      }}
                    >
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div
                      className="absolute bottom-4 left-4 w-12 h-12 rounded-full flex items-center justify-center animate-pulse"
                      style={{
                        backgroundColor: "white",
                        color: "var(--color-secondary)",
                      }}
                    >
                      <Star className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div
                  className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-3xl opacity-30"
                  style={{
                    background: `linear-gradient(135deg, var(--color-secondary), var(--color-primary))`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground)" }}
            >
              Why Choose{" "}
              <span style={{ color: "var(--color-primary)" }}>
                Shikshya Ghar
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes our platform the perfect choice for your
              educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                style={{
                  backgroundColor: "var(--color-background)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: feature.gradient, color: "white" }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div
        className="py-20 px-4"
        style={{ backgroundColor: "var(--color-background)f5" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div
              className="p-10 rounded-3xl transform hover:scale-105 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, var(--color-primary)10, var(--color-primary)05)`,
                border: `2px solid var(--color-primary)30`,
              }}
            >
              <div className="flex items-center mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mr-6"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary), var(--color-primary)dd)`,
                  }}
                >
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-3xl font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Our Mission
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To bridge the gap between knowledge seekers and providers by
                offering a seamless digital platform where learning is
                personalized, flexible, and effective for everyone.
              </p>
            </div>

            {/* Vision */}
            <div
              className="p-10 rounded-3xl transform hover:scale-105 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, var(--color-secondary)10, var(--color-secondary)05)`,
                border: `2px solid var(--color-secondary)30`,
              }}
            >
              <div className="flex items-center mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mr-6"
                  style={{
                    background: `linear-gradient(135deg, var(--color-secondary), var(--color-secondary)dd)`,
                  }}
                >
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-3xl font-bold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Our Vision
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become the leading educational platform in Nepal, fostering a
                culture of continuous learning and knowledge sharing that
                transforms lives and communities across the nation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground)" }}
            >
              Our{" "}
              <span style={{ color: "var(--color-primary)" }}>Core Values</span>
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="flex items-center p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 group cursor-pointer"
                style={{
                  backgroundColor: "var(--color-background)",
                  border: "2px solid transparent",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow =
                    "0 5px 20px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                  }}
                >
                  <div className="text-white">{value.icon}</div>
                </div>
                <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {value.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-white p-12 rounded-3xl text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white"></div>
              <div className="absolute top-20 right-10 w-16 h-16 rounded-full bg-white"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Join thousands of students and teachers who are already
                transforming their educational experience with Shikshya Ghar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                  style={{
                    backgroundColor: "white",
                    color: "var(--color-primary)",
                  }}
                >
                  Join as Student
                </button>

                <button
                  className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-white text-white 
             bg-transparent transform hover:scale-105 transition-all duration-300 
             hover:bg-white hover:text-[var(--color-primary)]"
                >
                  Become a Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
