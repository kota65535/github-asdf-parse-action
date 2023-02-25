const core = require("@actions/core");
const fs = require("fs");

const main = async () => {
  const toolVersions = fs.readFileSync(".tool-versions", "utf-8");

  for (const line of toolVersions.split("\n")) {
    const [name, version] = line.split(" ");
    if (name && version) {
      console.info(name, version);
      core.setOutput(name, version);
    }

    const pattern = core.getInput(name);
    if (pattern) {
      const match = version.match(pattern);
      if (match) {
        for (const [k, v] of Object.entries(match.groups)) {
          const nameWithGroup = `${name}-${k}`;
          console.info(nameWithGroup, v);
          core.setOutput(nameWithGroup, v);
        }
      }
    }
  }
};

module.exports = main;
