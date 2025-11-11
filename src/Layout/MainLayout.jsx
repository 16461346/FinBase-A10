import React from "react";
import Navbar from "../Components/Headers/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default MainLayout;
