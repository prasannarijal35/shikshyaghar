"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTrashAlt, FaPlus, FaEdit } from "react-icons/fa";
import DeleteModal from "@/components/adminPanel/subjects/DeleteModal";
import EditModal from "@/components/adminPanel/subjects/EditModal";
import AddSubjectModal from "@/components/adminPanel/subjects/AddModal";
import subjectService, { Subject } from "@/services/subjectServices";

export default function SubjectTable() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

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

  // Add subject
  const handleAdd = async (name: string) => {
    try {
      const newSubject = await subjectService.createSubject(name);
      setSubjects((prev) => [...prev, newSubject].sort((a, b) => a.id - b.id));
      toast.success(`Added ${newSubject.name}`);
      setShowAddModal(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.msg || // express-validator errors
        error.response?.data?.message ||          // backend message
        "Failed to add subject";                  // default fallback
      toast.error(errorMessage);
    }
  };

  // Delete subject
  const handleDelete = async () => {
    if (!selectedSubject) return;
    try {
      await subjectService.deleteSubject(selectedSubject.id);
      setSubjects((prev) => prev.filter((s) => s.id !== selectedSubject.id));
      toast.success(`Deleted ${selectedSubject.name}`);
      setShowDeleteModal(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        "Failed to delete subject";
      toast.error(errorMessage);
    }
  };

  // Edit subject
  const handleEditConfirm = async (updatedName: string) => {
    if (!selectedSubject) return;
    try {
      const updated = await subjectService.updateSubject(selectedSubject.id, updatedName);
      setSubjects((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s)).sort((a, b) => a.id - b.id)
      );
      toast.success(`Updated subject to ${updated.name}`);
      setShowEditModal(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        "Failed to update subject";
      toast.error(errorMessage);
    }
  };

  if (loading) return <p className="p-6">Loading subjects...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Subject Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
        >
          <FaPlus /> Add Subject
        </button>
      </div>

      {/* Subject Table */}
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
            {subjects.map((subject, index) => (
              <tr key={subject.id} className="border-t hover:bg-primary/10">
                {/* Serial number */}
                <td className="py-5 px-4">{index + 1}</td>
                <td className="py-5 px-4">{subject.name}</td>
                <td className="py-5 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedSubject(subject);
                        setShowEditModal(true);
                      }}
                      className="p-2 rounded-md text-yellow-600 hover:text-white hover:bg-yellow-600 transition-colors duration-200"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSubject(subject);
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
        description={`Are you sure you want to delete ${selectedSubject?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
      />

      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Subject"
        currentName={selectedSubject?.name || ""}
        onConfirm={handleEditConfirm}
      />

      <AddSubjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Subject"
        onConfirm={handleAdd}
      />
    </main>
  );
}
