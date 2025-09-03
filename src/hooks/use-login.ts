import { login } from "@/services/authServices";
import { LoginFormData } from "@/types/auth";
import { setAccessToken, setUser } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface LoginErrorResponse {
  message?: string;
  errors?: { [key: string]: string }[];
}

export default function useLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const { email, password, role } = formData;

  const validateEmail = () => {
    setEmailError(!email ? "Email is required" : null);
  };

  const validatePassword = () => {
    setPasswordError(!password ? "Password is required" : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (email && password && !emailError && !passwordError) {
      try {
        setLoading(true);

        // Login request
        const response = await login(email, password);
        const token = response.token;
        await setAccessToken(token);

        const user = response.user;
        await setUser(user);

        toast.success("Login successful");
        router.push("/");
      } catch (err) {
        const error = err as AxiosError<LoginErrorResponse>;

        if (error.response && error.response.status < 500) {
          const data = error.response.data;
          const errors = data.errors;

          if (errors) {
            errors.forEach((errObj) => {
              const key = Object.keys(errObj)[0];
              const value = errObj[key];
              if (key === "email") setEmailError(value);
              if (key === "password") setPasswordError(value);
            });
          }

          toast.error(data.message || "Login failed", { id: "toast" });
        } else {
          toast.error("Something went wrong", { id: "toast" });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    email,
    password,
    role,
    loading,
    emailError,
    passwordError,
    handleChange,
    handleSubmit,
    validateEmail,
    validatePassword,
  };
}
