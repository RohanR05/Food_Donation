import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");

  // Fetch all picked-up donations
  const { data: donations = [], refetch } = useQuery({
    queryKey: ["pickedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data.filter((donation) => donation.status === "picked");
    },
  });

  // Submit review
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-secondary text-center mb-6">
        Received Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations picked up yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="card bg-base-100 shadow-xl border"
            >
              <div className="card-body">
                <h3 className="card-title text-xl">{donation.title}</h3>
                <p>
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
                <button
                  onClick={() => {
                    setSelectedDonation(donation);
                    setIsOpen(true);
                  }}
                  className="btn btn-sm mt-3 bg-primary text-white"
                >
                  Add Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <Dialog.Title className="text-lg font-bold mb-4">
              Leave a Review
            </Dialog.Title>
            <textarea
              rows="4"
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="btn btn-ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmitReview}>
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
