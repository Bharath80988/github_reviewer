export default function Roadmap() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-lg text-white p-8 rounded-2xl shadow-xl border border-white/10 space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow text-center">
          🛣️ Skill Roadmap
        </h2>

        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Basics of HTML, CSS, JavaScript</li>
          <li>React and Component Lifecycle</li>
          <li>Backend APIs and REST</li>
          <li>Project Structuring & Deployment</li>
        </ul>
      </div>
    </div>
  );
}
