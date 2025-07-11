import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaLeaf, FaHandsHelping, FaUtensils } from "react-icons/fa";

const slides = [
  {
    id: 1,
    icon: <FaUtensils className="text-5xl text-primary mb-4" />,
    title: "Turn Surplus into Service",
    description: "Restaurants can now donate extra food to feed the community instead of wasting it.",
    bg: "bg-base-200",
  },
  {
    id: 2,
    icon: <FaHandsHelping className="text-5xl text-secondary mb-4" />,
    title: "Charities Empowered",
    description: "Verified charities can request and pick up donations to help those in need.",
    bg: "bg-base-100",
  },
  {
    id: 3,
    icon: <FaLeaf className="text-5xl text-accent mb-4" />,
    title: "Reduce Waste, Save the Planet",
    description: "Every donation helps cut down food waste and lowers our environmental impact.",
    bg: "bg-base-200",
  },
];

const Banner = () => {
  return (
    <div className="w-full ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`h-full flex flex-col justify-center items-center text-center bg-secondary p-6 ${slide.bg}`}
            >
              {slide.icon}
              <h2 className="text-3xl md:text-5xl font-bold text-primary-content mb-3">
                {slide.title}
              </h2>
              <p className="text-primary-content md:text-lg  max-w-xl">
                {slide.description}
              </p>
              <button className="btn text-secondary mt-6">Browse Donations</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
