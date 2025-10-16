import React from "react";
import Lottie from "lottie-react";
import loading from "../../assets/LoadinSuccess.json";

const Loading2 = ({ size = 100 }) => {
  return (
    <div className="flex items-center justify-center">
      <Lottie 
        animationData={loading} 
        loop={true} 
        autoplay 
        className={`w-[${size}px] h-[${size}px]`} 
      />
    </div>
  );
};

export default Loading2;
