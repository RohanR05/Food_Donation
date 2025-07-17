import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext";

const FeaturedDonationsSection = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading, error } = useQuery({
    queryKey: ["verifiedDonations"],
    enabled: !!user?.email,  // only fetch when user is ready
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data.slice(0, 4);
    },
  });
  if (isLoading) return <p className="text-center py-10 text-gray-600">Loading featured donations...</p>;
    if (!user?.email || isLoading)
    return <p className="text-center py-10 text-gray-600">Loading featured donations...</p>;

  if (error) return <p className="text-center py-10 text-red-500">Failed to load donations.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-green-700">
        🌟 Featured Donations
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={donation.image || "https://source.unsplash.com/400x300/?food"}
              alt={donation.foodType}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {donation.foodType}
              </h3>
              <p className="text-gray-600 text-sm">
                🍽 {donation.restaurant} <br />
                📍 {donation.location || "Unknown"}
              </p>
              <p
                className="inline-block mt-2 px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-600"
              >
                {donation.status}
              </p>

              <Link to={`/donations/${donation._id}`}>
                <button className="mt-4 w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 rounded-md font-medium transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonationsSection;
