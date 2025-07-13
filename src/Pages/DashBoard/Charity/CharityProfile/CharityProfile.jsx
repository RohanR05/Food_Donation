import React, { useContext, } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CharityProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo = {},
    isLoading,
  } = useQuery({
    queryKey: ["charity-profile", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${user.email}`);
      return res.data;
    },
  });

  const {
    displayName,
    photoURL,
    email,
    role,
    mission = "Committed to making a difference through food donation.",
  } = {
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    email: user?.email,
    role: userInfo?.role,
    mission: userInfo?.mission,
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-10">
      <div className="text-center">
        <img
          src={photoURL || "https://via.placeholder.com/120"}
          alt="Charity Logo"
          className="w-28 h-28 mx-auto rounded-full border-4 border-primary mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold text-secondary">{displayName || "No Name"}</h2>
        <p className="text-sm text-gray-500">{email}</p>
        <p className="mt-2 text-sm bg-purple-100 text-purple-800 inline-block px-3 py-1 rounded-full">
          Role: {role || "user"}
        </p>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Mission Statement</h3>
        <p className="text-gray-700 text-sm">{mission}</p>
      </div>
    </div>
  );
};

export default CharityProfile;
