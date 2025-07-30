import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import * as anime from "animejs";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const inputRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );

    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 40 },
          size: { value: 2 },
          move: { speed: 1 },
          line_linked: {
            enable: true,
            distance: 100,
            opacity: 0.4,
          },
        },
        interactivity: {
          events: {
            onhover: { enable: false, mode: "repulse" },
          },
        },
      });
    }
  }, []);

  const handleAnalyze = async () => {
    const trimmedUrl = repoUrl.trim();
    if (!trimmedUrl) {
      alert("Please enter a valid GitHub URL");
      anime.default({
        targets: inputRef.current,
        translateX: [
          { value: -10, duration: 100 },
          { value: 10, duration: 100 },
          { value: -6, duration: 100 },
          { value: 6, duration: 100 },
          { value: 0, duration: 100 },
        ],
        easing: "easeInOutQuad",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: trimmedUrl }),
      });

      if (!response.ok) throw new Error("Server error");

      const result = await response.json();

      localStorage.setItem("analyze_result", JSON.stringify(result));
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to analyze the repo. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div id="particles-js" className="absolute inset-0 z-0" />
      <div
        ref={sectionRef}
        className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-2xl p-10 text-center shadow-2xl border border-white/10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
          Understand Any GitHub Repo in Seconds
        </h1>
        <label htmlFor="repo-input" className="sr-only">
          GitHub Repository URL
        </label>
        <input
          id="repo-input"
          ref={inputRef}
          type="url"
          placeholder="Paste GitHub URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          className="w-full md:w-4/5 p-4 rounded-xl text-black text-base focus:outline-none shadow-inner border border-gray-300"
        />
        <button
          onClick={handleAnalyze}
          className={`mt-6 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>
        <p className="mt-6 text-sm text-gray-200">
          Get a project summary, AI score, suggestions, README, and a roadmap – instantly.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
