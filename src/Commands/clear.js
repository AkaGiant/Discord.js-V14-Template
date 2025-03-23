import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Clears X amount of messages in a channel upto 100.")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("The amount of messages to clear.")
      .setRequired(true)
  );

export async function run({ interaction, client, handler }) {
  const amount = interaction.options.getInteger("amount");
  if (amount > 100) {
    return interaction.reply({
      content: `I'm only able to delete the last 100 Messages. You asked me to delete ${amount}`,
      flags: MessageFlags.Ephemeral,
    });
  }

  const channel = interaction.channel;
  const messages = await channel.messages.fetch({ limit: amount });

  try {
    await interaction.deferReply({
      content: `Fetched ${messages.size} Attempting to delete them now.`,
      flags: MessageFlags.Ephemeral,
    });

    await channel.bulkDelete(messages, true);

    interaction.editReply({
      content: `${messages.size} Messages Deleted`,
      flags: MessageFlags.Ephemeral,
    });
  } catch (err) {
    console.error(
      `Error Deleting Messages in ${channel.name} x${messages.size}`,
      err
    );
    interaction.reply({
      content:
        "Hmm.. ive ran into an issue whilst trying to delete these messages... sorry...",
      flags: MessageFlags.Ephemeral,
    });
  }
}

export const options = {
  devOnly: true,
};
