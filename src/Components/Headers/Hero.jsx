import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import hero1 from "../../assets/pexels-mikhail-nilov-7735780.jpg";
import hero2 from "../../assets/pexels-olly-3768145.jpg";
import hero3 from "../../assets/pexels-rdne-8369592.jpg";
import hero4 from "../../assets/pexels-tima-miroshnichenko-6694543.jpg";
import { Link, NavLink } from "react-router";

const slides = [
  {
    img: hero1,
    text: "Manage Your Finances Effortlessly",
  },
  {
    img: hero4,
    text: "Track Income & Expenses Easily",
  },
  {
    img: hero3,
    text: "Set Budget Goals and Achieve Them",
  },
  {
    img: hero2,
    text: "Analyze Your Spending Habits",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative container mx-auto w-full h-96 md:h-[500px] overflow-hidden rounded-xl">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <img
                  src={slide.img}
                  alt={`slide-${index}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-black/50 p-6 rounded-lg text-center">
                    <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                      {slide.text}
                    </h1>
                    <Link to={'/'} className="inline-block bg-[#3ed7c9] hover:bg-purple-400 hover:text-white text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105">
                      Get Started
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
