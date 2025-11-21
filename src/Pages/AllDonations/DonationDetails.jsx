import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaUtensils,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaClock,
  FaClipboardCheck,
  FaStar,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
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

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center py-10 text-error">
        Failed to load donation details.
      </p>
    );

  return (
    <div className="mx-auto px-6 py-12 space-y-12">
      {/* Animated Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-center flex justify-center items-center gap-3 text-primary"
      >
        <FaClipboardCheck className="text-secondary text-4xl" />
        Donation <span className="text-secondary">Details</span>
      </motion.h2>

      {/* Donation Info */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-accent text-info rounded-2xl shadow-lg shadow-primary/30 p-8 space-y-6 border border-primary"
      >
        {/* Image */}
        <div className="flex justify-center">
          <motion.img
            src={donation.image || "https://via.placeholder.com/400x250"}
            alt="Donation"
            className="w-full md:w-10/12 h-56 md:h-72 object-cover rounded-2xl border border-secondary shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-primary">
          {donation.title}
        </h2>

        {/* Donation Details */}
        <div className="space-y-3 text-primary text-base md:text-lg leading-relaxed">
          <p className="flex items-center gap-2">
            <FaUtensils className="text-secondary" />{" "}
            <strong>Restaurant:</strong> {donation.restaurant} (
            {donation.location})
          </p>

          <p className="flex items-center gap-2">
            <FaBoxOpen className="text-secondary" />{" "}
            <strong>Food Type:</strong> {donation.foodType}
          </p>

          <p className="flex items-center gap-2">
            <FaHeart className="text-secondary" />{" "}
            <strong>Quantity:</strong> {donation.quantity}
          </p>

          <p className="flex items-center gap-2">
            <FaClock className="text-secondary" />{" "}
            <strong>Pickup Window:</strong>{" "}
            {donation.pickupTime || "Not specified"}
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-secondary" />{" "}
            <strong>Status:</strong>{" "}
            <span className="font-semibold capitalize">
              {donation.status === "Assigned"
                ? `Assigned to ${donation.assignedTo} (${donation.assignedType})`
                : donation.status}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => favoriteMutation.mutate()}
            className="btn btn-secondary text-primary font-medium hover:brightness-110 transition"
          >
            <FaHeart className="mr-2" /> Save to Favorites
          </motion.button>

          {role === "charity" && donation.status === "Verified" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRequestModal(true)}
              className="btn btn-primary text-neutral font-medium hover:opacity-80"
            >
              <FaClipboardCheck className="mr-2" /> Request Donation
            </motion.button>
          )}

          {role === "charity" && donation.status === "Accepted" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirmPickup}
              className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-neutral"
            >
              Confirm Pickup
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviewModal(true)}
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-neutral"
          >
            <FaStar className="mr-2" /> Add Review
          </motion.button>
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-accent rounded-2xl shadow-md p-8 border border-primary space-y-6"
      >
        <h3 className="text-2xl font-bold text-center text-primary flex items-center justify-center gap-2">
          <FaStar className="text-secondary" /> Community Reviews
        </h3>

        {reviews.length === 0 ? (
          <p className="text-center text-info">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg bg-base-100 border border-secondary shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-primary">{r.reviewerName}</p>
                <p className="text-sm text-secondary flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> Rating: {r.rating}/5
                </p>
                <p className="text-info mt-1">{r.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

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
