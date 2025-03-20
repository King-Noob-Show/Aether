const { Client, Events, REST, Routes } = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
const c = require("ansi-colors");
dotenv.config();

/**
 * @param {Client} client
 */

module.exports = (client) => {
  try {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    let command = 0;
    const arrayOfCommands = [];

    fs.readdirSync("./src/commands/scommands").forEach((cmd) => {
      let commands = fs
        .readdirSync(`./src/commands/scommands/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../commands/scommands/${cmd}/${cmds}`);
        // console.log("Raw pull object:", pull); // Inspect pull before toJSON()
        // console.log(pull.toJSON());
        if (pull.name) {
          client.scommands.set(pull.name, pull);
          arrayOfCommands.push(pull.toJSON());
          command++;
        } else {
          console.log(c.red.bold(`${cmds} command is not ready. Skipping...`));
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases))
          pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }

      client.on(Events.ClientReady, async () => {
        await rest
          .put(Routes.applicationCommands(client.user.id), {
            body: arrayOfCommands,
          })
          .then(() => {
            console.log(
              c.yellow.bold("[COMMANDS] Initialized Interaction Commands."),
            );
          });
      });
    });
    console.log(c.yellow.bold("[HANDLERS] Interaction Handler Loaded."));
  } catch (e) {
    console.log(
      c.red.bold("[ERROR] An Error Occurred During Interaction Handling!\n"),
    );
    console.error(e);
  }
};
