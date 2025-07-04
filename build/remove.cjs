const fs = require("fs");
const path = require("path");

module.exports = function (context) {
  const localesPath = path.join(context.appOutDir, "locales");
  if (!fs.existsSync(localesPath)) {
    return;
  }
  const keep = ["en.pak", "zh-CN.pak"];
  const files = fs.readdirSync(localesPath);
  files.forEach((file) => {
    if (!keep.includes(file)) {
      fs.unlinkSync(path.join(localesPath, file));
    }
  });
};
