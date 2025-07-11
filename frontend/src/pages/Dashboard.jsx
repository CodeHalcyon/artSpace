import Navbar from "../components/Navbar";
import { getLoggedInUser } from "../utils/jwt";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { refreshToken } from "../api/refreshToken";
import api from "../api/axios";
export default function Dashboard() {
  const user = getLoggedInUser();
  const navigate = useNavigate();
  console.log(user);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await api.get("/events/my-registrations/");
        console.log("Registered events response:", response.data);

        setEvents(response.data);
      } catch (err) {
        console.error("Failed to fetch registered events", err);
      }
    };
    fetchRegisteredEvents();
  }, []);

  useEffect(() => {
    async function fetchFavorites() {
      const res = await api.get("artworks/favorites/");
      setFavorites(res.data);
    }
    fetchFavorites();
  }, []);
  useEffect(() => {
    if (!user) navigate("/login");
    else {
      async function fetchProfile() {
        let token = localStorage.getItem("access");

        let res = await fetch("http://localhost:8000/api/users/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          // Access token expired → try refreshing it
          token = await refreshToken();

          if (!token) return (window.location.href = "/login");

          res = await fetch("http://localhost:8000/api/users/profile/", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        const data = await res.json();
        setUsername(data.username);
        setRole(data.role);
      }

      fetchProfile();
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl p-6 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Welcome, {username}!</h1>
        <p className="mb-8 text-lg text-gray-600">Role: {role}</p>
        {/* Role-based content */}
        {user.role === "artist" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">Upload New Artwork</h2>
              <p className="text-gray-600">
                Manage your portfolio and listings.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">Create an Event</h2>
              <p className="text-gray-600">Host exhibitions or workshops.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">Your Purchased Artworks</h2>
              <p className="text-gray-600">View your collection anytime.</p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">Registered Events</h2>
              {events.length > 0 ? (
                <ul className="mt-2 space-y-2 text-gray-700">
                  {events.map((event) => (
                    <li
                      key={event.id}
                      className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                    >
                      <strong>{event.title}</strong> —{" "}
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-500">
                  You haven't registered for any events yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Your Favorite Artworks</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {favorites.map((fav) => (
            <div key={fav.id} className="p-4 border rounded shadow">
              <img
                src={fav.artwork_image_url}
                className="object-cover w-full h-40 rounded"
              />
              <h3 className="mt-2 font-semibold">{fav.artwork_title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
