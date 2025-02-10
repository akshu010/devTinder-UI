import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      await axios.patch(
        BASE_URL + "/profile/forgotPassword",
        { emailId, password },
        { withCredentials: true }
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="h-[91vh] flex items-center justify-center bg-base-200 relative">
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Password updated successfully!
        </div>
      )}
      <div className="card bg-base-100 w-96 shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
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
        <button
          onClick={handleForgotPassword}
          className="btn btn-primary w-full mt-4"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
