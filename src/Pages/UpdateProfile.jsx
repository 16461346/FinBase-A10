import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router";


//firebase update
const UpdateProfile = () => {
  const { user,setUser } = useContext(AuthContext);
  const auth = getAuth();
  const navigate=useNavigate();
 

  const [profile, setProfile] = useState({
    name: user.displayName || "",
    email: user.email || "",
    image: user.photoURL || "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  //mongodb update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://fin-ease-a10-server.vercel.app/update-user?email=${user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json",authorization: `Bearer ${user.accessToken}` },
          body: JSON.stringify(profile),
        }
      );
      const data = await res.json();

      if (!data.success) {
        toast.error("Backend update failed: " + (data.message || ""));
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error("Backend update failed");
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: profile.name,
        photoURL: profile.image,
      });

      if (profile.email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, profile.email);
      }
      setUser({
        ...auth.currentUser,
        displayName:profile.name,
        email: profile.email,
        photoURL: profile.image,
      })

      toast.success("Profile updated successfully!");
      navigate('/profile')
    } catch (error) {
      console.error(error);
      toast.error("Firebase update failed: " + error.message);
    }
  };

  return (
    <div className="hero bg-base-200 lg:min-h-screen md:min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-2">
            Update Profile
          </h2>

          <form onSubmit={handleUpdate}>
            <label className="label">Type new name</label>
            <input
              value={profile.name}
              name="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="Type your name"
              required
              onChange={handleChange}
            />

            <label className="label">Your new email</label>
            <input
              value={profile.email}
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
              onChange={handleChange}
            />

            <label className="label">Photo URL</label>
            <input
              value={profile.image}
              name="image"
              type="text"
              className="input input-bordered w-full"
              placeholder="Paste your image URL"
              required
              onChange={handleChange}
            />

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#ab59cc] to-[#49acca] hover:from-[#49acca] hover:to-[#ab59cc] mt-4 text-white"
            >
              Save Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
