const {
  fetchRepoMetadata,
  fetchRepoFiles,
  fetchReadme,
} = require("../services/githubService");

const {
  generateSkillGraph,
} = require("../services/languageService");


const {
  getSummary,
  getImprovementSuggestions,
  generateReadme,
  getRoadmap,
  getCodeQualityScore,
} = require("../services/aiService");


const analyzeRepo = async (req, res, next) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ error: "GitHub repo URL is required." });
    }

    // Step 1: GitHub Repo Info
    const metadata = await fetchRepoMetadata(repoUrl);
    const files = await fetchRepoFiles(repoUrl);
    const readmeContent = await fetchReadme(repoUrl);

    // Step 2: Language Detection
    const languageBreakdown = generateSkillGraph(files);

    // Step 3: AI Responses
    const summary = await getSummary(metadata, files, readmeContent);
    const suggestions = await getImprovementSuggestions(metadata, files, readmeContent);
    const roadmap = await getRoadmap(metadata, files, readmeContent);
    const codeQualityScore = await getCodeQualityScore(metadata, files);
    const readme = readmeContent || (await generateReadme(metadata, files));

    // Step 4: Respond
    res.json({
      repoUrl,
      metadata,
      summary,
      suggestions,
      roadmap,
      codeQualityScore,
      skillGraph: languageBreakdown,
      readme,
    });
  } catch (error) {
    console.error("Analyze error:", error.message);
    next(error);
  }
};

module.exports = { analyzeRepo };
