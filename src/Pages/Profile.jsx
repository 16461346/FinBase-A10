import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center w-1/3 items-center py-10 px-4">
      <div className="relative w-full max-w-md bg-base-100 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md border border-gray-200">
        {/* Cover Background */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-purple-400 to-[#3ed7ca94] rounded-t-2xl"></div>

        {/* Profile Image */}
        <div className="relative flex justify-center">
          <div className="w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden mt-20 bg-base-200 flex items-center justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl text-gray-500 font-bold">?</span>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-6 mb-4 px-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.displayName || "Guest User"}
          </h2>
          <p className="text-gray-500 text-sm">
            {user?.email || "Email not found"}
          </p>
        </div>

        {/* Update Profile Button */}
        <div className="px-6 pb-6">
          <button className="btn w-full bg-[#3ed7c9] text-black hover:bg-purple-400 hover:text-white border-none hover:brightness-110 hover:-translate-y-1 transition-all duration-300">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
