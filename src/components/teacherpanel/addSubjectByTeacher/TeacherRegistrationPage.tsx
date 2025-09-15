"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import InputField from "./InputField";
import TextArea from "./TextArea";
import SelectDropdown from "./SelectDropdown";
import TeacherSubjectService from "@/services/teacherSubjectServices";
import gradeSubjectService, {
  GradeSubject,
} from "@/services/gradeSubjectServices";
import { CreateClassForm } from "@/types/teacherSubject";
import { getUser } from "@/utils/localStorage";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CreateClassForm | null;
}

const CreateClassModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [visible, setVisible] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [gradeSubjects, setGradeSubjects] = useState<
    { value: string; label: string }[]
  >([]);
  const [assignment, setAssignment] = useState<CreateClassForm>({
    gradeSubjectId: 0,
    price: 0,
    startTime: "",
    duration: 0,
    meetingLink: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  // Fetch grade-subjects
  useEffect(() => {
    if (isOpen) {
      const fetchGradeSubjects = async () => {
        try {
          const data: GradeSubject[] =
            await gradeSubjectService.getAllGradeSubjects();
          setGradeSubjects(
            data.map((gs) => ({
              value: gs.id.toString(),
              label: `${gs.grade?.name} - ${gs.subject?.name} - Rs ${
                gs.price ?? 0
              }`,
            }))
          );
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          toast.error("Failed to fetch grade-subjects");
        }
      };
      fetchGradeSubjects();
    }
  }, [isOpen]);

  // Load initial data for edit
  useEffect(() => {
    if (initialData) {
      setAssignment({
        ...initialData,
        startTime:
          initialData.startTime.length === 5
            ? initialData.startTime + ":00"
            : initialData.startTime,
      });
    }
  }, [initialData]);

  const handleChange = (
    field: keyof CreateClassForm,
    value: string | number
  ) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSubmit = async () => {
    if (!assignment.gradeSubjectId)
      return toast.error("Please select a grade subject");
    if ((assignment.price ?? 0) < 0)
      return toast.error("Price cannot be negative");
    if (assignment.duration <= 0)
      return toast.error("Duration must be greater than 0");
    if (!assignment.startTime) return toast.error("Please select a start time");

    setIsLoading(true);
    try {
      const teacherId = getUser()?.teacher?.id;
      if (!teacherId) {
        toast.error("Teacher not authenticated.");
        setIsLoading(false);
        return;
      }
      const meetingLink = assignment.meetingLink?.trim();
      if (meetingLink) {
        try {
          new URL(meetingLink); // throws if invalid
        } catch {
          toast.error("Meeting link must be a valid URL");
          setIsLoading(false);
          return;
        }
      }

      const payload: CreateClassForm = {
        ...assignment,
        startTime:
          assignment.startTime.length === 5
            ? assignment.startTime + ":00"
            : assignment.startTime,
        teacherId,
        meetingLink,
        description: assignment.description?.trim() || "",
      };

      if (initialData?.id) {
        await TeacherSubjectService.updateAssignment(initialData.id, payload);
        toast.success("Class updated successfully");
      } else {
        await TeacherSubjectService.createAssignment(payload);
        toast.success("Class created successfully");
      }

      handleClose();
    } catch (err: any) {
      console.error("Failed to save class:", err);
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to save class"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen && !visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl w-full max-w-3xl h-[90vh] flex flex-col relative transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Class" : "Create Class"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="border rounded-xl p-4 shadow-sm bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectDropdown
                label="Grade Subject"
                name="gradeSubjectId"
                value={assignment.gradeSubjectId.toString()}
                onChange={(_, val) =>
                  handleChange("gradeSubjectId", Number(val))
                }
                options={gradeSubjects}
                searchable
                required
              />
              <InputField
                label="Price"
                name="price"
                type="number"
                value={assignment.price?.toString() || ""}
                onChange={(_, val) => handleChange("price", Number(val))}
                required
              />
              <InputField
                label="Start Time"
                name="startTime"
                type="time"
                value={assignment.startTime}
                onChange={(_, val) => handleChange("startTime", val)}
                required
              />
              <InputField
                label="Duration (minutes)"
                name="duration"
                type="number"
                value={assignment.duration.toString()}
                onChange={(_, val) => handleChange("duration", Number(val))}
                required
              />
              <InputField
                label="Meeting Link"
                name="meetingLink"
                type="text"
                value={assignment.meetingLink}
                onChange={(_, val) => handleChange("meetingLink", val)}
              />
            </div>
            <TextArea
              label="Description"
              name="description"
              value={assignment.description || ""}
              onChange={(field, val) => handleChange(field, val)}
              placeholder="Enter description..."
            />
          </div>
        </div>

        <div className="flex justify-end items-center p-4 border-t">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading
              ? initialData
                ? "Updating..."
                : "Creating..."
              : initialData
              ? "Update Class"
              : "Create Class"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClassModal;
