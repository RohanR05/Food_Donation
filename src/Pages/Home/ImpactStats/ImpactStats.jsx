import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHandHoldingHeart,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/AuthContext";

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

  return (
    <div className="py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        Platform <span className="text-secondary">Impact</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-4">
        {/* Total Food Donated */}
        <div className="stat bg-accent rounded-box shadow">
          <div className="stat-figure text-primary text-5xl">
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
          <div className="text-2xl font-medium text-primary">
            Total Food Donated
          </div>
          <div className="stat-value text-secondary">
            {donations.length} Times
          </div>
        </div>

        {/* Total User */}
        <div className="stat bg-accent rounded-box shadow">
          <div className="stat-figure text-primary text-5xl">
            <FontAwesomeIcon icon={faHandHoldingHeart} />
          </div>
          <div className="text-2xl font-medium text-primary">Total User</div>
          <div className="stat-value text-secondary">{users.length} Person</div>
        </div>

        {/* My Reviews */}
        <div className="stat bg-accent rounded-box shadow">
          <div className="stat-figure text-primary text-5xl">
            <FontAwesomeIcon icon={faLeaf} />
          </div>
          <div className="text-2xl font-medium text-primary">My Total Reviews</div>
          <div className="stat-value text-secondary">
            {myReviews.length} Reviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
