// FavoriteButton.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { refreshToken } from "../api/refreshToken";

export default function FavoriteButton({
  artworkId,
  userFavorites,
  refreshFavorites,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favIds = userFavorites.map((f) => f.artwork);
    setIsFavorite(favIds.includes(artworkId));
  }, [artworkId, userFavorites]);

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // prevent card click
    const tryToggle = async () => {
      if (isFavorite) {
        console.log("Posting favorite:", { artwork: artworkId });
        await api.post("artworks/favorites/", { artwork: artworkId });

        const fav = res.data.find((f) => f.artwork === artworkId);
        if (fav) await api.delete(`artworks/favorites/${fav.id}/`);
      } else {
        await api.post("artworks/favorites/", { artwork: artworkId });
      }
      refreshFavorites();
    };

    try {
      await tryToggle();
    } catch (err) {
      if (err.response?.status === 401) {
        const newAccess = await refreshToken();
        if (newAccess) {
          await tryToggle(); // retry after token refresh
        } else {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      } else {
        console.error("Favorite toggle failed:", err);
      }
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute text-xl top-2 right-2"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "💖" : "🤍"}
    </button>
  );
}
