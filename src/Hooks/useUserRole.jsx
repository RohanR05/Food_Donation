import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Contexts/AuthContext"; // Adjust path if needed
import useAxiosSecure from "./useAxiosSecure"; // Adjust path if needed

const useUserRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email && !authLoading,
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role || "user";
    },
  });

  return { role, isLoading, refetch };
};

export default useUserRole;
