"use client";

import Image from "next/image";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Admin } from "@/types/adminProfile";
import { mockAdmin } from "@/data/adminProfile";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [admin, setAdmin] = useState<Admin>(mockAdmin);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!admin.fullName) newErrors.fullName = "Full name is required";
    if (!admin.email || !/^\S+@\S+\.\S+$/.test(admin.email))
      newErrors.email = "Valid email required";
    if (!admin.role) newErrors.role = "Role is required";
    return newErrors;
  }

  function handleSave() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    alert("Admin profile updated successfully!");
    setIsEditing(false);
  }

  return (
    <div className="relative w-full min-h-screen pb-20 bg-gray-100">
      <div className="h-64 bg-green-200 w-full"></div>

      <div className="mt-[-4rem] bg-white rounded-3xl pt-24 pb-14 px-4 sm:px-6 md:px-8 shadow-lg max-w-3xl mx-auto relative">
        <div className="absolute top-[-72px] left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-lg">
            <Image
              src={admin.profilePic}
              alt="Admin Profile"
              width={144}
              height={144}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center text-center px-2 sm:px-4">
          <div className="flex justify-between w-full items-center max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {admin.fullName}
            </h2>
            <button
              className="flex items-center gap-2 text-primary hover:underline text-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <FaEdit /> {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md text-gray-700 text-left w-full max-w-xl mt-4">
            {(Object.keys(admin) as (keyof Admin)[]).map((key) => {
              if (["profilePic", "fullName"].includes(key)) return null;

              const label = key.replace(/([A-Z])/g, " $1");
              const value = admin[key];
              const error = errors[key];

              return (
                <div key={key}>
                  <label className="block text-sm text-gray-600 capitalize mb-1">
                    {label}
                  </label>
                  {isEditing ? (
                    <input
                      name={key}
                      value={value as string}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-gray-800">{value}</p>
                  )}
                  {error && (
                    <p className="text-xs text-red-600 mt-1">{error}</p>
                  )}
                </div>
              );
            })}
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-6 px-6 py-2.5 bg-white border border-primary text-primary hover:bg-green-600 hover:text-white font-semibold rounded-lg transition duration-200 text-sm sm:text-base"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
