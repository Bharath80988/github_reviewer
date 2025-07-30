import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Get from localStorage or sessionStorage
    const stored = JSON.parse(localStorage.getItem("analysis_history") || "[]");
    setHistory(stored.reverse()); // most recent first
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-lg text-white p-8 rounded-2xl shadow-xl border border-white/10 space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow text-center">
          🕘 Previous Analyses
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-300 text-center">No history yet. Analyze a repo to get started.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((entry, index) => (
              <li
                key={index}
                className="bg-white/10 p-4 rounded-xl border border-white/10 shadow-sm hover:bg-white/20 transition-all"
              >
                <p className="text-teal-300 font-semibold">
                  🔗 {entry.repoUrl}
                </p>
                <p className="text-sm text-gray-300">
                  AI Score: {entry.aiScore}% | Time: {new Date(entry.time).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mt-1">{entry.summary.slice(0, 100)}...</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
