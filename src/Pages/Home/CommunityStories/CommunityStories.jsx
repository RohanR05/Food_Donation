import React from "react";

const stories = [
  {
    name: "Hope Foundation",
    role: "Charity",
    image: "https://i.ibb.co/6JtR4Xg/charity.jpg",
    story: "Thanks to this platform, we’ve been able to serve hot meals to over 1,000 families every month. It's changed everything for us.",
  },
  {
    name: "Fresh Bites Restaurant",
    role: "Restaurant",
    image: "https://i.ibb.co/9hbdYVW/restaurant.jpg",
    story: "Instead of wasting good food, we now donate leftovers daily. It’s fulfilling to know it helps feed the community.",
  },
];

const CommunityStories = () => {
  return (
    <div className="py-12 bg-base-100 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-10">Community Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {stories.map((s, i) => (
          <div key={i} className="card bg-base-200 shadow-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <img src={s.image} alt={s.name} className="w-16 h-16 rounded-full object-cover" />
              <div className="text-left">
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <p className="text-sm text-base-content">{s.role}</p>
              </div>
            </div>
            <p className="text-base-content">{`"${s.story}"`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStories;
