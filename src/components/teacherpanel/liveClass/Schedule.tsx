"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import liveClassService from "@/services/liveClassServices";

export interface ClassData {
  teacherSubjectId: number;
  startTime: string;
  duration: number;
  zoomLink?: string;
}

export type TeacherSubjectOption = {
  id: number;
  grade: string;
  subject: string;
};

export type ScheduleClassModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClassData) => void;
  initialData?: ClassData;
};

const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState<ClassData>({
    teacherSubjectId: 0,
    startTime: "",
    duration: 0,
    zoomLink: "",
  });

  const [subjects, setSubjects] = useState<TeacherSubjectOption[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        teacherSubjectId: 0,
        startTime: "",
        duration: 0,
        zoomLink: "",
      });
  }, [initialData]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!token) return;
      try {
        setLoadingSubjects(true);
        const data = await liveClassService.getTeacherSubjects(token);
        // Map to id, grade, subject
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = data.map((t: any) => ({
          id: t.id,
          grade: t.gradeSubject.grade.name,
          subject: t.gradeSubject.subject.name,
        }));
        setSubjects(options);
      } catch (err) {
        console.error("Failed to fetch teacher subjects", err);
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "teacherSubjectId" || name === "duration"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? "Edit Class" : "Schedule a New Class"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Subject
            </label>
            <select
              name="teacherSubjectId"
              value={formData.teacherSubjectId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              required
            >
              <option value={0}>-- Choose Subject --</option>
              {loadingSubjects ? (
                <option disabled>Loading subjects...</option>
              ) : (
                subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.grade} - {s.subject}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              min={1}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Zoom Link (optional)
            </label>
            <input
              type="url"
              name="zoomLink"
              value={formData.zoomLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? "Update Class" : "Schedule Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleClassModal;
