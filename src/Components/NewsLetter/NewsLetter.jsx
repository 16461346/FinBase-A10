import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div
      className="bg-gradient-to-r  mb-10 from-[#bb0aafa9] to-[#3ed7cabe] bg-opacity-50 
             p-8 rounded-xl text-center text-gray-900 shadow-lg mt-10 mx-4 
             sm:mx-6 md:mx-auto max-w-3xl transform transition-all duration-300 
             hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">
        Join the{" "}
        <span className="bg-gradient-to-r pr-2 from-[#1c7069] to-[#880a80] bg-clip-text text-transparent font-bold ">
          FinEase
        </span>
        Newsletter
      </h2>
      <p className="mb-6 text-sm sm:text-base">
        Get the latest game updates, news, and offers directly in your inbox.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row justify-center gap-3 items-center"
      >
        {/* Input Field with Icon */}
        <label className="relative flex-1 w-full sm:w-auto">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7L12 13 2 7" />
          </svg>
          <input
            type="email"
            placeholder="mail@site.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 pl-10 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </label>

        <button
          type="submit"
          className="w-full sm:w-auto bg-white text-black font-bold px-6 py-3  rounded-lg duration-300 hover:text-white hover:bg-purple-400 transition"
        >
          Subscribe
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 font-bold text-sm sm:text-base">
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsLetter;
