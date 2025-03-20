const { Client } = require("discord.js");
const { glob } = require("glob");
const c = require("ansi-colors");
const path = require("path");

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  try {
    const mcommandFiles = await glob(
      `${process.cwd()}/src/commands/mcommands/**/*.js`,
    );

    mcommandFiles.map((value) => {
      const file = require(path.resolve(value));
      const splitted = value.split(path.sep); // Use OS-safe separator
      const directory = splitted[splitted.length - 2];

      if (file.name) {
        const properties = { directory, ...file };
        client.mcommands.set(file.name, properties);
      }
    });
    console.log(c.yellow.bold("[HANDLERS] Message Handler Loaded."));
  } catch (e) {
    console.log(
      c.red.bold("[ERROR] An Error Occurred During Message Handling!\n"),
    );
    console.log(e);
  }
};
