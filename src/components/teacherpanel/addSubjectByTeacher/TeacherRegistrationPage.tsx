"use client";

import { useState, useEffect } from "react";
import { X, PlusCircle, Trash2 } from "lucide-react";
import InputField from "./InputField";
import TextArea from "./TextArea";
import SelectDropdown from "./SelectDropdown";
import toast from "react-hot-toast";
import teacherSubjectService from "@/services/teacherSubjectServices";
import { CreateClassForm } from "@/types/teacherSubject";

interface CreateClassModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  isOpen: boolean;
  initialData?: CreateClassForm | null; // for edit
}

const dummyGradeSubjects = [
  { value: "1", label: "10 - Algebra - Rs 1400" },
  { value: "2", label: "11 - Physics - Rs 1500" },
  { value: "3", label: "12 - Chemistry - Rs 1600" },
];

const CreateClassModal: React.FC<CreateClassModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) => {
  const [visible, setVisible] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);

  const [assignments, setAssignments] = useState<CreateClassForm[]>([
    {
      gradeSubjectId: 0,
      price: 0,
      startTime: "",
      duration: 0,
      meetinglink: "",
      description: "",
    },
  ]);

  // Animate mount/unmount
  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  // Fill modal for edit
  useEffect(() => {
    if (initialData) {
      setAssignments([initialData]);
    }
  }, [initialData]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleChange = (
    index: number,
    field: keyof CreateClassForm,
    value: string | number
  ) => {
    const updated = [...assignments];
    if (["price", "duration", "gradeSubjectId"].includes(field)) {
      const numVal = Number(value);
      (updated[index][field] as number) = numVal < 0 ? 0 : numVal;
    } else {
      (updated[index][field] as string) = value as string;
    }
    setAssignments(updated);
  };

  const handleAddAssignment = () => {
    setAssignments([
      ...assignments,
      {
        gradeSubjectId: 0,
        price: 0,
        startTime: "",
        duration: 0,
        meetinglink: "",
        description: "",
      },
    ]);
  };

  const handleRemoveAssignment = (index: number) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      for (const assignment of assignments) {
        if (initialData && "id" in initialData) {
          // Type guard to ensure id is a number
          const assignmentId = Number((initialData as any).id);
          if (isNaN(assignmentId)) {
            toast.error("Invalid class ID");
            return;
          }
          // Update existing class
          await teacherSubjectService.updateAssignment(
            assignmentId,
            assignment
          );
        } else {
          // Create new class
          await teacherSubjectService.createAssignments(1, [assignment]); // replace 1 with teacherId
        }
      }
      toast.success(
        initialData
          ? "Class updated successfully!"
          : "Class created successfully!"
      );
      onSuccess?.();
      handleClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save class");
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
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Class" : "Create Class"}
          </h2>
          <button
            onClick={handleClose}
            type="button"
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 relative shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-semibold mb-4">
                Assignment {index + 1}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectDropdown
                  label="Grade Subject"
                  name="gradeSubjectId"
                  value={assignment.gradeSubjectId.toString()}
                  onChange={(_, val) =>
                    handleChange(index, "gradeSubjectId", Number(val))
                  }
                  options={dummyGradeSubjects}
                  required
                />
                <InputField
                  label="Price"
                  name="price"
                  type="number"
                  value={assignment.price?.toString() || ""}
                  onChange={(_, val) =>
                    handleChange(index, "price", Number(val))
                  }
                  required
                />
                <InputField
                  label="Start Time"
                  name="startTime"
                  type="datetime-local"
                  value={assignment.startTime}
                  onChange={(_, val) => handleChange(index, "startTime", val)}
                  required
                />
                <InputField
                  label="Duration (minutes)"
                  name="duration"
                  type="number"
                  value={assignment.duration?.toString() || ""}
                  onChange={(_, val) =>
                    handleChange(index, "duration", Number(val))
                  }
                  required
                />
                <InputField
                  label="Meeting Link"
                  name="meetinglink"
                  type="text"
                  value={assignment.meetinglink}
                  onChange={(_, val) => handleChange(index, "meetinglink", val)}
                  required
                />
              </div>
              <TextArea
                label="Description"
                name="description"
                value={assignment.description || ""}
                onChange={(field, val) => handleChange(index, field, val)}
                placeholder="Enter description..."
              />

              {assignments.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAssignment(index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t">
          <button
            type="button"
            onClick={handleAddAssignment}
            className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Add Assignment
          </button>
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
