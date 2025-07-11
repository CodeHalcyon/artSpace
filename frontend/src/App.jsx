import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Gallery from "./pages/Gallery";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Quizes from "./pages/Quizes";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import ArtworkDetail from "./pages/ArtworkDetail";
import EventForm from "./pages/EventForm";
import EventDetail from "./pages/EventDetail";
import EventPage from "./pages/EventPage";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/artworks/:id" element={<ArtworkDetail />} />
        <Route path="/quizzes" element={<Quizes />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/create" element={<EventForm />} />
        <Route path="/events/edit/:id" element={<EventForm />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
