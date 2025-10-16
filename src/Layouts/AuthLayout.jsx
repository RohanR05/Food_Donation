import React from "react";
import { Outlet } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player"; // or "lottie-react"
import loginAnimation from "../assets/Login2.json";

const AuthLayout = () => {
  return (
    <div className=" p-6 md:p-12 min-h-screen flex items-center justify-center bg-neutral">
      <div className="flex flex-col md:flex-row-reverse items-center max-w-screen-xl mx-auto gap-8 bg-accent p-3 md:p-8 lg:p-12 rounded-2xl shadow-xl shadow-primary/50">
        {/* Animation */}
        <div className="flex-1 w-full md:w-1/2">
          <Player
            autoplay
            loop
            src={loginAnimation}
            className="w-full h-full"
          />
        </div>

        {/* Form */}
        <div className="flex-1 w-full md:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
