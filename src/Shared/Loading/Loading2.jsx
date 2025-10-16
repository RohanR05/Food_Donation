import React from "react";
import Lottie from "lottie-react";
import loading from "../../assets/loadingcircle.json";

const Loading2 = ({ size = 100 }) => {
  return (
    <div className="flex items-center justify-center bg-info rounded-full shadow-2xl shadow-primary/50">
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
