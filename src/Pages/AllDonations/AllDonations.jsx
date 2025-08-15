import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure"; 
import Loading from "../../Shared/Loading/Loadign";

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

  if (isLoading) return <Loading message="Fetching donations..." />;
  if (error)
    return (
      <p className="text-center py-10 text-red-600">
        Failed to load donations.
      </p>
    );

  return (
    <div className="mx-auto px-6 py-12
    space-y-12 bg-white pt-28">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#00458b] mb-8">
        🌟 All Verified Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-[#00458b] text-lg">
          No verified donations available right now.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-2xl shadow-md border border-[#00458b] overflow-hidden hover:shadow-xl transition-all"
            >
              <img
                src={
                  donation.image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={donation.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold text-[#00458b]">
                  {donation.title}
                </h3>
                <p className="text-[#00458b]">
                  🏪 <strong>Restaurant:</strong> {donation.restaurantName || "N/A"}
                </p>
                <p className="text-[#00458b]">
                  📍 <strong>Location:</strong> {donation.location || "Unknown"}
                </p>
                <p className="text-[#00458b]">
                  📦 <strong>Quantity:</strong> {donation.quantity}
                </p>
                <p className="text-[#00458b]">
                  📌 <strong>Status:</strong>{" "}
                  <span className="capitalize font-semibold">{donation.status}</span>
                </p>
                <p className="text-[#00458b]">
                  🎗 <strong>Charity:</strong> {donation.charityName || "Not Assigned"}
                </p>

                <Link
                  to={`/donations/${donation._id}`}
                  className="block mt-4 w-full text-center py-2 px-4 rounded-lg border border-[#00458b] text-[#00458b] hover:bg-[#00458b] hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;
