const { MCommand } = require("../../../structs/mcommand");
const { Client, Message } = require("discord.js");

module.exports = new MCommand({
  name: "membercount",
  description: "Get The Server's MemberCount",
  aliases: ["mc"],
  category: "Info",
  usage: ">>membercount",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      if (!message.guild)
        return await message.reply(
          "This Command Can Only Be Used In A Server.",
        );

      let count = message.guild.memberCount;

      if (!count) return await message.reply("Member Count Not Found!");

      await message.channel.send(
        `The server **${message.guild.name}** has **${count}** members!`,
      );
    } catch (error) {
      console.error(error);
    }
  },
});
