import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faBuilding,
  faBullseye,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../Shared/Loading/Loadign";

const LatestCharityRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["latestCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests");
      return res.data.slice(-3).reverse();
    },
  });

  if (isFetching) return <Loading />;
  if (error)
    return (
      <p className="text-center text-error py-6">Failed to load requests.</p>
    );

  return (
    <div className="w-full mx-auto px-3">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-bold mb-10 text-center text-primary"
      >
        <FontAwesomeIcon
          icon={faHandsHelping}
          className="text-secondary mr-2"
        />
        Latest <span className="text-secondary">Charity Requests</span>
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {requests.map((req, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-accent rounded-2xl shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-secondary/50 transition-all transform hover:-translate-y-1 duration-300 p-6"
          >
            {/* Title */}
            <div className="flex items-center gap-3 mb-3">
              <FontAwesomeIcon
                icon={faBuilding}
                className="text-secondary text-2xl"
              />
              <h3 className="text-xl font-bold text-primary">
                {req.name || "Unnamed Charity"}
              </h3>
            </div>

            {/* Organization */}
            <p className="text-primary text-sm flex items-start gap-2 mb-2">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-secondary mt-1"
              />
              <span>
                <strong className="text-primary">Organization:</strong>{" "}
                {req.organization || "Not specified"}
              </span>
            </p>

            {/* Mission */}
            <p className="text-primary text-sm flex items-start gap-2 mb-2">
              <FontAwesomeIcon
                icon={faBullseye}
                className="text-secondary mt-1"
              />
              <span>
                <strong className="text-primary">Mission:</strong>{" "}
                {req.mission || "No mission description available."}
              </span>
            </p>

            {/* Additional visual divider */}
            <div className="mt-4 border-t border-secondary/30 pt-3 text-center">
              <span className="text-xs text-primary italic">
                Empowering communities through compassion 💚
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestCharityRequests;
