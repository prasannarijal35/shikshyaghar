import { User } from "@/types/user";

// ------------------ Access Token ------------------
export const getAccessToken = async (): Promise<string | null> =>
  localStorage.getItem("accessToken");

export const setAccessToken = async (token: string): Promise<void> =>
  localStorage.setItem("accessToken", token);

export const removeAccessToken = async (): Promise<void> =>
  localStorage.removeItem("accessToken");

// ------------------ User ------------------
export const getUser = async (): Promise<User | null> => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = async (
  user: User,
  redirectToProfile = false
): Promise<void> =>
  localStorage.setItem("user", JSON.stringify({ ...user, redirectToProfile }));

export const removeUser = async (): Promise<void> =>
  localStorage.removeItem("user");
