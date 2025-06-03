import { register } from "@/services/authServices";
import { RegisterFormData } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios"; // ✅ added import

export default function useRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    role: "student",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    birthYear: undefined,
    teachingExperience: "",
    currentlyStudying: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

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

    if (formData.role === "teacher") {
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
        valid = false;
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
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
      if (!formData.teachingExperience) {
        newErrors.teachingExperience =
          "Please describe your teaching experience";
        valid = false;
      }
      if (!formData.currentlyStudying) {
        newErrors.currentlyStudying = "Please select your current study field";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      await register(
        formData.fullName || "",
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.role,
        formData.phone,
        formData.gender,
        formData.birthYear,
        formData.teachingExperience,
        formData.currentlyStudying
      );

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
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
  };
}
