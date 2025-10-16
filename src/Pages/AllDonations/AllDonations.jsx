import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faMapMarkerAlt,
  faBoxOpen,
  faInfoCircle,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from '../../Shared/Loading/Loadign'

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;
  if (error)
    return (
      <p className="text-center py-10 text-error font-semibold">
        Failed to load donations.
      </p>
    );

  return (
    <div className="mx-auto px-6 py-12 space-y-12">
      {/* Animated Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-center flex justify-center items-center gap-3"
      >
        <FontAwesomeIcon
          icon={faHeart}
          className="text-secondary text-3xl animate-pulse"
        />
        <span className="text-primary">All</span>{" "}
        <span className="text-secondary">Verified Donations</span>
      </motion.h2>

      {/* Empty state */}
      {donations.length === 0 ? (
        <p className="text-center text-secondary text-lg">
          No verified donations available right now.
        </p>
      ) : (
        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {donations.map((donation) => (
            <motion.div
              key={donation._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="bg-accent rounded-2xl shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-secondary/60 border border-primary overflow-hidden flex flex-col transition-all"
            >
              {/* Image Section */}
              <div className="h-48 w-full overflow-hidden">
                <motion.img
                  src={
                    donation.image ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={donation.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Info Section */}
              <div className="p-6 flex flex-col flex-grow space-y-2">
                <h3 className="text-xl md:text-2xl font-semibold text-primary">
                  {donation.title}
                </h3>

                <p className="text-info text-sm flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="text-secondary"
                  />
                  <strong>Restaurant:</strong>{" "}
                  {donation.restaurantName || "N/A"}
                </p>

                <p className="text-info text-sm flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-secondary"
                  />
                  <strong>Location:</strong> {donation.location || "Unknown"}
                </p>

                <p className="text-info text-sm flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-secondary"
                  />
                  <strong>Quantity:</strong> {donation.quantity}
                </p>

                <p className="text-info text-sm flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-secondary"
                  />
                  <strong>Status:</strong>{" "}
                  <span className="capitalize font-semibold">
                    {donation.status}
                  </span>
                </p>

                <p className="text-info text-sm flex items-center gap-2">
                  <FontAwesomeIcon icon={faHeart} className="text-secondary" />
                  <strong>Charity:</strong>{" "}
                  {donation.charityName || "Not Assigned"}
                </p>

                <Link
                  to={`/donations/${donation._id}`}
                  className="mt-auto block w-full text-center py-2 px-4 rounded-lg border border-secondary text-secondary hover:bg-secondary hover:text-white transition font-medium"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllDonations;
