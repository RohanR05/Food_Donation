import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faUser,
  faUsers,
  faTruck,
  faGlobe,
  faCreditCard,
  faBuilding,
  faClipboardCheck,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faUser,
    title: "Modern Tech Stack",
    description:
      "Built with HTML5, CSS, JavaScript, React, DaisyUI, and Framer Motion for a smooth and responsive experience.",
  },
  {
    icon: faUsers,
    title: "Robust Backend",
    description:
      "Powered by Node.js, Express.js, MongoDB, and Axios with TanStack Query for optimized data fetching.",
  },
  {
    icon: faClipboardCheck,
    title: "Secure Authentication",
    description:
      "JWT-based authentication with Firebase for safe and reliable user access control.",
  },
  {
    icon: faCreditCard,
    title: "Seamless Payments",
    description: "Integrated Stripe payments for smooth donation processing.",
  },
  {
    icon: faBuilding,
    title: "Role-Based Access",
    description:
      "Custom dashboards for Admin, Restaurant, Charity, and User roles.",
  },
  {
    icon: faUtensils,
    title: "Donation Management",
    description:
      "Post, manage, and track food donations with real-time updates.",
  },
];

const infoItems = [
  {
    icon: faCreditCard,
    title: "Role Requests Made Easy",
    description:
      "Users can apply for a Charity Role by paying $25 via Stripe. Admin reviews each request — they can approve or decline applications.",
  },
  {
    icon: faBuilding,
    title: "Restaurant Contributions",
    description:
      "Restaurants can post surplus food. Verified charities can browse and send pickup requests.",
  },
  {
    icon: faClipboardCheck,
    title: "Approval System",
    description:
      "Restaurants see all requests and decide which to approve or cancel.",
  },
  {
    icon: faTruck,
    title: "Food Pickup",
    description: "Approved charities collect food from restaurants.",
  },
  {
    icon: faGlobe,
    title: "Impact",
    description:
      "Every approved donation reduces food waste and feeds communities in need.",
  },
];

const IceGold = () => {
  return (
    <div className="mx-auto space-y-8 md:space-y-12 px-2">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-4xl font-bold text-secondary text-center flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faUtensils} className="text-primary" />
        Food Donation <span className="text-primary">Platform</span>
      </motion.h1>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-accent p-6 md:p-10 rounded-xl shadow-xl shadow-primary/20 space-y-4 text-primary text-lg md:text-xl leading-relaxed"
      >
        {infoItems.map((item, index) => (
          <p key={index} className="text-primary flex items-start gap-2">
            <FontAwesomeIcon icon={item.icon} className="text-secondary mt-1" />
            <span>
              <strong className="text-primary">{item.title}</strong> –{" "}
              {item.description}
            </span>
          </p>
        ))}
      </motion.div>

      {/* Features Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3 text-secondary"
      >
        <FontAwesomeIcon
          icon={faCogs}
          className="text-primary text-2xl md:text-4xl drop-shadow-md"
        />
        Platform <span className="text-primary">Features</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-accent rounded-xl shadow-xl shadow-primary/40 p-6 text-center cursor-pointer hover:shadow-primary/50 transition-all"
          >
            <FontAwesomeIcon
              icon={feature.icon}
              className="text-secondary text-5xl mb-4 mx-auto"
            />
            <h3 className="text-2xl font-semibold text-primary mb-3">
              {feature.title}
            </h3>
            <p className="text-primary">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="bg-accent shadow-primary/50 text-primary p-6 md:p-10 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-secondary mb-3">Summary</h2>
        <p className="leading-relaxed text-primary text-lg md:text-xl">
          A community-driven food donation platform where users can become
          verified charities by paying $25 via Stripe. Admins review and approve
          or reject these requests. Restaurants post surplus food, and approved
          charities can request it. Restaurants decide which charity to approve,
          and once accepted, charities pick up the food. The platform helps
          reduce food waste while feeding those in need.
        </p>
      </motion.div>
    </div>
  );
};

export default IceGold;
