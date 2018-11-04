import * as Discord from "discord.js";
import * as connections from "../connection";
import { commandHandle } from "./command";

import { PREFIX } from "./utils/consts";

const client = new Discord.Client();

// Tell the world that we're ready!!
client.on("ready", () => {
  console.log(`Ready for play! ${client.user.tag}!`);
});

// Correspond to the receptor of all messages sent by the users in Discord
client.on("message", async msg => {
  // Ignoring others bots
  if (msg.author.bot) return;
  // Checking if the command has the prefix
  if (!msg.content.startsWith(PREFIX, 0)) return;

  commandHandle(msg);
});

// Creates the connection with Discord using (wisping: a secret token. u.u)
client.login(connections.SuperSecretDiscordToken.token);
