const { MCommand } = require("../../../structs/mcommand");
const { Client, Message } = require("discord.js");

module.exports = new MCommand({
  name: "ping",
  description: "Shows The API And Latency Ping For The Bot.",
  aliases: ["p"],
  category: "Info",
  usage: ">>ping",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @returns {Promise<void>}
   */
  run: async (client, message, args) => {
    try {
      const msg = `Latency Is ${Date.now() - message.createdTimestamp}ms And API Latency Is ${Math.round(client.ws.ping)}ms`;

      await message.channel.send(msg);
    } catch (e) {
      console.log(e);
    }
  },
});
