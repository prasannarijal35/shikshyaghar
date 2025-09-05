"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/services/authServices";
import { RegisterFormData, RegisterPayload } from "@/types/auth";

export default function useRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    role: "student",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: undefined,
    gender: "",
    birthYear: undefined,
    currentlyStudying: "",
    teachingExperience: undefined,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  // ---------------- Handle Form Changes ----------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    const val =
      type === "number" || name === "phone" || name === "teachingExperience"
        ? Number(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ---------------- Form Validation ----------------
  const validate = () => {
    let valid = true;
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

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

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (formData.role === "teacher") {
      if (!formData.phone || isNaN(Number(formData.phone))) {
        newErrors.phone = "Phone number is required and must be a number";
        valid = false;
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required";
        valid = false;
      }
      if (
        !formData.birthYear ||
        formData.birthYear < 1900 ||
        formData.birthYear > new Date().getFullYear()
      ) {
        newErrors.birthYear = "Enter a valid birth year";
        valid = false;
      }
      if (!formData.currentlyStudying) {
        newErrors.currentlyStudying = "Please select your current study field";
        valid = false;
      }
      if (
        formData.teachingExperience === undefined ||
        formData.teachingExperience < 0
      ) {
        newErrors.teachingExperience = "Provide valid teaching experience";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // ---------------- Handle Form Submit ----------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload: RegisterPayload = {
        fullName: formData.fullName || "",
        email: formData.email || "",
        password: formData.password || "",
        confirmPassword: formData.confirmPassword || "",
        role: formData.role,
        phone: formData.phone,
        gender: formData.gender || undefined,
        birthYear: formData.birthYear,
        currentlyStudying:
          formData.role === "student"
            ? formData.currentlyStudying || ""
            : undefined,
        teachingExperience:
          formData.role === "teacher" ? formData.teachingExperience : undefined,
      };

      const res = await register(payload);

      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong during registration.");
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
