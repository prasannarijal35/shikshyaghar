import React from "react";
import InputField from "./Inputfield";
import TextArea from "./TextArea";
import { User, Phone, Calendar, Mail } from "lucide-react";
import { Student } from "@/types/students";

interface ProfileInfoFormProps {
  formData: Student | null;
  editMode: boolean;
  onChange: (name: string, value: string) => void;
}

const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({
  formData,
  editMode,
  onChange,
}) => {
  // Early return if no data
  if (!formData) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-300 rounded-xl"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          Personal Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          name="fullName"
          value={formData?.fullName || ""}
          onChange={onChange}
          required
          type="text"
          icon={<User size={20} />}
          placeholder="Enter your full name"
          disabled={!editMode}
          hint="Your complete legal name"
        />

        <InputField
          label="Email Address"
          name="email"
          value={formData?.email || ""}
          onChange={onChange}
          type="email"
          icon={<Mail size={20} />}
          placeholder="your@email.com"
          required
          disabled={true}
          hint="Email cannot be changed"
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={formData?.phone || ""}
          onChange={onChange}
          type="tel"
          icon={<Phone size={20} />}
          placeholder="+1 (555) 123-4567"
          disabled={!editMode}
          hint="Include country code for international numbers"
        />

        <InputField
          label="Gender"
          name="gender"
          value={formData?.gender || ""}
          onChange={onChange}
          type="text"
          icon={<User size={20} />}
          placeholder="Male, Female, Other"
          disabled={!editMode}
          hint="Optional field"
        />

        <InputField
          label="Birth Year"
          name="birthYear"
          value={formData?.birthYear?.toString() || ""}
          onChange={onChange}
          type="number"
          icon={<Calendar size={20} />}
          placeholder="1995"
          min={1960}
          max={2000} // current year
          disabled={!editMode}
          hint="Used for age verification and statistics"
        />

        {/* <InputField
          label="Education Level"
          name="student.educationLevel"
          value={formData?.student?.educationLevel || ""}
          onChange={onChange}
          type="text"
          icon={<GraduationCap size={20} />}
          placeholder="Bachelor's, Master's, PhD, etc."
          disabled={!editMode}
          hint="Your highest level of education"
        /> */}
        <InputField
          label="Address"
          name="address"
          value={formData?.address || ""}
          onChange={onChange}
          type="text"
          placeholder="123 Main St, City, State, ZIP"
          disabled={!editMode}
          hint="Your current residential address"
        />
      </div>

      <div className="mt-6">
        <TextArea
          label="Bio"
          name="student.bio"
          value={formData?.student?.bio || ""}
          onChange={onChange}
          rows={4}
          placeholder="Tell us about yourself, your interests, goals, and what makes you unique..."
          disabled={!editMode}
          hint="Share a brief description about yourself (optional)"
        />
      </div>
    </div>
  );
};

export default ProfileInfoForm;
