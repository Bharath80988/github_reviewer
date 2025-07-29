const axios = require("axios");
const { parseRepoUrl } = require("../utils/repoParser");
const { githubHeaders } = require("../config/githubConfig");
const { isValidFile } = require("../utils/fileFilter");

// 🔹 Fetch repository metadata (stars, forks, etc.)
const fetchRepoMetadata = async (repoUrl) => {
  const { owner, repo } = parseRepoUrl(repoUrl);
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const response = await axios.get(apiUrl, { headers: githubHeaders });

    const {
      name,
      full_name,
      description,
      stargazers_count,
      forks_count,
      watchers_count,
      language,
      html_url,
    } = response.data;

    return {
      name,
      fullName: full_name,
      description,
      stars: stargazers_count,
      forks: forks_count,
      watchers: watchers_count,
      primaryLanguage: language,
      url: html_url,
      owner,
    };
  } catch (err) {
    console.error("Error fetching repo metadata:", err.message);
    throw new Error("Failed to fetch repository metadata.");
  }
};

// 🔹 Fetch list of valid files from the root of the repo
const fetchRepoFiles = async (repoUrl) => {
  try {
    const { owner, repo } = parseRepoUrl(repoUrl);
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
    const response = await axios.get(apiUrl, { headers: githubHeaders });

    const files = response.data
      .filter((file) => file.type === "file" && isValidFile(file.name))
      .map((file) => ({
        name: file.name,
        path: file.path,
        download_url: file.download_url,
      }));

    return files;
  } catch (err) {
    console.error("Error in fetchRepoFiles:", err.message);
    return []; 
  }
};

// 🔹 Fetch README content and decode it
const fetchReadme = async (repoUrl) => {
  const { owner, repo } = parseRepoUrl(repoUrl);
  const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

  try {
    const response = await axios.get(readmeUrl, { headers: githubHeaders });
    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    return content;
  } catch (err) {
    console.warn("README not found or could not be fetched.");
    return null;
  }
};

// 🔹 Export all functions as named arrow exports
module.exports = {
  fetchRepoMetadata,
  fetchRepoFiles,
  fetchReadme,
};
