"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit, FaSave } from "react-icons/fa";
import {
  MdPhone,
  MdHistory,
  MdCalendarToday,
  MdSchool,
  MdPerson,
} from "react-icons/md";
import Toast from "./Toast";
import pic from "@/assets/extraimages/girlimage.png";
import teacherService from "@/services/teacherServices";
import { Teacher } from "@/types/teacher";
import { getUser } from "@/utils/localStorage";
import SelectDropdown from "./SelectDropdown";

export default function TeacherProfile() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const availabilityOptions = [
    { value: "", label: "Select Availability" },
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "weekends", label: "Weekends Only" },
    { value: "evenings", label: "Evenings Only" },
    { value: "flexible", label: "Flexible" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthYear: "", // year only
    address: "",
    bio: "",
    experience: "",
    availability: "",
    qualification: "",
    profilePicture: "",
    profileFile: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 5;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const user = getUser();
        if (!user)
          return setToast({ message: "User not logged in", type: "error" });
        if (user.role !== "teacher")
          return setToast({
            message: "Logged in user is not a teacher",
            type: "error",
          });

        const data: Teacher = await teacherService.getTeacherProfileById();
        setFormData({
          name: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          birthYear: data.birthYear?.toString() || "",
          address: data.address || "",
          bio: data.bio || "",
          experience: data.experience?.toString() || "",
          availability: data.availability || "",
          qualification: data.qualification || "",
          profilePicture: data.profilePicture || "",
          profileFile: null,
        });
      } catch (err: any) {
        console.error(err);
        setToast({
          message: err?.message || "Failed to fetch profile",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone" && value && !/^\d*$/.test(value)) return;
    if (name === "experience" && value) {
      const num = Number(value);
      if (num < 0) return;
    }
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      if (name === "profilePicture")
        setFormData({
          ...formData,
          profilePicture: url,
          profileFile: files[0],
        });
    } else {
      if (name === "profilePicture")
        setFormData({ ...formData, profileFile: null });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!/^\d+$/.test(formData.phone))
      newErrors.phone = "Phone must contain only numbers";
    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.birthYear) newErrors.birthYear = "Year of Birth is required";
    else {
      const year = Number(formData.birthYear);
      if (year > maxYear) newErrors.birthYear = `Year must be ≤ ${maxYear}`;
      if (year < minYear) newErrors.birthYear = `Year must be ≥ ${minYear}`;
    }

    if (formData.experience && Number(formData.experience) < 0)
      newErrors.experience = "Experience cannot be negative";
    if (!formData.availability)
      newErrors.availability = "Availability is required";
    if (!formData.qualification.trim())
      newErrors.qualification = "Qualification is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const form = new FormData();
    form.append("fullName", formData.name);
    form.append("phone", formData.phone);
    form.append("gender", formData.gender);
    form.append("birthYear", formData.birthYear);
    form.append("address", formData.address);
    form.append("bio", formData.bio);
    form.append("experience", formData.experience);
    form.append("availability", formData.availability);
    form.append("qualification", formData.qualification);
    if (formData.profileFile)
      form.append("profilePicture", formData.profileFile);

    try {
      const updated: Teacher = await teacherService.updateTeacherProfile(form);
      setFormData({
        ...formData,
        profilePicture: updated.profilePicture || formData.profilePicture,
      });
      setToast({ message: "Profile updated successfully!", type: "success" });
      setEditMode(false);
    } catch (err: any) {
      console.error(err);
      setToast({
        message: err?.message || "Failed to update profile",
        type: "error",
      });
    }
  };

  const getImageUrl = (url: string | null) => (url ? url : pic);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            My Profile
          </h1>
          <button
            onClick={editMode ? handleSave : () => setEditMode(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-semibold text-white shadow-lg transform hover:scale-105 ${
              editMode
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editMode ? (
              <>
                <FaSave className="text-lg" /> Save Profile
              </>
            ) : (
              <>
                <FaEdit className="text-lg" /> Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Profile Card */}
          <div className="md:col-span-1 flex flex-col items-center bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src={getImageUrl(formData.profilePicture)}
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 text-center">
              {formData.name}
            </h2>
            <p className="mt-1 text-md text-gray-600 font-medium text-center">
              {formData.qualification}
            </p>

            {editMode && (
              <div className="mt-6 w-full space-y-4">
                <FileInputField
                  label="Change Profile Picture"
                  name="profilePicture"
                  onChange={handleFileChange}
                  fileName={formData.profileFile?.name || "No file chosen"}
                />
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Contact & Basic Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField
                  label="Full Name"
                  value={formData.name}
                  editMode={editMode}
                  name="name"
                  handleChange={handleChange}
                  error={errors.name}
                  icon={<MdPerson />}
                />
                <ProfileField
                  label="Email"
                  value={formData.email}
                  editMode={false}
                />
                <ProfileField
                  label="Phone"
                  value={formData.phone}
                  editMode={editMode}
                  name="phone"
                  handleChange={handleChange}
                  error={errors.phone}
                  icon={<MdPhone />}
                />
                <SelectDropdown
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    handleDropdownChange("gender", e.target.value)
                  }
                  options={genderOptions}
                  error={errors.gender}
                />
                <ProfileField
                  label="Year of Birth"
                  value={formData.birthYear}
                  editMode={editMode}
                  name="birthYear"
                  handleChange={handleChange}
                  error={errors.birthYear}
                  type="number"
                  icon={<MdCalendarToday />}
                  min={minYear.toString()}
                  max={maxYear.toString()}
                />
                <ProfileField
                  label="Address"
                  value={formData.address}
                  editMode={editMode}
                  name="address"
                  handleChange={handleChange}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Professional Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField
                  label="Experience (years)"
                  value={formData.experience}
                  editMode={editMode}
                  name="experience"
                  handleChange={handleChange}
                  error={errors.experience}
                  type="number"
                  icon={<MdHistory />}
                />
                <SelectDropdown
                  label="Availability"
                  name="availability"
                  value={formData.availability}
                  onChange={(e) =>
                    handleDropdownChange("availability", e.target.value)
                  }
                  options={availabilityOptions}
                  error={errors.availability}
                />
                <ProfileField
                  label="Qualification"
                  value={formData.qualification}
                  editMode={editMode}
                  name="qualification"
                  handleChange={handleChange}
                  error={errors.qualification}
                  icon={<MdSchool />}
                />
              </div>
              <div className="mt-8">
                <ProfileTextAreaField
                  label="Bio"
                  value={formData.bio}
                  editMode={editMode}
                  name="bio"
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileField = ({
  label,
  value,
  editMode,
  name,
  handleChange,
  error,
  type = "text",
  icon,
  min,
  max,
  readOnly = false,
}: any) => {
  return (
    <div>
      <label className="text-gray-600 text-sm font-medium flex items-center gap-2 mb-1">
        {icon} {label}
      </label>
      {editMode && !readOnly ? (
        <>
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            className={`w-full border px-4 py-2 rounded-lg mt-1 ${
              error ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </>
      ) : (
        <p className="mt-1 font-medium text-gray-800 bg-gray-50 py-2 px-4 rounded-lg border border-gray-200">
          {value || "N/A"}
        </p>
      )}
    </div>
  );
};

const ProfileTextAreaField = ({
  label,
  value,
  editMode,
  name,
  handleChange,
}: any) => (
  <div>
    <label className="text-gray-600 text-sm font-medium block mb-1">
      {label}
    </label>
    {editMode ? (
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        rows={5}
        className="w-full border border-gray-300 px-4 py-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 resize-none focus:outline-none transition-colors duration-200"
      />
    ) : (
      <p className="mt-1 text-gray-800 bg-gray-50 py-3 px-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
        {value || "N/A"}
      </p>
    )}
  </div>
);

const FileInputField = ({ label, name, onChange }: any) => (
  <div className="w-full">
    <label className="text-gray-600 text-sm font-medium mb-2 block">
      {label}
    </label>
    <div className="relative w-full">
      <input
        type="file"
        name={name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg py-2 px-3 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  </div>
);
