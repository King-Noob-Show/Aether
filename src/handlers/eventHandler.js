const { Client, Events } = require("discord.js");
const c = require("ansi-colors");
const fs = require("fs");

// Temporarily Broken.

/**
 * @param {Client} client
 */

module.exports = (client) => {
  try {
    const events = fs
      .readdirSync("./src/events/")
      .filter((file) => file.endsWith(".js"));

    for (const file of events) {
      const event = require(`../events/${file}`);
      // console.log("Event Loaded, ", event);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
    console.log(c.yellow.bold("[HANDLERS] Event Handler loaded"));
  } catch (e) {
    console.log(
      c.red.bold(
        "[ERROR] An Error Occurred During Event Handling!\n",
        e.message,
      ),
    );
  }
};
