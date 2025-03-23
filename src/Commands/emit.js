import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
  CommandInteraction,
  EmbedBuilder,
  MessageFlags,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("emit")
  .setDescription("emits an event without having to use a dummy account")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addStringOption((option) =>
    option
      .setName("event")
      .setDescription("The event you wish to emit.")
      .setRequired(true)
      .addChoices(
        { name: "guildMemberAdd", value: "guildMemberAdd" },
        { name: "guildMemberRemove", value: "guildMemberRemove" },
        { name: "guildCreate", value: "guildCreate" },
        { name: "guildDelete", value: "guildDelete" }
      )
  );

export function run({ interaction, client, handler }) {
  const optionSelected = interaction.options.getString("event");
  if (optionSelected) {
    client.emit(optionSelected, interaction.member);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Aqua")
          .setDescription(`Event **${optionSelected}** Emitted`),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }
}

export const options = {
  devOnly: true,
};
