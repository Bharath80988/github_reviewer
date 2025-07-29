const parseRepoUrl = (url) => {
  try {
    const parts = url.replace("https://github.com/", "").split("/");
    return { owner: parts[0], repo: parts[1] };
  } catch (err) {
    throw new Error("Invalid GitHub URL format.");
  }
};

module.exports = { parseRepoUrl };
