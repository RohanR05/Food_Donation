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
import Marquee from "react-fast-marquee";
import Loading from "../../../Shared/Loading/Loadign";

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

  if (isLoading) return <Loading />;

  if (error)
    return (
      <p className="text-center text-error mt-8">Failed to load stories.</p>
    );

  return (
    <div>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-primary flex items-center justify-center gap-3"
        >
          <FontAwesomeIcon
            icon={faComments}
            className="text-secondary text-4xl drop-shadow-md"
          />
          Community <span className="text-secondary">Reviews</span>
        </motion.h2>
        <p className="max-w-2xl mx-auto text-primary mt-3 text-lg">
          See how donors, restaurants, and charities are making an impact.
        </p>
      </motion.div>

      {/* Marquee Reviews */}
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover
        className="space-x-3 px-2 bg-accent py-6"
      >
        {reviews.map((r) => (
          <motion.div
            key={r._id}
            whileHover={{ scale: 1.02 }}
            className="card min-w-[300px] bg-neutral rounded-2xl shadow shadow-secondary/50 mr-5 p-6 flex flex-col justify-between"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-neutral/20 text-secondary rounded-full">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </div>
              <div>
                <h3 className="text-primary text-lg font-semibold">
                  {r.reviewerName}
                </h3>
                <p className="text-sm flex items-center gap-1 opacity-80">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-secondary"
                  />
                  {r.reviewerEmail}
                </p>
                <p className="text-xs flex items-center gap-1 opacity-80">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-secondary"
                  />
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Review Text */}
            <div className="mt-4 text-primary italic">"{r.description}"</div>

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
      </Marquee>
    </div>
  );
};

export default CommunityStories;
