/**
 * 
 * ❤️❤️❤️ Thanks Discord.js https://discordjs.guide ❤️❤️❤️
 * Add bot link: https://discordapp.com/oauth2/authorize?client_id=<Bot_Client_ID>&scope=bot&permissions=0
 * 
 */

// Set the varibles for development environment
require("dotenv").config();

import * as Discord from "discord.js";
import * as connections from "../connection";
import { commandHandler } from "./utils/commandHandler";
import { PREFIX, reactionData } from "./utils/global";
import { Shield } from "./interfaces/shield";
import { Equipment } from "./interfaces/equipment";
import { Weapon } from "./interfaces/weapon";
import { Emojis } from "./enums/emojis";

const client = new Discord.Client();

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

  commandHandler(msg);
});

function backOneItem(reaction: Discord.MessageReaction, user: Discord.User) {
  if (user.id === reactionData.userId && reactionData.index - 1 > -1) {
    reactionData.index--;

    const data = reactionData.data;
    const index = reactionData.index;
    const equip: Equipment = data[index];

    showEquipment(equip, reaction);
  }
}

function fowardOneItem(reaction: Discord.MessageReaction, user: Discord.User) {
  if (
    user.id === reactionData.userId &&
    reactionData.index + 1 < reactionData.data.length
  ) {
    reactionData.index++;

    const data = reactionData.data;
    const index = reactionData.index;
    const equip: Equipment = data[index];

    showEquipment(equip, reaction);
  }
}

function goToLastItem(reaction: Discord.MessageReaction, user: Discord.User) {
  if (user.id === reactionData.userId) {
    reactionData.index = reactionData.data.length - 1;

    const data = reactionData.data;
    const index = reactionData.index;
    const equip: Equipment = data[index];

    showEquipment(equip, reaction);
  }
}

function goToFirstItem(reaction: Discord.MessageReaction, user: Discord.User) {
  if (user.id === reactionData.userId) {
    reactionData.index = 0;

    const data = reactionData.data;
    const index = reactionData.index;
    const equip: Equipment = data[index];

    showEquipment(equip, reaction);
  }
}

function reactionHandle(reaction: Discord.MessageReaction, user: Discord.User) {
  switch (reaction.emoji.name) {
    case Emojis.FIRST: {
      goToFirstItem(reaction, user);
      break;
    }
    case Emojis.BACK: {
      backOneItem(reaction, user);
      break;
    }
    case Emojis.NEXT: {
      fowardOneItem(reaction, user);
      break;
    }
    case Emojis.LAST: {
      goToLastItem(reaction, user);
      break;
    }
  }
}

function changeItemSelection(
  reaction: Discord.MessageReaction,
  user: Discord.User
) {
  if (user.id === reactionData.userId) {
    reactionData.index++;

    const data = reactionData.data;
    const index = reactionData.index;
    const equip: Equipment = data[index];

    showEquipment(equip, reaction);
  }
}

function showEquipment(equip: Equipment, reaction: Discord.MessageReaction) {
  // equip is a shield
  if ("defence" in equip) {
    reaction.message.edit(
      `Id: ${(equip as Shield).id}\n` +
      `Name: ${(equip as Shield).name}\n` +
      `Defence: ${(equip as Shield).defence}\n` +
      `Price: ${(equip as Shield).price}\n\n`
    );
    // Equip is a weapon
  } else if ("damage" in equip) {
    reaction.message.edit(
      `Id: ${(equip as Weapon).id}\n` +
      `Name: ${(equip as Weapon).name}\n` +
      `Damage: ${(equip as Weapon).damage}\n` +
      `Price: ${(equip as Weapon).price}\n\n`
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
  if (reactionData.userId === null) return;
});

client.on("messageReactionAdd", (reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  reactionHandle(reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  reactionHandle(reaction, user);
});

// Creates the connection with Discord using (wisping: a secret token. u.u)
client.login(connections.SuperSecretDiscordToken.token);
