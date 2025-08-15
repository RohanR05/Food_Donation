import React from "react";
import Banner from "../Banner/Banner";
import ImpactStats from "../ImpactStats/ImpactStats";
import CommunityStories from "../CommunityStories/CommunityStories";
import FeaturedDonationsSection from "../FeaturedDonationsSection/FeaturedDonationsSection";
import LatestCharityRequests from "../LatestCharityRequests/LatestCharityRequests";

const Home = () => {
  return (
    <div className="flex flex-col gap-16 pt-14 md:pt-16 lg:pt-16">
      <Banner></Banner>
      <ImpactStats></ImpactStats>
      <CommunityStories></CommunityStories>
      <FeaturedDonationsSection></FeaturedDonationsSection>
      <LatestCharityRequests></LatestCharityRequests>
    </div>
  );
};

export default Home;
