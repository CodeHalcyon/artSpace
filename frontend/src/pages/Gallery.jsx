import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import FavoriteButton from "../components/FavoriteButton"; // <- moved to its own file

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Load artworks
  useEffect(() => {
    async function fetchArtworks() {
      try {
        const res = await api.get(`artworks/?page=${page}`);
        setArtworks(res.data.results);
      } catch (err) {
        console.error("Error fetching artworks", err);
      }
    }
    fetchArtworks();
  }, [page]);

  // Load user favorites ONCE (if logged in)
  const fetchFavorites = async () => {
    try {
      const res = await api.get("artworks/favorites/");
      setFavorites(res.data);
    } catch (err) {
      setFavorites([]); // not logged in
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center">Art Gallery</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {artworks.map((art) => (
            <div
              key={art.id}
              onClick={() => navigate(`/artworks/${art.id}`)}
              className="relative transition border rounded shadow cursor-pointer hover:shadow-lg"
            >
              <img
                src={art.image_url}
                alt={art.title}
                className="object-cover w-full h-48 rounded-t"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{art.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {art.description}
                </p>
                <p className="mt-2 font-bold text-purple-700">₹{art.price}</p>
              </div>

              <FavoriteButton
                artworkId={art.id}
                userFavorites={favorites}
                refreshFavorites={fetchFavorites}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
