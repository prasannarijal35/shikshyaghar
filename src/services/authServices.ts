import myAxios from "./apiServices";
import {
  RegisterFormData,
  StudentRegisterResponse,
  TeacherRegisterResponse,
  LoginFormData,
  LoginResponse,
} from "@/types/auth";
export const registerStudent = async (
  payload: RegisterFormData
): Promise<
  | { success: true; message: string; data: any }
  | { success: false; message: string }
> => {
  try {
    const response = await myAxios.post<StudentRegisterResponse>(
      "/auth/register",
      payload,
      { isAuthRoute: false }
    );

    return {
      success: true,
      message: response.data.message || "Registration successful",
      data: response.data.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        err.response?.data?.message || err.message || "Registration failed",
    };
  }
};
export const registerTeacher = async (
  payload: FormData
): Promise<
  | { success: true; message: string; data: any }
  | { success: false; message: string }
> => {
  try {
    const response = await myAxios.post<TeacherRegisterResponse>(
      "/teachers/register",
      payload,
      {
        isAuthRoute: false,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return {
      success: true,
      message: response.data.message || "Registration successful",
      data: response.data.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        err.response?.data?.message || err.message || "Registration failed",
    };
  }
};
export const login = async (
  payload: LoginFormData
): Promise<LoginResponse | { success: false; message: string }> => {
  try {
    const response = await myAxios.post<LoginResponse>("/auth/login", payload, {
      isAuthRoute: false,
    });

    return {
      success: true,
      message: response.data.message || "Login successful",
      token: response.data.token,
      user: response.data.user,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || "Login failed",
    };
  }
};
