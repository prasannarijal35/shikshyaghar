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
  authLoaded: boolean; // ✅ Track when auth is loaded
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await getAccessToken();
      const storedUser = await getUser();

      // ✅ Type guard: ensure storedUser has all required User fields
      if (
        storedToken &&
        storedUser &&
        "createdAt" in storedUser &&
        "updatedAt" in storedUser &&
        "slug" in storedUser &&
        "role" in storedUser
      ) {
        setToken(storedToken);
        setUserState(storedUser as User);
        setRole(storedUser.role as UserRole);
      }

      setAuthLoaded(true); // Auth loading complete
    };

    loadAuth();
  }, []);

  const login = async (newToken: string, newUser: User) => {
    // ✅ Type guard before setting
    if (
      newUser &&
      "createdAt" in newUser &&
      "updatedAt" in newUser &&
      "slug" in newUser &&
      "role" in newUser
    ) {
      setToken(newToken);
      setUserState(newUser);
      setRole(newUser.role as UserRole);

      await setAccessToken(newToken);
      await setUser(newUser);
    } else {
      throw new Error("Invalid user object provided to login");
    }
  };

  const logout = async () => {
    setToken(null);
    setUserState(null);
    setRole(null);

    await removeAccessToken();
    await removeUser();
  };

  return (
    <AuthContext.Provider
      value={{ token, user, role, authLoaded, login, logout }}
    >
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
