import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaDatabase,
  FaServer,
  FaUserShield,
  FaUtensils,
  FaHandsHelping,
  FaUserTie,
  FaLock,
  FaMoneyBillWave,
} from "react-icons/fa";

const features = [
  {
    icon: <FaReact className="text-primary text-5xl mb-4" />,
    title: "Modern Tech Stack",
    description:
      "Built with HTML5, CSS, JavaScript, React, DaisyUI, and Framer Motion for a smooth and responsive experience.",
  },
  {
    icon: <FaDatabase className="text-secondary text-5xl mb-4" />,
    title: "Robust Backend",
    description:
      "Powered by Node.js, Express.js, MongoDB, and Axios with TanStack Query for optimized data fetching.",
  },
  {
    icon: <FaServer className="text-accent text-5xl mb-4" />,
    title: "Secure Authentication",
    description:
      "JWT-based authentication with Firebase for safe and reliable user access control.",
  },
  {
    icon: <FaMoneyBillWave className="text-success text-5xl mb-4" />,
    title: "Seamless Payments",
    description: "Integrated Stripe payments for smooth donation processing.",
  },
  {
    icon: <FaUserShield className="text-warning text-5xl mb-4" />,
    title: "Role-Based Access",
    description:
      "Custom dashboards for Admin, Restaurant, Charity, and User roles.",
  },
  {
    icon: <FaHandsHelping className="text-error text-5xl mb-4" />,
    title: "Donation Management",
    description:
      "Post, manage, and track food donations with real-time updates.",
  },
];

const IceGold = () => {
  return (
    <div className="mx-auto space-y-16">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center"
      >
        🍽️ Food Donation Platform
      </motion.h1>

      {/* Emoji-rich Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-base-200 p-6 rounded-lg shadow-md space-y-4 leading-relaxed text-lg"
      >
        <p>
          💳 <strong>Role Requests Made Easy</strong> – Users can apply for a{" "}
          <strong>Charity Role</strong> by paying{" "}
          <strong>$25 via Stripe</strong> 💵. 📩 The <strong>Admin</strong>{" "}
          reviews each request — they can ✅ approve or ❌ decline applications.
        </p>

        <p>
          🏪 <strong>Restaurant Contributions</strong> – Restaurants 🍔🥗 can
          post their <strong>extra, surplus food</strong> instead of wasting it.
          🤝 Verified <strong>Charities</strong> can browse available food and
          send
          <strong> pickup requests</strong>.
        </p>

        <p>
          🔍 <strong>Approval System</strong> – Restaurants can{" "}
          <strong>see all requests</strong> for their donations 📝. They can
          choose to ✅ approve or ❌ cancel based on availability.
        </p>

        <p>
          🚚 <strong>Food Pickup</strong> – Once approved, the Charity 🏢
          collects the food from the Restaurant 🍱, ensuring it reaches those in
          need ❤️.
        </p>

        <p>
          🌍 <strong>Impact</strong> – Every approved donation reduces food
          waste ♻️ and feeds communities in need 🤲.
        </p>
      </motion.div>

      {/* Feature List */}
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl font-bold text-center"
      >
        ⚡ Platform Features
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card bg-base-100 shadow-lg p-6 text-center hover:shadow-2xl transition"
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white text-primary-content p-6 rounded-lg shadow-md"
      >
        <h2 className=" text-secondary text-2xl font-bold mb-3">📌 Summary</h2>
        <p className="leading-relaxed text-secondary">
          A community-driven food donation platform where users can become
          verified charities by paying <strong>$25 via Stripe</strong> 💳.
          Admins review and approve or reject these requests. Restaurants 🏪
          post surplus food, and approved charities 🏢 can request it.
          Restaurants decide which charity to approve, and once accepted,
          charities pick up the food 🚚. The platform helps reduce food waste ♻️
          while feeding those in need ❤️.
        </p>
      </motion.div>
    </div>
  );
};

export default IceGold;
