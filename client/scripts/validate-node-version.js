let semver = require("semver");
let engines = require("../package.json").engines;

/**
 * Validate the node version
 */
const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  console.log(
    `Required node version ${version} not satisfied with current version ${process.version}.\n`
  );
  process.exit(1);
}
