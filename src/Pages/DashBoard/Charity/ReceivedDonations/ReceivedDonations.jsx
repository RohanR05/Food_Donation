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

  const { data: donations = [], refetch } = useQuery({
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-8">
        Received Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations picked up yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col hover:shadow-xl transition-all h-full"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={donation.image || "https://via.placeholder.com/400x250"}
                  alt={donation.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {donation.title}
                  </h3>
                  <p className="text-gray-600">
                    <strong>Restaurant:</strong> {donation.restaurantName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Food Type:</strong> {donation.foodType}
                  </p>
                  <p className="text-gray-600">
                    <strong>Quantity:</strong> {donation.quantity}
                  </p>
                  <p className="text-gray-600">
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
                  className="btn mt-4 bg-secondary text-white hover:bg-primary/90 transition"
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
        <div className="flex items-center justify-center min-h-screen p-4 bg-black/30">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            <Dialog.Title className="text-lg font-bold mb-4 text-gray-800">
              Leave a Review
            </Dialog.Title>
            <textarea
              rows="5"
              className="textarea textarea-bordered w-full mb-4 resize-none"
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn bg-primary text-white hover:bg-primary/90"
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
