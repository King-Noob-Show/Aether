const { Events, ChatInputCommandInteraction } = require("discord.js");
const client = require("../index.js");

module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        await interaction.deferReply();

        const cmd = client.scommands.get(interaction.commandName);
        if (!cmd) {
          return await interaction.followUp("[ERROR] Slash command not found!");
        }

        const args = [];
        for (const option of interaction.options.data) {
          if (option.type === 1 /* SUB_COMMAND */) {
            args.push(option.name);
            option.options?.forEach((x) => x.value && args.push(x.value));
          } else if (option.value) {
            args.push(option.value);
          }
        }

        interaction.member =
          interaction.guild.members.cache.get(interaction.user.id) ||
          interaction.user.id;

        // Check Perms
        if (!interaction.member.permissions.has(cmd.permissions || [])) {
          return interaction.followUp({
            content: `You do not have the required permissions: ${cmd.permissions.join(", ")}`,
            ephemeral: true,
          });
        }

        await cmd.run(client, interaction, args);
      }

      // Context Menu Handling
      if (interaction.isContextMenuCommand()) {
        await interaction.deferReply();
        const cmd = client.scommands.get(interaction.commandName);
        if (cmd) await cmd.run(client, interaction);
      }
    } catch (err) {
      console.error("Error in interactionCreate event:", err);
    }
  },
};
