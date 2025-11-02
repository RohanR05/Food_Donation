import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Lottie from "lottie-react";
import animi from "../../../assets/Teamwork Hands Animated.json";
import { NavLink } from "react-router";

const slides = [
  {
    title: "Donate Surplus Food",
    subtitle:
      "Help reduce food waste and feed those in need. Every small act of kindness can fill a plate and a heart.",
  },
  {
    title: "Support Local Charities",
    subtitle:
      "Your generous contribution helps families in need. Together, we can make our community stronger and healthier.",
  },
  {
    title: "Join the Movement",
    subtitle:
      "Be a part of something bigger — unite with us to fight hunger, reduce waste, and spread compassion across Bangladesh.",
  },
];

const Banner = () => {
  return (
    <div className="m-3 md:my-6 overflow-hidden">
      <div className="relative flex flex-col md:flex-row items-center justify-between px-6 py-8 md:py-16">
        {/* Left Side: Static Animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="p-[3px] rounded-full bg-gradient-to-tr from-primary to-secondary shadow-xl shadow-primary/20">
            <div className="bg-neutral rounded-full flex justify-center items-center">
              <Lottie
                animationData={animi}
                loop={true}
                className="max-w-md w-full rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Sliding Text */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="rounded-2xl"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="text-center md:text-left">
                  <h3 className="text-sm uppercase tracking-wide text-secondary font-semibold mb-3">
                    Together, We Can End Hunger
                  </h3>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg text-info/90 mb-6 max-w-xl mx-auto md:mx-0">
                    {slide.subtitle}
                  </p>
                  <NavLink
                    to="/dashboard"
                    className="btn bg-secondary border-none text-black font-semibold hover:bg-secondary/80 transition-all duration-300 px-8 py-2 rounded-full shadow-md hover:shadow-lg"
                  >
                    Explore Our Website
                  </NavLink>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Decorative Circle Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Banner;
