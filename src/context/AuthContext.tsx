"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/user";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getUser,
  setUser,
  removeUser,
} from "@/utils/localStorage";

type UserRole = "admin" | "teacher" | "student";

type AuthContextType = {
  token: string | null;
  user: User | null;
  role: UserRole | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Load token and user from localStorage on mount
    const loadAuth = async () => {
      const storedToken = await getAccessToken();
      const storedUser = await getUser();
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUserState(storedUser);
        setRole(storedUser.role as UserRole);
      }
    };
    loadAuth();
  }, []);

  const login = async (newToken: string, newUser: User) => {
    setToken(newToken);
    setUserState(newUser);
    setRole(newUser.role as UserRole);

    await setAccessToken(newToken);
    await setUser(newUser);
  };

  const logout = async () => {
    setToken(null);
    setUserState(null);
    setRole(null);

    await removeAccessToken();
    await removeUser();
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
