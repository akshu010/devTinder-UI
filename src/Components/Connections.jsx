import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  useEffect(() => {
    getConnections();
  }, []);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  if (!connections) return null;
  if (connections.length === 0) return <h1 className="text-white">No Connections found</h1>;

  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections.map((connection, i) => {
          const { firstName, lastName, photoUrl, age, gender, skills, about } = connection;
          return (
            <div
              key={i}
              className="card w-full max-w-xs bg-gray-800 text-white shadow-lg rounded-lg p-6 hover:bg-gray-700"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold text-center text-pink-500 mb-2">
                {firstName} {lastName}
              </h2>
              <p className="text-center text-gray-400 mb-4">
                {age} {gender}
              </p>
              <p className="text-center text-gray-400 mb-4">
                <strong>Skills: </strong>{skills.join(", ")}
              </p>
              <p className="text-center text-gray-300">{about}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
