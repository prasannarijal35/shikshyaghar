"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/services/authServices";
import { StudentRegisterFormData, RegisterResponse } from "@/types/auth";

export default function useStudentRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState<StudentRegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    phone: undefined,
    gender: "",
    birthYear: undefined,
    address: "",
    currentlyStudying: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Field-level errors
  const [errors, setErrors] = useState<
    Partial<Record<keyof StudentRegisterFormData, string>>
  >({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof StudentRegisterFormData, string>> =
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
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = { ...formData }; // Students don’t need FormData
      const res: RegisterResponse = await register(payload);

      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      if (err.response && err.response.data?.errors) {
        const fieldErrors = err.response.data.errors;
        const newErrors: Partial<
          Record<keyof StudentRegisterFormData, string>
        > = {};

        fieldErrors.forEach((error: any) => {
          const key = Object.keys(error)[0] as keyof StudentRegisterFormData;
          newErrors[key] = error[key];
        });

        setErrors((prev) => ({ ...prev, ...newErrors }));
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong during registration.");
      }
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
    validate,
  };
}
