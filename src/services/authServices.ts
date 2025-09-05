import { User } from "@/types/user";
import myAxios from "./apiServices";
import { RegisterPayload } from "@/types/auth";

interface RegisterResponse {
  success: boolean;
  message: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export const register = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const response = await myAxios.post("/auth/register", payload, {
      isAuthRoute: false,
    });
    const data = response.data;

    return {
      success: true,
      message: data.message || "Registration successful",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      success: false,
      message:
        err.response?.data?.message || err.message || "Registration failed",
    };
  }
};

// ------------------- Login -------------------
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await myAxios.post(
      "/auth/login",
      { email, password },
      { isAuthRoute: false }
    );
    const data = response.data;

    return {
      success: true,
      message: "Login successful",
      token: data.token,
      user: data.user,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || "Login failed",
    };
  }
};
