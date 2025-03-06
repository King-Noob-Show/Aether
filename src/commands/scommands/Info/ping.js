const { EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const emb = require("../../../configs/embed.json");
const { SCommand } = require("../../../classes/scommand.js");

module.exports = new SCommand({
  name: "ping",
  description: "Shows The API And Latency Ping For The Bot!",
  permissions: "SEND_MESSAGES",
  category: "Info",
  usage: "/ping",

  run: async (client, interaction, args) => {
    try {
      const msg = `Latency Is ${Date.now() - interaction.createdTimestamp}ms And API Latency Is ${Math.round(client.ws.ping)}`;

      await interaction.followUp({
        content: msg,
      });
    } catch (e) {
      console.log(e);
    }
  },
});
