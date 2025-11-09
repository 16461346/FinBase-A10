import { Link, NavLink, useNavigate } from "react-router";
import { use } from "react";
import { AuthContext } from "../Context/AuthContext";


const Register = () => {
    const {creatUser}=use(AuthContext)
    const navigate= useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email,password)
    creatUser(email,password)
    .then(result=>{
        console.log(result)
         navigate(location.state || '/')
    })
    .catch(error=>{
        console.log(error)
    })

  };


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
            <label className="label">Phote URL</label>
            <input
              name="image"
              type="text"
              className="input"
              placeholder="Paste your img url"
              required
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
            />
            <div>
              <Link className="link text-blue-600 font-semibold link-hover">
                Forgot password?
              </Link>
            </div>
            <button className="btn bg-gradient-to-r from-[#ab59cc] to-[#49acca] hover:from-[#49acca] hover:to-[#ab59cc] mt-4 text-white">
              Register
            </button>

            <h1 className="font-semibold">
              id you already have an accout ! please{" "}
              <NavLink
                to={"/login"}
                className={"font-extrabold text-blue-600 hover:underline"}
              >
                Login
              </NavLink>
            </h1>
          </form>
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
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
