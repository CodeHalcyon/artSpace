import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getLoggedInUser } from "../utils/jwt";
import { toast } from "react-toastify";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white shadow">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-purple-700">
        <Link to="/gallery">ArtiSpace</Link>
      </div>

      {/* Center: Navigation Menu */}
      <div className="hidden space-x-6 md:flex">
        <Link to="/gallery" className="font-medium text-gray-700 hover:text-purple-600">Gallery</Link>
        <Link to="/events" className="font-medium text-gray-700 hover:text-purple-600">Events</Link>
        <Link to="/quizzes" className="font-medium text-gray-700 hover:text-purple-600">Quizzes</Link>
      </div>

      {/* Right: Profile */}
      <div className="relative">
        <button
          onClick={() => setDropdown(!dropdown)}
          className="flex items-center px-4 py-2 space-x-2 text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          <span>{user?.username || "Profile"}</span>
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </button>

        {dropdown && (
          <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow">
            <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
            <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
