import React, { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CharityProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {} } = useQuery({
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
    <div className="max-w-md mx-auto mt-12 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-secondary/10 p-6 text-center">
        <img
          src={photoURL || "https://via.placeholder.com/120"}
          alt="Charity Logo"
          className="w-28 h-28 mx-auto rounded-full border-4 border-secondary shadow-md object-cover"
        />
        <h2 className="mt-4 text-2xl font-bold text-secondary">{displayName || "No Name"}</h2>
        <p className="text-gray-500 text-sm">{email}</p>
        <span className="mt-2 inline-block bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1 rounded-full">
          Role: {role || "user"}
        </span>
      </div>

      {/* Mission Statement */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Mission Statement</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{mission}</p>
      </div>
    </div>
  );
};

export default CharityProfile;
