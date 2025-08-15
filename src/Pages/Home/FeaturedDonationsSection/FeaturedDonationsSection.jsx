import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext";
import { motion } from "framer-motion";

const FeaturedDonationsSection = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verifiedDonations"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data.slice(0, 4);
    },
  });

  if (isLoading)
    return (
      <p className="text-center py-10 text-gray-600">
        Loading featured donations...
      </p>
    );

  if (!user?.email)
    return (
      <p className="text-center py-10 text-gray-600">
        Loading featured donations...
      </p>
    );

  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load donations.
      </p>
    );

  return (
    <div className=" bg-white mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-green-700">
        🌟 Featured Donations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {donations.map((donation, index) => (
          <motion.div
            key={donation._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            {/* Image with gradient overlay */}
            <div className="relative h-48">
              <img
                src={
                  donation.image || "https://source.unsplash.com/400x300/?food"
                }
                alt={donation.foodType}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <span className="absolute top-3 right-3 px-3 py-1 bg-secondary text-white text-xs font-semibold rounded">
                {donation.status}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-4 text-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                {donation.foodType}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                🍽 {donation.restaurant} <br />
                📍 {donation.location || "Unknown"}
              </p>
              <Link to={`/donations/${donation._id}`}>
                <button
                  className="w-full text-white py-2 rounded-lg font-medium transition"
                  style={{
                    background: "linear-gradient(to right, #00458B, #0066CC)", // gradient using #00458B
                  }}
                >
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonationsSection;
