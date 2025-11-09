import React from "react";
import Navbar from "../Components/Headers/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default MainLayout;
