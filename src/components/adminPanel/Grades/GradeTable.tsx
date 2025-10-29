"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Trash2, Edit, GraduationCap, Sparkles, BookOpen } from "lucide-react";
import gradeService from "@/services/gradeServices";
import { DeleteConfirmationModal } from "@/components/common";
import GradeModal from "./AddModal";
import { Grade } from "@/types/grade";

export default function GradeTable() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Grade");
  const [currentGrade, setCurrentGrade] = useState<Grade | null>(null);

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

  const handleAdd = () => {
    setModalTitle("Add Grade");
    setCurrentGrade(null);
    setShowGradeModal(true);
  };

  const handleEdit = (grade: Grade) => {
    setModalTitle("Edit Grade");
    setCurrentGrade(grade);
    setShowGradeModal(true);
  };

  const handleSave = async (name: string) => {
    if (currentGrade) {
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

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">
              Loading grades...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 sm:p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Grade Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage grades efficiently
            </p>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden flex justify-center items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2">
            <FaPlus className="w-4 h-4" />
            <span>Add Grade</span>
            <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      </div>

      {/* Table */}
      {grades.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[500px] px-6 py-12 relative">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <GraduationCap className="w-16 h-16 text-blue-500" />
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center animate-bounce shadow-md">
              <BookOpen className="w-5 h-5 text-purple-500" />
            </div>
            <div
              className="absolute -bottom-3 -left-3 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center animate-bounce shadow-md"
              style={{ animationDelay: "0.5s" }}
            >
              <GraduationCap className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="text-center space-y-6 max-w-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              No Grades Added Yet
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Start building your academic structure by adding new grades. This
              will help you organize your educational content and grade-subject
              relations effectively.
            </p>
            <button
              onClick={handleAdd}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaPlus className="w-5 h-5 mr-3" />
              Create First Grade
            </button>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-100 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/3 w-24 h-24 bg-indigo-100 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  S.N
                </th>
                <th className="py-4 px-4 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Name
                </th>
                <th className="py-4 px-4 text-right font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grades.map((grade, index) => (
                <tr
                  key={grade.id}
                  className="hover:bg-blue-50/50 transition-all duration-200 group"
                >
                  <td className="py-5 px-4 text-gray-900 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-5 px-4 text-center">{grade.name}</td>
                  <td className="py-5 px-4 text-right">
                    <div className="flex justify-end gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        onClick={() => handleEdit(grade)}
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCurrentGrade(grade);
                          setShowDeleteModal(true);
                        }}
                        className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
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
      )}

      {/* Modals */}
      <GradeModal
        isOpen={showGradeModal}
        onClose={() => setShowGradeModal(false)}
        title={modalTitle}
        initialName={currentGrade?.name}
        onConfirm={handleSave}
      />

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
