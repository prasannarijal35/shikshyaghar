"use client";
import { useEffect } from "react";

import { Video, User } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    // This is where you would initialize Lucide icons if needed
    // You can also import specific icons as components directly
  }, []);

  const scrollToRegistration = () => {
    const registrationElement = document.getElementById("registration");
    if (registrationElement) {
      registrationElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_4s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_6s_ease-in-out_infinite]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-[fadeInUp_0.6s_ease-out_forwards]">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Inspire the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
                Next Generation
              </span>
              . Teach with Us.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of passionate educators who are making a difference
              in students lives while earning a sustainable income through
              online teaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToRegistration}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all hover-lift animate-[pulse_2s_ease-in-out_infinite]"
              >
                Register as a Teacher
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all hover-lift">
                Watch Demo
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2K+</div>
                <div className="text-gray-600">Expert Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-3xl p-8 shadow-2xl hover-lift">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Video className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Live Class in Progress</div>
                    <div className="text-gray-500 text-sm">
                      Advanced Mathematics
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`bg-gray-100 rounded-xl h-20 flex items-center justify-center ${
                          i === 4 ? "bg-blue-100" : ""
                        }`}
                      >
                        <User
                          className={`w-8 h-8 ${
                            i === 4 ? "text-blue-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="text-sm text-gray-600">
                    24 students attending
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 blob opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 blob opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
