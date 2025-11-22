import React, { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading2 from "../../../../Shared/Loading/Loading2";
import { motion } from "framer-motion";

const RestaurantProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: restaurantData = {}, isLoading } = useQuery({
    queryKey: ["restaurant-profile", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${user.email}`);
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
      className="max-w-4xl mx-auto md:mt-8 lg:mt-12 space-y-8 bg-neutral"
    >
      {/* Mini Landing Box with Gradient */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-neutral shadow-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome, Restaurant!
        </h2>
        <p className="text-sm md:text-base">
          Here you can manage your donations, track requests, and interact with
          charities. Follow the instructions below to make the most of your
          dashboard:
        </p>
        <ul className="mt-4 text-left list-disc list-inside text-sm md:text-base space-y-1">
          <li>Update your profile with accurate information.</li>
          <li>Add new donations for charities to claim.</li>
          <li>Monitor requests and pick-up schedules regularly.</li>
          <li>Check reviews and feedback from users.</li>
        </ul>
      </div>

      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-accent text-primary rounded-2xl shadow-2xl border border-accent overflow-hidden"
      >
        {/* Header */}
        <div className="bg-accent p-6 text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/4Jf0x9T/user.png"}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-secondary shadow-md object-cover"
          />
          <h2 className="mt-4 text-3xl font-bold text-primary">
            {user?.displayName || "Restaurant"}
          </h2>
          <p className="mt-1 text-primary text-sm">
            Role:{" "}
            <span className="font-semibold text-secondary">Restaurant</span>
          </p>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold">Address:</span>
            <span>{restaurantData?.address || "Not Provided"}</span>
          </div>
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold">Contact Number:</span>
            <span>{restaurantData?.phone || "Not Provided"}</span>
          </div>
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold">Registered On:</span>
            <span>
              {restaurantData?.createdAt
                ? new Date(restaurantData.createdAt).toLocaleDateString("en-GB")
                : "Unknown"}
            </span>
          </div>
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold">Website:</span>
            <span>{restaurantData?.website || "Not Provided"}</span>
          </div>
          <div className="flex justify-between border-b border-accent pb-2">
            <span className="font-semibold">Operating Hours:</span>
            <span>{restaurantData?.hours || "9:00 AM - 9:00 PM"}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RestaurantProfile;
