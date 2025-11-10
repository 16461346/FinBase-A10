import React, { use } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../assets/pexels-tima-sfd-6694570-removebg-preview.png";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { user, logOutUser } = use(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Log Out Successfull");
      })
      .catch((error) => {
        toast.error("Somthing went wrong");
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/add-transaction">Add Transaction</NavLink>
      </li>
      <li>
        <NavLink to="/my-transaction">My Transactions</NavLink>
      </li>
      <li>
        <NavLink to="/reports">Reports</NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 container mx-auto shadow-md navbar bg-base-100 px-4">
      {/* Left: Logo + Hamburger */}
      <div className="navbar-start">
        {/* Mobile Hamburger */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center">
          <img
            src={Logo}
            alt="FinEase Logo"
            className="h-8 w-8 rounded-2xl object-contain"
          />
          <h2 className="text-sm logo-text font-semibold">FinEase</h2>
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?semt=ais_hybrid&w=740&q=80"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">
                  <CgProfile />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <IoSettingsOutline />
                  Settings
                </Link>
              </li>
              <li>
                <Link onClick={handleLogOut}>
                  {" "}
                  <MdLogout />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn">
            Log In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
