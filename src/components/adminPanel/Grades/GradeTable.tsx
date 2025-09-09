"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTrashAlt, FaPlus, FaEdit } from "react-icons/fa";
import DeleteModal from "@/components/adminPanel/Grades/DeleteModal";
import EditModal from "@/components/adminPanel/Grades/EditModal";
import AddGradeModal from "@/components/adminPanel/Grades/AddModal";
import gradeService, { Grade } from "@/services/gradeServices";

export default function GradeTable() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

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

  // Add grade
  const handleAdd = async (newGradeName: string) => {
    try {
      const newGrade = await gradeService.createGrade(newGradeName);
      setGrades((prev) => [...prev, newGrade].sort((a, b) => a.id - b.id));
      toast.success(`Added ${newGrade.name}`);
      setShowAddModal(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to add grade");
    }
  };

  // Delete grade
  const handleDelete = async () => {
    if (!selectedGrade) return;
    try {
      await gradeService.deleteGrade(selectedGrade.id);
      setGrades((prev) => prev.filter((g) => g.id !== selectedGrade.id));
      toast.success(`Deleted ${selectedGrade.name}`);
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete grade");
    }
  };

  // Edit grade
  const handleEditConfirm = async (updatedName: string) => {
    if (!selectedGrade) return;
    try {
      const updated = await gradeService.updateGrade(selectedGrade.id, updatedName);
      setGrades((prev) =>
        prev.map((g) => (g.id === updated.id ? updated : g)).sort((a, b) => a.id - b.id)
      );
      toast.success(`Updated grade to ${updated.name}`);
      setShowEditModal(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update grade");
    }
  };

  if (loading) return <p className="p-6">Loading grades...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Grade Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
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
              <th className="py-4 px-4 text-left text-[15px] font-medium">S.N</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Name</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {grades.map((grade, index) => (
              <tr key={grade.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4">{index + 1}</td> {/* Serial Number */}
                <td className="py-5 px-4">{grade.name}</td>
                <td className="py-5 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedGrade(grade);
                        setShowEditModal(true);
                      }}
                      className="p-2 rounded-md text-yellow-600 hover:text-white hover:bg-yellow-600 transition-colors duration-200"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGrade(grade);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 rounded-md text-red-600 hover:text-white hover:bg-red-600 transition-colors duration-200"
                      title="Delete"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${selectedGrade?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
      />

      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Grade"
        currentName={selectedGrade?.name || ""}
        onConfirm={handleEditConfirm}
      />

      <AddGradeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Grade"
        onConfirm={handleAdd}
      />
    </main>
  );
}
