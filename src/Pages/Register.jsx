import React, { use, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const { creatUser, loginWithGoogle,updateUser } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location=useLocation();
  console.log(location)

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.image.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long, include 1 uppercase letter and 1 number."
      );
      return;
    }

    creatUser(email, password)
      .then((result)=>{
        return updateUser(name,image)
      })
      .then(() => {
        toast.success("Account created successfully!");
        navigate(location.state || '/')
      })
      .catch((err) => {
        console.log(err);
        // Firebase email already in use error
        if (err.code === "auth/email-already-in-use") {
          setError("Email already in use!");
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  };

  const googleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        // console.log(result);
        navigate(location.state || '/')
      })
      .catch((err) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegister} className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Type your name"
              required
            />
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />
            <label className="label">Photo URL</label>
            <input
              name="image"
              type="text"
              className="input"
              placeholder="Paste your img URL"
              required
            />

            <label className="label">Password</label>
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Type your password"
                required
              />
              <span
                className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </span>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
            )}

            <button className="btn bg-gradient-to-r from-[#ab59cc] to-[#49acca] hover:from-[#49acca] hover:to-[#ab59cc] mt-4 text-white">
              Register
            </button>

            <h1 className="font-semibold mt-2 text-center">
              Already have an account?{" "}
              <NavLink
                to={"/login"}
                className={"font-extrabold text-blue-600 hover:underline"}
              >
                Login
              </NavLink>
            </h1>
          </form>

          <button onClick={googleLogin} className="btn bg-white text-black border-[#e5e5e5] mt-4">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path fill="#fff" d="m0 0H512V512H0"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
