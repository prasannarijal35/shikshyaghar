// Get/set/remove token
import { User } from "@/types/user";
export const getAccessToken = async (): Promise<string | null> =>
  localStorage.getItem("accessToken");
export const setAccessToken = async (accessToken: string): Promise<void> =>
  localStorage.setItem("accessToken", accessToken);
export const removeAccessToken = async (): Promise<void> =>
  localStorage.removeItem("accessToken");

// Get/set/remove user
export const getUser = async (): Promise<User | null> => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
export const setUser = async (user: User): Promise<void> =>
  localStorage.setItem("user", JSON.stringify(user));
export const removeUser = async (): Promise<void> =>
  localStorage.removeItem("user");
