const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "../../package.json");
const versionJsPath = path.join(
  __dirname,
  "../projects/app-toolbox/src/assets/version.js"
);

const packageJsonFile = fs.readFileSync(packageJsonPath, "utf8");
const version = JSON.parse(packageJsonFile).version;
const versionJsContent = `(function (window) {
  window["toolboxVersion"] = "${version}"
})(this);`;

console.log(`created version.js file with the toolbox version ${version}`);

fs.writeFileSync(versionJsPath, versionJsContent, "utf8");
