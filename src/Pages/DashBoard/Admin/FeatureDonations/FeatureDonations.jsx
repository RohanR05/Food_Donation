import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading2 from "../../../../Shared/Loading/Loading2";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all verified donations
  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verifiedDonationsForFeature"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  // Handle feature action
  const handleFeature = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donations/feature/${id}`);
      if (res.data?.message) {
        Swal.fire("Success", "Donation marked as featured!", "success");
        refetch();
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to mark as featured.", "error");
    }
  };

  if (isLoading) return <Loading2 />;

  if (!donations.length)
    return (
      <p className="text-center py-6 text-secondary">No donations available.</p>
    );

  return (
    <div className="mx-auto md:mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-secondary">
        🌟 Feature Donations (Admin Only)
      </h2>

      {/* Table for md/lg (unchanged) */}
      <div className="overflow-x-auto hidden sm:hidden md:block">
        <table className="table w-full">
          <thead className="bg-primary text-info">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Status</th>
              <th>Feature</th>
            </tr>
          </thead>
          <tbody className="bg-primary/20">
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={
                      donation.image ||
                      "https://source.unsplash.com/100x75/?food"
                    }
                    alt="donation"
                    className="w-24 h-16 object-cover rounded-md"
                  />
                </td>
                <td>{donation.title || "Untitled"}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurant}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      donation.status === "Verified"
                        ? "bg-secondary/20 text-primary"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleFeature(donation._id)}
                    disabled={donation.isFeatured}
                    className={`btn btn-sm ${
                      donation.isFeatured
                        ? "btn-disabled text-gray-400"
                        : "btn-success"
                    }`}
                  >
                    {donation.isFeatured ? "Featured" : "Feature"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for sm */}
      <div className="grid grid-cols-1 gap-4 sm:grid sm:block md:hidden">
        {donations.map((donation, index) => (
          <div
            key={donation._id}
            className="bg-primary/10 border border-secondary/30 rounded-2xl p-4 shadow-md"
          >
            <img
              src={
                donation.image || "https://source.unsplash.com/300x150/?food"
              }
              alt="donation"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-secondary mb-1">
              {donation.title || "Untitled"}
            </h3>
            <p className="text-info mb-1">Food Type: {donation.foodType}</p>
            <p className="text-info mb-1">Restaurant: {donation.restaurant}</p>
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium mb-2 inline-block ${
                donation.status === "Verified"
                  ? "bg-secondary/20 text-primary"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {donation.status}
            </span>
            <button
              onClick={() => handleFeature(donation._id)}
              disabled={donation.isFeatured}
              className={`btn btn-sm w-full ${
                donation.isFeatured
                  ? "btn-disabled text-gray-400"
                  : "bg-secondary text-primary"
              }`}
            >
              {donation.isFeatured ? "Featured" : "Feature"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureDonations;
