import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import Swal from "sweetalert2";
import Loading from "../../../../Shared/Loading/Loadign";

const MyPickups = () => {
  const { user, loading } = React.useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Get all verified donations for this charity
  const {
    data: verifiedDonations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["charity-verified-donations", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/verified?email=${user.email}`);
      return res.data;
    },
  });

  // Confirm pickup
  const handleConfirmPickup = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donations/pickup/${id}`, {
        status: "picked",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Donation marked as picked up!", "success");
        refetch();
      }
    } catch (error) {
      console.error("Pickup error:", error);
      Swal.fire("Error", "Failed to update donation status", "error");
    }
  };

  if (loading || isLoading) return <Loading/>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-secondary text-center mb-6">
        My Pickups
      </h2>

      {verifiedDonations.length === 0 ? (
        <p className="text-center text-gray-500">No verified donations available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verifiedDonations.map((donation) => (
            <div
              key={donation._id}
              className="border rounded-lg p-5 shadow bg-primary"
            >
              <h3 className="text-xl font-bold text-secondary mb-2">
                {donation.title}
              </h3>
              <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
              <p><strong>Location:</strong> {donation.location || "N/A"}</p>
              <p><strong>Food Type:</strong> {donation.foodType}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Status:</strong> <span className="text-green-600 capitalize font-semibold">{donation.status}</span></p>

              <button
                onClick={() => handleConfirmPickup(donation._id)}
                className="btn btn-sm mt-4 bg-green-600 text-white"
              >
                Confirm Pickup
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
