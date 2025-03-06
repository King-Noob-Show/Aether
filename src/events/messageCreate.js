const client = require("../index.js");
const { Events, Message } = require("discord.js");
const config = require("../configs/botConfig.json");
const prefixModel = require("../models/prefixModel.js");

// For Message Creation And Related Commands
// Temporarily Broken.

module.exports = {
  name: Events.MessageCreate,
  /**
   * @param {Message} message
   */
  async execute(message) {
    try {
      console.log("MessageCreate event triggered!");
      console.log(`Message content: ${message.content}`);
      if (message.author.bot) return;

      const data = await prefixModel.findOne({
        guildId: message.guildId,
      });

      let prefix = config.prefix;

      if (data) {
        prefix = data.prefix;
      }

      if (message.content.toLowerCase() === "no u") {
        console.log("Message Created With No U");
        return message.reply({
          content: message.content,
          allowedMentions: true,
        });
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
    } catch (e) {
      console.error(e);
    }
  },
};
