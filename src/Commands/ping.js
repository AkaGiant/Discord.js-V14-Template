import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong!");

export function run({ interaction }) {
  return interaction.reply({ content: "Pong!" });
}
