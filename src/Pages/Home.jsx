import React, { use } from "react";
import Hero from "../Components/Headers/Hero";
import Feture from "../Components/Fetures/Feture";
import AboutFinEase from "../Components/AboutFinEase/AbouteFinEase";
import Tips from "../Components/Tip/Tips";
import Review from "../Components/Review/Review";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import OverView from "./OverView";
import { AuthContext } from "../Context/AuthContext";
import { useLoaderData } from "react-router";

const Home = () => {
  const { user } = use(AuthContext);
  const data = useLoaderData();

  const userEmail = user?.email;
  const myData = data.filter((i) => i.email === userEmail);

  return (
    <div>
      <Hero />
      {user ? <OverView myData={myData} /> : ""}
      <Feture />
      <AboutFinEase />
      <Tips />
      <Review />
      <NewsLetter />
    </div>
  );
};

export default Home;
