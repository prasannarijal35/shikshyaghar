import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerStudent } from "@/services/authServices";
import { RegisterFormData } from "@/types/auth";

export default function useStudentRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    educationLevel: "",
    bio: "",
    gradeId: undefined,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const response = await registerStudent(formData);

    if (response.success) {
      toast.success(response.message);
      router.push("/login");
    } else {
      toast.error(response.message);
    }

    setLoading(false);
  };

  return { formData, handleChange, handleSubmit, loading };
}
