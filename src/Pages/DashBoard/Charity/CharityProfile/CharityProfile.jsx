import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Mail, User, Heart, MapPin, Award, Calendar } from "lucide-react";
import Loading2 from "../../../../Shared/Loading/Loading2";

const CharityProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["charity-profile", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) return <Loading2 />;

  const {
    displayName,
    photoURL,
    email,
    role,
    mission = "Committed to making a difference through food donation and community service.",
  } = {
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    email: user?.email,
    role: userInfo?.role || "charity",
    mission: userInfo?.mission,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto md:mt-8 bg-accent rounded-2xl shadow-2xl border border-pritext-primary/10 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-accent/50 p-6 text-center">
        <motion.img
          src={photoURL || "https://via.placeholder.com/120"}
          alt="Charity Logo"
          className="w-28 h-28 mx-auto rounded-full border-4 border-secondary shadow-lg object-cover"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />
        <h2 className="mt-4 text-2xl font-bold text-primary">
          {displayName || "No Name"}
        </h2>
        <div className="flex justify-center items-center gap-2 text-primary text-sm mt-1">
          <Mail className="text-secondary w-4 h-4" />
          <span>{email}</span>
        </div>
        <span className="mt-3 inline-block bg-secondary/10 text-primary text-sm font-medium px-4 py-1 rounded-full">
          Role: {role || "user"}
        </span>
      </div>

      {/* Mission */}
      <motion.div
        className="p-6 border-t border-pritext-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
          <Heart className="text-secondary w-5 h-5" /> Mission Statement
        </h3>
        <p className="text-primary text-sm leading-relaxed">{mission}</p>
      </motion.div>

      {/* Contact Info */}
      <div className="p-6 border-t border-pritext-primary/10 grid md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <MapPin className="text-secondary w-6 h-6" />
          <div>
            <p className="text-primary font-semibold">Location</p>
            <p className="text-primary text-sm">Dhaka, Bangladesh</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <User className="text-secondary w-6 h-6" />
          <div>
            <p className="text-primary font-semibold">Founded</p>
            <p className="text-primary text-sm">Since 2021</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-accent/40 p-6 grid sm:grid-cols-3 gap-4 border-t border-pritext-primary/10 text-center">
        <motion.div whileHover={{ scale: 1.05 }}>
          <p className="text-3xl font-bold text-primary">240+</p>
          <p className="text-primary text-sm">Meals Donated</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <p className="text-3xl font-bold text-primary">75+</p>
          <p className="text-primary text-sm">Communities Helped</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <p className="text-3xl font-bold text-primary">12</p>
          <p className="text-primary text-sm">Awards Won</p>
        </motion.div>
      </div>

      {/* Recent Impact */}
      <div className="p-6 border-t border-pritext-primary/10">
        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
          <Award className="text-secondary w-5 h-5" /> Recent Impact Highlights
        </h3>
        <ul className="list-disc pl-6 text-primary text-sm space-y-1">
          <li>Partnered with 5 local restaurants to reduce food waste.</li>
          <li>Distributed 1200+ meals to low-income families in 2025.</li>
          <li>Conducted awareness campaigns in 8 schools across Dhaka.</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="bg-accent/50 p-4 text-center border-t border-pritext-primary/10">
        <p className="text-sm text-primary">
          <Calendar className="inline-block text-secondary w-4 h-4 mr-1" />
          Member since{" "}
          <span className="text-primary font-medium">April 2023</span>
        </p>
      </div>
    </motion.div>
  );
};

export default CharityProfile;
