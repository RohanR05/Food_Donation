import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faMapMarkerAlt,
  faClipboardList,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../Shared/Loading/Loadign";

const FeaturedDonationsSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data.slice(0, 4);
    },
  });

  if (isLoading) return <Loading />;

  if (error)
    return (
      <p className="text-center py-10 text-error">Failed to load donations.</p>
    );

  return (
    <div className="mx-auto px-4">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center mb-12 text-primary flex items-center justify-center gap-3">
        <FontAwesomeIcon icon={faHeart} className="text-secondary text-4xl drop-shadow-md" />

        Featured <span className="text-secondary">Donations</span>
      </h2>

      {/* Donation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {donations.map((donation, index) => (
          <motion.div
            key={donation._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative bg-accent rounded-2xl shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-secondary/50 overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image with overlay */}
            <div className="relative h-48">
              <img
                src={
                  donation.image || "https://source.unsplash.com/400x300/?food"
                }
                alt={donation.foodType}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-neutral text-xs font-semibold rounded flex items-center gap-1">
                <FontAwesomeIcon icon={faClipboardList} />
                {donation.status}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-4 text-center space-y-2">
              <h3 className="text-lg md:text-xl font-bold flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faUtensils} className="text-secondary" />
                <span className="text-primary">{donation.foodType}</span>
              </h3>

              <p className="text-sm flex items-center justify-center gap-2">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-secondary"
                />
                <span className="text-info font-medium">
                  {donation.location || "Unknown"}
                </span>
              </p>

              <p className="text-info text-sm flex items-center justify-center gap-2">
                🍽 {donation.restaurant}
              </p>

              <Link to={`/donations/${donation._id}`}>
                <button className="w-full py-2 rounded-lg font-medium bg-primary text-neutral hover:bg-secondary hover:text-primary transition">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonationsSection;
