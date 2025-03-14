import dotenv from "dotenv";

import { Client, IntentsBitField } from "discord.js";

import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { CommandKit } from "commandkit";

dotenv.config();

// Set up the Discord client
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

// Set up the command handler
new CommandKit({
  client,
  commandsPath: path.join(__dirname, "src/commands"),
  eventsPath: path.join(__dirname, "src/events"),
  validationsPath: path.join(__dirname, "src/validations"),
  devGuildIds: [process.env.DEVELOPMENT_SERVER_ID],
  devUserIds: [process.env.DEVELOPER_USER_ID],
  skipBuiltInValidations: true,
  bulkRegister: true,
});

client.login(process.env.BOT_TOKEN);
