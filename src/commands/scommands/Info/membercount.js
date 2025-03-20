const { SCommand } = require("../../../structs/scommand");
const { Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = new SCommand({
  name: "membercount",
  description: "Get The Member Count Of A Server",
  permissions: "SEND_MESSAGES",
  category: "Info",
  usage: "/membercount",

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    if (!interaction.guild)
      return await interaction.followUp(
        "This Command Can Only Be Used In A Server",
      );

    let count = interaction.guild.memberCount;

    if (!count) return await interaction.followUp("Member Count Not Found");

    await interaction.followUp(
      `The server ${interaction.guild.name} has ${count} members!`,
    );
  },
});
