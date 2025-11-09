import React from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdFeaturedPlayList } from "react-icons/md";

const Feture = () => {
  return (
    <div className="container mx-auto my-16 py-16 px-4 sm:px-6 lg:px-20 bg-purple-950">
      {/* Heading */}
      <div className="text-center py-10">
        <h2 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-2 text-white">
          Explore Our Features <MdFeaturedPlayList />
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-200 mt-2">
          Discover powerful tools designed to make your financial journey easier.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="card cursor-pointer transform transition duration-300 hover:scale-105 bg-base-100 shadow-sm rounded-lg overflow-hidden">
          <figure>
            <img
              className="h-40 w-full object-cover"
              src="https://images.pexels.com/photos/5466785/pexels-photo-5466785.jpeg"
              alt="Smart Expense Tracking"
            />
          </figure>
          <div className="card-body pt-4 px-4 border-1 border-gray-500 flex flex-col items-center text-center bg-purple-950 text-white">
            <h3 className="card-title text-xl font-semibold mb-2">
              Smart Expense Tracking
            </h3>
            <p className="text-sm text-gray-200 mb-4">
              Having an account in your pocket will help you move in a modern way and be financially secure.
            </p>
            <button className="flex items-center gap-1 px-4 py-2 rounded-sm border border-gray-600 group transition-all duration-300 hover:bg-white hover:text-black">
              <span>Explore more</span>
              <IoIosArrowDroprightCircle className="transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card cursor-pointer transform transition duration-300 hover:scale-105 bg-base-100 shadow-sm rounded-lg overflow-hidden">
          <figure>
            <img
              className="h-40 w-full object-cover"
              src="https://images.pexels.com/photos/7876502/pexels-photo-7876502.jpeg"
              alt="Real-time Overview"
            />
          </figure>
          <div className="card-body pt-4 px-4 border-1 border-gray-500 flex flex-col items-center text-center bg-purple-950 text-white">
            <h3 className="card-title text-xl font-semibold mb-2">
              Real-time Overview
            </h3>
            <p className="text-sm text-gray-200 mb-4">
              Instantly get a clear visual of your total balance, income, and expenses.
            </p>
            <button className="flex items-center gap-1 px-4 py-2 rounded-sm border border-gray-600 group transition-all duration-300 hover:bg-white hover:text-black">
              <span>Explore more</span>
              <IoIosArrowDroprightCircle className="transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card cursor-pointer transform transition duration-300 hover:scale-105 bg-base-100 shadow-sm rounded-lg overflow-hidden">
          <figure>
            <img
              className="h-40 w-full object-cover"
              src="https://images.pexels.com/photos/8358138/pexels-photo-8358138.jpeg"
              alt="Budget Goals"
            />
          </figure>
          <div className="card-body border-1 border-gray-500 pt-4 px-4 flex flex-col items-center text-center bg-purple-950 text-white">
            <h3 className="card-title text-xl font-semibold mb-2">
              Budget Goals
            </h3>
            <p className="text-sm text-gray-200 mb-4">
              It will help you get what you need within your budget and maintain a good quality of life.
            </p>
            <button className="flex items-center gap-1 px-4 py-2 rounded-sm border border-gray-600 group transition-all duration-300 hover:bg-white hover:text-black">
              <span>Explore more</span>
              <IoIosArrowDroprightCircle className="transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feture;
