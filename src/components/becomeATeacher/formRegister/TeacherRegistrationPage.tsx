"use client";

import React from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Check,
} from "lucide-react";
import InputField from "./InputField";
import SelectDropdown from "./SelectDropdown";
import TextArea from "./TextArea";
import FileUploadField from "./FileUploadField";
import Toast from "./Toast";
import useTeacherRegister from "@/hooks/use-teacherRegister";

const TeacherRegistrationPage: React.FC = () => {
  const {
    formData,
    errors,
    loading,
    toast,
    profilePreview,
    handleChange,
    handleProfilePictureChange,
    handleDocumentChange,
    handleSubmit,
  } = useTeacherRegister();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => {}} />
      )}

      <div className="container mx-auto max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Teacher Registration
        </h1>

        {/* Personal Information */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
              placeholder="Enter full name"
              icon={<User size={20} />}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              placeholder="Enter email"
              icon={<Mail size={20} />}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              placeholder="Enter password"
              icon={<Lock size={20} />}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              placeholder="Confirm password"
              icon={<Lock size={20} />}
            />
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={handleChange}
              error={errors.phone}
              placeholder="Enter phone number"
              icon={<Phone size={20} />}
            />
            <SelectDropdown
              label="Gender"
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              options={genderOptions}
              error={errors.gender}
            />
            <InputField
              label="Birth Year"
              name="birthYear"
              type="number"
              value={formData.birthYear || ""}
              onChange={handleChange}
              error={errors.birthYear}
              placeholder="e.g., 1990"
              icon={<Calendar size={20} />}
            />
            <InputField
              label="Address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              error={errors.address}
              placeholder="Enter address"
              icon={<MapPin size={20} />}
            />
          </div>

          <TextArea
            label="Bio"
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            error={errors.bio}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        {/* Teacher Details */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectDropdown
              label="Availability"
              name="availability"
              value={formData.availability || ""}
              onChange={handleChange}
              options={availabilityOptions}
              error={errors.availability}
            />
            <InputField
              label="Qualification"
              name="qualification"
              value={formData.qualification || ""}
              onChange={handleChange}
              error={errors.qualification}
              placeholder="e.g., Master's in Math"
              icon={<Award size={20} />}
            />
            <InputField
              label="Teaching Experience (Years)"
              name="teachingExperience"
              type="number"
              min={0}
              value={formData.experience || ""}
              onChange={handleChange}
              error={errors.teachingExperience}
              placeholder="e.g., 5"
              icon={<BookOpen size={20} />}
            />
          </div>
        </div>

        {/* Documents */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadField
            label="Profile Picture"
            name="profilePicture"
            onChange={handleProfilePictureChange}
            error={errors.profilePicture}
            required
            accept="image/*"
            preview={profilePreview}
          />
          <FileUploadField
            label="Teaching Certificate/CV"
            name="document"
            onChange={handleDocumentChange}
            error={errors.document}
            required
            accept="application/pdf"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center min-w-[200px] hover:bg-white hover:text-primary hover:border-primary border border-transparent"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Registering...</span>
              </>
            ) : (
              <>
                <Check size={20} className="mr-2" />
                <span>Complete Registration</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistrationPage;