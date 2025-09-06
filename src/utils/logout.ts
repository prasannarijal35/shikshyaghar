import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return handleLogout;
};
