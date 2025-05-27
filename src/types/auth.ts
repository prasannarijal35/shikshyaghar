export type Login = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  role: "teacher" | "student";
  fullName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  gender?: string;
  birthYear?: number;
  teachingExperience?: string;
  currentlyStudying?: "bachelor" | "master" | "phd" | "other" | "";
};
