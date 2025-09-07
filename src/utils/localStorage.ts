import { User } from "@/types/user";
import { UserData } from "@/types/auth";

// ---------------- Access Token Helpers ----------------
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

// ---------------- User Helpers ----------------

// Old type: User
export const getUser = (): User | UserData | null => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User | UserData) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
    return null;
  }
};

// Overloaded setUser to accept User or UserData
export const setUser = (user: User | UserData): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
};

// ---------------- Clear all storage ----------------
export const clearStorage = (): void => {
  if (typeof window === "undefined") return;
  removeAccessToken();
  removeUser();
};