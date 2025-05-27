import { User } from "@/types/user";

// fetch accessToken from local storage
export const getAccessToken = async (): Promise<string | null> => {
  return localStorage.getItem("accessToken");
};

// set accessToken to local storage
export const setAccessToken = async (accessToken: string): Promise<void> => {
  localStorage.setItem("accessToken", accessToken);
};

// remove accessToken from local storage
export const removeAccessToken = async (): Promise<void> => {
  localStorage.removeItem("accessToken");
};

// fetch user from local storage
export const getUser = async (): Promise<User | null> => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// set user to local storage
export const setUser = async (user: User): Promise<void> => {
  localStorage.setItem("user", JSON.stringify(user));
};

// remove user from local storage
export const removeUser = async (): Promise<void> => {
  localStorage.removeItem("user");
};
