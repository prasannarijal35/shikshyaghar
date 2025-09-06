"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import liveClassService from "@/services/liveClassServices";
import { LiveClass } from "@/types/teacher/class";
import LiveClassCard from "@/components/teacherpanel/liveClass/LiveClassesCard";

import ScheduleClassModal from "@/components/teacherpanel/liveClass/Schedule";

export default function TeacherClassesPage() {
  const { token } = useAuth();
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<LiveClass | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchClasses = async () => {
      try {
        setLoading(true);
        const data = await liveClassService.getTeacherLiveClasses(token);
        setClasses(data);
      } catch (err) {
        console.error("Failed to fetch classes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [token]);

  const handleEdit = (cls: LiveClass) => {
    setEditingClass(cls);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await liveClassService.deleteLiveClass(token, id);
      setClasses(classes.filter((cls) => cls.id !== id));
    } catch (err) {
      console.error("Failed to delete class", err);
    }
  };

  const handleSubmit = async (data: {
    teacherSubjectId: number;
    startTime: string;
    duration: number;
    zoomLink?: string;
  }) => {
    if (!token) return;
    try {
      if (editingClass) {
        const updated = await liveClassService.updateLiveClass(
          token,
          editingClass.id,
          data
        );
        setClasses(
          classes.map((cls) => (cls.id === editingClass.id ? updated : cls))
        );
        setEditingClass(null);
      } else {
        const newClass = await liveClassService.createLiveClass(token, data);
        setClasses([...classes, newClass]);
      }
    } catch (err) {
      console.error("Failed to save class", err);
    } finally {
      setModalOpen(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <div className="p-8 space-y-6 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Classes</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Schedule Class
        </button>
      </div>

      {classes.length === 0 ? (
        <p className="text-gray-500">No classes scheduled yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <>
              <LiveClassCard
                key={cls.id}
                cls={cls}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          ))}
        </div>
      )}

      <ScheduleClassModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingClass(null);
        }}
        onSubmit={handleSubmit}
        initialData={
          editingClass
            ? {
                teacherSubjectId: editingClass.teacherSubjectId,
                startTime: editingClass.startTime,
                duration: editingClass.duration,
                zoomLink: editingClass.meetingLink,
              }
            : undefined
        }
      />
    </div>
  );
}
