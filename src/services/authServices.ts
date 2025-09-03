import { User } from "@/types/user";
import myAxios from "./apiServices";
import { RegisterPayload } from "@/types/auth";

interface AuthResponse {
  token: string;
  user: User;
}

// Login service
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await myAxios.post(
    "/auth/login",
    { email, password },
    { isAuthRoute: false }
  );
  const data = response.data;

  if (!data.token || !data.user) {
    throw new Error("Invalid login response from server");
  }

  return {
    token: data.token,
    user: data.user,
  };
};

// Register service (payload version)
export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await myAxios.post("/auth/register", payload, {
    isAuthRoute: false,
  });
  const data = response.data;

  if (!data.token || !data.user) {
    throw new Error("Invalid registration response from server");
  }

  return {
    token: data.token,
    user: data.user,
  };
};
