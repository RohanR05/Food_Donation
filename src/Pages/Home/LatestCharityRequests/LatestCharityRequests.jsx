import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaHandsHelping, FaInfoCircle } from "react-icons/fa";
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
    // enabled: !!user?.email && !authLoading,
  });

  if (isFetching) {
    return <Loading></Loading>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-6">Failed to load requests.</p>
    );
  }

  return (
    <div className=" w-full mx-auto p-6 bg-base-100">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-10 text-center text-secondary"
      >
        🌟 Latest Charity Requests
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {requests.map((req, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-primary rounded-xl shadow-md border border-gray-200 overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <FaHandsHelping className="text-secondary text-xl" />
                <h3 className="text-xl font-bold text-secondary">{req.name}</h3>
              </div>

              <p className="text-secondary text-sm flex items-start gap-1">
                <FaInfoCircle className="mt-1 text-secondary" />
                <span>
                  <strong>Mission:</strong>{" "}
                  {req.mission || "No description available"}
                </span>
              </p>

              <p className="text-secondary text-sm flex items-start gap-1">
                <FaInfoCircle className="mt-1 text-secondary" />
                <span>
                  <strong>Organization:</strong>{" "}
                  {req.organization || "Not specified"}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestCharityRequests;
