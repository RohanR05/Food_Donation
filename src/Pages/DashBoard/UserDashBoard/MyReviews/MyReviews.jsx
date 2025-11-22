import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaStore, FaCalendarAlt, FaStar } from "react-icons/fa";
import Loading2 from "../../../../Shared/Loading/Loading2";

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
    onError: () => Swal.fire("Error!", "Failed to delete review.", "error"),
  });

  if (isLoading) return <Loading2></Loading2>;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:mt-8 space-y-8">
      {/* Title with sequential animation */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="text-3xl md:text-4xl font-bold text-center text-primary mb-6"
      >
        My Reviews
      </motion.h2>

      {myReviews.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-info text-lg"
        >
          You have no reviews yet.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myReviews.map((review) => (
            <motion.div
              key={review._id}
              className="bg-accent rounded-2xl shadow-lg shadow-primary/40 p-5 flex flex-col transition-transform hover:scale-105"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-secondary mb-2">
                {review.donationTitle}
              </h3>

              <p className="flex items-center gap-2 text-sm mb-1">
                <FaStore className="text-secondary" />
                <strong>Restaurant:</strong>{" "}
                <span className="text-primary">{review.restaurant}</span>
              </p>

              <p className="flex items-center gap-2 text-sm mb-2">
                <FaCalendarAlt className="text-secondary" />
                <strong>Reviewed on:</strong>{" "}
                <span className="text-primary">
                  {new Date(review.createdAt).toLocaleString()}
                </span>
              </p>

              <p className="mb-2 text-primary">{review.description}</p>

              <p className="flex items-center gap-2 text-sm">
                <FaStar className="text-secondary" />
                <strong>Rating:</strong>{" "}
                <span className="text-primary">{review.rating}/5</span>
              </p>

              <button
                className="btn btn-secondary mt-4 text-primary hover:bg-accent border-none"
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
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
