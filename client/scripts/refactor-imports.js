const { readdirSync } = require("fs");
const { spawn } = require("child_process");
const path = require("path");

const ROOT_DIRECTORY = "./projects/app-toolbox";

async function refactor(path) {
  console.log(`Refactor files in: ${path}`);

  return new Promise((res, rej) => {
    // DOCUMENTATION: https://github.com/luchsamapparat/refactor-imports
    const child = spawn("refactor-imports", [
      "-p",
      path,
      "-s",
      ".+/quill+",
      "-t",
      "@kleiolab/lib-sdk-lb4",
      "-f",
      "-e",
      "QuillDoc",
    ]);

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stdout);
    child.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      res();
    });
  });
}
const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(source, dirent.name));

async function refactorAll() {
  const directories = getDirectories(ROOT_DIRECTORY);
  for (const path of directories) {
    await refactor(path);
  }
}
refactorAll().catch((e) => console.log(e));
