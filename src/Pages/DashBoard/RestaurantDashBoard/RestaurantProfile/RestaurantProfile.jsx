import React, { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loadign";

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

  if (loading || isLoading) return <Loading message="Loading profile..." />;

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-primary text-secondary rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-secondary/10 p-6 text-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/4Jf0x9T/user.png"}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full border-4 border-secondary shadow-md object-cover"
        />
        <h2 className="mt-4 text-3xl font-bold text-secondary">
          {user?.displayName || "Restaurant"}
        </h2>
        <p className="mt-1 text-secondary text-sm">
          Role:{" "}
          <span className="font-semibold text-yellow-600">Restaurant</span>
        </p>
      </div>

      {/* Details Section */}
      <div className="p-6 space-y-4 text-secondary">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Email:</span>
          <span>{user?.email}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Address:</span>
          <span>{restaurantData?.address || "Not Provided"}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Contact Number:</span>
          <span>{restaurantData?.phone || "Not Provided"}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Registered On:</span>
          <span>
            {restaurantData?.createdAt
              ? new Date(restaurantData.createdAt).toLocaleDateString("en-GB")
              : "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
