import React from "react";
import { motion } from "framer-motion";

const stories = [
  {
    name: "Hope Foundation",
    role: "Charity",
    image:
      "https://i.ibb.co/XxHbBQnp/HD-wallpaper-batman-the-batman-dc-comics-the-batman-movie.jpg",
    story:
      "Thanks to this platform, we’ve been able to serve hot meals to over 1,000 families every month. It’s more than food — it’s dignity and hope for those in need.",
  },
  {
    name: "Fresh Bites Restaurant",
    role: "Restaurant",
    image:
      "https://i.ibb.co/XxHbBQnp/HD-wallpaper-batman-the-batman-dc-comics-the-batman-movie.jpg",
    story:
      "Instead of wasting perfectly good food, we now share it daily with charities. Knowing it reaches people in our community is truly rewarding.",
  },
  {
    name: "Green Hearts Volunteers",
    role: "Charity",
    image:
      "https://i.ibb.co/XxHbBQnp/HD-wallpaper-batman-the-batman-dc-comics-the-batman-movie.jpg",
    story:
      "We used to struggle to find food donations. Now, this platform connects us directly with restaurants, making sure no child in our area goes to bed hungry.",
  },
  {
    name: "Golden Spoon Cafe",
    role: "Restaurant",
    image:
      "https://i.ibb.co/XxHbBQnp/HD-wallpaper-batman-the-batman-dc-comics-the-batman-movie.jpg",
    story:
      "Our leftover pastries and meals used to end up in the trash. Today, they’re delivered to shelters within hours — warm, fresh, and appreciated.",
  },
];

const CommunityStories = () => {
  return (
    <div className="py-16 bg-base-100">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-secondary">
          🌟 Community Stories
        </h2>
        <p className="max-w-2xl mx-auto text-base-content mt-3 text-lg">
          Real stories from restaurants and charities making a difference 🍽️.
          These partnerships are turning surplus food into hope, one plate at a
          time ❤️.
        </p>
      </motion.div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {stories.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="card bg-base-200 shadow-xl overflow-hidden hover:shadow-2xl transition"
          >
            <figure className="px-4 pt-4">
              <img
                src={s.image}
                alt={s.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-xl font-semibold">{s.name}</h3>
              <p className="text-sm text-base-content opacity-80 mb-3">
                {s.role}
              </p>
              <p className="text-base-content italic">"{s.story}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStories;
