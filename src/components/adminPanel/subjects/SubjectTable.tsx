"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Trash2, Edit, BookOpen, Sparkles } from "lucide-react";
import subjectService, { Subject } from "@/services/subjectServices";
import { DeleteConfirmationModal } from "@/components/common";
import SubjectModal from "./AddModal";

export default function SubjectTable() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Subject");
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);

  // Fetch all subjects
  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await subjectService.getAllSubjects();
      setSubjects(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = () => {
    setModalTitle("Add Subject");
    setCurrentSubject(null);
    setShowSubjectModal(true);
  };

  const handleEdit = (subject: Subject) => {
    setModalTitle("Edit Subject");
    setCurrentSubject(subject);
    setShowSubjectModal(true);
  };

  const handleSave = async (name: string) => {
    if (currentSubject) {
      try {
        const updated = await subjectService.updateSubject(currentSubject.id, name);
        setSubjects((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
        toast.success(`Updated subject to ${updated.name}`);
      } catch (err: any) {
        toast.error(err?.message || "Failed to update subject");
      }
    } else {
      try {
        const newSubject = await subjectService.createSubject(name);
        setSubjects((prev) => [...prev, newSubject]);
        toast.success(`Added ${newSubject.name}`);
      } catch (err: any) {
        toast.error(err?.message || "Failed to add subject");
      }
    }
    setShowSubjectModal(false);
  };

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

  // Filter subjects by search term (client-side)
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading subjects...</p>
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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Subject Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Organize and maintain your list of subjects
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-[250px] bg-gray-100/70 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="group relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="relative flex items-center space-x-2">
              <FaPlus className="w-4 h-4" />
              <span>Add Subject</span>
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Table */}
      {filteredSubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-gray-600 text-lg">No subjects found.</p>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-purple-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    S.N
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-4 px-6 text-right font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubjects.map((subject, index) => (
                  <tr key={subject.id} className="hover:bg-purple-50/50 transition-all duration-200">
                    <td className="py-6 px-6 text-gray-900 font-medium">{index + 1}</td>
                    <td className="py-6 px-6 text-center">{subject.name}</td>
                    <td className="py-6 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(subject)}
                          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setCurrentSubject(subject);
                            setShowDeleteModal(true);
                          }}
                          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg"
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
        </div>
      )}

      {/* Modals */}
      <SubjectModal
        isOpen={showSubjectModal}
        onClose={() => {
          setShowSubjectModal(false);
          setCurrentSubject(null);
        }}
        title={modalTitle}
        initialName={currentSubject?.name}
        onConfirm={handleSave}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${currentSubject?.name}?`}
        onConfirm={handleDelete}
      />
    </main>
  );
}
