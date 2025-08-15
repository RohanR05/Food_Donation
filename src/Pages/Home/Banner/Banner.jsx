import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../../../assets/Brown White Rustic Wedding Banner.png";
import img2 from "../../../assets/Brown White Rustic Wedding Banner (1).png";
import img3 from "../../../assets/Brown White Rustic Wedding Banner (2).png";

const slides = [img1, img2, img3];

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
       
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
