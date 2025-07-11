import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const UnAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center">
        <div className="text-red-500 text-6xl mb-4">
          <FaLock />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorized;
