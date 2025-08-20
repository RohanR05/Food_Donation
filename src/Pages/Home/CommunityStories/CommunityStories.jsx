import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const CommunityStories = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center text-secondary">Loading stories...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load stories.</p>;
  }

  return (
    <div className="py-16 bg-base-100">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-secondary">
          🌟 Community Reviews
        </h2>
        <p className="max-w-2xl mx-auto text-base-content mt-3 text-lg">
          See how donors, restaurants, and charities are making an impact 🍽️.
        </p>
      </motion.div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition p-6"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-secondary">
                  {r.reviewerName}
                </h3>
                <p className="text-sm text-base-content opacity-70">
                  {r.reviewerEmail}
                </p>
                <p className="text-xs text-base-content opacity-60">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Review Text */}
            <div className="mt-4">
              <p className="italic text-base-content">"{r.description}"</p>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < r.rating ? "fill-yellow-500" : "opacity-30"
                  }
                />
              ))}
              <span className="ml-2 font-semibold text-base-content">
                {r.rating}/5
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStories;
