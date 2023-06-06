const core = require("@actions/core");
const fs = require("fs");
const path = require("path");

const VERSIONS_FILE = ".tool-versions";

const main = async () => {
  let p = core.getInput("path");

  if (p) {
    const stats = fs.statSync(p);
    if (stats.isDirectory()) {
      p = path.join(p, VERSIONS_FILE);
    }
  } else {
    p = VERSIONS_FILE;
  }
  const versions = fs.readFileSync(p, "utf-8");

  for (const line of versions.split("\n")) {
    const [name, version] = line.split(" ");
    if (name && version) {
      console.info(`${name}: ${version}`);
      core.setOutput(name, version);
    }

    // get pattern input with the tool name
    const pattern = core.getInput(name);
    if (pattern) {
      const match = version.match(pattern);
      // named capturing groups should be present
      if (match && match.groups) {
        for (const [k, v] of Object.entries(match.groups)) {
          const nameWithGroup = `${name}-${k}`;
          console.info(`${nameWithGroup}: ${v}`);
          core.setOutput(nameWithGroup, v);
        }
      }
    }
  }
};

module.exports = main;
