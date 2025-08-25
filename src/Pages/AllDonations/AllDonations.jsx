import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loadign";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading, error } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  if (isLoading) return <Loading message="Fetching donations..." />;
  if (error)
    return (
      <p className="text-center py-10 text-error">
        Failed to load donations.
      </p>
    );

  return (
<div className="mx-auto px-6 py-12 bg-base-100 pt-12 mt-16 space-y-12">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-8">
    🌟 All Verified Donations
  </h2>

  {donations.length === 0 ? (
    <p className="text-center text-secondary text-lg">
      No verified donations available right now.
    </p>
  ) : (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {donations.map((donation) => (
        <div
          key={donation._id}
          className="bg-primary rounded-2xl shadow-lg shadow-secondary border border-primary flex flex-col overflow-hidden hover:shadow-2xl transition-all h-full"
        >
          <div className="h-48 w-full overflow-hidden">
            <img
              src={donation.image || "https://via.placeholder.com/400x250?text=No+Image"}
              alt={donation.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow space-y-2">
            <h3 className="text-xl md:text-2xl font-semibold text-secondary">
              {donation.title}
            </h3>
            <p className="text-secondary text-sm">
              🏪 <strong>Restaurant:</strong> {donation.restaurantName || "N/A"}
            </p>
            <p className="text-secondary text-sm">
              📍 <strong>Location:</strong> {donation.location || "Unknown"}
            </p>
            <p className="text-secondary text-sm">
              📦 <strong>Quantity:</strong> {donation.quantity}
            </p>
            <p className="text-secondary text-sm">
              📌 <strong>Status:</strong>{" "}
              <span className="capitalize font-semibold">{donation.status}</span>
            </p>
            <p className="text-secondary text-sm">
              🎗 <strong>Charity:</strong> {donation.charityName || "Not Assigned"}
            </p>

            <Link
              to={`/donations/${donation._id}`}
              className="mt-auto block w-full text-center py-2 px-4 rounded-lg border border-secondary text-secondary hover:bg-secondary hover:text-white transition"
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
