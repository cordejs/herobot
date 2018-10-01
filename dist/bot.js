"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const connections = require("./../connection");
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
//# sourceMappingURL=bot.js.map