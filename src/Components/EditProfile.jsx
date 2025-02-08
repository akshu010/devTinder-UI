/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Function to handle adding a skill
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newSkill.trim() !== "") {
      e.preventDefault();
      if (skills.length >= 3) {
        setError("You can only add up to 3 skills.");
        setTimeout(() => setError(""), 3000);
        return;
      }

      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  // Function to remove a skill
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Function to save the profile
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, gender, photoUrl, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError("Failed to update profile.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center p-4 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto border border-gray-700 space-x-8">
      {/* Left Side - Profile Form */}
      <div className="w-1/2 p-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Profile</h2>

        {/* Profile Image */}
        <div className="avatar mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
            <img
              src={photoUrl}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Inputs */}
        <input
          type="text"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
          placeholder="Photo URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="number"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <textarea
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
          placeholder="About You"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        {/* Skills Input */}
        <div className="relative w-full mb-2">
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
            placeholder="Type skill and press Enter (Max: 3)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute top-0 right-0 p-2 text-xs text-gray-400">
            {skills.length}/3 skills
          </div>
        </div>

        {/* Skills Inline with Cross Button */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-md"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 text-xs text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Save Profile Button */}
        <button
          onClick={saveProfile}
          className="cursor-pointer w-full p-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded mt-3"
        >
          Save Profile
        </button>
      </div>

      {/* Right Side - Profile Preview */}
      <div className="w-1/2 p-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white mb-3 text-center">
          Preview
        </h2>
        <UserCard
          user={{ firstName, lastName, gender, age, photoUrl, about, skills }}
        />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-5 right-5 bg-green-500 text-white px-4 py-2 rounded">
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
