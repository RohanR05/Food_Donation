import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddReviewModal = ({ donationId, user, onClose }) => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const description = form.description.value.trim();
    const rating = form.rating.value;

    const reviewData = {
      donationId,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      description,
      rating: Number(rating),
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      Swal.fire("Success", "Review submitted!", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error", "Failed to submit review", "error");
      console.error(err);
    }
  };

  return (
    <dialog id="review_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Add a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Write your review"
            required
          ></textarea>
          <select
            name="rating"
            className="select select-bordered w-full"
            required
            defaultValue=""
          >
            <option disabled value="">
              Select rating
            </option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
          </select>
          <div className="modal-action">
            <button type="submit" className="btn btn-info">
              Submit
            </button>
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddReviewModal;
