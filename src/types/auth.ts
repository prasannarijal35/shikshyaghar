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

export type RegisterFormData = Omit<RegisterPayload, "fullName"> & {
  fullName?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  role: "teacher" | "student";
};

// Frontend form data
export type LoginFormData = Partial<LoginPayload> & {
  email: string;
  password: string;
  role: "teacher" | "student";
};
