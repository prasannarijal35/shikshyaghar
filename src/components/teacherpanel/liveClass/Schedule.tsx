"use client";

import { useState, useEffect } from "react";

export type ClassData = {
  subject: string;
  date: string;
  time: string;
  duration: string;
};

export type ScheduleClassModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClassData) => void;
  initialData?: ClassData;
};

const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<ClassData>({
    subject: "",
    date: "",
    time: "",
    duration: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ subject: "", date: "", time: "", duration: "" });
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? "Edit Class" : "Schedule a New Class"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Subject
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              required
            >
              <option value="">-- Choose Subject --</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              required
            >
              <option value="">-- Select Duration --</option>
              <option value="30m">30 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="2h">2 Hours</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? "Update Class" : "Schedule Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleClassModal;
