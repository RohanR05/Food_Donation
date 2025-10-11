import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHandHoldingHeart,
  faBoxOpen,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/AuthContext";
import { motion } from "framer-motion";

const ImpactStats = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: myReviews = [] } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews/${user.email}`);
      return res.data;
    },
  });

  const { data: donations = [] } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const cardStyle =
    "stat bg-accent rounded-2xl shadow-lg shadow-primary/40 hover:shadow-secondary/60 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out flex flex-col items-center justify-center py-8";

  return (
    <div className="text-center">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-2xl md:text-4xl font-bold mb-12 text-center text-primary flex items-center justify-center gap-3"
      >
        <FontAwesomeIcon icon={faGlobe} className="text-secondary text-2xl" />
        Platform <span className="text-secondary">Impact</span>
      </motion.h2>

      <div
        data-aos="zoom-in"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto px-4"
      >
        {/* Total Food Donated */}
        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="stat-figure text-secondary text-6xl mb-4">
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
          <div className="text-xl font-medium text-primary">
            Total Food Donated
          </div>
          <div className="stat-value text-info text-2xl mt-2 font-bold">
            {donations.length} Times
          </div>
        </motion.div>

        {/* Total User */}
        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="stat-figure text-secondary text-6xl mb-4">
            <FontAwesomeIcon icon={faHandHoldingHeart} />
          </div>
          <div className="text-xl font-medium text-primary">Total User</div>
          <div className="stat-value text-info text-2xl mt-2 font-bold">
            {users.length} Person
          </div>
        </motion.div>

        {/* My Reviews */}
        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="stat-figure text-secondary text-6xl mb-4">
            <FontAwesomeIcon icon={faLeaf} />
          </div>
          <div className="text-xl font-medium text-primary">
            My Total Reviews
          </div>
          <div className="stat-value text-info text-2xl mt-2 font-bold">
            {myReviews.length} Reviews
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactStats;
