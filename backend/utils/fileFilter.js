const unwantedExtensions = [".png", ".jpg", ".jpeg", ".exe", ".zip", ".pdf", ".ico"];

const isValidFile = (filename) => {
  const ext = filename.slice(filename.lastIndexOf("."));
  return !unwantedExtensions.includes(ext);
};

module.exports = { isValidFile };
