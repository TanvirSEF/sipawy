import { Link } from "react-router-dom";

const  NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-6xl font-bold text-[#DBA514] mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-black text-white rounded hover:bg-[#DBA514] hover:text-black transition"
      >
        Go Home
      </Link>
    </div>
  );
}
export default NotFound
