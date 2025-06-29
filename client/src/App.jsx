// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between max-w-4xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-600">
          🏏 CricScore
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Home
          </Link>
          <Link to="/admin" className="text-blue-500 hover:text-blue-700">
            Admin
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
