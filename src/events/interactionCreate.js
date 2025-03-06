const { Events, ChatInputCommandInteraction, Embed } = require("discord.js");
const client = require("../index.js");
const embed = require("../configs/embed.json");
const c = require("ansi-colors");

// Interaction Handler

module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      if (interaction.isCommand()) {
        await interaction.deferReply();

        const cmd = client.scommands.get(interaction.commandName);
        if (!cmd)
          return await interaction.followUp({
            content: "[ERROR] An Error Has Occurred During Getting The Command",
          });

        const args = [];

        for (let option of interaction.options.data) {
          if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
            });
          } else if (option.value) args.push(option.value);
        }

        interaction.member = interaction.guild.members.cache.get(
          interaction.user.id,
        );

        if (interaction.member.id === client.user.id) {
          await interaction.followUp(`Its Me...Wait Wh-`);
        }
        if (cmd) {
          // checking user perms
          if (!interaction.member.permissions.has(cmd.permissions || [])) {
            return interaction.followUp({
              content: `You dont have enough permissions to use this command!\nYou need ${cmd.permissions} permission to use this command!`,
              ephemeral: true,
            });
          }
          await cmd.run(client, interaction, args);
        }
      }
      // Context Menu Handling
      if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.scommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
      }

      //Button Handling
      if (!interaction.isButton()) return;
    } catch (e) {}
  },
};
