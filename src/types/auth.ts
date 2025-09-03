export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "teacher" | "student";
  phone?: string;
  gender?: string;
  birthYear?: number;
  teachingExperience?: number;
  currentlyStudying?: "bachelor" | "master" | "phd" | "other" | "";
};

// Frontend form data (fullName optional initially for typing convenience)
export type RegisterFormData = Omit<RegisterPayload, "fullName"> & {
  fullName?: string;
};

// Login types
export type Login = {
  email: string;
  password: string;
};

export type LoginFormData = Login & {
  role: "student" | "teacher";
};
