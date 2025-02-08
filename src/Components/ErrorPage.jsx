import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for might have been removed or does not exist.
      </p>
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/media/48e392cd4d72b31892c3e072c8d1dc3d.gif"
        alt="Error"
        className="w-80 mb-6 rounded-lg"
      />
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
