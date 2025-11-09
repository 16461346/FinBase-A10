import React from "react";
import Hero from "../Components/Headers/Hero";
import Feture from "../Components/Fetures/Feture";
import AboutFinEase from "../Components/AboutFinEase/AbouteFinEase";
import Tips from "../Components/Tip/Tips";
import Review from "../Components/Review/Review";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <Feture />
      <AboutFinEase />
      <Tips />
      <Review />
      <NewsLetter/>
    </div>
  );
};

export default Home;
