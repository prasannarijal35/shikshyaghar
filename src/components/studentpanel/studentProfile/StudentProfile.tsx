"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";
import ProfileHeader from "./ProfileHeader";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileInfoForm from "./ProfileInfoForm";
import GradeDropdown from "./GridDropDown";
import { getUser, setUser } from "@/utils/localStorage";
import studentService from "@/services/studentService";
import gradeService from "@/services/gradeServices";
import { Student, Grade } from "@/types/students";
import { Loader2 } from "lucide-react";

const StudentProfile = () => {
  const [formData, setFormData] = useState<Student | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL!.split("/api/v1")[0] + "/";

  /** Fetch student profile */
  const fetchProfile = async () => {
    try {
      const user = getUser();
      if (!user || user.role !== "student") {
        toast.error("You must be logged in as a student.");
        return;
      }
      const res = await studentService.getMyProfile();
      setFormData(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  /** Fetch grades for dropdown */
  const fetchGrades = async () => {
    try {
      const gradesData = await gradeService.getAllGrades();
      setGrades(gradesData);
    } catch (err: any) {
      console.error("Failed to fetch grades:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchGrades();
  }, []);

  const toggleEdit = () => setEditMode((prev) => !prev);

  /** Handle input/select changes */
  const handleChange = (name: string, value: string) => {
    if (name === "student.gradeId") {
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              student: {
                ...prev.student,
                gradeId: parseInt(value, 10) || null,
              },
            }
          : null
      );
    } else if (name.startsWith("student.")) {
      const key = name.split(".")[1] as keyof Student["student"];
      setFormData((prev) =>
        prev ? { ...prev, student: { ...prev.student, [key]: value } } : null
      );
    } else {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  /** Handle profile image upload */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setSelectedFile(file);
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              student: {
                ...prev.student,
                profilePicture: URL.createObjectURL(file),
              },
            }
          : null
      );
      toast.success("Image selected successfully");
    }
  };

  /** Save updated profile */
  const handleSave = async () => {
    if (!formData) return;

    setSaving(true);
    try {
      // Flatten top-level and student fields for backend
      const updateData: Record<string, any> = {};

      // Top-level fields
      ["fullName", "phone", "gender", "birthYear", "address"].forEach((key) => {
        const value = formData[key as keyof typeof formData];
        if (value !== undefined && value !== null && value !== "") {
          updateData[key] = value;
        }
      });

      // Nested student fields
      ["educationLevel", "bio", "gradeId"].forEach((key) => {
        const value = formData.student?.[key as keyof typeof formData.student];
        if (value !== undefined && value !== null && value !== "") {
          updateData[key] = value;
        }
      });

      const res = await studentService.updateMyProfile(
        updateData,
        selectedFile || undefined
      );

      toast.success("Profile updated successfully");
      setFormData(res.data);
      setUser(res.data);
      setEditMode(false);

      if (selectedFile) {
        URL.revokeObjectURL(formData.student?.profilePicture || "");
        setSelectedFile(null);
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600">
            We couldn&apos;t load your profile information.
          </p>
        </div>
      </div>
    );
  }

  const imageSrc =
    formData.student?.profilePicture &&
    !formData.student.profilePicture.startsWith("C:") &&
    !formData.student.profilePicture.startsWith("blob:")
      ? `${backendUrl}${formData.student.profilePicture}`
      : formData.student?.profilePicture?.startsWith("blob:")
      ? formData.student.profilePicture
      : "/default-avatar.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader
          editMode={editMode}
          onToggleEdit={toggleEdit}
          onSave={saving ? () => {} : handleSave}
          studentName={formData.fullName}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg sticky top-6">
              <ProfileImageUpload
                imageSrc={imageSrc}
                editMode={editMode}
                onFileChange={handleFileChange}
              />

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">
                    {formData.student?.gradeId
                      ? grades.find((g) => g.id === formData.student?.gradeId)
                          ?.name || "N/A"
                      : "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">Current Grade</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">
                    {new Date().getFullYear() -
                      (formData.birthYear || new Date().getFullYear())}
                  </p>
                  <p className="text-sm text-gray-600">Age</p>
                </div>
              </div>

              {editMode && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-700 font-medium">
                    Edit Mode Active
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    Make your changes and click save to update your profile.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ProfileInfoForm
              formData={formData}
              editMode={editMode}
              onChange={handleChange}
            />
            <GradeDropdown
              selectedGradeId={formData.student?.gradeId?.toString() || ""}
              grades={grades}
              editMode={editMode}
              onChange={handleChange}
            />
          </div>
        </div>

        {editMode && (
          <div className="lg:hidden mt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-500/50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save All Changes"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
