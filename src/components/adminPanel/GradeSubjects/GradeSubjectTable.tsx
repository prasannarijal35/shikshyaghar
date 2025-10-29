"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import GradeSubjectModal from "./AddModal";
import gradeService from "@/services/gradeServices";
import subjectService, { Subject } from "@/services/subjectServices";
import gradeSubjectService, {
  GradeSubject,
} from "@/services/gradeSubjectServices";
import { DeleteConfirmationModal } from "@/components/common";
import { Grade } from "@/types/grade";
import { GraduationCap, BookOpen, Edit, Sparkles } from "lucide-react";

export default function GradeSubjectTable() {
  const [gradeSubjects, setGradeSubjects] = useState<GradeSubject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedGradeSubject, setSelectedGradeSubject] =
    useState<GradeSubject | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [gradesData, subjectsResponse, gradeSubjectsData] =
        await Promise.all([
          gradeService.getAllGrades(),
          subjectService.getAllSubjects(), // returns { items, pagination }
          gradeSubjectService.getAllGradeSubjects(),
        ]);

      setGrades(gradesData);
      setSubjects(subjectsResponse.items); // <-- extract items here
      setGradeSubjects(
        gradeSubjectsData.map((gs) => ({
          ...gs,
          grade: gs.grade ?? { id: 0, name: "Unknown Grade" },
          subject: gs.subject ?? { id: 0, name: "Unknown Subject" },
        }))
      );
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add/Edit
  const handleConfirm = async (
    gradeId: number,
    subjectId: number,
    price: number
  ) => {
    if (isEdit && selectedGradeSubject) {
      try {
        const updated = await gradeSubjectService.updateGradeSubject(
          selectedGradeSubject.id,
          { gradeId, subjectId, price }
        );
        setGradeSubjects((prev) =>
          prev.map((gs) =>
            gs.id === updated.id
              ? {
                  ...updated,
                  grade: grades.find((g) => g.id === gradeId)!,
                  subject: subjects.find((s) => s.id === subjectId)!,
                }
              : gs
          )
        );
        toast.success("Updated grade-subject relation");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            "Failed to update grade-subject relation"
        );
      }
    } else {
      try {
        const newRelation = await gradeSubjectService.assignGradeSubject({
          gradeId,
          subjectId,
          price,
        });
        setGradeSubjects((prev) => [
          ...prev,
          {
            ...newRelation,
            grade: grades.find((g) => g.id === gradeId)!,
            subject: subjects.find((s) => s.id === subjectId)!,
          },
        ]);
        toast.success("Added grade-subject relation");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            "Failed to add grade-subject relation"
        );
      }
    }

    setShowModal(false);
    setSelectedGradeSubject(null);
    setIsEdit(false);
  };

  // Delete
  const handleDelete = async () => {
    if (!selectedGradeSubject) return;
    try {
      await gradeSubjectService.removeGradeSubject(selectedGradeSubject.id);
      setGradeSubjects((prev) =>
        prev.filter((gs) => gs.id !== selectedGradeSubject.id)
      );
      toast.success("Deleted grade-subject relation");
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete grade-subject relation"
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">
              Loading grade-subject data...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Grade-Subject Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage grade and subject relationships with pricing
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
          }}
          className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2">
            <FaPlus className="w-4 h-4" />
            <span>Add Relation</span>
            <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      </div>

      {/* Table or Empty State */}
      {gradeSubjects.length === 0 ? (
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
              No Grade-Subject Relations Yet
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Start building your academic structure by creating grade-subject
              relationships with pricing.
            </p>
            <button
              onClick={() => {
                setShowModal(true);
                setIsEdit(false);
              }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaPlus className="w-5 h-5 mr-3" />
              Create First Relation
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    S.N
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="py-4 px-6 text-right font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Price
                  </th>
                  <th className="py-4 px-6 text-right font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gradeSubjects.map((gs, index) => (
                  <tr
                    key={gs.id}
                    className="hover:bg-blue-50/50 transition-all duration-200 group"
                  >
                    <td className="py-6 px-6 text-gray-900 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
                        {gs.grade?.name}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
                        {gs.subject?.name}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-right">
                      <span className="font-semibold text-green-600 text-lg">
                        Rs.{gs.price}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedGradeSubject(gs);
                            setShowModal(true);
                            setIsEdit(true);
                          }}
                          className="flex items-center px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedGradeSubject(gs);
                            setShowDeleteModal(true);
                          }}
                          className="flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <GradeSubjectModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedGradeSubject(null);
        }}
        title={isEdit ? "Edit Grade-Subject" : "Add Grade-Subject Relation"}
        grades={grades}
        subjects={subjects}
        initialGradeId={selectedGradeSubject?.grade?.id}
        initialSubjectId={selectedGradeSubject?.subject?.id}
        initialPrice={selectedGradeSubject?.price}
        onConfirm={handleConfirm}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this grade-subject relation?"
        onConfirm={handleDelete}
      />
    </main>
  );
}
