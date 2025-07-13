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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <div className="flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName || "Admin"}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="mt-2 flex items-center gap-2 text-blue-600 font-medium">
            <ShieldCheck className="w-4 h-4" />
            {roleInfo.role || "admin"}
          </div>
        </div>
      </div>

      {/* Optional section */}
      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        <p>
          <span className="font-medium">Last Login:</span>{" "}
          {user?.metadata?.lastSignInTime
            ? new Date(user.metadata.lastSignInTime).toLocaleString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
