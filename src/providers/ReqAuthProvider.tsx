"use client";

import { User } from "@/types/user";
import { getUser } from "@/utils/localStorage";
import { useEffect, useState } from "react";

interface RequireAuthProviderProps {
  children: React.ReactNode;
  role?: string;
}

const RequireAuthProvider: React.FC<RequireAuthProviderProps> = ({
  children,
  role,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser: User | null = await getUser();
      if (storedUser) {
        //  uta bata role pathayo vane role ko value aaucha
        if (role && storedUser.role === role) {
          setIsAuthenticated(true);
        }

        // role nai pathako xaina vane
        if (!role) {
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [role]);

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-2xl text-gray-900">
          You are not authorized to view this page
        </h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuthProvider;
