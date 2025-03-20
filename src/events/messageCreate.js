const { Events, Message } = require("discord.js");
const client = require("../index.js");
const config = require("../configs/botConfig.json");
const prefixModel = require("../models/prefixModel.js");
const c = require("ansi-colors");

module.exports = {
  name: Events.MessageCreate,
  /**
   * @param {Message} message
   */
  async execute(message) {
    try {
      if (message.author.bot) return;

      const data = await prefixModel.findOne({ guildId: message.guildId });
      const prefix = data?.prefix || config.prefix;

      if (message.content.toLowerCase() === "no u") {
        return message.reply(message.content);
      }

      if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()))
        return;

      const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
      const mcommand =
        client.mcommands.get(cmd.toLowerCase()) ||
        client.mcommands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

      if (!mcommand) return;

      await mcommand.run(client, message, args);
    } catch (err) {
      console.log(c.red.bold("[ERROR] Message Create Event Error:-"));
      console.error(err);
    }
  },
};
