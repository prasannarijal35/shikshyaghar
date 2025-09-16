"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit, FaSave, FaDownload } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn, MdHistory, MdCalendarToday, MdWc, MdSchool, MdPerson } from "react-icons/md";
import Toast from "./Toast";
import pic from "@/assets/extraimages/girlimage.png";
import teacherService from "@/services/teacherServices";
import { Teacher } from "@/types/teacher";
import { getUser } from "@/utils/localStorage";

export default function TeacherProfile() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthYear: "",
    address: "",
    bio: "",
    experience: "",
    availability: "",
    qualification: "",
    profilePicture: "",
    documentUrl: "",
    profileFile: null as File | null,
    documentFile: null as File | null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const user = getUser();
        if (!user) {
          setToast({ message: "User not logged in", type: "error" });
          return;
        }
        if (user.role !== "teacher") {
          setToast({ message: `Logged in user is not a teacher`, type: "error" });
          return;
        }

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
          documentUrl: data.documentUrl || "",
          profileFile: null,
          documentFile: null,
        });
      } catch (err: any) {
        console.error(err);
        setToast({ message: err?.message || "Failed to fetch profile", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      if (name === "profilePicture") setFormData({ ...formData, profilePicture: url, profileFile: files[0] });
      if (name === "document") setFormData({ ...formData, documentUrl: url, documentFile: files[0] });
    }
  };

  const toggleEdit = () => setEditMode((prev) => !prev);

  const handleSave = async () => {
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
    if (formData.profileFile) form.append("profilePicture", formData.profileFile);
    if (formData.documentFile) form.append("document", formData.documentFile);

    try {
      const updated: Teacher = await teacherService.updateTeacherProfile(form);
      setFormData({
        ...formData,
        profilePicture: updated.profilePicture || formData.profilePicture,
        documentUrl: updated.documentUrl || formData.documentUrl,
      });
      setToast({ message: "Profile updated successfully!", type: "success" });
      setEditMode(false);
    } catch (err: any) {
      console.error(err);
      setToast({ message: err?.message || "Failed to update profile", type: "error" });
    }
  };

  const getImageUrl = (url: string | null) => (url ? url : pic);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Profile</h1>
          <button
            onClick={editMode ? handleSave : toggleEdit}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-semibold text-white shadow-lg transform hover:scale-105 ${
              editMode ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
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
          {/* Profile Card Section */}
          <div className="md:col-span-1 flex flex-col items-center bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image src={getImageUrl(formData.profilePicture)} alt="Profile Picture" fill className="object-cover" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 text-center">{formData.name}</h2>
            <p className="mt-1 text-md text-gray-600 font-medium text-center">{formData.qualification}</p>

            {editMode && (
              <div className="mt-6 w-full space-y-4">
                <div className="flex flex-col items-center">
                  <label className="text-sm font-medium text-gray-700 mb-2">Change Profile Picture</label>
                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
                  <input
                    type="file"
                    name="document"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            )}
            {!editMode && formData.documentUrl && (
              <a
                href={formData.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
              >
                <FaDownload /> Download Document
              </a>
            )}
          </div>

          {/* Profile Details Section */}
          <div className="md:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact & Basic Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField
                  label="Full Name"
                  value={formData.name}
                  icon={<MdPerson />}
                  editMode={editMode}
                  name="name"
                  handleChange={handleChange}
                />
                <ProfileField
                  label="Email"
                  value={formData.email}
                  icon={<MdEmail />}
                  readOnly
                />
                <ProfileField
                  label="Phone"
                  value={formData.phone}
                  icon={<MdPhone />}
                  editMode={editMode}
                  name="phone"
                  handleChange={handleChange}
                />
                <ProfileField
                  label="Gender"
                  value={formData.gender}
                  icon={<MdWc />}
                  editMode={editMode}
                  name="gender"
                  handleChange={handleChange}
                />
                <ProfileField
                  label="Birth Year"
                  value={formData.birthYear}
                  icon={<MdCalendarToday />}
                  editMode={editMode}
                  name="birthYear"
                  handleChange={handleChange}
                  type="number"
                />
                <div className="sm:col-span-2">
                  <ProfileField
                    label="Address"
                    value={formData.address}
                    icon={<MdLocationOn />}
                    editMode={editMode}
                    name="address"
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Professional Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField
                  label="Experience (years)"
                  value={formData.experience}
                  icon={<MdHistory />}
                  editMode={editMode}
                  name="experience"
                  handleChange={handleChange}
                  type="number"
                />
                <ProfileField
                  label="Availability"
                  value={formData.availability}
                  icon={<MdCalendarToday />}
                  editMode={editMode}
                  name="availability"
                  handleChange={handleChange}
                />
                <ProfileField
                  label="Qualification"
                  value={formData.qualification}
                  icon={<MdSchool />}
                  editMode={editMode}
                  name="qualification"
                  handleChange={handleChange}
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

// Reusable component for form fields
const ProfileField = ({ label, value, icon, editMode, name, handleChange, type = "text", readOnly = false }: any) => {
  return (
    <div>
      <label className="text-gray-600 text-sm font-medium flex items-center gap-2 mb-1">
        {icon} {label}
      </label>
      {editMode && !readOnly ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
        />
      ) : (
        <p className="mt-1 font-medium text-gray-800 bg-gray-50 py-2 px-4 rounded-lg border border-gray-200">{value || "N/A"}</p>
      )}
    </div>
  );
};

// Reusable component for textarea fields
const ProfileTextAreaField = ({ label, value, editMode, name, handleChange }: any) => {
  return (
    <div>
      <label className="text-gray-600 text-sm font-medium block mb-1">{label}</label>
      {editMode ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          rows={5}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 resize-none focus:outline-none transition-colors duration-200"
        />
      ) : (
        <p className="mt-1 text-gray-800 bg-gray-50 py-3 px-4 rounded-lg border border-gray-200 whitespace-pre-wrap">{value || "N/A"}</p>
      )}
    </div>
  );
};