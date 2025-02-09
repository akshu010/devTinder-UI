import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/receaved", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  const handleClick = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (!requests) return null;
  if (requests.length === 0)
    return (
      <h1 className=" pt-10 flex items-center justify-center text-3xl text-red-400">
        {" "}
        Ohh! No Connection Requests found😔
      </h1>
    );
  return (
    <div className="container mx-auto p-4 bg-gray-900 h-content">
      <h1 className="text-3xl font-bold text-center text-white mb-8 p-6">
        Connection Requests
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            skills,
            about,
          } = request.fromUserId;
          return (
            <div
              key={_id}
              className="card w-full max-w-xs bg-gray-800 text-white shadow-sm rounded-lg p-6 hover:shadow-md transition-all duration-300 border border-gray-700"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-600"
              />
              <h2 className="text-xl font-semibold text-center text-white mb-2">
                {firstName} {lastName}
              </h2>
              <p className="text-center text-gray-300 mb-4">
                {age} | {gender}
              </p>
              <p className="text-center text-gray-300 mb-4">
                <strong>Skills: </strong>
                {skills.join(", ")}
              </p>
              <p className="text-center text-gray-300 mb-6">{about}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleClick("accepted", request._id)}
                  className=" cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleClick("rejected", request._id)}
                  className=" cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
