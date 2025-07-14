import React, { useContext } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Contexts/AuthContext";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/donation-requests?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Cancel this pending request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/donation-requests/${id}`);
        Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
        queryClient.invalidateQueries(["myDonationRequests", user.email]);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to cancel request.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <p className="text-center py-4 text-gray-600">Loading your requests...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-4 text-red-600">Failed to load requests.</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-4xl font-extrabold text-center text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8">
        My Donation Requests
      </h2>

      {requests.length === 0 && (
        <p className="text-center text-gray-400 italic">
          You have no donation requests yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {requests.map((req) => (
          <div
            key={req._id}
            className="p-6 rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold mb-3 text-indigo-600">
              {req.donationTitle}
            </h3>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Restaurant:</span>{" "}
              <span className="text-red-500">{req.restaurantName}</span>
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Food Type:</span>{" "}
              <span className="text-green-600">{req.foodType}</span>
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Quantity:</span> {req.quantity}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  req.status === "Pending"
                    ? "text-yellow-500"
                    : req.status === "Accepted"
                    ? "text-green-600"
                    : req.status === "Rejected"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {req.status}
              </span>
            </p>

            {req.status === "pending" && (
              <button
                onClick={() => handleCancel(req._id)}
                className="mt-2 w-full py-2 rounded-md bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold hover:from-pink-600 hover:to-red-500 transition-colors duration-300"
              >
                Cancel Request
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;
