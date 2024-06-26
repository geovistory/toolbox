const fs = require("fs");
const path = require("path");

// The first two elements of process.argv are "node" and the path to the script file.
// So, we start from index 2 to access the actual arguments.
const arguments = process.argv.slice(2);

const versionJsPath = path.join(
  __dirname,
  "../apps/app-toolbox/src/assets/version.js"
);

let version;

// Check if there are any arguments
if (arguments.length === 0) {
  // read version from file
  const packageJsonPath = path.join(__dirname, "../../package.json");
  const packageJsonFile = fs.readFileSync(packageJsonPath, "utf8");
  version = JSON.parse(packageJsonFile).version;
} else {
  // read version from argument
  version = arguments[0];
}

const versionJsContent = `(function (window) {
  window["toolboxVersion"] = "${version}"
})(this);`;

console.log(`created version.js file with the toolbox version ${version}`);

fs.writeFileSync(versionJsPath, versionJsContent, "utf8");
