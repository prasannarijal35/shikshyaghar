"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit, FaSave } from "react-icons/fa";
import Toast from "./Toast";
import pic from "@/assets/extraimages/girlimage.png";

export default function TeacherProfile() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    address: "",
    bio: "",
    profilePicture: "",
    documentUrl: "",
    profileFile: null as File | null,
    documentFile: null as File | null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      const teacherId = user ? JSON.parse(user).id : null;

      if (!token || !teacherId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/api/v1/teachers/me/${teacherId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && data.data) {
          const user = data.data;
          setFormData({
            name: user.fullName || "",
            email: user.email || "",
            phone: user.phone || "",
            subject: user.teacher?.teacherSubjects?.[0]?.gradeSubject?.subject?.name || "",
            address: user.address || "",
            bio: user.teacher?.bio || "",
            profilePicture: user.teacher?.profilePicture || "",
            documentUrl: user.teacher?.documentUrl || "",
            profileFile: null,
            documentFile: null,
          });
        } else {
          setToast({ message: data.message || "Failed to fetch profile", type: "error" });
        }
      } catch (err) {
        setToast({ message: "Error fetching profile", type: "error" });
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
      if (name === "profilePicture") {
        setFormData({ ...formData, profilePicture: url, profileFile: files[0] });
      } else if (name === "document") {
        setFormData({ ...formData, documentUrl: url, documentFile: files[0] });
      }
    }
  };

  const toggleEdit = () => setEditMode((prev) => !prev);

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const form = new FormData();
    form.append("fullName", formData.name);
    form.append("phone", formData.phone);
    form.append("address", formData.address);
    form.append("bio", formData.bio);

    if (formData.profileFile) form.append("profilePicture", formData.profileFile);
    if (formData.documentFile) form.append("document", formData.documentFile);

    try {
      const res = await fetch(`http://localhost:8080/api/v1/teachers/me`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();

      if (res.ok) {
        setToast({ message: "Profile updated successfully!", type: "success" });
        if (data.data?.teacher?.profilePicture) formData.profilePicture = data.data.teacher.profilePicture;
        if (data.data?.teacher?.documentUrl) formData.documentUrl = data.data.teacher.documentUrl;
        setEditMode(false);
      } else {
        setToast({ message: data.message || "Failed to update profile", type: "error" });
      }
    } catch (err) {
      setToast({ message: "Error updating profile", type: "error" });
    }
  };

  const getImageUrl = (url: string | null) => (url ? url : pic);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={editMode ? handleSave : toggleEdit}
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition font-semibold ${
              editMode ? "bg-green-500 hover:bg-green-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {editMode ? <><FaSave /> Save</> : <><FaEdit /> Edit</>}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-10">
          {/* Left Column: Image + Document Upload */}
          <div className="flex-shrink-0 flex flex-col items-center space-y-4">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <Image src={getImageUrl(formData.profilePicture)} alt="Profile Picture" fill className="object-cover" />
            </div>
            {editMode && (
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm mt-2"
              />
            )}

            {editMode && (
              <input
                type="file"
                name="document"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="text-sm mt-2"
              />
            )}
          </div>

          {/* Right Column: Form */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm font-medium">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <p className="mt-1 font-medium text-gray-800">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">Email</label>
              <p className="mt-1 font-medium text-gray-800">{formData.email}</p>
              {!editMode && <p className="text-[11px] text-gray-500 italic mt-0.5">Email cannot be changed</p>}
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">Phone</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <p className="mt-1 font-medium text-gray-800">{formData.phone}</p>
              )}
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">Subject</label>
              <p className="mt-1 font-medium text-gray-800">{formData.subject}</p>
            </div>

            <div className="sm:col-span-2">
              <label className="text-gray-600 text-sm font-medium">Address</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <p className="mt-1 font-medium text-gray-800">{formData.address}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="text-gray-600 text-sm font-medium">Bio</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 resize-none focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-gray-800">{formData.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
