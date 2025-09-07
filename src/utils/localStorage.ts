import { User } from "@/types/user";

// ✅ Access Token helpers
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (accessToken: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", accessToken);
};

export const removeAccessToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
};

// ✅ User helpers
export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
    return null;
  }
};

export const setUser = (user: User): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
};

// ✅ Clear all storage items for logout
export const clearStorage = (): void => {
  if (typeof window === "undefined") return;
  removeAccessToken();
  removeUser();
  // Add other keys to clear if needed
};
