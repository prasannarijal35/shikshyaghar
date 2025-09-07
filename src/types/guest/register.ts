export type TeacherRegister = {
  fullName: string;
  email: string;
  password: string;
  role: "teacher";
  phone?: number;
  gender?: string;
  birthYear?: number;
  address?: string;

  // Teacher-specific fields
  bio?: string;
  availability?: string;
  qualification?: string;
  teachingExperience?: number;

  // Both files are required for approval
  profilePicture: File;
  document: File;
};
