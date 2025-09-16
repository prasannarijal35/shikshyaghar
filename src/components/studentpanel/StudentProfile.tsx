"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { FaEdit, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import { getUser } from "@/utils/localStorage";
import studentService from "@/services/studentService";
import { Student, Grade } from "@/types/students";
import gradeService from "@/services/gradeServices";

export default function StudentProfile() {
  const [formData, setFormData] = useState<Student | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL!.split("/api/v1")[0] + "/";

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "student.gradeId") {
      setFormData((prev) =>
        prev
          ? ({
              ...prev,
              student: {
                ...prev.student,
                gradeId: parseInt(value, 10) || null,
              },
            } as Student)
          : null
      );
    } else if (name.startsWith("student.")) {
      const key = name.split(".")[1] as keyof Student["student"];
      setFormData((prev) =>
        prev
          ? ({
              ...prev,
              student: {
                ...prev.student,
                [key]: value,
              },
            } as Student)
          : null
      );
    } else {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData((prev) =>
        prev
          ? ({
              ...prev,
              student: {
                ...prev.student,
                profilePicture: URL.createObjectURL(file),
              },
            } as Student)
          : null
      );
    }
  };

  const handleSave = async () => {
    try {
      if (!formData) return;
      const updateData = {
        fullName: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        birthYear: formData.birthYear,
        address: formData.address,
        educationLevel: formData.student?.educationLevel,
        bio: formData.student?.bio,
        gradeId: formData.student?.gradeId,
      };

      const res = await studentService.updateMyProfile(
        updateData,
        selectedFile || undefined
      );

      toast.success("Profile updated successfully");
      setFormData(res.data);
      setEditMode(false);
      await fetchProfile();
      if (selectedFile) {
        URL.revokeObjectURL(formData.student?.profilePicture || "");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!formData) return <p className="text-center mt-10">No profile found</p>;

  const imageSrc =
    formData.student?.profilePicture &&
    !formData.student.profilePicture.startsWith("C:") &&
    !formData.student.profilePicture.startsWith("blob:")
      ? `${backendUrl}${formData.student.profilePicture}`
      : formData.student?.profilePicture &&
        formData.student.profilePicture.startsWith("blob:")
      ? formData.student.profilePicture
      : "/default-avatar.png";

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-tr from-blue-50 to-purple-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto space-y-8">
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
                <FaSave /> Save
              </>
            ) : (
              <>
                <FaEdit /> Edit
              </>
            )}
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Profile Photo */}
          <div className="flex-shrink-0 text-center">
            <Image
              src={imageSrc}
              alt="Profile Picture"
              width={130}
              height={130}
              className="rounded-full border-4 border-blue-200 shadow-md object-cover"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
            )}
          </div>
          {/* Info Form */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ["Full Name", "fullName"],
              ["Gender", "gender"],
              ["Birth Year", "birthYear"],
              ["Phone", "phone"],
              ["Education Level", "student.educationLevel"],
              ["Bio", "student.bio"],
            ].map(([label, name]) => (
              <div
                key={name}
                className={name.includes("bio") ? "sm:col-span-2" : ""}
              >
                <label className="text-sm text-gray-600">{label}</label>
                {editMode ? (
                  <input
                    type={
                      name.includes("Year") || name.includes("Grade")
                        ? "number"
                        : "text"
                    }
                    name={name}
                    value={
                      name.startsWith("student.")
                        ? (formData.student as any)?.[name.split(".")[1]] || ""
                        : (formData as any)[name] || ""
                    }
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 font-medium">
                    {name.startsWith("student.")
                      ? (formData.student as any)?.[name.split(".")[1]] || "-"
                      : (formData as any)[name] || "-"}
                  </p>
                )}
              </div>
            ))}
            {/* Corrected Grade Dropdown */}
            <div>
              <label className="text-sm text-gray-600">Grade</label>
              {editMode ? (
                <select
                  name="student.gradeId"
                  value={formData.student?.gradeId || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a Grade</option>
                  {grades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="mt-1 text-gray-900 font-medium">
                  {formData.student?.grade?.name || "-"}
                </p>
              )}
            </div>
            {/* Email (always readonly) */}
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-600">Email</label>
              <p className="mt-1 text-gray-900 font-medium">{formData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
