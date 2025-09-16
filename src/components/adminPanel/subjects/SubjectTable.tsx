"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Trash2 } from "lucide-react";

import subjectService, { Subject } from "@/services/subjectServices";
import { DeleteConfirmationModal } from "@/components/common";
import SubjectModal from "./AddModal";

export default function SubjectTable() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Subject");
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const data = await subjectService.getAllSubjects();
      setSubjects(data.sort((a, b) => a.id - b.id));
    } catch {
      toast.error("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Add Subject
  const handleAdd = () => {
    setModalTitle("Add Subject");
    setCurrentSubject(null);
    setShowSubjectModal(true);
  };

  // Edit Subject
  const handleEdit = (subject: Subject) => {
    setModalTitle("Edit Subject");
    setCurrentSubject(subject);
    setShowSubjectModal(true);
  };

  // Save from Modal
  const handleSave = async (name: string) => {
    if (currentSubject) {
      // Edit
      try {
        const updated = await subjectService.updateSubject(
          currentSubject.id,
          name
        );
        setSubjects((prev) =>
          prev
            .map((s) => (s.id === updated.id ? updated : s))
            .sort((a, b) => a.id - b.id)
        );
        toast.success(`Updated subject to ${updated.name}`);
      } catch (err: any) {
        toast.error(err?.message || "Failed to update subject");
      }
    } else {
      // Add
      try {
        const newSubject = await subjectService.createSubject(name);
        setSubjects((prev) =>
          [...prev, newSubject].sort((a, b) => a.id - b.id)
        );
        toast.success(`Added ${newSubject.name}`);
      } catch (err: any) {
        toast.error(err?.message || "Failed to add subject");
      }
    }
    setShowSubjectModal(false);
  };

  // Delete Subject
  const handleDelete = async () => {
    if (!currentSubject) return;
    try {
      await subjectService.deleteSubject(currentSubject.id);
      setSubjects((prev) => prev.filter((s) => s.id !== currentSubject.id));
      toast.success(`Deleted ${currentSubject.name}`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete subject");
    } finally {
      setShowDeleteModal(false);
      setCurrentSubject(null);
    }
  };

  if (loading) return <p className="p-6">Loading subjects...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Subject Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
        >
          <FaPlus /> Add Subject
        </button>
      </div>

      {/* Table */}
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
            {subjects.map((subject, index) => (
              <tr key={subject.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4 text-left">{index + 1}</td>
                <td className="py-5 px-4 text-center">{subject.name}</td>
                <td className="py-5 px-4 text-right">
                  <div className="inline-flex gap-3">
                    <button
                      onClick={() => handleEdit(subject)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSubject(subject);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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

      {/* Modals */}
      <SubjectModal
        isOpen={showSubjectModal}
        onClose={() => setShowSubjectModal(false)}
        title={modalTitle}
        initialName={currentSubject?.name}
        onConfirm={handleSave}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${currentSubject?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </main>
  );
}
