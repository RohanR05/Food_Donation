import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, Users, Trophy, Activity, Mail } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Loading2 from "../../../../Shared/Loading/Loading2";
import { motion } from "framer-motion";

const AdminProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: roleInfo = {}, isLoading } = useQuery({
    queryKey: ["adminRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading)
    return (
      <div className="flex justify-center py-12">
        <Loading2 size={120} />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto md:mt-8 lg:mt-12 space-y-8"
    >
      {/* Gradient Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-neutral shadow-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome, Admin!</h2>
        <p className="text-sm md:text-base">
          Manage users, donations, and charities efficiently from your
          dashboard.
        </p>
        <ul className="mt-4 text-left list-disc list-inside text-sm md:text-base space-y-1">
          <li>Review donation requests and feature content.</li>
          <li>Manage user roles and permissions.</li>
          <li>Monitor platform activity and metrics.</li>
          <li>Ensure compliance with platform guidelines.</li>
        </ul>
      </div>

      {/* Main Admin Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-base-100 text-info rounded-2xl shadow-2xl border border-accent overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary/20 p-6 text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/4Jf0x9T/user.png"}
            alt="Admin"
            className="w-28 h-28 mx-auto rounded-full border-4 border-secondary shadow-md object-cover"
          />
          <h2 className="mt-4 text-3xl font-bold text-primary">
            {user?.displayName || "Admin"}
          </h2>
          <p className="mt-1 text-info text-sm">
            Role:{" "}
            <span className="font-semibold text-secondary">
              {roleInfo.role || "Admin"}
            </span>
          </p>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold flex items-center gap-1">
              <Mail className="w-4 h-4 text-primary" /> Email
            </span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold flex items-center gap-1">
              <Activity className="w-4 h-4 text-secondary" /> Last Login
            </span>
            <span>
              {user?.metadata?.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold flex items-center gap-1">
              <Trophy className="w-4 h-4 text-primary" /> Achievements
            </span>
            <span>Top Admin of the Month</span>
          </div>
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold flex items-center gap-1">
              <Users className="w-4 h-4 text-secondary" /> Managed Users
            </span>
            <span>150+ Users</span>
          </div>

          {/* Static Info / Admin Guidelines */}
          <div className="pt-4 border-t space-y-2">
            <p className="text-gray-600">
              As an admin, you have full control over the platform. You can
              manage users, review donations, handle charity requests, and
              feature content to enhance visibility.
            </p>
            <p className="text-gray-600">
              Ensure all platform activities follow guidelines and maintain data
              integrity.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminProfile;
