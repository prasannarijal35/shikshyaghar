"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Trash2 } from "lucide-react";

import gradeService, { Grade } from "@/services/gradeServices";
import { DeleteConfirmationModal } from "@/components/common";
import GradeModal from "./AddModal";

export default function GradeTable() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Grade");
  const [currentGrade, setCurrentGrade] = useState<Grade | null>(null);

  // Fetch grades
  const fetchGrades = async () => {
    try {
      setLoading(true);
      const data = await gradeService.getAllGrades();
      setGrades(data.sort((a, b) => a.id - b.id));
    } catch {
      toast.error("Failed to fetch grades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  // Open modal for Add
  const handleAdd = () => {
    setModalTitle("Add Grade");
    setCurrentGrade(null);
    setShowGradeModal(true);
  };

  // Open modal for Edit
  const handleEdit = (grade: Grade) => {
    setModalTitle("Edit Grade");
    setCurrentGrade(grade);
    setShowGradeModal(true);
  };

  // Save from modal (Add or Edit)
  const handleSave = async (name: string) => {
    if (currentGrade) {
      // Edit
      try {
        const updated = await gradeService.updateGrade(currentGrade.id, name);
        setGrades((prev) =>
          prev
            .map((g) => (g.id === updated.id ? updated : g))
            .sort((a, b) => a.id - b.id)
        );
        toast.success(`Updated grade to ${updated.name}`);
      } catch (error: any) {
        toast.error(error?.message || "Failed to update grade");
      }
    } else {
      // Add
      try {
        const newGrade = await gradeService.createGrade(name);
        setGrades((prev) => [...prev, newGrade].sort((a, b) => a.id - b.id));
        toast.success(`Added ${newGrade.name}`);
      } catch (error: any) {
        toast.error(error?.message || "Failed to add grade");
      }
    }
    setShowGradeModal(false);
  };

  // Delete grade
  const handleDelete = async () => {
    if (!currentGrade) return;
    try {
      await gradeService.deleteGrade(currentGrade.id);
      setGrades((prev) => prev.filter((g) => g.id !== currentGrade.id));
      toast.success(`Deleted ${currentGrade.name}`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete grade");
    } finally {
      setShowDeleteModal(false);
      setCurrentGrade(null);
    }
  };

  if (loading) return <p className="p-6">Loading grades...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Grade Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
        >
          <FaPlus /> Add Grade
        </button>
      </div>

      {/* Grade Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left text-[15px] font-medium">
                S.N
              </th>
              <th className="py-4 px-4 text-center text-[15px] font-medium">
                Name
              </th>
              <th className="py-4 px-4 text-right text-[15px] font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-base">
            {grades.map((grade, index) => (
              <tr key={grade.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4 text-left">{index + 1}</td>
                <td className="py-5 px-4 text-center">{grade.name}</td>
                <td className="py-5 px-4 text-right">
                  <div className="inline-flex gap-3">
                    <button
                      onClick={() => handleEdit(grade)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCurrentGrade(grade);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Unified Modal */}
      <GradeModal
        isOpen={showGradeModal}
        onClose={() => setShowGradeModal(false)}
        title={modalTitle}
        initialName={currentGrade?.name}
        onConfirm={handleSave}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${currentGrade?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </main>
  );
}
