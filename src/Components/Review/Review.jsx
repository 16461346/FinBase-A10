import React from "react";
import Marquee from "react-fast-marquee";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    title: "Software Engineer",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    review:
      "This platform has really helped me manage my expenses better. Highly recommended for anyone starting out!",
    rating: 4,
  },
  {
    id: 2,
    name: "Sarah Williams",
    title: "Business Owner",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    review:
      "FinEase changed the way I handle my business finances. Everything is organized and transparent!",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Smith",
    title: "Freelancer",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    review:
      "Budget tracking is super easy now. I love the clean design and smooth user experience.",
    rating: 4,
  },
  {
    id: 4,
    name: "Emily Johnson",
    title: "Student",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    review:
      "I’ve started saving more each month! The insights are amazing and easy to understand.",
    rating: 5,
  },
  {
    id: 5,
    name: "Robert Brown",
    title: "Financial Advisor",
    image: "https://images.pexels.com/photos/1181421/pexels-photo-1181421.jpeg",
    review:
      "I recommend this app to all my clients. It’s reliable, accurate, and beautifully built!",
    rating: 5,
  },
];

const Review = () => {
  return (
    <div className="mb-10 container mx-auto bg-[#3ed7c9]">
      <h2 className="text-3xl flex justify-center items-center gap-2 font-bold text-center py-4 text-white">User Reviews <MdRateReview /></h2>

      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {reviews.map((item) => (
          <div
            key={item.id}
            className="max-w-xs bg-white shadow-lg rounded-2xl p-5 mx-4 my-4 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <img
                className="w-20 h-20 mx-auto rounded-full object-cover"
                src={item.image}
                alt={item.name}
              />
              <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{item.title}</p>

              {/* Rating */}
              <div className="flex justify-center mb-3 text-yellow-400">
                {[...Array(5)].map((_, i) =>
                  i < item.rating ? (
                    <FaStar key={i} />
                  ) : (
                    <FaRegStar key={i} />
                  )
                )}
              </div>

              <p className="text-gray-700 text-sm">{item.review}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Review;
