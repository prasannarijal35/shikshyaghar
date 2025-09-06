"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/services/authServices";
import { LoginFormData } from "@/types/auth";
import { setAccessToken, setUser } from "@/utils/localStorage";

export default function useLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<LoginFormData, "role">>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    let valid = true;
    if (!formData.email) {
      setEmailError("Email is required");
      valid = false;
    } else setEmailError(null);

    if (!formData.password) {
      setPasswordError("Password is required");
      valid = false;
    } else setPasswordError(null);

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);

      if (response.success) {
        // Save token and user
        if (response.token) await setAccessToken(response.token);
        if (response.user) await setUser(response.user);

        toast.success(response.message);

        // Redirect based on role
        switch (response.user?.role) {
          case "admin":
            router.push("/admin/dashboard");
            break;
          case "teacher":
            router.push("/teacher/dashboard");
            break;
          case "student":
            router.push("/student/dashboard");
            break;
          default:
            router.push("/");
        }
      } else {
        toast.error(response.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    emailError,
    passwordError,
    loading,
    handleChange,
    handleSubmit,
  };
}
