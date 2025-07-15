// DonationDetails.jsx
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import RequestDonationModal from "./RequestDonationModal";
import AddReviewModal from "./AddReviewModal";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const {
    data: donation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["donationReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post("/favorites", { donationId: id, email: user.email }),
    onSuccess: () => {
      Swal.fire("Saved!", "Donation added to favorites.", "success");
      queryClient.invalidateQueries(["favorites", user.email]);
    },
    onError: () =>
      Swal.fire("Error", "Already in favorites or failed to save.", "error"),
  });

  const handleConfirmPickup = async () => {
    try {
      await axiosSecure.patch(`/donations/pickup/${id}`);
      Swal.fire("Success", "Marked as picked up!", "success");
      queryClient.invalidateQueries(["donation", id]);
    } catch {
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  if (isLoading)
    return <p className="text-center py-6">Loading donation details...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load donation.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <img
          src={donation.image}
          alt="Food"
          className="w-1/2 rounded-lg mb-4"
        />
        <h2 className="text-3xl font-bold">{donation.title}</h2>
        <p>
          <strong>Restaurant:</strong> {donation.restaurant} (
          {donation.location})
        </p>
        <p>
          <strong>Food Type:</strong> {donation.foodType}
        </p>
        <p>
          <strong>Quantity:</strong> {donation.quantity}
        </p>
        <p>
          <strong>Pickup Window:</strong>{" "}
          {donation.pickupTime || "Not specified"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="font-semibold text-indigo-600">
            {donation.status}
          </span>
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={() => favoriteMutation.mutate()}
            className="btn btn-outline  btn-secondary"
          >
            Save to Favorites
          </button>
          {user?.role === "charity" && donation.status === "Verified" && (
            <button
              onClick={() => setShowRequestModal(true)}
              className="btn btn-success"
            >
              Request Donation
            </button>
          )}
          {user?.role === "charity" && donation.status === "Accepted" && (
            <button onClick={handleConfirmPickup} className="btn btn-warning">
              Confirm Pickup
            </button>
          )}
          <button
            onClick={() => setShowReviewModal(true)}
            className="btn btn-info"
          >
            Add Review
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="border-b py-3">
              <p className="font-bold">{r.reviewerName}</p>
              <p className="text-sm text-gray-500">Rating: {r.rating}/5</p>
              <p>{r.description}</p>
            </div>
          ))
        )}
      </div>

      {showRequestModal && (
        <RequestDonationModal
          donation={donation}
          user={user}
          onClose={() => setShowRequestModal(false)}
        />
      )}
      {showReviewModal && (
        <AddReviewModal
          donationId={id}
          user={user}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
};

export default DonationDetails;
