import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { FiStar, FiBox, FiUser } from "react-icons/fi";

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");

  const {
    data: donations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pickedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data.filter((donation) => donation.status === "picked");
    },
  });

  const handleSubmitReview = async () => {
    try {
      const res = await axiosSecure.patch(
        `/donations/review/${selectedDonation._id}`,
        {
          review,
          reviewedAt: new Date().toISOString(),
        }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        setIsOpen(false);
        setReview("");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit review.", "error");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="loading loading-spinner text-secondary loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-2 md:mt-8">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-primary text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Received Donations
      </motion.h2>

      {donations.length === 0 ? (
        <p className="text-center text-info">No donations picked up yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation, index) => (
            <motion.div
              key={donation._id}
              className="bg-accent text-info rounded-2xl border border-secondary/30 shadow-md shadow-primary/50 overflow-hidden hover:shadow-2xl hover:shadow-secondary/40 transition-all flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={donation.image || "https://via.placeholder.com/400x250"}
                  alt={donation.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                />
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                    <FiBox className="text-secondary" /> {donation.title}
                  </h3>
                  <p>
                    <FiUser className="inline text-secondary mr-1" />
                    <strong>Restaurant:</strong> {donation.restaurantName}
                  </p>
                  <p>
                    <strong>Food Type:</strong> {donation.foodType}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {donation.quantity}
                  </p>
                  <p>
                    <strong>Pickup Date:</strong>{" "}
                    {new Date(
                      donation.updatedAt || donation.pickupDate || Date.now()
                    ).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedDonation(donation);
                    setIsOpen(true);
                  }}
                  className="btn mt-4 btn-secondary btn-outline hover:btn-primary transition"
                >
                  <FiStar className="mr-2 text-secondary" /> Add Review
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4 bg-black/30">
          <Dialog.Panel className="w-full max-w-md bg-accent rounded-2xl shadow-2xl p-6">
            <Dialog.Title className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
              <FiStar className="text-secondary" /> Leave a Review
            </Dialog.Title>
            <textarea
              rows="5"
              className="textarea textarea-bordered w-full mb-4 resize-none text-info bg-neutral"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-ghost text-secondary border-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn bg-primary text-info hover:bg-primary/90"
                onClick={handleSubmitReview}
              >
                Submit
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ReceivedDonations;
