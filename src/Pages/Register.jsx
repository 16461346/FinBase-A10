import React, { use, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const { creatUser, loginWithGoogle, updateUser } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Register Handler
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.image.value;
    const password = e.target.password.value;

    // 🔹 Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must include 1 uppercase letter and 1 number."
      );
      return;
    }

    // 🔹 Firebase user creation
    creatUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        return updateUser(name, image).then(() => createdUser);
      })
      .then((user) => {
        const newUser = {
          name: name,
          email: user.email,
          image: user.photoURL || image,
        };

        return fetch(`http://localhost:3000/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Registered successfully!");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          setError("Email already in use!");
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  };

  // 🔹 Google Login Handler
  const googleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        const newUser = {
          name: user.displayName || "Google User",
          email: user.email,
          image: user.photoURL,
        };

        fetch(`http://localhost:3000/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Login successfully!");
            navigate(location.state?.from || "/");
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error.message);
        setError("Google login failed.");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-2">Register</h2>
          <form onSubmit={handleRegister}>
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="Type your name"
              required
            />

            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />

            <label className="label">Photo URL</label>
            <input
              name="image"
              type="text"
              className="input input-bordered w-full"
              placeholder="Paste your image URL"
              required
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full"
                placeholder="Type your password"
                required
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </span>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#ab59cc] to-[#49acca] hover:from-[#49acca] hover:to-[#ab59cc] mt-4 text-white"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="font-bold text-blue-600 hover:underline"
              >
                Login
              </NavLink>
            </p>
          </div>

          <button
            onClick={googleLogin}
            className="btn w-full bg-white border border-gray-200 text-black mt-4 flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
