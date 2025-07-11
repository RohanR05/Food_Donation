import React from "react";
import { FaLeaf, FaHandHoldingHeart, FaBoxOpen } from "react-icons/fa";

const ImpactStats = () => {
  return (
    <div className="py-12 bg-base-200 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Platform Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-figure text-secondary text-5xl">
            <FaBoxOpen />
          </div>
          <div className="stat-title">Total Food Donated</div>
          <div className="stat-value text-secondary">4,200 kg</div>
          <div className="stat-desc">From 120+ restaurants</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-figure text-accent text-5xl">
            <FaHandHoldingHeart />
          </div>
          <div className="stat-title">Meals Served</div>
          <div className="stat-value text-accent">15,000+</div>
          <div className="stat-desc">Through 50 charities</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-figure text-success text-5xl">
            <FaLeaf />
          </div>
          <div className="stat-title">CO₂ Emissions Reduced</div>
          <div className="stat-value text-success">8,600 kg</div>
          <div className="stat-desc">By saving surplus food</div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
