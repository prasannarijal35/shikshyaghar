"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerTeacher } from "@/services/authServices";

export type TeacherRegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  birthYear?: number;
  bio?: string;
  availability?: string;
  qualification?: string;
  experience?: number;
  role: "teacher";
  profilePicture?: File;
  document?: File;
};

type Errors = Record<string, string>;

export default function useTeacherRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState<TeacherRegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    gender: undefined,
    birthYear: undefined,
    bio: "",
    availability: "",
    qualification: "",
    experience: undefined,
    role: "teacher",
    profilePicture: undefined,
    document: undefined,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | undefined>();
  const [toastMsg, setToastMsg] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Generic input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Profile picture handler (images only)
  // Change these two handlers:

  // Before:
  // const handleProfilePictureChange = (file?: File) => { ... }
  // const handleDocumentChange = (file?: File) => { ... }

  // After:
  const handleProfilePictureChange = (file: File | null) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, profilePicture: undefined }));
      setProfilePreview(undefined);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setToastMsg({ message: "Only images are allowed!", type: "error" });
      return;
    }
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleDocumentChange = (file: File | null) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, document: undefined }));
      return;
    }
    if (file.type !== "application/pdf") {
      setToastMsg({ message: "Only PDF files are allowed!", type: "error" });
      return;
    }
    setFormData((prev) => ({ ...prev, document: file }));
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.profilePicture)
      newErrors.profilePicture = "Profile picture is required";
    if (!formData.document) newErrors.document = "Document is required";
    if (!formData.availability)
      newErrors.availability = "Availability is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("confirmPassword", formData.confirmPassword);
      payload.append("role", "teacher");
      if (formData.phone) payload.append("phone", formData.phone);
      if (formData.address) payload.append("address", formData.address);
      if (formData.gender) payload.append("gender", formData.gender);
      if (formData.birthYear)
        payload.append("birthYear", String(formData.birthYear));
      if (formData.bio) payload.append("bio", formData.bio);
      if (formData.availability)
        payload.append("availability", formData.availability);
      if (formData.qualification)
        payload.append("qualification", formData.qualification);
      if (formData.experience)
        payload.append("teachingExperience", String(formData.experience));
      if (formData.profilePicture)
        payload.append("profilePicture", formData.profilePicture);
      if (formData.document) payload.append("document", formData.document);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await registerTeacher(payload as any);

      if (response.success) {
        setToastMsg({ message: response.message, type: "success" });
        router.push("/login");
      } else {
        setToastMsg({ message: response.message, type: "error" });
      }
    } catch {
      setToastMsg({ message: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    profilePreview,
    toast: toastMsg,
    handleChange,
    handleProfilePictureChange,
    handleDocumentChange,
    handleSubmit,
    setFormData,
  };
}
