import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import Roadmap from "./pages/Roadmap";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Analyze />} />
        <Route path="/history" element={<History />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </div>
  );
}
