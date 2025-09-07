import { useRouter } from "next/navigation";
import { clearStorage } from "./localStorage";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1️ Clear localStorage (token, user, etc.)
      clearStorage();

      // 2️ Call context/server logout if needed
      if (logout) await logout();

      // 3️Show a success message
      toast.success("Logged out successfully!");

      // 4️ Redirect to login page
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  return handleLogout;
};
