"use client";

import Image from "next/image";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Student } from "@/types/studentprofile";
import { mockStudent } from "@/data/studentprofile";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState<Student>(mockStudent);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!student.fullName) newErrors.fullName = "Full name is required";
    if (!student.gender) newErrors.gender = "Gender is required";
    if (!student.email || !/^\S+@\S+\.\S+$/.test(student.email))
      newErrors.email = "Valid email required";
    if (!student.age || isNaN(Number(student.age)))
      newErrors.age = "Valid age is required";
    if (Number(student.age) < 5) newErrors.age = "Age must be at least 5";
    return newErrors;
  }

  function handleSave() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    alert("Profile updated successfully!");
    setIsEditing(false);
  }

  return (
    <div className="relative w-full min-h-screen pb-20 bg-gray-100">
      {/* Top Gradient Background */}
      <div className="h-64 bg-blue-200 w-full"></div>

      {/* Bottom White Section */}
      <div className="mt-[-4rem] bg-white rounded-3xl pt-24 pb-14 px-4 sm:px-6 md:px-8 shadow-lg max-w-3xl mx-auto relative">
        {/* Profile Image - Overlapping */}
        <div className="absolute top-[-72px] left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-lg">
            <Image
              src={student.profilePic}
              alt="Student Profile"
              width={144}
              height={144}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 items-center text-center px-2 sm:px-4">
          <div className="flex justify-between w-full items-center max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {student.fullName}
            </h2>
            <button
              className="flex items-center gap-2 text-primary hover:underline text-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <FaEdit /> {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md text-gray-700 text-left w-full max-w-xl mt-4">
            {(Object.keys(student) as (keyof Student)[]).map((key) => {
              if (["profilePic", "progress", "fullName"].includes(key))
                return null;

              const label = key.replace(/([A-Z])/g, " $1");
              const value = student[key];
              const error = errors[key];

              return (
                <div key={key}>
                  <label className="block text-sm text-gray-600 capitalize mb-1">
                    {label}
                  </label>
                  {isEditing ? (
                    key === "gender" ? (
                      <select
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : key === "age" ? (
                      <input
                        name={key}
                        type="number"
                        min="5"
                        value={value}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                    ) : (
                      <input
                        name={key}
                        value={value as string}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                    )
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

          {/* Progress Bar */}
          <div className="w-full max-w-xl mt-6 text-left">
            <label className="block text-sm text-gray-600 mb-1">Progress</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${student.progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-gray-700">{student.progress}%</p>
          </div>

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-6 px-6 py-2.5 bg-white border border-primary text-primary hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition duration-200 text-sm sm:text-base"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
