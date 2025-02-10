import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [emailId, setEmail] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("Akshay@001");
  const [firstName, setFirstName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValidation = () => {
    const message = checkValidData(emailId, password);
    setErrorMessage(message);
    return message === null;
  };
  const handleformChange = () => {
    setIsLoginForm(!isLoginForm);
  };
  const handleLoginIn = async () => {
    if (!handleValidation()) return;

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErrorMessage("Invalid email or password");
      console.log(err);
    }
  };
  const handleSignUp = async () => {
    const res = await axios.post(
      BASE_URL + "/signup",
      { firstName, lastName, emailId, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data));
    navigate("/profile");
  };

  return (
    <div className="h-[91vh] flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-96 shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLoginForm ? "Welcome Back" : "Welcome New User"}
        </h2>

        <div className="form-control w-full max-w-xs space-y-4">
          {!isLoginForm && (
            <>
              <div>
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  value={firstName}
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="FirstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  value={lastName}
                  className="input input-bordered w-full"
                  type="email"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
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

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {isLoginForm && (
            <div className="text-sm mt-2">
              <a href="#" className="link link-hover">
                Forgot password?
              </a>
            </div>
          )}

          <button
            onClick={isLoginForm ? handleLoginIn : handleSignUp}
            className="btn btn-primary w-full mt-4"
          >
            {isLoginForm ? "Login" : "Sign up"}
          </button>

          <p
            onClick={handleformChange}
            className="text-center mt-4 cursor-pointer"
          >
            {isLoginForm
              ? "Do not have an account? Sign Up here"
              : "Already User? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
