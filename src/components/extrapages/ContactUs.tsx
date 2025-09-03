"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our educational services? Wed love to hear from
            you. Get in touch and well respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Address
                    </h3>
                    <p className="text-lg text-gray-900">
                      Bagar 1, Pokhara, Kaski
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12  bg-primary  rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+9779825162384"
                      className="text-lg text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      +977 9825162384
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:info@shikshyaghar.com"
                      className="text-lg text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      info@shikshyaghar.com
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12  bg-primary  rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Website
                    </h3>
                    <a
                      href="https://shikshyaghar.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      shikshyaghar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Send us a message
              </h2>
              <p className="text-gray-600">
                Fill out the information below and well get back to you within
                24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-blue-500 transition-colors"
                  placeholder="What is this regarding?"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-blue-500 transition-colors resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-red-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
