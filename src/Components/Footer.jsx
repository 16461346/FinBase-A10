import React from "react";
import Logo from "../assets/pexels-tima-sfd-6694570-removebg-preview.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaMediumM,
  FaTelegramPlane,
  FaTabletAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router";
import { IoDesktopSharp } from "react-icons/io5";
import { FaMobileScreen, FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0f131b] text-gray-300 py-10 px-4 sm:px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center sm:text-left">
        {/* Brand */}
        <Link to="/" className="flex flex-col items-center sm:items-start">
          <img
            src={Logo}
            alt="FinEase Logo"
            className="h-16 w-16 rounded-2xl object-contain mx-auto sm:mx-0"
          />
          <h2 className="text-2xl logo-text font-extrabold mt-2">FinEase</h2>
        </Link>

        {/* Customers */}
        <div>
          <h3 className="text-white text-xl font-medium mb-3">Available On</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="flex items-center justify-center sm:justify-start gap-1 hover:text-white">
                <IoDesktopSharp />
                Desktop
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center sm:justify-start gap-1 hover:text-white">
                <FaTabletAlt />
                Tablet
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center sm:justify-start gap-1 hover:text-white">
                <FaMobileScreen />
                Mobile
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-xl font-medium mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white break-all">
                Email : support@FinEase.com
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Phone : 01736360451
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center sm:justify-start gap-2 hover:text-white">
                WhatsApp : 017XXXXXXXXXXX
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white text-xl font-medium mb-3">Follow us</h3>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <a
              href="https://facebook.com"
              className="bg-[#616161] hover:bg-[#1877F2] p-2 rounded-full text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com"
              className="bg-[#616161] hover:bg-[#1DA1F2] p-2 rounded-full text-white"
            >
              <FaSquareXTwitter />
            </a>
            <a
              href="https://linkedin.com"
              className="bg-[#616161] hover:bg-[#0A66C2] p-2 rounded-full text-white"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              className="bg-[#616161] hover:bg-[#FF0000] p-2 rounded-full text-white"
            >
              <FaYoutube />
            </a>
            <a
              href="https://t.me"
              className="bg-[#616161] hover:bg-[#0088CC] p-2 rounded-full text-white"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="text-center text-gray-400 mt-10 text-sm border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} FinEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
