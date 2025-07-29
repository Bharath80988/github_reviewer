const path = require('path');

// Mapping file extensions to programming languages
const extensionMap = {
  '.js': 'JavaScript',
  '.ts': 'TypeScript',
  '.py': 'Python',
  '.java': 'Java',
  '.cpp': 'C++',
  '.c': 'C',
  '.cs': 'C#',
  '.rb': 'Ruby',
  '.php': 'PHP',
  '.go': 'Go',
  '.rs': 'Rust',
  '.swift': 'Swift',
  '.kt': 'Kotlin',
  '.html': 'HTML',
  '.css': 'CSS',
  '.json': 'JSON',
  '.yaml': 'YAML',
  '.md': 'Markdown',
  '.xml': 'XML',
  '.sh': 'Shell',
};

const getLanguageFromExtension = (filename) => {
  const ext = path.extname(filename);
  return extensionMap[ext] || 'Other';
};

const generateSkillGraph = (files) => {
  const languageCounts = {};

  files.forEach((file) => {
    const lang = getLanguageFromExtension(file.name);
    if (languageCounts[lang]) {
      languageCounts[lang] += 1;
    } else {
      languageCounts[lang] = 1;
    }
  });

  const total = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);

  const percentages = {};
  for (const lang in languageCounts) {
    percentages[lang] = parseFloat(((languageCounts[lang] / total) * 100).toFixed(2));
  }

  return percentages;
};

module.exports = { generateSkillGraph };
