import React, { use } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user } = use(AuthContext);

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card bg-white shadow-lg rounded-2xl p-8 border border-secondary/20"
      >
        {/* Profile Top */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.img
            src={user?.photoURL || "https://i.ibb.co/j3Rdtmm/default-user.png"}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-secondary shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-secondary">
              {user?.displayName || "Unknown User"}
            </h2>
            <p className="text-gray-500 mt-2">{user?.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Extra Info (static for now, can connect db later) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center md:text-left">
          <div className="p-4 rounded-xl bg-primary/20">
            <h3 className="font-semibold text-secondary">Role</h3>
            <p className="text-gray-700">User</p>
          </div>
          <div className="p-4 rounded-xl bg-primary/20">
            <h3 className="font-semibold text-secondary">Joined</h3>
            <p className="text-gray-700">Not Available</p>
          </div>
          <div className="p-4 rounded-xl bg-primary/20">
            <h3 className="font-semibold text-secondary">Phone</h3>
            <p className="text-gray-700">Not Provided</p>
          </div>
          <div className="p-4 rounded-xl bg-primary/20">
            <h3 className="font-semibold text-secondary">Status</h3>
            <p className="text-gray-700">Active</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
