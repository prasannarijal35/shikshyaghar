"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import DeleteModal from "@/components/adminPanel/Grades/DeleteModal";
import EditModal from "@/components/adminPanel/GradeSubjects/EditModal";
import AddGradeSubjectModal from "@/components/adminPanel/GradeSubjects/AddModal";
import gradeService, { Grade } from "@/services/gradeServices";
import subjectService, { Subject } from "@/services/subjectServices";
import gradeSubjectService, { GradeSubject } from "@/services/gradeSubjectServices";

export default function GradeSubjectTable() {
  const [gradeSubjects, setGradeSubjects] = useState<GradeSubject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedGradeSubject, setSelectedGradeSubject] = useState<GradeSubject | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [gradesData, subjectsData, gradeSubjectsData] = await Promise.all([
        gradeService.getAllGrades(),
        subjectService.getAllSubjects(),
        gradeSubjectService.getAllGradeSubjects(),
      ]);

      const safeData = gradeSubjectsData.map(gs => ({
        ...gs,
        grade: gs.grade ?? { id: 0, name: "Unknown Grade" },
        subject: gs.subject ?? { id: 0, name: "Unknown Subject" },
      }));

      setGrades(gradesData);
      setSubjects(subjectsData);
      setGradeSubjects(safeData);
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

  // Add Grade-Subject
  const handleAddConfirm = async (gradeId: number, subjectId: number, price: number) => {
    try {
      const newRelation = await gradeSubjectService.assignGradeSubject({ gradeId, subjectId, price });
      setGradeSubjects(prev => [
        ...prev,
        {
          ...newRelation,
          grade: grades.find(g => g.id === gradeId) ?? { id: 0, name: "Unknown Grade" },
          subject: subjects.find(s => s.id === subjectId) ?? { id: 0, name: "Unknown Subject" }
        }
      ]);
      toast.success("Added grade-subject relation");
      setShowAddModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add grade-subject relation");
    }
  };

  // Delete Grade-Subject
  const handleDelete = async () => {
    if (!selectedGradeSubject) return;
    try {
      await gradeSubjectService.removeGradeSubject(selectedGradeSubject.id);
      setGradeSubjects(prev => prev.filter(gs => gs.id !== selectedGradeSubject.id));
      toast.success("Deleted grade-subject relation");
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete grade-subject relation");
    }
  };

  // Edit Grade-Subject
  const handleEditConfirm = async (updatedGradeId: number, updatedSubjectId: number, updatedPrice: number) => {
    if (!selectedGradeSubject) return;
    try {
      const updated = await gradeSubjectService.updateGradeSubject(selectedGradeSubject.id, {
        gradeId: updatedGradeId,
        subjectId: updatedSubjectId,
        price: updatedPrice,
      });
      setGradeSubjects(prev => prev.map(gs =>
        gs.id === updated.id
          ? {
              ...updated,
              grade: grades.find(g => g.id === updatedGradeId) ?? { id: 0, name: "Unknown Grade" },
              subject: subjects.find(s => s.id === updatedSubjectId) ?? { id: 0, name: "Unknown Subject" }
            }
          : gs
      ));
      toast.success("Updated grade-subject relation");
      setShowEditModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update grade-subject relation");
    }
  };

  if (loading) return <p className="p-6">Loading data...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Grade-Subject Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
        >
          <FaPlus /> Add Relation
        </button>
      </div>

      {/* Grade-Subject Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left text-[15px] font-medium">S.N</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Grade</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Subject</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Price</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {gradeSubjects.map((gs, index) => (
              <tr key={gs.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4">{index + 1}</td> {/* Serial Number */}
                <td className="py-5 px-4">{gs.grade?.name}</td>
                <td className="py-5 px-4">{gs.subject?.name}</td>
                <td className="py-5 px-4">{gs.price}</td>
                <td className="py-5 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setSelectedGradeSubject(gs); setShowEditModal(true); }}
                      className="p-2 rounded-md text-yellow-600 hover:text-white hover:bg-yellow-600 transition-colors duration-200"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => { setSelectedGradeSubject(gs); setShowDeleteModal(true); }}
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
      <AddGradeSubjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Grade-Subject Relation"
        grades={grades}
        subjects={subjects}
        onConfirm={handleAddConfirm}
      />

      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Grade-Subject"
        grades={grades}
        subjects={subjects}
        selectedGradeId={selectedGradeSubject?.grade?.id ?? 0}
        selectedSubjectId={selectedGradeSubject?.subject?.id ?? 0}
        onConfirm={(updatedGradeId, updatedSubjectId) => {
          handleEditConfirm(
            updatedGradeId,
            updatedSubjectId,
            selectedGradeSubject?.price ?? 0
          );
        }}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete this grade-subject relation?`}
        onConfirm={handleDelete}
      />
    </main>
  );
}
