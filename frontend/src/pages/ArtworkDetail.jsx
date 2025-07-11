import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    async function fetchArt() {
      try {
        const res = await api.get(`artworks/${id}/`);
        setArt(res.data);
        // Fetch suggested artworks (all, then filter)
        const all = await api.get(`artworks/`);
        const filtered = all.data.results.filter(a => a.id !== parseInt(id)).slice(0, 3);
        setSuggested(filtered);
      } catch (err) {
        console.error("Error fetching artwork", err);
      }
    }
    fetchArt();
  }, [id]);

  if (!art) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl p-6 mx-auto">
        {/* Art Details */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          <img src={art.image_url} alt={art.title} className="w-full rounded shadow" />
          <div>
            <h1 className="mb-2 text-3xl font-bold">{art.title}</h1>
            <p className="mb-4 text-gray-600">{art.description}</p>
            <p className="text-lg font-medium">Price: ₹{art.price}</p>
            <p className="mt-2 text-sm text-gray-500">By Artist ID: {art.artist}</p>
            {/* Add Buy or Favorite button here */}
          </div>
        </div>

        {/* Suggested Artworks */}
        <h2 className="mb-4 text-2xl font-semibold">You might also like</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {suggested.map(s => (
            <div key={s.id} onClick={() => navigate(`/artworks/${s.id}`)} className="p-4 border rounded cursor-pointer hover:shadow">
              <img src={s.image_url} alt={s.title} className="object-cover w-full h-40 mb-2 rounded" />
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="text-sm text-gray-600">₹{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
