import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all verified donations
  const { data: donations = [], isLoading, refetch } = useQuery({
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
        console.log(error)
      Swal.fire("Error", "Failed to mark as featured.", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center py-6 text-gray-500">Loading donations...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌟 Feature Donations (Admin Only)
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-green-100 text-green-800">
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
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={donation.image || "https://source.unsplash.com/100x75/?food"}
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
                        ? "bg-green-200 text-green-800"
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
    </div>
  );
};

export default FeatureDonations;
