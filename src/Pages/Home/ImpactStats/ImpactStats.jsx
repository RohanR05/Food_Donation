import React, { use } from "react";
import { FaLeaf, FaHandHoldingHeart, FaBoxOpen } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/AuthContext";

const ImpactStats = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = use(AuthContext);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    enabled: !!user?.email, // ✅ Run only when user is ready
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

  return (
    <div className="py-12 bg-base-100 text-center text-secondary">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
        Platform Impact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        <div className="stat bg-accent rounded-box shadow">
          <div className="stat-figure text-primary text-5xl">
            <FaBoxOpen />
          </div>
          <div className="stat-title text-primary">Total Food Donated</div>
          <div className="stat-value">{donations.length} Times</div>
        </div>
        <div className="stat bg-accent rounded-box shadow">
          <div className="stat-figure text-secondary text-5xl">
            <FaHandHoldingHeart />
          </div>
          <div className="stat-title text-secondary">Total User</div>
          <div className="stat-value text-secondary">{users.length} Person</div>
        </div>
        <div className="stat bg-accent rounded-box shadow">
          <div className="stat-figure text-secondary text-5xl">
            <FaLeaf />
          </div>
          <div className="stat-title">My Total Reviews</div>
          <div className="stat-value text-secondary">
            {myReviews.length} Reviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
