import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: myReviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews/${user.email}`);
      return res.data;
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Review removed.", "success");
      queryClient.invalidateQueries(["myReviews", user.email]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete review.", "error");
    },
  });

  if (isLoading) return <p className="text-center py-6">Loading your reviews...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-primary mt-16">
      <h2 className="text-3xl font-bold mb-6  text-secondary">My Reviews</h2>

      {myReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        myReviews.map((review) => (
          <div key={review._id} className="border p-4 rounded mb-4 shadow-sm bg-base-100 text-secondary">
            <p className="text-lg font-semibold">{review.donationTitle}</p>
            <p className="text-sm mb-1">Restaurant: {review.restaurant}</p>
            <p className="text-sm mb-2">
              Reviewed on: {new Date(review.createdAt).toLocaleString()}
            </p>
            <p className="mb-2">{review.description}</p>
            <p className="text-sm">Rating: {review.rating}/5</p>
            <button
              className="btn btn-xs btn-secondary mt-2 text-primary"
              onClick={() =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "This will remove your review.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) deleteReview.mutate(review._id);
                })
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
