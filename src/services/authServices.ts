/* eslint-disable @typescript-eslint/no-explicit-any */
import myAxios from "./apiServices";
import {
  StudentRegisterPayload,
  TeacherRegisterPayload,
  LoginResponse,
  LoginPayload,
} from "@/types/auth";

// Union type for registration payloads
export type RegisterPayload = StudentRegisterPayload | TeacherRegisterPayload;

// ---------------- Registration ---------------- //
export const register = async (payload: any) => {
  try {
    const response = await myAxios.post("/auth/register", payload, {
      isAuthRoute: false,
      headers:
        payload.role === "teacher"
          ? { "Content-Type": "multipart/form-data" }
          : {},
    });

    const data = response.data;
    return {
      success: true,
      message: data.message || "Registration successful",
      data: data.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        err.response?.data?.message || err.message || "Registration failed",
    };
  }
};

// ---------------- Login ---------------- //
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await myAxios.post("/auth/login", payload, {
      isAuthRoute: false,
    });

    const data = response.data;
    return {
      success: true,
      message: data.message || "Login successful",
      token: data.token,
      user: data.user,
      redirectToProfile: data.redirectToProfile,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || "Login failed",
    };
  }
};
