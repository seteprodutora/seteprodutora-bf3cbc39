import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAdmin = (redirectTo: string = "/auth") => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate(redirectTo);
      } else if (!isAdmin) {
        navigate("/");
      }
    }
  }, [user, isAdmin, isLoading, navigate, redirectTo]);

  return { user, isAdmin, isLoading };
};
