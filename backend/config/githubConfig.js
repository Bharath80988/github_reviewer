require("dotenv").config();

const githubHeaders = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

module.exports = { githubHeaders };
