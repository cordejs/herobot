import * as Discord from "discord.js";
import * as connections from "./../connection";
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login(connections.SuperSecretDiscordToken.token);
