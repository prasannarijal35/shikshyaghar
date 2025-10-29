import React from "react";
import SelectDropdown from "./SelectDropdown";
import { BookOpen } from "lucide-react";
import { Grade } from "@/types/students";

interface GradeDropdownProps {
  selectedGradeId: string;
  grades: Grade[];
  editMode: boolean;
  onChange: (name: string, value: string) => void;
}

const GradeDropdown: React.FC<GradeDropdownProps> = ({
  selectedGradeId,
  grades,
  editMode,
  onChange,
}) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          Academic Information
        </h2>
      </div>

      <SelectDropdown
        label="Grade/Class"
        name="student.gradeId"
        value={selectedGradeId}
        onChange={onChange}
        options={grades.map((g) => ({
          value: g.id.toString(),
          label: g.name,
        }))}
        icon={<BookOpen size={20} />}
        searchable={true}
        disabled={!editMode}
        hint="Select your current grade or class level"
        required
      />
    </div>
  );
};

export default GradeDropdown;
