import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "./jwt";

export default function PrivateRoute({ children }) {
  const user = getLoggedInUser();
  return user ? children : <Navigate to="/login" replace />;
}
