import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // ✅ This hook will be skipped internally until userEmail exists
  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donationRequests", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?restaurantEmail=${encodeURIComponent(userEmail)}`
      );
      return res.data;
    },
    enabled: !!userEmail, // ✅ run only when email is available
  });

  const acceptMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/donation-requests/accept/${id}`),
    onSuccess: () => {
      Swal.fire("Accepted", "Request accepted and others rejected.", "success");
      queryClient.invalidateQueries(["donationRequests", userEmail]);
    },
    onError: () => Swal.fire("Error", "Failed to accept request.", "error"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/donation-requests/reject/${id}`),
    onSuccess: () => {
      Swal.fire("Rejected", "Request rejected.", "success");
      queryClient.invalidateQueries(["donationRequests", userEmail]);
    },
    onError: () => Swal.fire("Error", "Failed to reject request.", "error"),
  });

  if (!userEmail || isLoading) return <p>Loading requests...</p>;

  if (error)
    return (
      <p className="text-red-600">Error loading requests. Try again later.</p>
    );

  if (requests.length === 0)
    return <p>No donation requests available for your restaurant.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Donation Requests</h2>

      {requests.map((req) => (
        <div
          key={req._id}
          className="border rounded-md p-4 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex-1">
            <p>
              <strong>Donation:</strong> {req.donationTitle}
            </p>
            <p>
              <strong>Charity:</strong> {req.charityName} ({req.charityEmail})
            </p>
            <p>
              <strong>Pickup Time:</strong> {req.pickupTime}
            </p>
            <p>
              <strong>Description:</strong> {req.requestDescription}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  req.status === "Pending"
                    ? "text-yellow-600"
                    : req.status === "Accepted"
                    ? "text-green-600"
                    : req.status === "Rejected"
                    ? "text-red-600"
                    : ""
                }`}
              >
                {req.status}
              </span>
            </p>
          </div>

          {req.status === "Pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => acceptMutation.mutate(req._id)}
                className="btn btn-success"
                disabled={acceptMutation.isLoading}
              >
                {acceptMutation.isLoading ? "Accepting..." : "Accept"}
              </button>
              <button
                onClick={() => rejectMutation.mutate(req._id)}
                className="btn btn-error"
                disabled={rejectMutation.isLoading}
              >
                {rejectMutation.isLoading ? "Rejecting..." : "Reject"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RequestedDonations;
