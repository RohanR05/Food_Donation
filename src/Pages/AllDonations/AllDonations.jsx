import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-10">Loading donations...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-600">
        Failed to load donations.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
        All Verified Donations
      </h2>
      {donations.length === 0 ? (
        <p className="text-center text-gray-500">
          No verified donations available right now.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
            >
              <img
                src={
                  donation.image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={donation.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">
                {donation.title}
              </h3>
              <p className="text-gray-600 mt-1">
                <span className="font-semibold">Restaurant:</span>{" "}
                {donation.restaurantName || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span>{" "}
                {donation.location || "Unknown"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Quantity:</span>{" "}
                {donation.quantity}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Status:</span>{" "}
                <span className="capitalize">{donation.status}</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Charity:</span>{" "}
                {donation.charityName || "Not Assigned"}
              </p>
              <Link
                to={`/donations/${donation._id}`}
                className="block mt-4 text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;
