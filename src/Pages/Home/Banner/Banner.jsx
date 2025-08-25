import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../../../assets/1.jpg";
import img2 from "../../../assets/2.jpg";
import img3 from "../../../assets/3.jpg";
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
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[90vh]">
              {/* Background Image */}
              <img
                src={slide.img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-xl animate-fadeInUp">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl animate-fadeInUp delay-200">
                  {slide.subtitle}
                </p>
           <NavLink to={'/dashBoard'} className={`btn btn-[#00458b] mt-3`}>Explore Your DashBoard</NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
