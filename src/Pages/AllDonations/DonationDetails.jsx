import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import RequestDonationModal from "./RequestDonationModal";
import AddReviewModal from "./AddReviewModal";
import { AuthContext } from "../../Contexts/AuthContext";
import useUserRole from "../../Hooks/useUserRole";
import Loading from "../../Shared/Loading/Loadign";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { role } = useUserRole();
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

  if (isLoading) return <Loading></Loading>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load donation.</p>
    );

  return (
    <div className="mx-auto px-6 py-12 space-y-12 bg-[#e1e2e2]">
      <h2 className="text-2xl md:text-5xl text-secondary font-medium text-center">
        Donation Details
      </h2>
      {/* Donation Info */}
      <div className="bg-secondary rounded-2xl shadow-md p-8 space-y-6 border border-[#00458B]">
        <img
          src={donation.image || "https://via.placeholder.com/400x250"}
          alt="Food"
          className="w-10/12 h-48 md:h-60 object-cover mx-auto rounded-lg border border-[#00458B]"
        />

        <h2 className="text-3xl font-bold text-center text-[#00458B]">
          {donation.title}
        </h2>

        <div className="space-y-2 text-[#00458B] text-lg">
          <p>
            🏪 <strong>Restaurant:</strong> {donation.restaurant} (
            {donation.location})
          </p>
          <p>
            🍽 <strong>Food Type:</strong> {donation.foodType}
          </p>
          <p>
            📦 <strong>Quantity:</strong> {donation.quantity}
          </p>
          <p>
            ⏰ <strong>Pickup Window:</strong>{" "}
            {donation.pickupTime || "Not specified"}
          </p>
          <p>
            📌 <strong>Status:</strong>{" "}
            <span className="font-semibold">
              {donation.status === "Assigned"
                ? `Assigned to ${donation.assignedTo} (${donation.assignedType})`
                : donation.status}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <button
            onClick={() => favoriteMutation.mutate()}
            className=" btn btn-secondary text-white hover:bg-white hover:text-secondary transition"
          >
            Save to Favorites
          </button>

          {role === "charity" && donation.status === "Verified" && (
            <button
              onClick={() => setShowRequestModal(true)}
              className="btn btn-secondary text-white hover:bg-white hover:text-secondary transition"
            >
              Request Donation
            </button>
          )}

          {role === "charity" && donation.status === "Accepted" && (
            <button
              onClick={handleConfirmPickup}
              className="w-full md:w-auto py-2 px-4 rounded-lg border border-[#00458B] text-[#00458B] hover:bg-[#00458B] hover:text-white transition"
            >
              Confirm Pickup
            </button>
          )}

          <button
            onClick={() => setShowReviewModal(true)}
            className="btn btn-outline border-[#00458B] text-[#00458B] hover:bg-[#00458B] hover:text-white transition"
          >
            Add Review
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-[#00458B] space-y-6">
        <h3 className="text-2xl font-bold text-center text-[#00458B] mb-4">
          Reviews
        </h3>
        {reviews.length === 0 ? (
          <p className="text-center text-[#00458B]">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="border-b border-[#00458B] pb-4">
                <p className="font-semibold text-[#00458B]">{r.reviewerName}</p>
                <p className="text-sm text-[#00458B]">Rating: {r.rating}/5</p>
                <p className="text-[#00458B]">{r.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
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
