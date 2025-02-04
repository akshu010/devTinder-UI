import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmail] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("Akshay@001");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hadleLoginIn = async () => {
    const res = await axios.post(
      BASE_URL + "/login",
      {
        emailId,
        password,
      },
      { withCredentials: true }
    );
    dispatch(addUser(res.data));
    return navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-96 shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <div className="form-control w-full max-w-xs space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              value={emailId}
              className="input input-bordered w-full"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              value={password}
              className="input input-bordered w-full"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-sm mt-2">
            <a href="#" className="link link-hover">
              Forgot password?
            </a>
          </div>

          <button
            onClick={hadleLoginIn}
            className="btn btn-primary w-full mt-4"
          >
            Sign In
          </button>

          <p className="text-center mt-4">
            Do not have an account?{" "}
            <a href="#" className="link link-primary">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
