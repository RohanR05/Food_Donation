import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Loading from "../../../../Shared/Loading/Loadign";

const AdminProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: roleInfo = {}, isLoading } = useQuery({
    queryKey: ["adminRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading message="Loading profile..." />;

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center gap-6 bg-blue-50 rounded-t-2xl">
        <img
          src={user?.photoURL || "https://via.placeholder.com/120"}
          alt="Admin"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-700">
            {user?.displayName || "Admin"}
          </h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
          <div className="mt-2 flex items-center gap-2 text-blue-600 font-medium">
            <ShieldCheck className="w-4 h-4" />
            {roleInfo.role || "admin"}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 border-t space-y-3 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold">Last Login:</span>
          <span>
            {user?.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
