import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const [repoUrl, setRepoUrl] = useState("https://github.com/example/repo");
  const [data, setData] = useState({
    codeQualityScore: 82,
    summary: "This repository implements a scalable MERN stack application with authentication and API integration.",
    readme: "## Example Project\n\nThis is a placeholder README for a GitHub repository...",
    roadmap: [
      "Setup backend with Express and MongoDB",
      "Implement user authentication",
      "Integrate third-party API",
      "Deploy to Vercel/Render"
    ],
    suggestions: [
      "Add unit tests for key components",
      "Improve README with usage examples",
      "Refactor components into smaller units",
      "Add CI/CD pipeline"
    ],
    skillGraph: {
      JavaScript: 50,
      HTML: 20,
      CSS: 15,
      Python: 10,
      Shell: 5
    }
  });

  useEffect(() => {
    const storedUrl = localStorage.getItem("analyze_url");
    if (storedUrl) {
      setRepoUrl(storedUrl);

      const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ repoUrl: storedUrl })
          });

          const json = await res.json();
          if (json && json.summary) {
            setData(json);
          } else {
            setData({ error: "No data found for this repository." });
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setData({ error: "Failed to load analysis data." });
        }
      };

      fetchData();
    }
  }, []);

  if (data?.error) {
    return (
      <div className="min-h-screen dashboard-bg flex items-center justify-center text-red-400 text-xl">
        ❌ {data.error}
      </div>
    );
  }

  const skillGraphData = {
    labels: Object.keys(data.skillGraph || {}),
    datasets: [
      {
        label: "Language Distribution",
        data: Object.values(data.skillGraph || {}),
        backgroundColor: [
          "#34D399", "#60A5FA", "#FBBF24", "#F472B6", "#A78BFA",
          "#F87171", "#4ADE80", "#38BDF8", "#FCD34D"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="min-h-screen dashboard-bg py-16 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white/5 backdrop-blur-lg text-white p-8 md:p-12 rounded-2xl shadow-xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
            Analyzed: <span className="text-teal-300">{repoUrl}</span>
          </h2>
          <span className="text-lg px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full font-bold shadow-md">
            AI Score: {data.codeQualityScore || data.aiScore || 0}%
          </span>
        </div>

        <div className="bg-white/10 p-4 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-teal-400 mb-2">Summary</h3>
          <p className="text-gray-200">{data.summary}</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-indigo-400 mb-2">README</h3>
          <pre className="text-gray-300 whitespace-pre-wrap">{data.readme}</pre>
        </div>

        <div className="bg-white/10 p-4 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-pink-400 mb-2">Roadmap</h3>
          <ul className="list-disc list-inside text-gray-200">
            {(data.roadmap || []).map((step, i) => (
              <li key={i}>📌 {step}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/10 p-4 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Suggestions</h3>
          <ul className="list-disc list-inside text-gray-200">
            {(data.suggestions || []).map((s, i) => (
              <li key={i}>✅ {s}</li>
            ))}
          </ul>
        </div>

        {data.skillGraph && (
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Skill Graph</h3>
            <div className="w-full md:w-1/2 mx-auto">
              <Pie data={skillGraphData} />
            </div>
          </div>
        )}

        <div className="text-right">
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white py-2 px-5 rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
          >
            Back to Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
