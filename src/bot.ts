/**
 * First of all. Thanks Discord.js Thanks https://discordjs.guide ❤️
 */

import * as Discord from "discord.js";
import * as connections from "../connection";
import { commandHandle } from "./command";

import { PREFIX } from "./utils/consts";

const client = new Discord.Client();

/**
 * Store the list of shields/weapons that the user is seeing to buy in "shop" command
 */
export let userReaction = {
  userId: null,
  data: null,
  index: 0,
  message: null
};

const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};

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

function changeItemSelection(
  reaction: Discord.MessageReaction,
  user: Discord.User
) {
  if (user.id === userReaction.userId) {
    userReaction.index++;

    const data = userReaction.data;
    const index = userReaction.index;
    const shield = data[index];

    reaction.message.edit(
      `Id: ${shield.id}\n` +
        `Name: ${shield.name}\n` +
        `Defence: ${shield.defence}\n` +
        `Price: ${shield.price}\n\n`
    );
  }
}

/**
 * listens for all client events and returns a set amount of data.
 * Response example:
 *
 * {
 *  t: 'MESSAGE_REACTION_ADD',
 *  s: 4,
 *  op: 0,
 *  d: {
 *      user_id: '208330347295932416',
 *      message_id: '396565776955342849',
 *      emoji: {
 *          name: '😄',
 *          id: null,
 *          animated: false
 *       },
 *      channel_id: '396535748360404994'
 *    }
 * }
 */

client.on("raw", async event => {
  // This will prevent from trying to build data that isn't relevant to that event.
  if (!events.hasOwnProperty(event.t)) return;
  if (userReaction.userId === null) return;
});

client.on("messageReactionAdd", (reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  changeItemSelection(reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  changeItemSelection(reaction, user);
});

// Creates the connection with Discord using (wisping: a secret token. u.u)
client.login(connections.SuperSecretDiscordToken.token);
