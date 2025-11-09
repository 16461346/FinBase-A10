import React from "react";
import { FaChartLine, FaWallet, FaUsers } from "react-icons/fa";

const AboutFinEase = () => {
  return (
    <section
      className="relative container mx-auto bg-cover bg-center text-white py-20"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/5644343/pexels-photo-5644343.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Left Image */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-start">
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
            alt="FinEase Team"
            className="w-full md:w-auto max-w-xs md:max-w-full shadow-2xl border-yellow-400/40 rounded-2xl"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/5 space-y-6">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-100 leading-snug">
            ABOUT{" "}
            <span className="text-[#bc0aae]">
              Fin<span className="text-[#3ed7c9]">Ease</span>
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            FinEase is your next-generation financial management platform. We make budgeting simple,
            analytics powerful, and money management smarter than ever before. Whether you’re tracking
            expenses or growing a business — FinEase keeps you in control.
          </p>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            Our mission is to empower individuals and businesses to achieve financial clarity,
            set effective budgets, and make smarter decisions. With real-time insights, intuitive tools,
            and a supportive community, managing money has never been easier.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
            <div className="flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
              <FaWallet className="text-[#3ed7c9] text-4xl mb-2" />
              <h3 className="font-semibold">Smart Budgeting</h3>
            </div>

            <div className="flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
              <FaChartLine className="text-[#3ed7c9] text-4xl mb-2" />
              <h3 className="font-semibold">Real-time Analytics</h3>
            </div>

            <div className="flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
              <FaUsers className="text-[#3ed7c9] text-4xl mb-2" />
              <h3 className="font-semibold">Community Driven</h3>
            </div>
          </div>

          {/* Button */}
          <div className="pt-6 text-center">
            <a
              href="#"
              className="inline-block btn bg-[#3ed7c9] hover:bg-[#e953df] text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFinEase;