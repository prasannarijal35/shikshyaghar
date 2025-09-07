<<<<<<< Updated upstream
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
>>>>>>> Stashed changes
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< Updated upstream
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
  teachingExperience?: number;
  role: "teacher";
  profilePicture?: File;
  document?: File;
};

type Errors = Record<string, string>;

=======
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

>>>>>>> Stashed changes
export default function useTeacherRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState<TeacherRegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
<<<<<<< Updated upstream
    phone: "",
    address: "",
    gender: undefined,
    birthYear: undefined,
=======
    role: "teacher",
    phone: undefined,
    gender: "",
    birthYear: undefined,
    address: "",
>>>>>>> Stashed changes
    bio: "",
    availability: "",
    qualification: "",
    teachingExperience: undefined,
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = new FormData();
<<<<<<< Updated upstream
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
      if (formData.teachingExperience)
        payload.append(
          "teachingExperience",
          String(formData.teachingExperience)
        );
      if (formData.profilePicture)
        payload.append("profilePicture", formData.profilePicture);
      if (formData.document) payload.append("document", formData.document);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await registerTeacher(payload as any);

      if (response.success) {
        setToastMsg({ message: response.message, type: "success" });
        router.push("/teacher/dashboard");
      } else {
        setToastMsg({ message: response.message, type: "error" });
      }
    } catch {
      setToastMsg({ message: "Something went wrong", type: "error" });
=======

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
>>>>>>> Stashed changes
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
<<<<<<< Updated upstream
    profilePreview,
    toast: toastMsg,
    handleChange,
    handleProfilePictureChange,
    handleDocumentChange,
    handleSubmit,
    setFormData,
=======
    handleChange,
    handleSubmit,
>>>>>>> Stashed changes
  };
}
