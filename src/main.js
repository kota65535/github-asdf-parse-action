const core = require("@actions/core");
const fs = require("fs");

const main = async () => {
  const toolVersions = fs.readFileSync(".tool-versions", "utf-8");

  for (const line of toolVersions.split("\n")) {
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
          console.info(`${nameWithGroup}: ${version}`);
          core.setOutput(nameWithGroup, v);
        }
      }
    }
  }
};

module.exports = main;
