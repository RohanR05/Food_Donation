import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import img1 from "../../../assets/1.webp";
import img2 from "../../../assets/2.webp";
import img3 from "../../../assets/3.webp";
import { NavLink } from "react-router";

const slides = [
  {
    img: img1,
    title: "Donate Surplus Food",
    subtitle: "Help reduce food waste and feed those in need.",
  },
  {
    img: img2,
    title: "Support Local Charities",
    subtitle: "Your contribution brings smiles to families every day.",
  },
  {
    img: img3,
    title: "Join the Movement",
    subtitle: "Be part of a community fighting hunger together.",
  },
];

const Banner = () => {
  return (
    <div className="m-3 md:my-12 rounded-2xl shadow-xl shadow-primary/50 overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[55vh] md:h-[70vh] lg:h-[80vh] rounded-2xl">
              <img
                src={slide.img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Gradient overlay using theme colors */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-accent/30 to-secondary/60 rounded-2xl"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-3xl md:text-5xl font-extrabold text-primary drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg text-black mt-4 max-w-2xl drop-shadow-md">
                  {slide.subtitle}
                </p>
                <NavLink
                  to="/dashBoard"
                  className="btn mt-6 bg-primary border-none text-white font-semibold hover:bg-secondary transition-all duration-300 px-8 py-2 rounded-full shadow-md hover:shadow-lg"
                >
                  Explore Our Website
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
