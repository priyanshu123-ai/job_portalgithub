import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Cloud Architect",
  "UI/UX Designer",
  "Graphic Designer",
  "Mobile App Developer",
  "QA Engineer",
  "Cybersecurity Expert",
  "Product Manager",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();

  
  const plugin = useRef(
    Autoplay({
      delay: 1000,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
    })
  );

  return (
    <div className="relative bg-gradient-to-b from-[#0b0e16] to-[#101928] pb-20 pt-10 z-10">
      {/* Curved Transition Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-10 sm:h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#0b0e16"
            d="M0,0 C720,150 720,-50 1440,100 L1440,0 L0,0 Z"
          ></path>
        </svg>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-center text-3xl font-bold mb-10 text-white">
          Explore Top <span className="text-sky-400">Job Categories</span>
        </h2>

        <Carousel
          className="w-full"
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-4">
            {categories.map((cat, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                   onClick={() => {
        dispatch(setSearchQuery(cat));
        navigate("/browse");
      }}
                  className="rounded-2xl h-40 bg-gradient-to-br from-slate-800 to-slate-900 text-white
                  border border-white/10 shadow-[0_15px_25px_rgba(0,0,0,0.2)]
                  flex items-center justify-center text-center p-4 hover:shadow-sky-500/30 backdrop-blur-xl cursor-pointer"
                >
                  <span className="font-semibold text-sm text-white/90">
                    {cat}
                  </span>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
