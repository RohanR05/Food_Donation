import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router";
import Loading2 from "../../../../Shared/Loading/Loading2";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FaStore, FaInfoCircle, FaBox } from "react-icons/fa";

const Favorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: (favoriteId) => axiosSecure.delete(`/favorites/${favoriteId}`),
    onSuccess: () => {
      Swal.fire("Removed!", "Favorite has been removed.", "success");
      queryClient.invalidateQueries(["favorites", user.email]);
    },
    onError: () => Swal.fire("Error", "Failed to remove favorite", "error"),
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <Loading2 size={120} />
      </div>
    );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Animation for sequential blinking
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: [0, 1, 0.5, 1],
      transition: { delay: i * 0.2, repeat: Infinity, duration: 1.5 },
    }),
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:mt-8 space-y-8">
      {/* Title with blinking effect */}
      <motion.h2
        custom={0}
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-3xl md:text-4xl font-bold text-center text-primary flex items-center justify-center gap-3"
      >
        <FaHeart className="text-secondary animate-pulse" /> My Favorites
      </motion.h2>

      {favorites.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-info text-lg"
        >
          You have no favorites saved.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <motion.div
              key={fav.favoriteId}
              className="bg-accent rounded-2xl shadow-xl shadow-primary/50 p-4 flex flex-col transition-transform hover:scale-105"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={fav.image}
                alt={fav.title}
                className="w-full h-48 object-cover rounded-xl shadow-md border-2 border-secondary"
              />
              <div className="flex items-center gap-2 mt-3">
                <FaHeart className="text-secondary" />
                <h3 className="text-xl font-semibold text-primary">
                  {fav.title}
                </h3>
              </div>

              <p className="text-sm mt-1 flex items-center gap-2">
                <FaStore className="text-secondary" />
                <strong className="">Restaurant:</strong>{" "}
                <span className="text-primary">
                  {fav.restaurant} ({fav.location})
                </span>
              </p>

              <p className="text-sm flex items-center gap-2">
                <FaInfoCircle className="text-secondary" />
                <strong>Status:</strong>{" "}
                <span className="text-primary">{fav.status}</span>
              </p>

              <p className="text-sm flex items-center gap-2">
                <FaBox className="text-secondary" />
                <strong>Quantity:</strong>{" "}
                <span className="text-primary">{fav.quantity}</span>
              </p>

              <div className="mt-4 flex gap-3">
                <Link
                  to={`/donations/${fav.donationId}`}
                  className="btn bg-secondary hover:bg-accent border-none flex-1"
                >
                  Details
                </Link>
                <button
                  className="btn btn-outline btn-primary flex-1"
                  onClick={() => mutation.mutate(fav.favoriteId)}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
