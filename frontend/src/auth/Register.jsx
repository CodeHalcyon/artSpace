import { useState } from "react";
import { User, Mail, Lock, UserCheck, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
    bio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("users/register/", form);
      alert("Registered successfully. You can now log in.");
      navigate("/");
    } catch (err) {
      console.log(err);
      
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <button className="inline-flex items-center mb-6 text-gray-600 transition-colors hover:text-gray-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <Link to="/">Back to Home</Link>
          </button>
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Join ArtiSpace and start your creative journey</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full py-3 pl-10 pr-4 transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full py-3 pl-10 pr-4 transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full py-3 pl-10 pr-4 transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              I'm joining as a
            </label>
            <div className="relative">
              <UserCheck className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full py-3 pl-10 pr-4 transition-all bg-white border border-gray-300 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="customer">Art Collector</option>
                <option value="artist">Artist</option>
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bio <span className="text-sm text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <FileText className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself..."
                rows="4"
                className="w-full py-3 pl-10 pr-4 transition-all border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-3 font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button className="font-medium text-purple-600 hover:text-purple-700">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}