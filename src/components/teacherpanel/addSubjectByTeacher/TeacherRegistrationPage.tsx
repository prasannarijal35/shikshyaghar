"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, Link as LinkIcon, Check } from "lucide-react";
import InputField from "./InputField";
import TextArea from "./TextArea";
import Toast from "./Toast";
import { useCreateTeacherSubject } from "@/hooks/use-teacherSubject";
import { GradeSubject, TeacherSubjectAssignment } from "@/types/teacherSubject";
import myAxios from "@/services/apiServices";
import { getAccessToken } from "@/utils/localStorage";

interface CreateClassForm {
  gradeSubjectId: string;
  startTime: string;
  duration: string;
  price: string;
  meetinglink: string;
  description: string;
}

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: TeacherSubjectAssignment | null;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({
  isOpen,
  onClose,
  initialData = null,
}) => {
  const { createTeacherSubject, updateTeacherSubject, isLoading, error } =
    useCreateTeacherSubject();
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [gradeSubjects, setGradeSubjects] = useState<GradeSubject[]>([]);
  const [formData, setFormData] = useState<CreateClassForm>({
    gradeSubjectId: "",
    startTime: "",
    duration: "",
    price: "",
    meetinglink: "",
    description: "",
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch logged-in teacher info
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = await getAccessToken();
        if (!token) return;

        const res = await myAxios.get("/teachers/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeacherId(res.data.id);
      } catch (err) {
        console.error("Failed to get teacher info:", err);
      }
    };
    fetchTeacher();
  }, []);

  // Dummy gradeSubjects
  useEffect(() => {
    const dummyGradeSubjects: GradeSubject[] = [
      {
        id: 1,
        gradeId: 1,
        subjectId: 1,
        price: 500,
        grade: { id: 1, name: "Grade 1" },
        subject: { id: 1, name: "Math" },
      },
      {
        id: 2,
        gradeId: 2,
        subjectId: 2,
        price: 600,
        grade: { id: 2, name: "Grade 2" },
        subject: { id: 2, name: "Science" },
      },
    ];
    setGradeSubjects(dummyGradeSubjects);
  }, []);

  // Pre-fill form if initialData exists (edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        gradeSubjectId: String(initialData.gradeSubjectId),
        startTime: initialData.startTime,
        duration: String(initialData.duration),
        price: String(initialData.price),
        meetinglink: initialData.meetinglink,
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (name: keyof CreateClassForm, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.gradeSubjectId) return "Grade & Subject is required.";
    if (!formData.startTime) return "Start time is required.";
    if (Number(formData.duration) <= 0) return "Duration must be positive.";
    if (!formData.meetinglink.startsWith("http"))
      return "Meeting link must be a valid URL.";
    return null;
  };

  const handleSubmit = async () => {
    if (!teacherId) {
      setToast({
        message: "You must be logged in as a teacher.",
        type: "error",
      });
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setToast({ message: validationError, type: "error" });
      return;
    }

    const payload = {
      teacherId,
      assignments: [
        {
          gradeSubjectId: Number(formData.gradeSubjectId),
          startTime: formData.startTime,
          duration: Number(formData.duration),
          price: Number(formData.price),
          meetinglink: formData.meetinglink,
          description: formData.description || undefined,
        },
      ],
    };

    let res;
    if (initialData) {
      // Edit mode
      res = await updateTeacherSubject(initialData.id, payload);
    } else {
      // Create mode
      res = await createTeacherSubject(payload);
    }

    if (res && res.data) {
      setToast({
        message: initialData
          ? "Class updated successfully!"
          : "Class created successfully!",
        type: "success",
      });
      setFormData({
        gradeSubjectId: "",
        startTime: "",
        duration: "",
        price: "",
        meetinglink: "",
        description: "",
      });
      onClose(); // Close modal after success
    } else {
      setToast({
        message: res?.errors?.join(", ") || error || "Failed to save class",
        type: "error",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          &times;
        </button>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <h2 className="text-2xl font-bold mb-6 text-center">
          {initialData ? "Edit Class" : "Create a Class"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade & Subject
            </label>
            <select
              name="gradeSubjectId"
              value={formData.gradeSubjectId}
              onChange={(e) => handleChange("gradeSubjectId", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select Grade & Subject</option>
              {gradeSubjects.map((gs) => (
                <option key={gs.id} value={gs.id}>
                  {gs.grade.name} - {gs.subject.name} (Base: {gs.price})
                </option>
              ))}
            </select>
          </div>

          <InputField
            label="Start Time"
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
            required
            icon={<Calendar size={20} />}
          />

          <InputField
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="e.g., 60"
            icon={<Clock size={20} />}
          />

          <InputField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="e.g., 500"
            icon={<span className="text-lg font-semibold">₨</span>}
          />

          <InputField
            label="Meeting Link"
            name="meetinglink"
            value={formData.meetinglink}
            onChange={handleChange}
            required
            placeholder="Paste Zoom/Meet link"
            icon={<LinkIcon size={20} />}
          />

          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the class..."
            rows={4}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center hover:bg-white hover:text-primary hover:border-primary border border-transparent min-w-[200px]"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check size={20} className="mr-2" />
                <span>{initialData ? "Update Class" : "Create Class"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClassModal;
