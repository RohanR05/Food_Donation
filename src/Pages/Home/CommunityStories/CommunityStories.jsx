import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faSolidStar,
  faEnvelope,
  faCalendar,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Loading2 from '../../../Shared/Loading/Loading2'

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
    return <Loading2></Loading2>
  }

  if (error) {
    return (
      <p className="text-center text-error mt-8">Failed to load stories.</p>
    );
  }

  return (
    <div className="">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-primary flex items-center justify-center gap-3"
        >
          <FontAwesomeIcon
            icon={faComments}
            className="text-secondary text-4xl drop-shadow-md"
          />
          Community <span className="text-secondary">Reviews</span>
        </motion.h2>
        <p className="max-w-2xl mx-auto text-secondary mt-3 text-lg">
          See how donors, restaurants, and charities are making an impact.
        </p>
      </motion.div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {reviews.map((r, i) => (
          <motion.div
            key={r._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="card bg-accent rounded-2xl shadow-lg shadow-primary/40 border border-primary/30  hover:shadow-xl hover:shadow-secondary/50 hover:scale-110 transition-all duration-500 p-6 flex flex-col justify-between"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/20 text-primary rounded-full">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {r.reviewerName}
                </h3>
                <p className="text-sm text-info flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-secondary"
                  />
                  {r.reviewerEmail}
                </p>
                <p className="text-xs text-info flex items-center gap-1 opacity-80">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-secondary"
                  />
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Review Text */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-4 text-primary italic"
            >
              "{r.description}"
            </motion.div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-1">
              {[...Array(5)].map((_, idx) => (
                <FontAwesomeIcon
                  key={idx}
                  icon={faSolidStar}
                  className={`${
                    idx < r.rating
                      ? "text-secondary"
                      : "opacity-30 text-secondary"
                  }`}
                />
              ))}
              <span className="ml-2 text-primary font-semibold">
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
