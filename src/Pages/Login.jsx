import React, { use, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loginUser, loginWithGoogle, passwordReset } = use(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [resetE, setResetE] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  // যদি ইউজার আগে থেকেই লগইন করা থাকে
  // useEffect(() => {
  //   if (user) {
  //     navigate(location.state || "/");
  //   }
  // }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        navigate(location.state || "/");
        toast.success("Login successfully!");
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid email or password!");
      });
  };

  const googleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        console.log(result);
        navigate(location.state || "/");
      })
      .catch((err) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handlePReset = () => {
    if (!email) {
      setResetE("!");
      return;
    }
    setResetE("");
    passwordReset(email)
      .then(() => {
        navigate(location.state || "/");
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            {/* Email Field */}
            <label className="label font-semibold">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              name="email"
              className="input input-bordered"
              placeholder="Enter your email"
            />
            {resetE && (
              <p className="text-red-600 font-bold">Type your email please !</p>
            )}

            {/* Password Field */}
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

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
            )}

            <div className="mt-3">
              <Link
                onClick={handlePReset}
                className="link text-blue-600 font-semibold link-hover"
              >
                Forgot password?
              </Link>
            </div>

            <button className="btn bg-gradient-to-r from-[#ab59cc] to-[#49acca] hover:from-[#49acca] hover:to-[#ab59cc] mt-4 text-white">
              Login
            </button>

            <h1 className="font-semibold mt-2 text-center">
              Don’t have an account?{" "}
              <NavLink
                to={"/register"}
                state={location.state}
                className={"font-extrabold text-blue-600 hover:underline"}
              >
                Register
              </NavLink>
            </h1>
          </form>

          {/* Google Login */}
          <button
            onClick={googleLogin}
            className="btn bg-white text-black border-[#e5e5e5] mt-4"
          >
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

export default Login;
