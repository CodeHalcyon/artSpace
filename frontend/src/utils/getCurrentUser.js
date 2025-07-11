// utils/getCurrentUser.js
import { jwtDecode } from "jwt-decode";
export default function getCurrentUser() {
  const token = localStorage.getItem("access");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Invalid token");
    return null;
  }
}
