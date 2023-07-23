const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "../.env");
const envExamplePath = path.join(__dirname, "../.env.example");
const envJsPath = path.join(
  __dirname,
  "../projects/app-toolbox/src/assets/env.js"
);
const envJsTemplatePath = path.join(
  __dirname,
  "../projects/app-toolbox/src/assets/env.template.js"
);

const copyEnvExampleIfNeeded = () => {
  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log(".env file created by copying .env.example");
  }
};

const generateEnvJs = () => {
  if (fs.existsSync(envPath)) {
    const envData = fs.readFileSync(envPath, "utf8");
    let envJs = fs.readFileSync(envJsTemplatePath, "utf8");

    console.log("creating env.js file with the environment variables:");
    envData
      .split("\n")
      .filter((line) => {
        const l = line.trim();
        // filter comments
        if (l.startsWith("#")) return false;
        // filter empty lines
        if (l.length === 0) return false;
        return true;
      })
      .forEach((line) => {
        const [key, value] = line.split("=");
        console.log("   " + key, value);
        const keyRegex = new RegExp("\\${" + key.trim() + "}", "g");
        envJs = envJs.replace(keyRegex, value.trim());
      });

    fs.writeFileSync(envJsPath, envJs, "utf8");
  } else {
    console.error(
      ".env file not found. Please create one by copying .env.example first."
    );
  }
};

copyEnvExampleIfNeeded();
generateEnvJs();
