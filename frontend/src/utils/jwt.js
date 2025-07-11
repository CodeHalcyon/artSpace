import { jwtDecode } from "jwt-decode";
export const getLoggedInUser = () => {
  const token = localStorage.getItem("access");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};
