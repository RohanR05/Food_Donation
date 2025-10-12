import React from "react";
import { motion } from "framer-motion";
import Banner from "../Banner/Banner";
import ImpactStats from "../ImpactStats/ImpactStats";
import CommunityStories from "../CommunityStories/CommunityStories";
import FeaturedDonationsSection from "../FeaturedDonationsSection/FeaturedDonationsSection";
import LatestCharityRequests from "../LatestCharityRequests/LatestCharityRequests";
import IceGold from "../../IceGold/IceGold";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-16 mb-8 md:mb-12 lg:mb-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Banner />
      </motion.div>
      <IceGold></IceGold>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        variants={fadeUp}
      >
        <ImpactStats />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        variants={fadeUp}
      >
        <CommunityStories />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={fadeUp}
      >
        <FeaturedDonationsSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
        variants={fadeUp}
      >
        <LatestCharityRequests />
      </motion.div>
    </div>
  );
};

export default Home;
