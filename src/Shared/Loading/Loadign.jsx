import React from "react";
import Lottie from "lottie-react";
import loading from "../../assets/Loadingcube.json";

const Loading = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/40 backdrop-blur-sm flex-col">
      <Lottie animationData={loading} loop={true} className="w-full h-full" />
      <p className="mt-4 text-primary text-lg font-medium">{message}</p>

  </div>
);

export default Loading;
