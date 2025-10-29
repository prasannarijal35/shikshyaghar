import React, { ChangeEvent } from "react";
import Image from "next/image";
import { Camera, Upload } from "lucide-react";

interface ProfileImageUploadProps {
  imageSrc: string;
  editMode: boolean;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  imageSrc,
  editMode,
  onFileChange,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative group">
        {/* Profile Image Container */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100">
          <Image
            src={imageSrc}
            alt="Profile Picture"
            width={160}
            height={160}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
          />

          {/* Hover Overlay */}
          {editMode && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Change Photo</p>
              </div>
            </div>
          )}
        </div>

        {/* Upload Button */}
        {editMode && (
          <div className="absolute -bottom-2 -right-2">
            <label className="relative block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-110 group">
                <Upload className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-200" />
              </div>
            </label>
          </div>
        )}

        {/* Status Ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
