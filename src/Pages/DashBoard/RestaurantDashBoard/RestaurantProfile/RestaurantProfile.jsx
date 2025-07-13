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

  if (loading || isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <div className="text-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/4Jf0x9T/user.png"}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-primary"
        />
        <h2 className="text-3xl font-bold text-secondary mt-4">
          {user?.displayName || "Restaurant"}
        </h2>
        <p className="mt-1 text-gray-600 text-sm">
          Role: <span className="font-medium text-yellow-600">Restaurant</span>
        </p>
      </div>

      <div className="mt-6 space-y-3 text-gray-700 text-sm">
        <div>
          <span className="font-semibold">Email:</span> {user?.email}
        </div>
        <div>
          <span className="font-semibold">Address:</span>{" "}
          {restaurantData?.address || "Not Provided"}
        </div>
        <div>
          <span className="font-semibold">Contact Number:</span>{" "}
          {restaurantData?.phone || "Not Provided"}
        </div>
        <div>
          <span className="font-semibold">Registered On:</span>{" "}
          {restaurantData?.createdAt
            ? new Date(restaurantData.createdAt).toLocaleDateString("en-GB")
            : "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
