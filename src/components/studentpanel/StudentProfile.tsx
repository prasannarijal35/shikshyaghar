"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaSave } from "react-icons/fa";
import { mockStudent } from "@/data/studentprofile";
export default function StudentProfile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...mockStudent });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => setEditMode((prev) => !prev);

  const handleSave = () => {
    // You can add validation and API calls here
    setEditMode(false);
  };

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-tr from-blue-50 to-purple-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto space-y-8 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Student Profile</h1>
          <button
            onClick={editMode ? handleSave : toggleEdit}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-sm font-medium transition-all duration-200 ${
              editMode
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-primary hover:bg-blue-700 text-white"
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
          <div className="flex-shrink-0 text-center">
            <Image
              src={formData.profilePic}
              alt="Profile Picture"
              width={130}
              height={130}
              className="rounded-full border-4 border-blue-200 shadow-md object-cover"
            />
          </div>

          {/* Info Form */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ["Full Name", "fullName"],
              ["Gender", "gender"],
              ["Age", "age"],
              ["Contact", "contact"],
              ["City", "city"],
              ["School", "school"],
              ["Grade", "grade"],
            ].map(([label, name]) => (
              <div
                key={name}
                className={
                  name === "school" || name === "grade" ? "sm:col-span-2" : ""
                }
              >
                <label className="text-sm text-gray-600">{label}</label>
                {editMode ? (
                  <input
                    type="text"
                    name={name}
                    value={formData[name as keyof typeof formData] as string}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 font-medium">
                    {formData[name as keyof typeof formData]}
                  </p>
                )}
              </div>
            ))}

            {/* Email (non-editable) */}
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-600">Email</label>
              <p className="mt-1 text-gray-900 font-medium">{formData.email}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="pt-4">
          <h2 className="text-sm text-gray-600 mb-2">Academic Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-primary h-4 rounded-full text-right text-xs pr-2 text-white font-semibold"
              style={{ width: `${formData.progress}%` }}
            >
              {formData.progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
