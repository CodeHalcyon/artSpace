import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// ✅ Helper: Check if token is expired
function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

// ✅ Add request interceptor
api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  // Skip auth header for public endpoints
  const publicEndpoints = ["users/login", "users/register", "artworks"];
  const isPublic = publicEndpoints.some((url) => config.url.includes(url));

  if (isPublic) return config;

  // If token is expired, refresh it
  if (accessToken && isTokenExpired(accessToken) && refreshToken) {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/token/refresh/",
        {
          refresh: refreshToken,
        }
      );

      const newAccess = res.data.access;
      localStorage.setItem("access", newAccess);
      config.headers.Authorization = `Bearer ${newAccess}`;
    } catch (err) {
      console.error("Token refresh failed:", err);
      localStorage.clear();
      window.location.href = "/login"; // redirect to login
      return config;
    }
  } else if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
