require('dotenv').config();
const COHERE_API_KEY = process.env.COHERE_API_KEY;

if (!COHERE_API_KEY) {
  console.error("COHERE_API_KEY is missing in your .env file");
}

const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

/**
 * Call Cohere API with a given prompt
 * @param {string} prompt - The input prompt
 * @returns {Promise<string>} - The generated response
 */
const callCohere = async (prompt) => {
  try {
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'command', // you can also use 'command-nightly' for newer model
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Cohere API Error (${response.status}): ${errorText}`);
      return "Error while calling Cohere.";
    }

    const data = await response.json();
    const output = data.generations?.[0]?.text?.trim();

    if (!output) {
      console.error("No usable output from Cohere:", JSON.stringify(data, null, 2));
      return "Error while calling Cohere.";
    }

    return output;

  } catch (err) {
    console.error("Exception during Cohere API call:", err.message);
    return "Error while calling Cohere.";
  }
};

module.exports = { callCohere };


/**
 * 🔸 Build sample from project files (used in all prompts)
 * @param {Array} files - List of file objects with `name` and `content`
 * @param {number} count - Number of files to include
 * @returns {string} - Concatenated file preview
 */
function buildFileSample(files, count = 5) {
  return files
    .slice(0, count)
    .map((f) => `File: ${f.name}\n${f.content}`)
    .join('\n\n');
}

// 1. 🧠 Generate a summary for the GitHub project
async function getSummary(metadata, files, readmeContent) {
  const sample = buildFileSample(files);
  const prompt = `You're an AI expert. Based on the following GitHub project files, generate a simple beginner-friendly summary of what this project does:\n\n${sample}`;
  return await callCohere(prompt);
}

// 2. 📊 Generate a code quality score (0–100)
async function getCodeQualityScore(metadata, files) {
  const sample = buildFileSample(files, 3);
  const prompt = `Rate the overall code quality of this GitHub project on a scale of 0 to 100. Base your score on readability, structure, naming, and maintainability. Return only a number:\n\n${sample}`;
  const raw = await callCohere(prompt);
  const score = parseInt(raw.match(/\d+/)?.[0] || '0');
  return Math.min(Math.max(score, 0), 100);
}

// 3. 🛠️ Suggest improvements for code structure and performance
async function getImprovementSuggestions(metadata, files, readmeContent) {
  const sample = buildFileSample(files);
  const prompt = `Analyze the following code files and suggest practical ways to improve the code structure, modularity, or performance. Keep it beginner-friendly:\n\n${sample}`;
  return await callCohere(prompt);
}

// 4. 📄 Generate a clean README.md
async function generateReadme(metadata, files) {
  const sample = buildFileSample(files);
  const prompt = `Based on these project files, generate a clean and informative README.md. Include sections like Introduction, Features, Installation, Usage, and License if applicable:\n\n${sample}`;
  return await callCohere(prompt);
}

// 5. 🛣️ Suggest a project roadmap
async function getRoadmap(metadata, files, readmeContent) {
  const sample = buildFileSample(files);
  const prompt = `Based on the following GitHub repo code, suggest a development roadmap of 4–6 next features or improvements to add. Mention them as bullet points:\n\n${sample}`;
  return await callCohere(prompt);
}

// 🔁 Export all utilities
module.exports = {
  getSummary,
  getCodeQualityScore,
  getImprovementSuggestions,
  generateReadme,
  getRoadmap
};
