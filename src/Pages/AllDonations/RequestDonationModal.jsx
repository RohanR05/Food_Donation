// RequestDonationModal.jsx
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestDonationModal = ({ donation, user, onClose }) => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const request = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantName: donation.restaurant,
      charityName: user.displayName,
      charityEmail: user.email,
      requestDescription: form.requestDescription.value,
      pickupTime: form.pickupTime.value,
      status: "Pending",
    };

    try {
      await axiosSecure.post("/donation-requests", request);
      Swal.fire("Success", "Donation request submitted.", "success");
      onClose();
    } catch {
      Swal.fire("Error", "Failed to submit request.", "error");
    }
  };

  return (
    <dialog id="request_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Request Donation</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input input-bordered w-full" value={donation.title} readOnly />
          <input className="input input-bordered w-full" value={donation.restaurant} readOnly />
          <input className="input input-bordered w-full" value={user.displayName} readOnly />
          <input className="input input-bordered w-full" value={user.email} readOnly />
          <textarea
            name="requestDescription"
            className="textarea textarea-bordered w-full"
            placeholder="Why do you want this donation?"
            required
          ></textarea>
          <input
            name="pickupTime"
            type="time"
            className="input input-bordered w-full"
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-success">Submit</button>
            <button type="button" onClick={onClose} className="btn">Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestDonationModal;
