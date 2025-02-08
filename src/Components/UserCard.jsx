/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white mb-4">
          <img src={photoUrl} alt="Profile" className="object-cover w-full h-full" />
        </div>
        <h2 className="text-xl font-bold">{firstName + " " + lastName}</h2>
        {age && <p className="text-gray-400">{age} years old</p>}
        {gender && <p className="text-gray-400">{gender}</p>}
        <p className="mt-2 text-gray-300 text-center">{about}</p>
        <div className="w-full mt-4">
          <h3 className="font-bold text-gray-300 mb-2">Skills</h3>
          <div className="grid grid-cols-2 gap-2">
            {skills && skills.map((skill, index) => (
              <span key={index} className="p-1 bg-gray-700 rounded text-center">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <button className="w-1/2 p-2 bg-red-600 hover:bg-red-700 text-white rounded">Ignore</button>
          <button className="w-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded ml-2">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
