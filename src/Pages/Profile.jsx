import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router";


const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
   <div className="flex w-80 md:w-100 lg:120 md:min-h-screen justify-center items-center py-8 px-3 sm:px-6 md:px-10 bg-gray-50">
  <div className="relative w-full max-w-[400px] sm:max-w-md md:max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-[1.01]">

    {/* Cover Background */}
    <div className="absolute top-0 left-0 w-full h-32 sm:h-36 bg-gradient-to-r from-purple-400 to-[#3ed7ca94] rounded-t-2xl"></div>

    {/* Profile Image */}
    <div className="relative flex justify-center">
      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden mt-20 sm:mt-24 bg-base-200 flex items-center justify-center">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl sm:text-5xl text-gray-500 font-bold">?</span>
        )}
      </div>
    </div>

    {/* Profile Info */}
    <div className="text-center mt-6 mb-4 px-4 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        {user?.displayName || "Guest User"}
      </h2>
      <p className="text-gray-500 text-sm sm:text-base break-words">
        {user?.email || "Email not found"}
      </p>
    </div>

    {/* Update Profile Button */}
    <div className="px-4 sm:px-6 pb-6 pt-4">
      <NavLink to={"/update-profile"} className="btn w-full bg-[#3ed7c9] text-black hover:bg-purple-400 hover:text-white border-none hover:brightness-110 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
        Update Profile
      </NavLink>
    </div>
  </div>
</div>

  );
};

export default Profile;
