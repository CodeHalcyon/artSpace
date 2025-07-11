import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import getCurrentUser from "../utils/getCurrentUser";
import Navbar from "../components/Navbar";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const user = getCurrentUser(); // ✅ now user is defined
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("events/");
      setEvents(res.data.results || res.data); // handles pagination
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Could not load events.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl p-6 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Upcoming Events</h1>

        {role === "admin" || role === "artist" ? (
          <Link
            to="/events/create"
            className="inline-block px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            + Create Event
          </Link>
        ) : null}

        {error && <p className="text-red-500">{error}</p>}

        {events.length === 0 && !error && (
          <div className="mt-8 text-center text-gray-500">
            <p>No events found.</p>
          </div>
        )}

        <div className="space-y-4">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="flex items-center gap-4 p-4 border rounded hover:bg-gray-50"
            >
              {/* Show poster thumbnail if exists */}
              {event.poster_url && (
                <img
                  src={event.poster_url}
                  alt={event.title}
                  className="object-cover w-20 h-20 rounded"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-500">
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-gray-700">{event.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventPage;
