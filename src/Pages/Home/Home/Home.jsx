import React from "react";
import Banner from "../Banner/Banner";
import ImpactStats from "../ImpactStats/ImpactStats";
import CommunityStories from "../CommunityStories/CommunityStories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ImpactStats></ImpactStats>
      <CommunityStories></CommunityStories>
    </div>
  );
};

export default Home;
