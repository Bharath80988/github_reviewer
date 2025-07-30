import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdHome } from "react-icons/md";
import { FaHistory, FaRoad } from "react-icons/fa";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded hover:bg-white/10 transition ${
      pathname === path ? "bg-white/10 font-semibold" : ""
    }`;

  return (
    <nav className="bg-black/30 backdrop-blur-md text-white px-6 py-3 flex justify-between items-center border-b border-white/10 shadow">
      <div className="text-xl font-bold text-teal-300">
        SkillSnap<span className="text-white">AI</span>
      </div>
      <div className="flex gap-4 items-center text-sm md:text-base">
        <Link to="/" className={linkStyle("/")}>
          <MdHome className="inline mr-1" /> Home
        </Link>
        <Link to="/dashboard" className={linkStyle("/dashboard")}>
          <MdDashboard className="inline mr-1" /> Dashboard
        </Link>
        <Link to="/history" className={linkStyle("/history")}>
          <FaHistory className="inline mr-1" /> History
        </Link>
        <Link to="/roadmap" className={linkStyle("/roadmap")}>
          <FaRoad className="inline mr-1" /> Roadmap
        </Link>
      </div>
    </nav>
  );
}
