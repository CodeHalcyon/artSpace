// src/pages/EventForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import S3Uploader from "../components/S3Uploader";

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // for edit mode
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    poster_url: "",
  });

  useEffect(() => {
    if (isEditMode) {
      fetchEventDetails();
    }
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const res = await api.get(`events/${id}/`);
      setFormData(res.data);
    } catch (err) {
      console.error("Error loading event", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`events/${id}/`, formData);
      } else {
        await api.post("events/", formData);
      }
      navigate("/events");
    } catch (error) {
      console.log("Event save error:", error);
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">
        {isEditMode ? "Edit" : "Create"} Event
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />

        {/* 🔽 Poster Upload UI */}
        <div>
          <label className="block mb-1 font-semibold">Event Poster</label>
          <S3Uploader
            onUpload={(url) =>
              setFormData((prev) => ({ ...prev, poster_url: url }))
            }
          />
          {formData.poster_url && (
            <img
              src={formData.poster_url}
              alt="Event Poster"
              className="object-contain w-full mt-2 border rounded max-h-60"
            />
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded"
        >
          {isEditMode ? "Update" : "Create"} Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
