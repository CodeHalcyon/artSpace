// src/pages/EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const registerForEvent = async () => {
    try {
      let res = await api.post("/events/register/", { event: id });
      alert(res.data.message);
      console.log(res);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("❌ Registration failed. Try again later.");
    }
  };

  const fetchEvent = async () => {
    try {
      const res = await api.get(`events/${id}/`);
      setEvent(res.data);
    } catch (err) {
      console.error("Failed to load event", err);
    }
  };

  if (!event)
    return (
      <div className="p-6 text-center text-gray-500">
        Loading event details...
      </div>
    );

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        📅 {new Date(event.date).toLocaleString()}
      </p>
      <p className="mt-4 text-gray-700">{event.description}</p>
      <p className="mt-3 text-gray-600">
        📍 <span className="font-medium">{event.location}</span>
      </p>
      {event.poster_url && (
        <img
          src={event.poster_url}
          alt="Event Poster"
          className="object-contain w-full mt-4 rounded-lg shadow-md max-h-96"
        />
      )}

      <div className="mt-6">
        <button
          onClick={registerForEvent}
          className="px-5 py-2 font-semibold text-white bg-blue-600 rounded shadow hover:bg-blue-700"
        >
          Register for Event
        </button>
      </div>

      <div className="mt-6 text-right">
        <Link to="/events" className="text-sm text-blue-500 hover:underline">
          ← Back to Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetail;
