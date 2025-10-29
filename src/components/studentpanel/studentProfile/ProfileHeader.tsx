import React from "react";
import { Edit3, Save, User } from "lucide-react";

interface ProfileHeaderProps {
  editMode: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  studentName?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  editMode,
  onToggleEdit,
  onSave,
  studentName = "Student",
}) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 mb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Student Profile
            </h1>
            <p className="text-blue-100 text-lg">Welcome back, {studentName}</p>
          </div>
        </div>

        <button
          onClick={editMode ? onSave : onToggleEdit}
          className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
            editMode
              ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 focus:ring-green-500/50"
              : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg shadow-black/10 focus:ring-white/50"
          }`}
        >
          {editMode ? (
            <Save className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
          ) : (
            <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
          )}
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
