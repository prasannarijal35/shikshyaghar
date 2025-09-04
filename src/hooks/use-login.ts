import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { login } from "@/services/authServices";
import { LoginFormData } from "@/types/auth";
import { setAccessToken, setUser } from "@/utils/localStorage";

interface LoginErrorResponse {
  message?: string;
  errors?: { [key: string]: string }[];
}

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

    try {
      setLoading(true);

      // Send only email + password
      const response = await login(formData.email, formData.password);

      await setAccessToken(response.token);
      await setUser(response.user);

      toast.success("Login successful");

      // redirect based on role
      if (response.user.role === "teacher") router.push("/teacher/dashboard");
      else router.push("/student/dashboard");
    } catch (err) {
      const error = err as AxiosError<LoginErrorResponse>;
      if (error.response && error.response.data) {
        const data = error.response.data;
        toast.error(data.message || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
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
