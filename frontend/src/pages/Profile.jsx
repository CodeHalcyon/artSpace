import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { refreshToken } from "../api/refreshToken";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => { 
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
      setProfile(data);
    }

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-xl p-6 mx-auto mt-10 bg-white rounded shadow">
        <h1 className="mb-4 text-2xl font-bold">My Profile</h1>
        <p>
          <strong>Username:</strong> {profile.username}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Role:</strong> {profile.role}
        </p>
        <p>
          <strong>Bio:</strong> {profile.bio || "No bio yet."}
        </p>
      </div>
    </>
  );
}
