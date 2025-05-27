import { login } from "@/services/authServices";
import { Login } from "@/types/auth";
import { setAccessToken, setUser } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState<Login & { role: string }>({
    email: "",
    password: "",
    role: "student", // default role
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
        const response = await login(email, password, role); // make sure backend accepts role

        const token = response.data.token;
        await setAccessToken(token);

        const user = response.data.user;
        await setUser(user);

        toast.success("Login successful");
        router.push("/");
      } catch (error: any) {
        if (error.response && error.response.status < 500) {
          const errors = error.response.data.errors;
          if (errors) {
            errors.forEach((err: any) => {
              const key = Object.keys(err)[0];
              const value = err[key];
              if (key === "email") setEmailError(value);
              if (key === "password") setPasswordError(value);
            });
          }
          toast.error(error.response.data.message || "Login failed", {
            id: "toast",
          });
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
