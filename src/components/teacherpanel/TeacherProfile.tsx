"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaSave } from "react-icons/fa";
import pic from "@/assets/extraimages/girlimage.png";

export default function TeacherProfile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Mr. Sharma",
    email: "sharma@example.com",
    phone: "9876543210",
    subject: "Mathematics",
    address: "Kathmandu, Nepal",
    bio: "Experienced teacher with 10+ years in high school mathematics.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = () => {
    // You can add form validation and API calls here.
    setEditMode(false);
  };

  return (
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            My Profile
          </h1>
          <button
            onClick={editMode ? handleSave : toggleEdit}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              editMode
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {editMode ? (
              <>
                <FaSave className="text-sm" /> Save
              </>
            ) : (
              <>
                <FaEdit className="text-sm" /> Edit
              </>
            )}
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <Image
              src={pic}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-200 shadow-md object-cover"
            />
          </div>

          {/* Info Form */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="text-gray-600 text-sm">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-800 font-medium">
                  {formData.name}
                </p>
              )}
            </div>

            {/* Email - non-editable */}
            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <p className="mt-1 text-gray-800 font-medium">{formData.email}</p>
              {!editMode && (
                <p className="text-[11px] text-gray-500 italic">
                  Email cannot be changed
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-600 text-sm">Phone</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-800 font-medium">
                  {formData.phone}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="text-gray-600 text-sm">Subject</label>
              {editMode ? (
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-800 font-medium">
                  {formData.subject}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="text-gray-600 text-sm">Address</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-800 font-medium">
                  {formData.address}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className="text-gray-600 text-sm">Bio</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border px-3 py-2 rounded-md mt-1"
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
