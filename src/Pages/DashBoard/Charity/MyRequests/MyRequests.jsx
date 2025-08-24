import React, { useContext } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Contexts/AuthContext";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch donation requests made by the logged-in charity
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?charityEmail=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Cancel request (only if status is Pending)
  const cancelRequest = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myDonationRequests"]);
      Swal.fire("Cancelled", "Your request has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to cancel the request.", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this request?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelRequest.mutate(id);
      }
    });
  };

  if (isLoading)
    return <div className="text-center mt-8">Loading your requests...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-16 bg-primary rounded-2xl">
      <h2 className="text-3xl font-semibold text-center text-secondary pt-5">
        {" "}
        My Request
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {requests.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No donation requests found.
          </p>
        ) : (
          requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-md rounded-xl p-4 space-y-2"
            >
              <h2 className="text-xl font-semibold">{req.donationTitle}</h2>
              <p>
                <span className="font-medium">Restaurant:</span>{" "}
                {req.restaurantName}
              </p>
              <p>
                <span className="font-medium">Pickup Time:</span>{" "}
                {req.pickupTime}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    req.status === "Pending"
                      ? "bg-green-600"
                      : req.status === "Accepted"
                      ? "bg-secondary"
                      : "bg-black"
                  }`}
                >
                  {req.status}
                </span>
              </p>
              {req.status === "Pending" && (
                <button
                  onClick={() => handleCancel(req._id)}
                  className="btn  btn-outline btn-secondary hover:bg-primary hover:text-black transition"
                >
                  Cancel
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRequests;
