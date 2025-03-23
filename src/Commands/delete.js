import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
  ChannelType,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("delete")
  .setDescription("Delete all channels.")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function run({ interaction, client, handler }) {
  const guild = interaction.guild;
  const channels = await guild.channels.fetch();
  try {
    await interaction.deferReply({
      content: `Attempting to delete ${channels.size} channels.`,
      flags: MessageFlags.Ephemeral,
    });

    channels.forEach(async (channel) => {
      await channel.delete();
    });

    console.log(`Deleted ${channels.size} channels in ${guild.name}`);
  } catch (err) {
    console.error(`Error Deleting Channels in ${guild.name}`, err);
  }

  const channel = await guild.channels.create({
    name: `general`,
    type: ChannelType.GuildText,
  });
}

export const options = {
  devOnly: true,
};
