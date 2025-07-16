import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestDonationModal = ({ donation, user, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const request = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantName: donation.restaurantName,
      restaurantEmail: donation.restaurantEmail,
      charityName: user.displayName,
      charityEmail: user.email,
      requestDescription: form.requestDescription.value,
      pickupTime: form.pickupTime.value,
      status: "Pending",
      requestDate: new Date(),
    };

    try {
      await axiosSecure.post("/donation-requests", request);
      Swal.fire("Success", "Donation request submitted.", "success");
      form.reset();
      onClose();
    } catch (error) {
      if (
        error.response?.data?.error ===
        "You have already requested this donation."
      ) {
        Swal.fire("Warning", error.response.data.error, "warning");
      } else {
        Swal.fire("Error", "Failed to submit request.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="request_modal" className="modal modal-open z-50">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-5 text-center text-success">
          Request This Donation
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-sm font-semibold">
                Donation Title
              </label>
              <input
                className="input input-bordered w-full"
                value={donation.title}
                readOnly
              />
            </div>
            <div>
              <label className="label text-sm font-semibold">Restaurant</label>
              <input
                className="input input-bordered w-full"
                value={donation.restaurantName}
                readOnly
              />
            </div>
            <div>
              <label className="label text-sm font-semibold">
                Charity Name
              </label>
              <input
                className="input input-bordered w-full"
                value={user.displayName}
                readOnly
              />
            </div>
            <div>
              <label className="label text-sm font-semibold">
                Charity Email
              </label>
              <input
                className="input input-bordered w-full"
                value={user.email}
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="label text-sm font-semibold">
              Request Description
            </label>
            <textarea
              name="requestDescription"
              className="textarea textarea-bordered w-full"
              placeholder="Why are you requesting this donation?"
              required
            ></textarea>
          </div>

          <div>
            <label className="label text-sm font-semibold">
              Preferred Pickup Time
            </label>
            <input
              name="pickupTime"
              type="time"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="modal-action mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-neutral"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-success ${loading ? "btn-disabled" : ""}`}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestDonationModal;
