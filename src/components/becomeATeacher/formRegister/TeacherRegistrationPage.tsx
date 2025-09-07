// pages/TeacherRegistrationPage.tsx or app/teacher-registration/page.tsx
"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  FileText,
  BookOpen,
  Award,
  Clock,
  Check,
} from "lucide-react";
import InputField from "@/components/becomeATeacher/formRegister/InputField";
import SelectDropdown from "@/components/becomeATeacher/formRegister/SelectDropdown";
import TextArea from "@/components/becomeATeacher/formRegister/TextArea";
import FileUploadField from "@/components/becomeATeacher/formRegister/FileUploadField";
import Toast from "@/components/becomeATeacher/formRegister/Toast";

interface TeacherRegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "teacher";
  phone?: string;
  gender?: "male" | "female" | "other" | "";
  birthYear?: number | "";
  address?: string;
  bio?: string;
  availability?: string;
  qualification?: string;
  teachingExperience?: number | "";
  profilePicture?: File;
  document?: File;
}

interface ValidationErrors {
  [key: string]: string;
}

const TeacherRegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<TeacherRegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "teacher",
    phone: "",
    gender: "",
    birthYear: "",
    address: "",
    bio: "",
    availability: "",
    qualification: "",
    teachingExperience: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateFile = (file: File, type: "image" | "pdf"): string | null => {
    const maxSize = type === "image" ? 5 * 1024 * 1024 : 10 * 1024 * 1024;

    if (file.size > maxSize) {
      return `File size must be less than ${type === "image" ? "5MB" : "10MB"}`;
    }

    if (type === "image" && !file.type.startsWith("image/")) {
      return "Please select a valid image file";
    }

    if (type === "pdf" && file.type !== "application/pdf") {
      return "Please select a valid PDF file";
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (!validatePassword(formData.password))
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.profilePicture)
      newErrors.profilePicture = "Profile picture is required";
    else {
      const fileError = validateFile(formData.profilePicture, "image");
      if (fileError) newErrors.profilePicture = fileError;
    }

    if (!formData.document) newErrors.document = "Document is required";
    else {
      const fileError = validateFile(formData.document, "pdf");
      if (fileError) newErrors.document = fileError;
    }

    // Validate teaching experience
    if (
      formData.teachingExperience === "" ||
      formData.teachingExperience === null
    ) {
      newErrors.teachingExperience = "Teaching experience is required";
    } else if (Number(formData.teachingExperience) < 1) {
      newErrors.teachingExperience = "Experience must be at least 1 year";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    const newValue =
      name === "teachingExperience" ? Math.max(Number(value), 1) : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleProfilePictureChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, profilePicture: file || undefined }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setProfilePreview("");
    }
    if (errors.profilePicture)
      setErrors((prev) => ({ ...prev, profilePicture: "" }));
  };

  const handleDocumentChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, document: file || undefined }));
    if (errors.document) setErrors((prev) => ({ ...prev, document: "" }));
  };

  const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({
        message: "Please fill out all required fields.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== null) {
          if (key === "profilePicture" || key === "document") {
            if (value instanceof File) formDataToSend.append(key, value);
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setToast({
        message: "Registration successful! Welcome aboard!",
        type: "success",
      });

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "teacher",
        phone: "",
        gender: "",
        birthYear: "",
        address: "",
        bio: "",
        availability: "",
        qualification: "",
        teachingExperience: "",
      });
      setProfilePreview("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setToast({
        message: "Registration failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const genderOptions = [
    { value: "", label: "Select gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const availabilityOptions = [
    { value: "", label: "Select availability" },
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "weekends", label: "Weekends Only" },
    { value: "evenings", label: "Evenings Only" },
    { value: "flexible", label: "Flexible" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 animate-float-slow">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Teacher Registration
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our platform and start making a difference in students lives.
              Please fill out all the required information to complete your
              registration.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              {/* Personal Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    required
                    placeholder="Enter your full name"
                    icon={<User size={20} />}
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    required
                    placeholder="Enter your email"
                    icon={<Mail size={20} />}
                  />
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    required
                    placeholder="Create a password"
                    icon={<Lock size={20} />}
                    hint="Minimum 6 characters"
                  />
                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    required
                    placeholder="Confirm your password"
                    icon={<Lock size={20} />}
                  />
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="Enter your phone number"
                    icon={<Phone size={20} />}
                  />
                  <SelectDropdown
                    label="Gender"
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleInputChange}
                    options={genderOptions}
                    error={errors.gender}
                  />
                  <InputField
                    label="Birth Year"
                    name="birthYear"
                    type="number"
                    value={formData.birthYear || ""}
                    onChange={handleInputChange}
                    error={errors.birthYear}
                    placeholder="e.g., 1990"
                    icon={<Calendar size={20} />}
                  />
                  <InputField
                    label="Address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    error={errors.address}
                    placeholder="Enter your address"
                    icon={<MapPin size={20} />}
                  />
                </div>
                <div className="mt-6">
                  <TextArea
                    label="Bio"
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleInputChange}
                    error={errors.bio}
                    placeholder="Tell us about yourself, your teaching philosophy, and what makes you unique..."
                    rows={4}
                    hint="This will be displayed on your profile to help students connect with you"
                  />
                </div>
              </div>

              {/* Teacher Details */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  Teacher Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectDropdown
                    label="Availability"
                    name="availability"
                    value={formData.availability || ""}
                    onChange={handleInputChange}
                    options={availabilityOptions}
                    error={errors.availability}
                    icon={<Clock size={20} />}
                    hint="When are you available to teach?"
                  />
                  <InputField
                    label="Qualification"
                    name="qualification"
                    value={formData.qualification || ""}
                    onChange={handleInputChange}
                    error={errors.qualification}
                    placeholder="e.g., Master's in Mathematics"
                    icon={<Award size={20} />}
                    hint="Your highest relevant qualification"
                  />
                  <InputField
                    label="Teaching Experience (Years)"
                    name="teachingExperience"
                    type="number"
                    min={1}
                    value={formData.teachingExperience || ""}
                    onChange={handleInputChange}
                    error={errors.teachingExperience}
                    placeholder="e.g., 5"
                    icon={<BookOpen size={20} />}
                    hint="Total years of teaching experience"
                  />
                </div>
              </div>

              {/* Documents */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUploadField
                    label="Profile Picture"
                    name="profilePicture"
                    onChange={handleProfilePictureChange}
                    error={errors.profilePicture}
                    required
                    accept="image/*"
                    hint="Upload a clear photo of yourself"
                    preview={profilePreview}
                  />
                  <FileUploadField
                    label="Teaching Certificate/CV"
                    name="document"
                    onChange={handleDocumentChange}
                    error={errors.document}
                    required
                    accept="application/pdf"
                    hint="Upload your teaching certificate, CV, or relevant credentials"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center min-w-[200px] hover:bg-white hover:text-primary hover:border-primary border border-transparent"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      <span>Complete Registration</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-600">
            <p>
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistrationPage;
