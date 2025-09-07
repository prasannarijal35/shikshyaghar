/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/services/authServices";
import { TeacherRegisterPayload } from "@/types/auth";

// Frontend form type includes confirmPassword and optional files
type TeacherRegisterFormData = Omit<
  TeacherRegisterPayload,
  "profilePicture" | "document"
> & {
  confirmPassword: string;
  profilePicture?: File | null;
  document?: File | null;
};

export default function useTeacherRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState<TeacherRegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "teacher",
    phone: undefined,
    gender: "",
    birthYear: undefined,
    address: "",
    bio: "",
    availability: "",
    qualification: "",
    teachingExperience: undefined,
    profilePicture: null,
    document: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TeacherRegisterFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as any;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TeacherRegisterFormData, string>> =
      {};
    let valid = true;

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!formData.profilePicture) {
      newErrors.profilePicture = "Profile picture is required";
      valid = false;
    }

    if (!formData.document) {
      newErrors.document = "Document is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          payload.append(key, value as any);
        }
      });

      const res = await register(payload); // backend expects multipart/form-data

      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong during registration.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
}
