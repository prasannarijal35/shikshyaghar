"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaSave } from "react-icons/fa";

const mockAdmin = {
  profilePic: "/admin-profile.jpg",
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Administrator",
  phone: "+1 (555) 123-4567",
  department: "IT Management",
  office: "Building A, Room 301",
  accessLevel: 75, // out of 100
};

export default function AdminProfile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...mockAdmin });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "accessLevel" ? Number(value) : value,
    }));
  };

  const toggleEdit = () => setEditMode((prev) => !prev);

  const handleSave = () => {
    // Add validation or API call here if needed
    setEditMode(false);
  };

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-tr from-blue-50 to-purple-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto space-y-8 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Admin Profile</h1>
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
              ["Full Name", "fullName", "text"],
              ["Email", "email", "email"],
              ["Role", "role", "text", true], // disabled
              ["Phone", "phone", "tel"],
              ["Department", "department", "text"],
              ["Office Location", "office", "text"],
            ].map(([label, name, type, disabled]) => (
              <div
                key={name as string}
                className={
                  name === "department" || name === "office"
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <label className="text-sm text-gray-600">{label}</label>
                {editMode && !disabled ? (
                  <input
                    type={type as string}
                    name={name as string}
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

            {/* Access Level (slider) */}
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-600">Access Level</label>
              {editMode ? (
                <input
                  type="range"
                  name="accessLevel"
                  min={0}
                  max={100}
                  value={formData.accessLevel}
                  onChange={handleChange}
                  className="w-full mt-2"
                />
              ) : (
                <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                  <div
                    className="bg-primary h-4 rounded-full text-right text-xs pr-2 text-white font-semibold"
                    style={{ width: `${formData.accessLevel}%` }}
                  >
                    {formData.accessLevel}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
