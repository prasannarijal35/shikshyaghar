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
      const [gradesData, subjectsData, gradeSubjectsData] = await Promise.all([
        gradeService.getAllGrades(),
        subjectService.getAllSubjects(),
        gradeSubjectService.getAllGradeSubjects(),
      ]);

      setGrades(gradesData);
      setSubjects(subjectsData);
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
      // Edit
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
      // Add
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

  if (loading) return <p className="p-6">Loading data...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">
          Grade-Subject Management
        </h1>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
        >
          <FaPlus /> Add Relation
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left font-medium text-[15px]">
                S.N
              </th>
              <th className="py-4 px-4 text-center font-medium text-[15px]">
                Grade
              </th>
              <th className="py-4 px-4 text-center font-medium text-[15px]">
                Subject
              </th>
              <th className="py-4 px-4 text-right font-medium text-[15px]">
                Price
              </th>
              <th className="py-4 px-4 text-right font-medium text-[15px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-base">
            {gradeSubjects.map((gs, index) => (
              <tr key={gs.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4 text-left">{index + 1}</td>
                <td className="py-5 px-4 text-center">{gs.grade?.name}</td>
                <td className="py-5 px-4 text-center">{gs.subject?.name}</td>
                <td className="py-5 px-4 text-right">{gs.price}</td>
                <td className="py-5 px-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setSelectedGradeSubject(gs);
                        setShowModal(true);
                        setIsEdit(true);
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGradeSubject(gs);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
